const authConfig= {
    providers: [
        {
            domain: process.env.CONVEX_AUTH_DOMAIN,
            applicationID: "convex",
        },
    ]
};
export default authConfig;