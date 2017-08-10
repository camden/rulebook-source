// @flow
import fetch from 'node-fetch';

const REPO_AUTHOR = 'camden';
const REPO_NAME = 'rulebooks';
const GITHUB_ROOT = 'https://api.github.com';
const GITHUB_API_URL = `/repos/${REPO_AUTHOR}/${REPO_NAME}/contents`;

const getFileData = (rawUrl: string): Promise<string> => {
  return fetch(rawUrl).then(res => res.text()).then(fileData => {
    return fileData;
  });
};

export const getMarkdownForRulebook = (rulebookName: string): Promise<*> => {
  const githubUrl = GITHUB_ROOT + GITHUB_API_URL + '/rulebooks/' + rulebookName;

  return fetch(githubUrl)
    .then(res => {
      return res.json();
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.message);
      }

      return getFileData(res.download_url);
    })
    .catch(err => {
      console.log(`${err} - ${githubUrl}`);
    });
};
