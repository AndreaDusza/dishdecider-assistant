import express from 'express';
import serveStatic from 'serve-static';

const app = express();
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
});
app.use(serveStatic('dist'));
app.listen(8078);
