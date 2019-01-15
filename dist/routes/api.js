"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_promise_1 = __importDefault(require("pg-promise"));
exports.register = (app) => {
    const oidc = app.locals.oidc;
    const port = parseInt(process.env.PGPORT || "5432", 10);
    const config = {
        database: process.env.PGDATABASE || "postgres",
        host: process.env.PGHOST || "localhost",
        port,
        user: process.env.PGUSER || "postgres"
    };
    const pgp = pg_promise_1.default();
    const db = pgp(config);
    app.get(`/api/keyboards/all`, oidc.ensureAuthenticated(), (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.userContext.userinfo.sub;
            const keyboards = yield db.any(`
        SELECT
            id
            , brand
            , model
            , year
            , color
        FROM    keyboards
        WHERE   user_id = $[userId]
        ORDER BY year, brand, model`, { userId });
            return res.json(keyboards);
        }
        catch (err) {
            // tslint:disable-next-line: no-console
            console.error(err);
            res.json({ error: err.message || err });
        }
    }));
    app.get(`/api/keyboards/total`, oidc.ensureAuthenticated(), (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.userContext.userinfo.sub;
            const total = yield db.one(`
      SELECT  count(*) AS total
      FROM    keyboards
      WHERE   user_id = $[userId]`, { userId }, (data) => {
                return {
                    total: +data.total
                };
            });
            return res.json(total);
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json({ error: err.message || err });
        }
    }));
    app.get(`/api/keyboards/find/:search`, oidc.ensureAuthenticated(), (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.userContext.userinfo.sub;
            const keyboards = yield db.any(`
        SELECT
            id
            , brand
            , model
            , year
            , color
        FROM    keyboards
        WHERE   user_id = $[userId]
        AND    (brand ILIKE $[search] OR model ILIKE $[search])`, { userId, search: `%${req.params.search}%` });
            return res.json(keyboards);
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json({ error: err.message });
        }
    }));
    app.post(`/api/keyboards/add`, oidc.ensureAuthenticated(), (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.userContext.userinfo.sub;
            const id = yield db.one(`
        INSERT INTO keyboards(user_id, brand, model, year, color)
        VALUES($[userId], $[brand], $[model], $[year], $[color])
        RETURNING id;`, Object.assign({ userId }, req.body));
            return res.json({ id });
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json({ error: err.message || err });
        }
    }));
};
//# sourceMappingURL=api.js.map