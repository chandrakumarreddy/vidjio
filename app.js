const express = require('express');
const exphbs = require('express-handlebars');

//creating instances
const app = express();

//usages
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
//routes
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/ideas', (req, res) => {
    res.render('./ideas/index');
});


app.get('/ideas/add', (req, res) => {
    res.render('./ideas/add');
});
app.post('/ideas', (req, res) => {
    res.send('done');

});

//listening to ports
app.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        console.log('error');
    } else {
        console.log('connecteed');
    }
});