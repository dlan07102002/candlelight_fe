export const OAuthGGConfig = {
    clientId:
        "107114314382-ur1njdcblc817cb71a96p0g041l052rq.apps.googleusercontent.com",
    redirectUri: `${window.location.origin}/authenticate?type=google`,
    authUri: "https://accounts.google.com/o/oauth2/auth",
};

export const OAuthGHConfig = {
    clientId: "Iv23li2jXlUAWbAMvc9Q",
    redirectUri: `${window.location.origin}/authenticate?type=github`,
    authUri: "https://github.com/login/oauth/authorize",
};
