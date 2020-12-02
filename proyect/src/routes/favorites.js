const { Router } = require('express');
const router = Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const favtxt = './favoritos.txt';

function getRandomArbitrary(min, max) {
    //Math.round(Math.random() * (max - min) + min)
    return (Math.random() * (max - min) + min);
}

function verifyToken(req, res, next) {
    if (typeof req.headers.authorization !== 'undefined') {
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, 'secretkey', { algorithm: "HS256" }, (err, decoded) => {
            if (err) {
                res.status(500).json({ error: "Not authorized" });
            }
            return next();
        })
    }
    else {
        res.status(500).json({ error: "Not authorized" })
    }
}

var currentDate = new Date();
var dateTime = currentDate.getFullYear() + "/"
    + (currentDate.getMonth() + 1) + "/"
    + currentDate.getDate() + " "
    + currentDate.getHours() + ":"
    + currentDate.getMinutes() + ":"

router.get('/', verifyToken, (req, res) => {
    let readFavs = fs.readFileSync(favtxt);
    let favsJSON = JSON.parse("[" + readFavs + "]");
    for (let i = 0; i < favsJSON.length; i++) {
        favsJSON[i].suggestionForTodayScore = getRandomArbitrary(0, 99);
    }
    favsJSON.sort(function (a, b) {
        if (a.suggestionForTodayScore > b.suggestionForTodayScore) { return -1; }
        if (a.suggestionForTodayScore < b.suggestionForTodayScore) { return 1; }
        return 0;
    });
    res.json(favsJSON);
});

router.post('/', verifyToken, (req, res) => {
    const { } = req.body;
    //Teniendo en cuenta que se espera solo la película que se espera agregar
    const movieSelect = { ...req.body };
    movieSelect.addedAt = dateTime;
    const movieString = JSON.stringify(movieSelect);
    let readMovies = fs.readFileSync(favtxt, 'utf-8');
    if (readMovies === '') {
        fs.appendFileSync(favtxt, movieString, (err) => {
            if (err) throw err;
        });
    } else {
        fs.appendFileSync(favtxt, "," + '\n' + movieString, (err) => {
            if (err) throw err;
        });
    }
    res.send('Movie added successfully!');
});

module.exports = router;