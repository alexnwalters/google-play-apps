const express = require('express');
const morgan = require('morgan');

const app = express();

const playstore = require('./playstore')


app.use(morgan('common'));

app.get('/apps', (req, res) => {

    let genresOptions = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];
    let sortOptions = ['Rating', 'App'];

    const { sort, genres } = req.query;

    if(sort) {
        if(!sortOptions
            .toString()
            .toLowerCase()
            .includes(sort.toLowerCase())) {
                return res
                    .status(400)
                    .send('Sort must be one of rating or app');
        }
    }

    if(genres) {
        if(!genresOptions
            .toString()
            .toLowerCase()
            .includes(genres.toLowerCase())) {
                return res
                    .status(400)
                    .send(`Genres must be one of the following options: ${genresOptions}.`)
        }
    }

    let results = playstore
                    .filter(item =>
                        item
                        .Genres
                        .toLowerCase()
                        .includes(genres.toLowerCase())
                        );

    if(sort) {
        results.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        })
    }

    res
        .json(results);
});

module.exports = app;