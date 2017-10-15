// @flow
import fetch from 'node-fetch';
import { Base64 } from 'js-base64';
import frontMatter from 'front-matter';

const REPO_AUTHOR = 'camden';
const REPO_NAME = 'rulebooks';
const GITHUB_ROOT = 'https://api.github.com';
const GITHUB_API_URL = `/repos/${REPO_AUTHOR}/${REPO_NAME}/contents`;

const getGithubAuthParams = () => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Client ID and client secret must be provided.');
  }

  return `?client_id=${clientId}&client_secret=${clientSecret}`;
};

// Rulebook name must be the root name - i.e. without filetype
export const getRulebookContent = async ({
  rulebookName,
  redis,
}: {
  rulebookName: string,
  redis: *,
}): Promise<Object> => {
  let rulebookData = await getFromCache({
    key: 'rulebook-' + rulebookName,
    redis,
  });

  let status = 200;

  if (rulebookData && rulebookData.status) {
    status = rulebookData.status;
  }

  // Nothing was found in the cache for this rulebook
  if (!rulebookData) {
    const url =
      GITHUB_ROOT +
      GITHUB_API_URL +
      '/rulebooks/' +
      rulebookName +
      '.md' +
      getGithubAuthParams();
    const response = await fetch(url, {
      headers: {
        'User-Agent': REPO_AUTHOR + '/' + REPO_NAME,
      },
    });

    status = response.status;
    rulebookData = await response.json();
    rulebookData.status = status;

    redis.setex('rulebook-' + rulebookName, 3600, JSON.stringify(rulebookData));
  }

  return {
    status,
    encodedContent: rulebookData.content,
  };
};

export const hydrateRulebook = async ({
  rulebookName,
  redis,
}): Promise<Object> => {
  const rulebookData = await getRulebookContent({
    rulebookName,
    redis,
  });

  const rulebookContent = Base64.decode(rulebookData.encodedContent);
  const rulebookAttributes = frontMatter(rulebookContent).attributes;

  const rulebookTitle = rulebookAttributes.title || rulebookName;

  return {
    name: rulebookName,
    title: rulebookTitle,
    tags: rulebookAttributes.tags || [],
  };
};

export const getAllRulebooks = async ({ redis }): Promise<Object> => {
  const url =
    GITHUB_ROOT + GITHUB_API_URL + '/rulebooks' + getGithubAuthParams();

  const response = await fetch(url, {
    headers: {
      'User-Agent': REPO_AUTHOR + '/' + REPO_NAME,
    },
  });

  const rulebookData = await response.json();
  let rulebookNameArray = rulebookData.map(rulebookObj => {
    return rulebookObj.name.split('.')[0];
  });

  const rulebooksArray = [];

  for (let i = 0; i < rulebookNameArray.length; i++) {
    const rulebookName = rulebookNameArray[i];
    const rulebook = await hydrateRulebook({ rulebookName, redis });
    rulebooksArray.push(rulebook);
  }

  return {
    status: response.status,
    rulebooksArray: rulebooksArray,
  };
};

const isJSON = (string: string): boolean => {
  if (string === null || string === undefined) {
    return false;
  }

  try {
    JSON.parse(string);
  } catch (e) {
    return false;
  }

  return true;
};

export const getFromCache = async ({ redis, key }): Object => {
  return new Promise((resolve, reject) => {
    redis.get(key, (err, value) => {
      if (err) {
        return reject(err);
      }

      let data = value;

      if (isJSON(value)) {
        data = JSON.parse(value);
      }

      return resolve(data);
    });
  });
};

export const cacheHandler = ({ redis }) => {
  return (req, res, next) => {
    return getFromCache({ redis: redis, key: req.url }).then(data => {
      if (data) {
        res.json({ data: data });
      } else {
        next();
      }
    });
  };
};
