const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./routes');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
