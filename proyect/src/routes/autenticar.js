const {Router} = require('express');
const router = Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const userstxt = './users.txt'

router.post('/', (req, res) => {
    const { email, password } = req.body;
    const user = { ...req.body };
    let readUsers = fs.readFileSync(userstxt);
    let usersJSON = JSON.parse("[" + readUsers + "]");
    let i = 0;
    let userExist;
    while (i < usersJSON.length && !userExist) {
      if ((user.email === usersJSON[i].email) && (user.password === usersJSON[i].password)) {
        userExist = true;
      }
      else {
        userExist = false;
      }
      i++;
    }
    if (userExist) {
      jwt.sign({ user }, 'secretkey', (err, token) => {
        res.json({
          token
        });
      });
    }else{
      res.json({ error:"There was an error, unregistered user"})
    }
  });
  
module.exports = router;