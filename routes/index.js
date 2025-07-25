var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
// Créer ou ouvrir une base de données

let db = new sqlite3.Database('./ma_base_de_donnees.db', (err) => {

    if (err) {
        console.error(err.message);
    }
    console.log('Connecté à la base de données SQLite.');
});
/*
db.serialize( () =>{
	db.run("DELETE FROM GROUPES WHERE group_id = ?",[2]);
	db.run("DELETE FROM GROUPES WHERE group_id = ?",[3]);
	db.all("SELECT * FROM GROUPES",(err,row) =>{
		
		if(err){
			console.error(err.message);
		}else{
			console.log(row);
		}
	});
});
*/
async function get_user_info(id_device){

	return new Promise((resolve, reject) => {
		db.all('SELECT phone FROM users JOIN sg USING(id_sg) JOIN devices USING(id_sg) WHERE id_device = ?',[id_device],(err,row1)=>{
				if(err){
					console.log(`${err.message}`);
		        		return reject(err);
				}else{
					resolve(row1);
					
				}
			
			});
	});
}
async function check(idd){

	return new Promise((resolve, reject) =>{
	
		db.all('SELECT * FROM devices WHERE id_device =?',[idd],(err,results)=>{
			if(err){
				console.log(`${err.message}`);
				return reject(err);
			}else{
				resolve(results);
			}
		});
	
	});
}

async function insert_device( id_device1, name1, volume_global1, volume_actuel1, id_sg1 ){
	
	return new Promise((resolve,reject) =>{
	
		const sql = 'INSERT INTO devices(id_device,name,volume_global,volume_actuel,id_sg) VALUES(?,?,?,?,?)';
		db.run(sql, [id_device1, name1, volume_global1, volume_actuel1, id_sg1], function(err){
			
			if(err){
			
				console.log(`${err.message}`);
				return reject(err);
			}else{
				resolve(this.lastID);
			}	
						
		});
	});

}

async function update_device( id_device1, volume_actuel1){
	
	return new Promise((resolve,reject) =>{
		var statut = 1 ;
		var statutError = 0;
		const sql_update = 'UPDATE devices SET volume_actuel = ? WHERE id_device = ?';
		db.run(sql_update, [volume_actuel1, id_device1], function(err){
			
			if(err){
			
				console.log(`${err.message}`);
				//return reject(err);
				resolve(statutError);
			}else{
				resolve(statut);
			}	
						
		});
	});

}

async function device_information(id_device1){
	
	return new Promise((resolve,reject) =>{
	
		db.all('SELECT * FROM devices JOIN sg USING(id_sg) WHERE id_device = ?',[id_device1], (err,result) =>{
			
			if(err){
				console.log(`${err.message}`);
				return reject(err);
			}else{
				resolve(result);
			}
		
		});
			
	});

}

async function test_async(){
	
	var xe = await get_user_info("wn1xed");
	var xed = await get_user_info2("wn1xed");
	//const make_insert = await insert_device("bc1xed","super1",450.25,200,2);
	const make_update = await update_device("bc1xed",40);
	var xed = await get_user_info2();
	var get_tim = getCurrentDateTime();
	//console.log(xe);
	//console.log(xed);
	console.log(get_tim);
}

var timer = getCurrentDateTime();
console.log(timer);


function  sous_group(id_user) {

    return new Promise((resolve, reject) => {
    
        db.all('SELECT name_sg,group_id,username FROM sg JOIN users USING(id_sg) WHERE id_user=?', [id_user], (err, stat) => {
        
            if (err) {
                console.log(`${err.message}`);
                return reject(err);
            } else {
                resolve(stat);
            }
        });
    });
}
function get_users(id_sg){

	return new Promise((resolve,reject) =>{
	
		db.all('SELECT * users WHERE id_sg=?',[id_sg],(err,result) =>{
	    if (err) {
                console.log(`${err.message}`);
                return reject(err);
            } else {
                resolve(result);
            }
		});
	});
}
function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Mois de 01 à 12
    const day = String(now.getDate()).padStart(2, '0'); // Jour de 01 à 31
    const hours = String(now.getHours()).padStart(2, '0'); // Heures de 00 à 23
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Minutes de 00 à 59
    const seconds = String(now.getSeconds()).padStart(2, '0'); // Secondes de 00 à 59
    const string_time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

    //return `"${year}-${month}-${day} ${hours}:${minutes}:${seconds}"`;
    return string_time;
}

