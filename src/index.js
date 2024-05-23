import express from 'express';
import { engine } from 'express-handlebars';
import morgan from 'morgan';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import router from './routes/index.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(router);
app.set('views', join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/random-users', (req, res) => {
    res.render('index');
});

app.get('/random-users/:id', (req, res) => {
    res.render('index');
});

app.use(express.static(join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
