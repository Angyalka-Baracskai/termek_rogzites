const express = require('express'); 
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json()); 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
let gyumolcs = [];
let data = [];
let errors = [];
let success = true;
app.get('/', (req, res) => {
    console.log(__dirname);
    res.header('Content-Type', 'text/html; charset=utf8');
    res.status(201).sendFile(__dirname + '/public/index.html');
});
app.post('/', (req, res) => {
    res.header('Content-Type', 'application/json'); 
    let gyumi = req.body; 
    console.log(req.body);
    if(gyumi.mennyiseg <0){
        success = false;
        errors.push('A mennyiség nem lehet 0-nál kisebb');
    }
    if(gyumi.megnevezes.length < 5) {
        success = false;
        errors.push('Megnevezésnek 5 karakternél hosszabbnak kell lennie');
    }
    if(success) {
        data.push(gyumi);
        res.status(201).send({success: true, data: data, errors: errors});
    } else {
        res.status(201).send({success: false, data: data, errors: errors});
    }
   
});
app.use(express.static('public'));
app.listen(port, () => {
    console.log(`Express szerver indítva. Port: ${port}`);
});