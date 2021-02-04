const express = require('express');
const minify = require('express-minify');

const app = express();

app.use(minify());
app.use(express.static('public'));

app.listen(3000, () => console.log('Listening on port 3000...'));