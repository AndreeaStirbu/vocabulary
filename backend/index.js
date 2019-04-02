var express = require("express");
var app = express();
var route = require('./routers/router');
const bodyParser = require('body-parser');

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/words', route);
