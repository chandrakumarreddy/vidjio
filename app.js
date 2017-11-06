const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const db = require('./config/database');
//creating instances
const app = express();
//connecting to mongodb
mongoose.Promise = global.Promise;
mongoose.connect(db.mongouri, {
    useMongoClient: true
}).then(() => console.log('database connected')).catch(err => console.log('conection failed'));
//database model 
const ideas = require('./models/Ideas');
const idea = mongoose.model('ideas');

//handlebar middleware usages
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//method_override middleware
app.use(methodOverride('_method'));
//routes
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/ideas', (req, res) => {
    idea.find({}).sort({
        date: 'desc'
    }).then(ideas => res.render('./ideas/index', { ideas: ideas }));
});


app.get('/ideas/add', (req, res) => {
    res.render('./ideas/add');
});
app.get('/ideas/edit/:id', (req, res) => {
    idea.findOne({
        _id: req.params.id
    }).then(data => {
        res.render('./ideas/edit', {
            data: data
        });
    }).catch(err => console.log('findone  queryfailed'));

});


app.post('/ideas', (req, res) => {
    let errors = [];

    if (!req.body.title) {
        errors.push({ text: 'Please add a title' });
    }
    if (!req.body.details) {
        errors.push({ text: 'Please add some details' });
    }

    if (errors.length > 0) {
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            description: req.body.details
        });
    } else {
        const newUser = {
            title: req.body.title,
            description: req.body.details
        };
        new idea(newUser)
            .save()
            .then(data => {
                res.redirect('/ideas');
            })
    }
});
app.put('/ideas/:id', (req, res) => {
    idea.findOne({ _id: req.params.id }).then(data => {
        data.title = req.body.title;
        data.description = req.body.details;
        data.save().then(data => res.redirect('/ideas'));
    });
});
app.delete('/ideas/:id', (req, res) => {
    idea.remove({ _id: req.params.id }).then(() => {
        res.redirect('/ideas');
    });
});

//listening to ports
app.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        console.log('error');
    } else {
        console.log('connecteed');
    }
});