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
  const response = await fetch(url);
  const rulebookData = await response.json();

  return {
    status: response.status,
    encodedContent: rulebookData.content,
  };
};

export const cacheHandler = ({ redis }) => {
  return (req, res, next) => {
    redis.get(req.url, (err, value) => {
      // If the cached value exists, send it
      if (value) {
        res.send({ data: value });
      } else {
        next();
      }
    });
  };
};
