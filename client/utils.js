// @flow

const SITE_ROOT = '/api';

export const fetchRulebookData = ({
  rulebookName,
}: {
  rulebookName: string,
}): Promise<*> => {
  const serverUrl = `${SITE_ROOT}/rulebooks/${rulebookName}`;
  return fetch(serverUrl).then(res => res.json()).then(res => {
    return res;
  });
};
