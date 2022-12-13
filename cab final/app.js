const express = require('express');
const parser = require('body-parser');
const Route = require('./routes/route')
const {engine} = require('express-handlebars');
const cookieSession = require('cookie-session');
const authMiddleware = require('./middlewares/authenticationMiddleware');


const app = express();
const path = require('path');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(parser.urlencoded({extended: true}));


app.use(cookieSession({
    name: 'session',
    httpOnly: true,
    keys: ["asdghjhgsdahjsgdhjaso"],
    maxAge: 24 * 60 * 60 * 1000
}));
app.use("/static", express.static(path.join(__dirname, 'static')));
app.use(authMiddleware)


app.use("/api",Route);

app.listen(80)