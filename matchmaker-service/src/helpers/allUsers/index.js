import db from '../../config/database/';

import {
  fetchAllUsersHelper,
  fetchUserAndTheirPreferenceTagsHelper
} from './fetchAllUsersSQLHelper';

//fetches all users
export const fetchAllUsersQuery = async body => {
  try {
    const { rows } = await db.query(fetchAllUsersHelper());
    console.log('rows herer', rows);
    for (let user of rows) {
      user.tags = (await fetchUserAndTheirPreferenceTagsQuery(user.id, 0)).map(
        tag => tag.id
      );
      user.tagPreferences = (await fetchUserAndTheirPreferenceTagsQuery(
        user.id,
        1
      )).map(tag => tag.id);
    }
    return rows;
  } catch (err) {
    console.log('Error with fetchAllUsersQuery :', err);
  }
};

export const fetchUserAndTheirPreferenceTagsQuery = async (userId, type) => {
  try {
    const queryString = fetchUserAndTheirPreferenceTagsHelper();
    const { rows } = await db.query(queryString, [userId, type]);
    console.log('Success on fetchUserAndTheirPreferenceTagsQuery');
    return rows;
  } catch (err) {
    console.log('Error on fetchUserAndTheirPreferenceTagsQuery', err);
  }
};
