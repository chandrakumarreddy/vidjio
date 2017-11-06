const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = require('../config/database');


//database model 
const ideas = require('../models/Ideas');
const idea = mongoose.model('ideas');
//idea routes
router.get('/', (req, res) => {
    idea.find({}).sort({
        date: 'desc'
    }).then(ideas => res.render('./ideas/index', { ideas: ideas }));
});


router.get('/add', (req, res) => {
    res.render('./ideas/add');
});
router.get('/edit/:id', (req, res) => {
    idea.findOne({
        _id: req.params.id
    }).then(data => {
        res.render('./ideas/edit', {
            data: data
        });
    }).catch(err => console.log('findone  queryfailed'));

});


router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
    idea.findOne({ _id: req.params.id }).then(data => {
        data.title = req.body.title;
        data.description = req.body.details;
        data.save().then(data => res.redirect('/ideas'));
    });
});
router.delete('/:id', (req, res) => {
    idea.remove({ _id: req.params.id }).then(() => {
        res.redirect('/ideas');
    });
});
module.exports = router;