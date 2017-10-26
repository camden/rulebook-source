// @flow

import { decode as decodeHTMLEntities } from 'he';

const SITE_ROOT = '/api';

export const editLink = ({ rulebookName }): string => {
  return `https://github.com/camden/rulebooks/edit/master/rulebooks/${rulebookName}.md`;
};

const fetchData = async ({ urlSuffix }) => {
  const serverUrl = `${SITE_ROOT}/${urlSuffix}`;
  const res = await fetch(serverUrl);
  const resJSON = await res.json();
  resJSON.status = res.status;
  return resJSON;
};

export const fetchRulebookData = async ({
  rulebookName,
}: {
  rulebookName: string,
}): Promise<*> => {
  return fetchData({ urlSuffix: `rulebooks/${rulebookName}` });
};

export const fetchPageData = async ({ pageName }): Promise<*> => {
  return fetchData({ urlSuffix: `pages/${pageName}` });
};

export const fetchHomepageData = async (): Promise<*> => {
  return fetchData({ urlSuffix: `config/homepage.yml` });
};

export const searchByTitle = async ({
  query,
}: {
  query: string,
}): Promise<Array<Object>> => {
  const serverUrl = `${SITE_ROOT}/search?q=${query}`;
  const res = await fetch(serverUrl);
  const resJSON = await res.json();
  return resJSON.data;
};

export const fetchAllRulebooks = async (): Promise<*> => {
  const serverUrl = `${SITE_ROOT}/rulebooks/`;
  const res = await fetch(serverUrl);
  const resJSON = await res.json();
  return resJSON;
};

export const generateId = ({ title }: { title: string }): string => {
  // replace strings with dashes, not alphanumeric with nothing
  const decodedTitle = decodeHTMLEntities(title);
  return decodedTitle
    .replace(/[^a-zA-Z\d\s]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
};
