const authConfig= {
    providers: [
        {
            domain: process.env.CLERK_AUTH_DOMAIN,
            applicationID: "convex",
        },
    ]
};
export default authConfig;