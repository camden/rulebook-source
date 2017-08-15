// @flow
import fetch from 'node-fetch';

const REPO_AUTHOR = 'camden';
const REPO_NAME = 'rulebooks';
const GITHUB_ROOT = 'https://api.github.com';
const GITHUB_API_URL = `/repos/${REPO_AUTHOR}/${REPO_NAME}/contents`;

export const getRulebookContent = async (
  rulebookName: string
): Promise<Object> => {
  const url = GITHUB_ROOT + GITHUB_API_URL + '/rulebooks/' + rulebookName;
  const response = await fetch(url, {
    headers: {
      'User-Agent': REPO_AUTHOR + '/' + REPO_NAME,
    },
  });
  const rulebookData = await response.json();

  return {
    status: response.status,
    encodedContent: rulebookData.content,
  };
};

export const getAllRulebooks = async (): Promise<Object> => {
  const url = GITHUB_ROOT + GITHUB_API_URL + '/rulebooks/';
  const response = await fetch(url, {
    headers: {
      'User-Agent': REPO_AUTHOR + '/' + REPO_NAME,
    },
  });

  const rulebookData = await response.json();
  const rulebooksArray = rulebookData.map(rulebookObj => {
    return rulebookObj.name.split('.')[0];
  });

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

export const cacheHandler = ({ redis }) => {
  return (req, res, next) => {
    redis.get(req.url, (err, value) => {
      let data = value;

      if (isJSON(value)) {
        data = JSON.parse(value);
      }

      // If the cached value exists, send it
      if (value) {
        res.json({ data: data });
      } else {
        next();
      }
    });
  };
};
