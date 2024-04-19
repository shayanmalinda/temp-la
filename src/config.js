// Copyright (c) 2023, WSO2 Inc. (http://www.wso2.com). All Rights Reserved.
//
// This software is the property of WSO2 Inc. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
// You may not alter or remove any copyright or other notice from copies of this content.

const config = {
    defaultPath: '/dashboard/default',
    fontFamily: `'Public Sans', sans-serif`,
    i18n: 'en',
    miniDrawer: false,
    container: true,
    mode: 'light',
    presetColor: 'default',
    themeDirection: 'ltr',
    OAUTH_CONFIG: {},
};

export const APPLICATION_CONFIG = {
    appName: "Leave Application",
    isMicroApp: false,
    authConfig: {
        signInRedirectURL: window.config.SIGN_IN_URL,
        signOutRedirectURL: window.config.SIGN_IN_URL,
        clientID: window.config.CLIENT_ID,
        baseUrl: window.config.ASGARDEO_BASE_URL,
        scope: ["openid", "email", "groups"]
    }
};

export const OAUTH_CONFIG = {
    TOKEN_APIS: {
        APIM_TOKEN_ENDPOINT: window.config.CHOREO_TOKEN_ENDPOINT,
        CLIENT_ID: window.config.CLIENT_ID,
        CLIENT_SECRET: window.config.CLIENT_SECRET,
        APIM_REVOKE_ENDPOINT: window.config.CHOREO_REVOKE_ENDPOINT
    },
    ADMIN_ROLES: window.config.ADMIN_ROLES,
};

const API_BASE_URL = window.config.API_BASE_URL;

export const services = {
    LEAVE_FORM: API_BASE_URL + "/form-data",
    CALCULATE_DAYS_OF_LEAVE: API_BASE_URL + "/leaves?isValidationOnlyMode=true",
    LIST_LEAVE: API_BASE_URL + "/leaves",
    SUBMIT_LEAVE: API_BASE_URL + "/leaves",
    CANCEL_LEAVE: API_BASE_URL + "/leaves",
    FETCH_EMPLOYEES: API_BASE_URL + "/employees",
    FETCH_REPORT_FILTERS: API_BASE_URL + "/report-filters",
    GENERATE_REPORT: API_BASE_URL + "/generate-report",
    GENERATE_LEAD_REPORT: API_BASE_URL + "/generate-lead-report",
    FETCH_LEAVE_ENTITLEMENT_PATH: "/leave-entitlement",
};

export default config;
export const drawerWidth = 240;

export const twitterColor = '#1DA1F2';
export const facebookColor = '#3b5998';
export const linkedInColor = '#0e76a8';
