const express = require('express');
const app = new express();
const sql = require('mssql');
const cors = require('cors');
const CC = require('./CoordConverter.js');
const sqlUtils = require ('./SqlUtils.js');

app.use(new cors());

app.get('/', function(req, res){
    sqlUtils.connect(req, res,sqlUtils.makeSqlRequest);
});

app.get('/ci_vettore/:foglio', function (req, res) {
    console.log(req.params.foglio);
    //richiamo il metodo che ottiene l'elenco dei vettori energetici
    sqlUtils.connect(req, res, sqlUtils.ciVettRequest);
 });

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});