// @flow
import fetch from 'node-fetch';

const REPO_AUTHOR = 'camden';
const REPO_NAME = 'rulebooks';
const GITHUB_ROOT = 'https://api.github.com';
const GITHUB_API_URL = `/repos/${REPO_AUTHOR}/${REPO_NAME}/contents`;

const getFileData = async (rawUrl: string): Promise<string> => {
  const fileDataResponse = await fetch(rawUrl);
  const fileData = await fileDataResponse.text();
  return fileData;
};

export const getMarkdownForRulebook = async (
  rulebookName: string
): Promise<*> => {
  const githubUrl = GITHUB_ROOT + GITHUB_API_URL + '/rulebooks/' + rulebookName;

  const rulebookDataResponse = await fetch(githubUrl);

  if (!rulebookDataResponse.ok) {
    return {
      status: rulebookDataResponse.status,
      data: {},
    };
  }

  const rulebookData = await rulebookDataResponse.json();

  if (!rulebookData.download_url) {
    throw new Error('rulebookData must have download_url');
  }

  const fileData = await getFileData(rulebookData.download_url);

  return {
    status: 200,
    data: fileData,
  };
};
