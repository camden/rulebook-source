// @flow

const SITE_ROOT = '/api';

export const fetchRulebookData = async ({
  rulebookName,
}: {
  rulebookName: string,
}): Promise<*> => {
  const serverUrl = `${SITE_ROOT}/rulebooks/${rulebookName}`;
  const res = await fetch(serverUrl);
  const resJSON = await res.json();
  return resJSON;
};

export const fetchAllRulebooks = async (): Promise<*> => {
  const serverUrl = `${SITE_ROOT}/rulebooks/`;
  const res = await fetch(serverUrl);
  const resJSON = await res.json();
  return resJSON;
};

export const generateId = ({ title }: { title: string }): string => {
  // replace strings with dashes, not alphanumeric with nothing
  return title.replace(/[^a-zA-Z\d\s]/g, '').replace(/\s+/g, '-').toLowerCase();
};
