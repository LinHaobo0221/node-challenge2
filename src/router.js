const express = require('express');
const { validationResult } = require('express-validator');
const axios = require('axios');
const dayjs = require('dayjs');
const bodyValidator = require("./validator");
const memoryStore = require('../memoryStore');

const router = express.Router();

const checkDate = (date, format) => {
  return dayjs(date, format).format(format) === date;
}

router.get('/', (request, response) => {
  response.render("index");
});

// noinspection JSCheckFunctionSignatures
router.post('/', bodyValidator, async (request, response) => {
  const error = validationResult(request);
  if(!error.isEmpty()) {
    response.render("error",{error: `Invalid ${error.array()[0].param} supplied`});
    return;
  }

  const { userid, wish } = request.body;

  const allUsers = await axios.get('https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json');

  const currentUser = allUsers.data.find((user) => user.username === userid);
  if (!currentUser) {
    response.render("error",{error: 'user not found.'});
    return;
  }

  const allUserProfile = await axios.get('https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json');

  // noinspection JSUnresolvedVariable
  const userProfile = allUserProfile.data.find((profile) => profile.userUid === currentUser.uid);
  if (!userProfile) {
    response.render("error",{error: 'user profile not found.'});
    return;
  }

  const { birthdate } = userProfile;

  const isValidBirthDate = checkDate(birthdate, 'YYYY/MM/DD');
  if (!isValidBirthDate) {
    response.render("error",{error: 'user birthday is not valid.'});
    return;
  }

  const age = dayjs().diff(dayjs(birthdate), 'y', true);
  if (age > 10) {
    response.render("error",{error: 'user is older then 10 years old'});
    return;
  }

  memoryStore.push({
    username: currentUser.username,
    address: userProfile.address,
    wish: wish
  });

  response.render("success")
});

module.exports = router;