function getdate(){
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0'); // Mois de 01 à 12
	const day = String(now.getDate()).padStart(2, '0'); // Jour de 01 à 31
	const string_date = `${year}-${month}-${day}`;
	
	return string_date;
}

async function update(idd, volume){
	
		let stm_ana = db.prepare('INSERT INTO analyses(bonus,actualisation,date,id_device) VALUES(?,?,?,?)');
		let info = await check(idd);
		var rapport = (volume/info[0].volume_global)*100;
		var difference = volume - info[0].volume_actuel;
		let time = getCurrentDateTime();
		if(rapport < 15 || difference > 0){
		
			stm_ana.run(difference, volume, time, idd);
		}
		statut2 = await update_device(idd,volume);
		console.log(rapport);
		return statut2;
			
}
router.get('/', function(req, res, next) {
	res.render('acceuil');
});
router.get('/login', function(req, res, next) {
	res.render('Authentification');
});
router.get('/view_devices', function(req, res, next) {
	
	var id = req.query.id_s;
	var id_user = req.query.id_u;
	db.all(`SELECT * FROM devices WHERE id_sg=?`,[id], async (err,row) =>{
		
		//res.render('my_devices',{ device:row, key:id});	
			
		 try {
			const sg = await sous_group(id_user); // Attendre que la promesse soit résolue
			res.render('my_devices', { device:row, info: sg }); // Passer sg au template
		 } catch (error) {
			console.log(error);
			res.status(500).send('Erreur lors de la récupération des sous-groupes');
		 }
	 
	});
	
	
});

router.get('/view_analyses', function(req, res, next) {
	var id_d = req.query.id_di;
	db.all('SELECT volume_global, bonus, actualisation,id_device, DATE(date) AS dax, TIME(date) AS tix FROM analyses JOIN devices USING(id_device) WHERE id_device=?',[id_d],(err,row) =>{
		res.json(row);
	});
});
router.get('/print', function(req, res, next) {
	
	var id_d = req.query.id_di;
	var g_id = req.query.log;
	db.all('SELECT bonus, actualisation,id_device, DATE(date) AS dax, TIME(date) AS tix FROM analyses WHERE id_device=?',[id_d], async (err,row) =>{
		try{
			var result2 = await device_information(id_d);
			//console.log(result2);
			res.render('actuality',{device_inf:result2, variation:row, log_id:g_id});
		}catch{
			console.log(error);
			res.status(500).send('Erreur lors de la récupération de certaines infos');
		}
		
	});
	
});

router.get('/phone_number',function (req,res,next){

	var id_sg = req.query.isg;
	db.all('SELECT phone FROM users WHERE id_sg=?',[id_sg],(err,row) =>{
		res.json(row);
	});
});

