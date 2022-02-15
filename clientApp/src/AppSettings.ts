export const server =
  process.env.REACT_APP_ENV === 'production'
    ? 'https://qanda2022be.azurewebsites.net'
    : process.env.REACT_APP_ENV === 'staging'
    ? 'https://qanda2022bestg.azurewebsites.net'
    : 'https://localhost:44378';

export const webAPIUrl = `${server}/api`;

export const authSettings = {
  domain: 'dev-gyr33wnb.us.auth0.com',
  client_id: '6W7O74JLG8XFg7NTugeWH88EUsqXu9vS',
  redirect_uri: window.location.origin + '/signin-callback',
  scope: 'openid profile QandAAPI email',
  audience: 'https://qanda',
};
