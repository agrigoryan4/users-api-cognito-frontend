const {
  REACT_APP_AWS_API_INVOKE_URL,
  REACT_APP_AWS_COGNITO_REGION,
  REACT_APP_AWS_COGNITO_USER_POOL_ID,
  REACT_APP_AWS_COGNITO_APP_CLIENT_ID,
} = process.env;

const config = {
  aws: {
    api: {
      invokeUrl: REACT_APP_AWS_API_INVOKE_URL,
    },
    cognito: {
      region: REACT_APP_AWS_COGNITO_REGION,
      userPoolId: REACT_APP_AWS_COGNITO_USER_POOL_ID,
      appClientId: REACT_APP_AWS_COGNITO_APP_CLIENT_ID,
    },
  },
};

export default config;
