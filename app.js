let express = require('express') //require module Express
let datas = require('./datas.json') //va chercher le fichier. Si on met pas ./ il va chercher un module
let cors = require('cors') //module NPM pour securiser l'acces à l'API
let app = express() //inisialiser le serveur HTTP avec Express

//Permission du serveur localhost avec le port 8080
app.use(cors({ origin: 'http://localhost:8080' }));

//Monter un serveur et etablir un route
//Route "/" en GET
app.get('/', function (req, res) {
	res.json(datas) //reponse a envoyer au serveur, ce qu'on va voir dans le rout "/". Manda el json.
	//json() me permet d'envoyer du json'
})


//mot est un parametre d'URL - Le ? a la fin veut dire que c'est pas obligatoire
app.get('/search/:mot?', function (req, res) {
	let mot = req.params.mot;//req.params => permet derecuperer les parametres en URL
	console.log(mot);

	let tab = [];
	let reg = new RegExp(mot, "i");

	tab = datas.filter((elt) => reg.test(elt.title));
	res.json(tab);
});

//Filtrar por id
app.get('/post/:number', function (req, res) {
	let number = parseInt(req.params.number);
	let answer = datas.filter((elt) => number === elt.id);
	res.json(answer);
});


//Ver solo los visible:false
app.get('/invisible', function (req, res) {
	let id = req.params.bool;
	let isVisible = datas.filter((elt) => elt.visible == false);
	res.json(isVisible);
});


//Filitra las notas de mas de 7
app.get('/star', function (req, res) {
	let tab = datas.filter((elt) => elt.note >= 7);
	res.json(tab);
});



//on ecoute le serveur sur le port 3000
app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
})