const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const db = require('./config/database');


//creating instances
const app = express();


//connecting to mongodb
mongoose.Promise = global.Promise;
mongoose.connect(db.mongoURI, {
    useMongoClient: true
}).then(() => console.log('database connected')).catch(err => console.log('conection failed'));
const ideas = require('./routes/ideas');
const users = require('./routes/users');
//handlebar middleware usages
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//method_override middleware
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/about', (req, res) => {
    res.render('about');
});

app.use('/ideas', ideas);
app.use('/users', users);

//listening to ports
app.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        console.log('error');
    } else {
        console.log('connecteed');
    }
});