//Import needed modules
const { Pool, Client } = require('pg');
const express = require('express');
var http = require('http');

//Connect to postgres database
const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'username',
    password: 'password',
    database: 'postgres'
});
client.connect();

//Create express
var app = express();

//Display front-end
app.get('/', function (req, result ,next) {
    
    result.sendFile('public/index.html', {root: __dirname });
});

//Display front-end
app.get('/public/main.js', function(req, result, next) {
	result.sendFile('public/main.js', {root: __dirname });
});

//Display front-end
app.get('/public/style.css', function(req, result, next) {
	result.sendFile('public/style.css', {root: __dirname });
});

//County data endpoint
app.get('/county/:countyName', function (req, result) {
    client.query(`select * from countyData natural join countyCases where countyName='${req.params.countyName}' order by dateofrecording desc;`, (err, res) => {
        if(err) {
            console.error(err);
            return;
        }
        console.log('Query Successful');
        result.status(200).send(res.rows);
    });
});

//College data endpoint                                                                                                                                                                                                                
app.get('/college/:collegeName', function (req, result) {
    client.query(`select collegedata.collegename, collegedata.countyname, collegecases.dateofrecording, collegecases.cases, collegecases.deaths from collegedata natural join collegecases where collegename like '${req.params.collegeName}%' order by dateofrecording desc;`, (err, res) => {
        if(err) {
            console.error(err);
            return;
        }
        console.log('Query Successful');
        result.status(200).send(res.rows);
    });
});

//College aggreated data endpoint                                                                                                                                                                                                                
app.get('/collegeagg/:collegeName', function (req, result) {
    client.query(`select collegedata.collegename, collegedata.countyname, collegecases.dateofrecording, sum(collegecases.cases) over (order by collegedata.collegename, collegecases.dateofrecording) as cases, sum(collegecases.deaths) over (order by collegedata.collegename, collegecases.dateofrecording) as deaths from collegedata natural join collegecases where collegename like '${req.params.collegeName}%' order by dateofrecording desc;`, (err, res) => {
        if(err) {
            console.error(err);
            return;
        }
        console.log('Query Successful');
        result.status(200).send(res.rows);
    });
});

//Overall cases in the Lehigh Valley by date
app.get('/allcountycases', function(req, result) {
    client.query('select dateofrecording, sum(cases) from countycases group by dateofrecording order by dateofrecording desc;', (err, res) => {
       if(err) {
          console.error(err);
          return;
       }
       console.log('Query Successful');
       result.status(200).send(res.rows);
   });
});

//Run server
app.listen(80, () => console.log('Listening on port 80'));