var result = [];
router.post('/Authentification', function(req,res,next){

	var info = req.body;
	db.all('SELECT * FROM users WHERE username=?',[info.username],(err,row) =>{
			result = row
			res.json(result);			
	});
});
router.post('/endpoint_iot', function(req,res,next){
	
	var id_device = req.body.ddi;
	var volume = req.body.volume;
	
	try{
		var etat = update(id_device, volume);	
		if(etat == 1){
			res.send("update ok");
		}else{
			res.send("update error");	
		}	
		
		
	}catch{
		console.log(error);
		res.status(500).send('Erreur lors de la récupération de certaines infos');
	}
});
router.post('/second_iot', function(req,res,next){

	var diff = req.query.bonus;
	var volume = req.query.actuel;
	var time = req.query.time;
	var id = req.query.id_device;
	let stm_ana = db.prepare('INSERT INTO analyses(bonus,actualisation,date,id_device) VALUES(?,?,?,?)');
	
	let result = stm_ana.run(diff, volume, time, id);
	
	
});
router.post('/add_group', async function(req, res, next) {
    try {
        // Validation des données entrantes
       if (!req.body.name) {
            return res.status(400).type('text/plain').send("Erreur: Le nom du groupe est requis");
        }

        const groupname = req.body.name;
        const time = getdate(); // Format ISO pour la date

        // Préparation et exécution de la requête SQL
        let stm_grp = db.prepare('INSERT INTO GROUPES(group_name, categorie, date_creation) VALUES(?, ?, ?)');
        
        // Utilisation de la version avec callback car sqlite3 n'utilise pas les Promises par défaut
        stm_grp.run(groupname, "petrolier", time, function(err) {
            if (err) {
                console.error("Erreur SQL:", err);
                return res.status(500).type('text/plain').send("Erreur: Échec de la création du groupe");
            }
            
            // Succès
            res.status(201).type('text/plain').send("Succès: Groupe créé avec succès");
        });

    } catch (error) {
        console.error("Erreur inattendue:", error);
        res.status(500).type('text/plain').send("Erreur: Problème interne du serveur");
    }
});

router.post('/add_sg', async function(req, res, next) {
    try {
        // Validation des données entrantes
       if (!req.body.nom_sg) {
            return res.status(400).type('text/plain').send("Erreur: Le nom du s-groupe est requis");
        }else{
        	const name = req.body.nom_sg;
        	const town = req.body.nom_ville;
        	const id   = req.body.id_group;
        	
		const time = getdate(); // Format ISO pour la date

		// Préparation et exécution de la requête SQL
		let stm_sg = db.prepare('INSERT INTO sg(name_sg, ville, date_creation, group_id) VALUES(?, ?, ?, ?)');
		
		// Utilisation de la version avec callback car sqlite3 n'utilise pas les Promises par défaut
		stm_sg.run(name,town, time, id, function(err) {
		    if (err) {
		        console.error("Erreur SQL:", err);
		        return res.status(500).type('text/plain').send("Erreur: Échec de la création du sous_grp");
		    }
		    
		    // Succès
		    res.status(201).type('text/plain').send("Succès: sous-G créé avec succès");
		});
        }

    } catch (error) {
        console.error("Erreur inattendue:", error);
        res.status(500).type('text/plain').send("Erreur: Problème interne du serveur");
    }
});
router.post('/add_device', async function(req, res, next) {
    try {
        // Validation des données entrantes
       if (!req.body.nom_device) {
            return res.status(400).type('text/plain').send("Erreur: Le nom du s-groupe est requis");
        }else{
        	const name = req.body.nom_device;
        	const volume_global = req.body.volume_gl;
        	const id   = req.body.id_sg;
        	const id_dev   = req.body.id_device;
        	
		const time = getdate(); // Format ISO pour la date

		// Préparation et exécution de la requête SQL
		let stm_dev = db.prepare('INSERT INTO devices(id_device, name, volume_global, volume_actuel, id_sg) VALUES(?, ?, ?, ?, ?)');
		
		// Utilisation de la version avec callback car sqlite3 n'utilise pas les Promises par défaut
		stm_dev.run(id_dev,name, volume_global, 0.0, id,  function(err) {
		    if (err) {
		        console.error("Erreur SQL:", err);
		        return res.status(500).type('text/plain').send("Erreur: Échec de la création du sous_grp");
		    }
		    
		    // Succès
		    res.status(201).type('text/plain').send("Succès: sous-G créé avec succès");
		});
        }

    } catch (error) {
        console.error("Erreur inattendue:", error);
        res.status(500).type('text/plain').send("Erreur: Problème interne du serveur");
    }
});

