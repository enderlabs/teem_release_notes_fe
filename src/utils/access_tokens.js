import moment from 'moment';
// import * as Sentry from '@sentry/browser';
import { updateTeemData, getTeemData } from './local_storage';

const TOKEN_LIFE_SPAN = 45;

const tokenLifeSpan = accessTokenCreated => Math.abs(moment()
  .diff(moment(accessTokenCreated), 'minutes'));

const validTokens = tokens => tokens.accessTokenIsValid
  && tokenLifeSpan(tokens.accessTokenCreated) < TOKEN_LIFE_SPAN;

const saveTokensToStorage = (tokens) => {
  try {
    updateTeemData('accessToken', tokens.accessToken);
    updateTeemData('accessTokenCreated', tokens.accessTokenCreated);
    updateTeemData('refreshToken', tokens.refreshToken);
    updateTeemData('accessTokenIsValid', tokens.accessTokenIsValid);
  } catch (error) {
    console.error('Error storing tokens to storage:', { error });
    // Sentry.captureException(error);
  }
};

const getTokensFromStorage = () => {
  try {
    return {
      accessToken: getTeemData('accessToken'),
      accessTokenCreated: getTeemData('accessTokenCreated'),
      refreshToken: getTeemData('refreshToken'),
      accessTokenIsValid: getTeemData('accessTokenIsValid'),
    };
  } catch (error) {
    console.error('Error getting tokens from storage:', { error });
    // Sentry.captureException(error);
    return null;
  }
};

export const setTokenValidity = (valid, tokens) => {
  tokens.accessTokenIsValid = valid;
  saveTokensToStorage(tokens);
  return getTokensFromStorage();
};

export const getAccessTokens = () => {
  try {
    const tokens = getTokensFromStorage();
    if (validTokens(tokens)) {
      return setTokenValidity(true, tokens);
    }
    // Set tokens as invalid and return token object
    return setTokenValidity(false, tokens);
  } catch {
    // If tokens do not exist... return null for user login flow
    return null;
  }
};

export const setAccessTokens = (tokens) => {
  try {
    if (validTokens(tokens)) {
      saveTokensToStorage(tokens);
      return true;
    }
    return false;
  } catch {
    return false;
  }
};
