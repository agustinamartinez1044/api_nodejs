const { Router } = require('express');
const router = Router();
const fs = require("fs");

const userstxt = './users.txt'

router.post("/", (req, res) => {
    const { email, firstName, lastName, password } = req.body;
    if (email && firstName && lastName && password) {
        const newUser = { ...req.body };
        let readUsers = fs.readFileSync(userstxt, 'utf-8');
        if (readUsers === '') {//Si no hay usuarios registrados, lo agrego directamente
            const newUserString = JSON.stringify(newUser);
            fs.appendFileSync(userstxt, newUserString, (err) => {
                if (err) throw err;
            });
            res.send('Registered successfully!');
        }
        else {//Si hay usuarios me fijo que no coincida con uno existente
            let usersJSON = JSON.parse("[" + readUsers + "]");//Para recorrer los objetos más cómodamente 
            let i = 0;
            let userExist;
            while (i < usersJSON.length && !userExist) {
                if (newUser.email === usersJSON[i].email) {
                    userExist = true;
                }
                else {
                    userExist = false;
                }
                i++;
            }
            if (userExist) {
                res.json({ error: "User exists" });
            } else {//Si no coincide con ningún usuario ya registrado
                const newUserString = JSON.stringify(newUser);
                fs.appendFileSync(userstxt, "," + '\n' + newUserString, (err) => {
                    if (err) throw err;
                });
            }
            res.send('Registered successfully!');
        }
    }
    else {
        res.json({ error: "There was an error, all fields are required" });
    }
});
module.exports = router;