router.post('/add_user', async function(req, res, next) {
    try {
        // Validation des données entrantes
       if (!req.body.username) {
            return res.status(400).type('text/plain').send("Erreur: Le nom du s-groupe est requis");
        }else{
        	const username = req.body.username;
        	const password = req.body.password;
        	const mail  = req.body.mail;
        	const phone   = req.body.phone;
        	const id_sg   = req.body.id_sg ;
        	
		const time = getdate(); // Format ISO pour la date

		// Préparation et exécution de la requête SQL
		let stm_user = db.prepare('INSERT INTO users(username,password, mail, phone, id_sg) VALUES(?, ?, ?, ?, ?)');
		
		// Utilisation de la version avec callback car sqlite3 n'utilise pas les Promises par défaut
		stm_user.run(username, password, mail, phone,id_sg,  function(err) {
		    if (err) {
		        console.error("Erreur SQL:", err);
		        return res.status(500).type('text/plain').send("Erreur: Échec de la création du sous_grp");
		    }
		    
		    // Succès
		    res.status(201).type('text/plain').send("Succès: sous-G créé avec succès");
		});
        }

    } catch (error) {
        console.error("Erreur inattendue:", error);
        res.status(500).type('text/plain').send("Erreur: Problème interne du serveur");
    }
});

router.get('/show_sg', function(req,res,next){

	var group_id = req.query.Mid;
	db.all('SELECT * FROM sg WHERE group_id=?',[group_id],(err,row) =>{
		res.json(row);
	});

});
router.get('/show_devices',function(req,res,next){

	var id_sg = req.query.Mde;
	db.all('SELECT * FROM devices WHERE id_sg=?',[id_sg],(err,row) =>{
		res.json(row);
	});
});
router.get('/show_users',function(req,res,next){

	var id_sg = req.query.Mde;
	db.all('SELECT * FROM users WHERE id_sg=?',[id_sg],(err,row) =>{
		res.json(row);
	});
});
router.get('/manager', function(req,res,next){

	db.all('SELECT * FROM GROUPES',(err,result) =>{
		if(err){
			console.error(err);
		}else{
			res.render('management',{groups:result});	
		}
	});
	
});
router.get('/dlt-grp', function(req,res,next){
	var id = req.query.id;
	db.run('DELETE FROM GROUPES WHERE group_id=?',[id],(err) =>{
		if(err){
			console.error(`${err.message}`);
			return res.status(500).type('text/plain').send("Erreur lors de la suppression du groupe");
		}else{
			res.status(201).type('text/plain').send("suppression ok !!!");	
		}
	});
});
router.get('/dlt-sgr', function(req,res,next){
	var id = req.query.id;
	db.run('DELETE FROM sg WHERE id_sg=?',[id],(err) =>{
		if(err){
			console.error(`${err.message}`);
			return res.status(500).type('text/plain').send("Erreur lors de la suppression du sous-groupe");
		}else{
			res.status(201).type('text/plain').send("suppression ok !!!");	
		}
	});
});
router.get('/dlt-dev', function(req,res,next){
	var id = req.query.id;
	db.run('DELETE FROM devices WHERE id_device=?',[id],(err) =>{
		if(err){
			console.error(`${err.message}`);
			return res.status(500).type('text/plain').send("Erreur lors de la suppression de la peripherique");
		}else{
			res.status(201).type('text/plain').send("suppression ok !!!");	
		}
	});
});
router.get('/dlt-usr', function(req,res,next){
	var id = req.query.id;
	db.run('DELETE FROM users WHERE id_user=?',[id],(err) =>{
		if(err){
			console.error(`${err.message}`);
			return res.status(500).type('text/plain').send("Erreur lors de la suppression du user");
		}else{
			res.status(201).type('text/plain').send("suppression ok !!!");	
		}
	});
});

/*
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'dbuser',
  password: 's3kreee7',
  database: 'my_db'
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})

connection.end()

*/
  
module.exports = router;
