// @flow
import ghrequest from 'ghrequest';

const REPO_AUTHOR = 'camden';
const REPO_NAME = 'rulebooks';
const GITHUB_ROOT = 'https://api.github.com';
const GITHUB_API_URL = `/repos/${REPO_AUTHOR}/${REPO_NAME}/contents`;

const getRulebookContent = async (rulebookName: string): Promise<Object> => {
  return new Promise((resolve, reject) => {
    ghrequest(
      {
        url: GITHUB_API_URL + '/rulebooks/' + rulebookName,
        headers: {
          'User-Agent': REPO_AUTHOR,
        },
      },
      (error, response, body) => {
        if (error) {
          return reject(error);
        }

        return resolve(response);
      }
    );
  });
};

export const getMarkdownForRulebook = async (
  rulebookName: string
): Promise<*> => {
  const rulebookDataResponse = await getRulebookContent(rulebookName);
  const rulebookData = await rulebookDataResponse.toJSON();

  return {
    status: rulebookData.statusCode,
    data: rulebookData.body,
  };
};
