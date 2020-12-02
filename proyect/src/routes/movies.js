const { Router } = require('express');
const router = Router();
const jwt = require("jsonwebtoken");
const request = require('request');

const apikey = '';
let baseURL = 'https://api.themoviedb.org/3';

function getRandomArbitrary(min, max) {
    // Math.round(Math.random() * (max - min) + min)
    return (Math.random() * (max - min) + min);
}

function verifyToken(req, res, next){
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

function reqAndSort(url, res) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let bodyJSON = JSON.parse(body);
            let peliculas = bodyJSON.results;
            for (let i = 0; i < peliculas.length; i++) {
                let peliculai = peliculas[i];
                peliculai.suggestionScore = getRandomArbitrary(0, 99);
            };
            peliculas.sort(function (a, b) {
                if (a.suggestionScore > b.suggestionScore) { return -1; }
                if (a.suggestionScore < b.suggestionScore) { return 1; }
                return 0;
            });
            res.json(peliculas);
        }
    })
}

//Si aplica la keyword se realiza la búsqueda con el filtrado
router.get('/:keyword',verifyToken,(req, res) => {
    const keyword = req.params.keyword;
    let urlSerch = `${baseURL}/search/movie?api_key=${apikey}&query=${keyword}&language=es`;
    reqAndSort(urlSerch, res);
});

//Si no aplica, por defecto se devuelven las peliculas más populares
router.get('/',  verifyToken,(req, res) => {
    let urlPopular = `${baseURL}/movie/popular?api_key=${apikey}&language=es`;
    reqAndSort(urlPopular, res);
});

module.exports = router;