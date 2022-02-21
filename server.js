const express = require('express')

const expressHandlebars = require('express-handlebars')

const app = express()

const port = 3000

// configure Handlebars view engine

app.engine('handlebars', expressHandlebars.engine({

defaultLayout: 'main',

}))

app.set('view engine', 'handlebars')


const fortunes = [

"Conquer your fears or they will conquer you.",

"Rivers need springs.",

"Do not fear what you don't know.",

"You will have a pleasant surprise.",

"Whenever possible, keep it simple.",

]

const people={
  people: [
    "ABC",
    "Alan Turing",
    "Ada Lovelace",
  ],
  row:5,
  col:9
}


app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
	const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
	res.render('about' ,{ fortune: randomFortune })
})

app.get('/table', (req, res) => {
	const i = 5
	const j = 9
	res.render('table',{row:i, col:j})
})

app.get('/another', (req, res) => {
	
	res.render('people',people)
})

// custom 404 page

app.use((req, res) => {

res.status(404)

res.render('404')

})

// custom 500 page

app.use((err, req, res, next) => {

console.error(err.message)

res.status(500)

res.render('500')

})


app.listen(port, () => console.log(`Express started on http://localhost:${port}; ' + 'press Ctrl-C to terminate. `))