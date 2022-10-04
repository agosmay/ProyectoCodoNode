const express = require('express');
const app =  express();
const hbs = require('hbs');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session')

dotenv.config({path:'./env/.env'})
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(path.join(__dirname, 'public')))



app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge : 60000 }
}))


app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
const routes = require('./routes/routes')
app.use(routes)


app.use((req,res) => {
	res.status(404).render('404', {
		titulo: '404-NOT FOUND'
	})
})


app.listen(3000, (req,res)=> {
	console.log('Servidor online en puerto 3000')
})