const axios = require("axios");
const dayjs = require("dayjs");
const memoryStore = require("../../memoryStore");

const getUserBy = async (userid) => {
  const allUsers = await axios.get('https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json');

  const targetUser = allUsers.data.find((user) => user.username === userid);
  if (!targetUser) {
    return null;
  }

  return targetUser;
}

const getUserProfileBy = async (uid) => {
  const allUserProfile = await axios.get('https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json');

  // noinspection JSUnresolvedVariable
  const userProfile = allUserProfile.data.find((profile) => profile.userUid === uid);
  if (!userProfile) {
    return null;
  }

  return userProfile;
}

const checkValidDate = (date, format) => {
  return dayjs(date, format).format(format) === date;
}

const isValidBirthDate = (birthdate) => {
  const isValidBirthDate = checkValidDate(birthdate, 'YYYY/MM/DD');
  if (!isValidBirthDate) {
    return false;
  }

  const age = dayjs().diff(dayjs(birthdate), 'y', true);
  return age <= 10;
}

const addToStore = (username, address, wish) => {
  memoryStore.push({
    username,
    address,
    wish
  });
}

module.exports = {
  getUserBy,
  getUserProfileBy,
  isValidBirthDate,
  addToStore
}