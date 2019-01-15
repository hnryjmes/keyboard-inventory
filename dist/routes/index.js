"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = (app) => {
    const oidc = app.locals.oidc;
    // define a route handler for the default home page
    app.get("/", (req, res) => {
        res.render("index");
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
        res.render("keyboards");
    });
};
//# sourceMappingURL=index.js.map