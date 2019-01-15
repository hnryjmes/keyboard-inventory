"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = (app) => {
    const oidc = app.locals.oidc;
    // define a route handler for the default home page
    app.get("/", (req, res) => {
        const user = req.userContext ? req.userContext.userinfo : null;
        res.render("index", { isAuthenticated: req.isAuthenticated(), user });
    });
    // define a secure route handler for the login page that redirects to /keyboards
    app.get("/login", oidc.ensureAuthenticated(), (req, res) => {
        res.redirect("/keyboards");
    });
    // define a route to handle logout
    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });
    // define a secure route handler for the keyboards page
    app.get("/keyboards", oidc.ensureAuthenticated(), (req, res) => {
        const user = req.userContext ? req.userContext.userinfo : null;
        res.render("keyboards", { isAuthenticated: req.isAuthenticated(), user });
    });
};
//# sourceMappingURL=index.js.map