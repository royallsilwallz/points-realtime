const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const server = app.listen(3000, () => {
   console.log('Server running on port 3000..')
})

// Database Connection
const { Pool } = require('pg')

const pool = new Pool({ 
   user: 'postgres',
   host: 'localhost',
   database: 'points',
   password: 'postgre',
   port: '5432',
})


const io = require('socket.io').listen(server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
   res.render('home');
})

app.get('/add', (req, res) => {
   res.render('add');
});

app.get('/data', (req, res) => {
   let query = 'SELECT * FROM points;'

   pool.query(query, (err, result) => {
      if (err) {
         throw err
      }
      res.json(result.rows)
   });
})

app.post('/add', (req, res) => {
   let { lat, lng } = req.body;
   let data = [lat, lng];
   let query = 'INSERT INTO points(lat, lng) VALUES($1, $2);'

   pool.query(query, [lat, lng], (err, result) => {
      if(err) {
         throw err
      }
      io.emit('add', data);
   })
});

app.get('/clear', (req, res) => {
   let query = 'DELETE FROM points;'

   pool.query(query, (err, result) => {
      if (err) {
         throw err
      }
      res.redirect('/');
   })
});



