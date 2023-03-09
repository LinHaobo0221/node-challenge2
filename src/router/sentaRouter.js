const express = require('express');
const {
  validationResult
} = require('express-validator');
const bodyValidator = require("../validators/bodyValidator");
const SentaService = require("../service/sentaService")

const sentaRouter = express.Router();

sentaRouter.get('/', (request, response) => {
  response.render("index");
});

// noinspection JSCheckFunctionSignatures
sentaRouter.post('/', bodyValidator, async (request, response, next) => {
  try {

    const error = validationResult(request);
    if (!error.isEmpty()) {
      response.render("error", {
        error: `Invalid ${error.array()[0].param} supplied`
      });
      return;
    }

    const {
      userid,
      wish
    } = request.body;

    const currentUser = await SentaService.getUserBy(userid);
    if (!currentUser) {
      response.render("error", {
        error: 'user not found.'
      });
      return;
    }

    const userProfile = await SentaService.getUserProfileBy(currentUser.uid);
    if (!userProfile) {
      response.render("error", {
        error: 'user profile not found.'
      });
      return;
    }

    const {
      birthdate
    } = userProfile;

    const isValidBirth = SentaService.isValidBirthDate(birthdate);
    if (!isValidBirth) {
      response.render("error", {
        error: 'user birthday is not valid or older than 10 years old'
      });
      return;
    }

    SentaService.addToStore(currentUser.username, userProfile.address, wish);

    response.render("success");
  } catch (error) {
    next(error);
  }
});

module.exports = sentaRouter;