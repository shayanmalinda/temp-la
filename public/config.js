window.config = {
  SIGN_IN_URL: "http://localhost:3000",
  SIGN_OUT_URL: "http://localhost:3000",
  CLIENT_ID: "SKHFPENBZhzIfpYwmt4lhBOYiu8a",
  CLIENT_SECRET: "SKHFPENBZhzIfpYwmt4lhBOYiu8a",
  ASGARDEO_BASE_URL: "https://api.asgardeo.io/t/wso2",
  APP_SCOPE: ["openid", "email", "groups"],

  CHOREO_TOKEN_ENDPOINT: "https://api.asgardeo.io/t/wso2/oauth2/token",
  CHOREO_REVOKE_ENDPOINT: "https://api.asgardeo.io/t/wso2/oauth2/revoke",

  API_BASE_URL:
    "https://apis-stg.wso2.com/rvtw/leave-app-backend-ebt/endpoint-9090-803/v1.0",

  ADMIN_ROLES: [
    "wso2.all.employees",
    "user.hr.bu",
    "IS-WSO2.COM/user.hr.bu"
  ],
};
