import moment from 'moment';
import LocalStorageMock from '../../../test/utils/common_mocks';
import * as accessTokens from '../access_tokens';
import { clearData, updateTeemData } from '../local_storage';

Object.defineProperty(window, 'localStorage', {
  value: new LocalStorageMock(),
});

describe('access_tokens util', () => {
  test('set valid access tokens', () => {
    const tokens = {
      accessToken: '12345',
      accessTokenCreated: moment()
        .format(),
      refreshToken: '67890',
      accessTokenIsValid: true,
    };

    expect(accessTokens.setAccessTokens(tokens))
      .toBeTruthy();
  });

  test('try to set invalid access tokens', () => {
    const tokens = {
      accessToken: '12345',
      accessTokenCreated: moment()
        .format(),
      refreshToken: '67890',
      accessTokenIsValid: false,
    };

    expect(accessTokens.setAccessTokens(tokens))
      .toBeFalsy();
  });

  test('try to set expired access tokens', () => {
    const tokens = {
      accessToken: '12345',
      accessTokenCreated: moment()
        .subtract(2, 'hours')
        .format(),
      refreshToken: '67890',
      accessTokenIsValid: true,
    };

    expect(accessTokens.setAccessTokens(tokens))
      .toBeFalsy();
  });

  test('get valid access tokens', () => {
    const date = moment()
      .format();
    const tokens = {
      accessToken: '12345',
      accessTokenCreated: date,
      refreshToken: '67890',
      accessTokenIsValid: true,
    };

    accessTokens.setAccessTokens(tokens);

    const storedTokens = accessTokens.getAccessTokens();
    expect(storedTokens.accessToken)
      .toContain('12345');
    expect(storedTokens.accessTokenCreated)
      .toContain(date);
    expect(storedTokens.refreshToken)
      .toContain('67890');
    expect(storedTokens.accessTokenIsValid)
      .toBeTruthy();
  });

  test('get invalid access tokens', () => {
    const date = moment()
      .format();
    const tokens = {
      accessToken: '12345',
      accessTokenCreated: date,
      refreshToken: '67890',
      accessTokenIsValid: true,
    };

    accessTokens.setAccessTokens(tokens);
    updateTeemData('accessTokenIsValid', false);
    const storedTokens = accessTokens.getAccessTokens();
    expect(storedTokens.accessTokenIsValid)
      .toBeFalsy();
  });

  test('get expired access tokens', () => {
    const date = moment()
      .format();
    const tokens = {
      accessToken: '12345',
      accessTokenCreated: date,
      refreshToken: '67890',
      accessTokenIsValid: true,
    };

    accessTokens.setAccessTokens(tokens);
    updateTeemData('accessTokenCreated', moment(date)
      .subtract(2, 'hours'));
    const storedTokens = accessTokens.getAccessTokens();
    expect(storedTokens.accessTokenIsValid)
      .toBeFalsy();
  });

  test('return null when storage is empty', () => {
    clearData();
    expect(accessTokens.getAccessTokens().accessToken)
      .toBeNull();
  });
});
