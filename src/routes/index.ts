import * as express from "express";

export const register = (app: express.Application) => {
  const oidc = app.locals.oidc;

  // define a route handler for the default home page
  app.get("/", (req: any, res) => {
    res.render("index");
  });

  // define a secure route handler for the login page that redirects to /keyboards
  app.get("/login", oidc.ensureAuthenticated(), (req, res) => {
    res.redirect("/keyboards");
  });

  // define a route to handle logout
  app.get("/logout", (req: any, res) => {
    req.logout();
    res.redirect("/");
  });

  // define a secure route handler for the keyboards page
  app.get("/keyboards", oidc.ensureAuthenticated(), (req: any, res) => {
    res.render("guitars");
  });
};
