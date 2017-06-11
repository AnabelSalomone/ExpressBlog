let express = require('express') //require module Express
let datas = require('./datas.json') //va chercher le fichier. Si on met pas ./ il va chercher un module
let cors = require('cors') //module NPM pour securiser l'acces à l'API
let fs = require('fs'); //manipule des fichiers
let bodyParser = require('body-parser'); //Module: securite de vos formulaires et données envoyées

//SI no anda, chequear el orden de posteo!!!!!!!!!!!!!!!!!!!!!!!
let app = express() //inisialiser le serveur HTTP avec Express


//securisation de données en GET et POST
app.use(bodyParser.urlencoded({ extended: false })) //Données en GET encryptées
app.use(bodyParser.json()) // Données en POST encryptées


//Permission du serveur localhost avec le port 8080
app.use(cors({ origin: 'http://localhost:8080' }));

//Monter un serveur et etablir un route
//Route "/" en GET
app.get('/', function (req, res) {
	res.json(datas) //reponse a envoyer au serveur, ce qu'on va voir dans le rout "/". Manda el json.
	//json() me permet d'envoyer du json'
})


//mot est un parametre d'URL - Le ? a la fin veut dire que c'est pas obligatoire
//Les : veulent dire que ça c'est l'argument
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


//poue eliminer un item
app.get('/post/remove/:id', function (req, res) {
	let id = req.params.id // recuperer l'id passé en URL
	datas = datas.filter((elt) => elt.id != id) // On filtre le tableau selon notre ID

	// tableau JS -> JS
	let chaine = JSON.stringify(datas); // On va le "chainer"

	fs.writeFile('./datas.json', chaine, 'utf8', (err) => {

		res.json(datas) //renvoyer la reponse avec le JSON edité
	})
});

//Ver solo los visible:false
app.get('/invisible', function (req, res) {
	let id = req.params.bool;
	let isVisible = datas.filter((elt) => elt.visible == false);
	res.json(isVisible);
});


app.get('/visible', function (req, res) {
	let id = req.params.bool;
	let isVisible = datas.filter((elt) => elt.visible == true);
	res.json(isVisible);
});

//Filitra las notas de mas de 7
app.get('/star', function (req, res) {
	let tab = datas.filter((elt) => elt.note >= 7);
	res.json(tab);
});

//Envoyer un nouveau Post
app.post('/send', function (req, res) {
	let form = req.body // recuperer mes donnees envoyees en POST
	form.id = datas.length + 1;

	datas.push(form);

	let chaine = JSON.stringify(datas); // On va le "chainer"
	fs.writeFile('./datas.json', chaine, 'utf8', (err) => {

		res.json(datas) //renvoyer la reponse avec le JSON edité
	});
});


//Envoyer un nouveau Post
app.post('/edited', function (req, res) {
	let form = req.body // recuperer mes donnees envoyees en POST

	datas.push(form);

	let chaine = JSON.stringify(datas); // On va le "chainer"
	fs.writeFile('./datas.json', chaine, 'utf8', (err) => {

		res.json(datas) //renvoyer la reponse avec le JSON edité
	});
});





//on ecoute le serveur sur le port 3000
app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
})