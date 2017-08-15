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
