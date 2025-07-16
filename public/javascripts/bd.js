



/*db.run(`CREATE TABLE IF NOT EXISTS devices(
	
	id TEXT NOT NULL,
	others INTEGER NOT NULL

)`);*/
// Créer une table
/*db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS utilisateurs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
    )`);*/

    // Insérer des données
    //let stmt = db.prepare(`INSERT INTO devices (id, others) VALUES (?, ?)`);
   // stmt.run('1xed', 00);
    //stmt.run('tcheutchoua', 'tcheutchouawilfried70@gmail.com');
   // stmt.finalize();

  /*  // Lire les données
    db.each(`SELECT * FROM devices`, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        row.forEach(ro => {
        	console.log(`${ro.id}`);
        });
    });
//});
db.run('CREATE TABLE IF NOT EXISTS GROUPES( ID_GRP INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT NOT NULL)');
   	db.run('CREATE TABLE IF NOT EXISTS SOUS_GROUPES(ID_SGRP INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT NOT NULL, ID_GRP INTEGER, IP_ADD TEXT NOT NULL  FOREIGN KEY(ID_GRP) REFERENCES GROUPES(ID_GRP))');
   	db.run('CREATE TABLE IF NOT EXISTS USERS(ID_USER INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT NOT NULL, PASSWORD TEXT NOT NULL, ID_SGRP INTEGER, FOREIGN KEY(ID_SGRP) REFERENCES SOUS_GROUPES(ID_SGRP))');
   	db.run('CREATE TABLE IF NOT EXISTS DEVICES(ID_DEVICE TEXT PRIMARY KEY, NAME TEXT NOT NULL, TYPE TEXT NOT NULL, VOLUME FLOAT NOT NULL , ID_SGRP INTEGER, FOREIGN KEY(ID_SGRP) REFERENCES SOUS_GROUPES(ID_SGRP) )');
   	db.run('CREATE TABLE IF NOT EXISTS PAVE(ID_PAV TEXT PRIMARY KEY, LONG FLOAT NOT NULL, LARG FLOAT NOT NULL, HAUT FLOAT NOT NULL, ID_DEVICE TEXT, FOREIGN KEY(ID_DEVICE) REFERENCES DEVICES(ID_DEVICE))');
   	db.run('CREATE TABLE IF NOT EXISTS  CYL(ID_CYL TEXT PRIMARY KEY, RAYON FLOAT NOT NULL, HAUT FLOAT NOT NULL, ID_DEVICE TEXT, FOREIGN KEY(ID_DEVICE) REFERENCES DEVICES(ID_DEVICE))');
   	db.run('CREATE TABLE IF NOT EXISTS  CYL_C(ID_CYL_C TEXT PRIMARY KEY, RAYON FLOAT NOT NULL, HAUT FLOAT NOT NULL, ID_DEVICE TEXT, FOREIGN KEY(ID_DEVICE) REFERENCES DEVICES(ID_DEVICE))');
   	db.run('CREATE TABLE IF NOT EXISTS SPHERE(ID_SPHERE TEXT PRIMARY KEY, RAYON FLOAT NOT NULL, ID_DEVICE TEXT, FOREIGN KEY(ID_DEVICE) REFERENCES DEVICES(ID_DEVICE))');
   	
   	// Fonction pour récupérer les colonnes d'une table
const getColumns = (tableName) => {
    return new Promise((resolve, reject) => {
        db.all(`PRAGMA table_info(${tableName});`, [], (err, columns) => {
            if (err) {
                reject(err);
            } else {
                resolve(columns);
            }
        });
    });
};
   	
   	
   	
   	   try {
        const tables = await new Promise((resolve, reject) => {
            db.all("SELECT name FROM sqlite_master WHERE type = 'table';", [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        // Pour chaque table, récupérer et afficher les colonnes
        for (const table of tables) {
            const columns = await getColumns(table.name);
            console.log(`Table: ${table.name}`);
            columns.forEach((column) => {
                console.log(` - ${column.name} (${column.type})`);
            });
        }
    } catch (error) {
        console.error(error);
    }
// Fermer la base de données


db.serialize(async () => {
	   try {
        const tables = await new Promise((resolve, reject) => {
            db.all("SELECT name FROM sqlite_master WHERE type = 'table';", [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        // Pour chaque table, récupérer et afficher les colonnes
        for (const table of tables) {
            const columns = await getColumns(table.name);
            console.log(`Table: ${table.name}`);
            columns.forEach((column) => {
                console.log(` - ${column.name} (${column.type})`);
            });
        }
    } catch (error) {
        console.error(error);
    }
 
});


db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Fermé la connexion à la base de données SQLite.');
});
var table1 = ["homme", "femme", "enfant", "tcheutchoua","quelque"];
var table2 = ["quelque", "enfant", "celeste", "duanel", "femme"];
var newe = [];
var count = 0;
//for(var i=0; i<= table1.length; i++){
	for(var j=0; j<= table2.length; j++){
		if( table2[j] == "enfant"){
			count++	
		}else if (table2[j] != "enfant"){
			console.log(`the element ${table2[j]} don't exist!!!`);
		}
	}
*/
//}
//console.log(count);
//console.log(`similar is : ${newe}`);
/*
var table_objet = [];
var objet1 = {
	id : "1xed",
     value : 10.03
};
table_objet.push(objet1);
table_objet.push({id:"2xed", value: 11.04});
console.log(table_objet);

function add_objet(){

	let stm = db.prepare('INSERT INTO NEWS(ID, VALUE) VALUES(?,?)');
	for(var i=0; i<=table_objet.length; i++){
		stm.run(table_objet[i].id, table_objet[i].value);
		stm.finalize();
	}
	table_objet = [];
}

function insert(a,b){

	let req = db.prepare("INSERT INTO NEWS(ID,VALUE) VALUES(?,?)");
	req.run(a,b);
	req.finalize();
	
}
function select(){
	
	db.all("SELECT * FROM NEWS",(err,results) =>{
		if(err){
		
			console.error(err.message);
		}else{
			return results;
		}
	});
	
}
function verify(var1, table){

	let count = 0;
	for(let i = 0; i<= table.length; i++){
		if(var1 == table[i]){
		
			console.log("this element already exist!!!");
		}else{
			count++;
		}
	}
	return count;
}

let a = "hello";
let b = "willy";
let c = a+b;
console.log('ils sont'+c);

db.serialize( ()=>{

	db.run(` CREATE TABLE IF NOT EXISTS GROUPES
	(group_id INTEGER PRIMARY KEY AUTOINCREMENT, group_name TEXT NOT NULL, categorie TEXT NOT NULL, date_creation DATE)
	`);
	db.run(` CREATE TABLE IF NOT EXISTS SOUS-GROUPES
	(id_sg INTEGER PRIMARY KEY AUTOINCREMENT, code TEXT NOT NULL, name_sg TEXT NOT NULL, ip_add TEXT NOT NULL, pays TEXT NOT NULL, date_creation DATE, group_id INTEGER, FOREIGN KEY(group_id) REFERENCES GROUPES(group_id)
	 )
	`);
	db.run(` CREATE TABLE IF NOT EXISTS USERS
	(id_user INTEGER PRIMARY KEY AUTOINCREMENT, password TEXT NOT NULL, role TEXT NOT NULL, representating TEXT NOT NULL, mail TEXT NOT NULL, phone TEXT NOT NULL, group_id INTEGER, FOREIGN KEY(group_id) REFERENCES GROUPES(group_id) 
	)
	`);
	db.run(` CREATE TABLE IF NOT MESSAGES
	(id_message INTEGER PRIMARY KEY AUTOINCREMENT, status BOOLEAN NOT NULL, block TEXT NOT NULL, horaire DATETIME NOT NULL, id_sg INTEGER, FOREIGN KEY(id_sg) REFERENCES SOUS-GROUPES(id_sg) )
	`);
	db.run(` CREATE TABLE IF NOT EXISTS DEVICES
	(id_device PRIMARY KEY, name TEXT NOT NULL, volume FLOAT NOT NULL, type TEXT NOT NULL, last_update TIME NOT NULL, id_sg INTEGER, FOREIGN KEY(id_sg) REFERENCES SOUS-GROUPES(id_sg)  )
	
	`);
	db.run(` CREATE TABLE IF NOT EXISTS VARIATION
	(id_variation INTEGER PRIMARY KEY AUTOINCREMENT, volume FLOAT NOT NULL, date DATETIME NOT NULL, id_device TEXT, FOREIGN KEY(id_device) REFERENCES DEVICES(id_device) )
	
	`);
	db.run(` CREATE TABLE IF NOT EXISTS PAVE
	(id_pave INTEGER PRIMARY KEY AUTOINCREMENT, hauteur FLOAT NOT NULL, longueur FLOAT NOT NULL, largeur FLOAT NOT NULL, id_device TEXT, FOREIGN KEY(id_device) REFERENCES DEVICES(id_device) )
	`);
	db.run(` CREATE TABLE IF NOT EXISTS CYLINDRE
	(id_cylindre INTEGER PRIMARY KEY AUTOINCREMENT, rayon FLOAT NOT NULL, hauteur FLOAT NOT NULL, id_device TEXT, FOREIGN KEY(id_device) REFERENCES DEVICES(id_device) )
	
	`);
	db.run(` CREATE TABLE IF NOT EXISTS CYLINDRE-CYL
	(id_cylindre_cyl INTEGER PRIMARY KEY AUTOINCREMENT, rayon FLOAT NOT NULL, hauteur FLOAT NOT NULL, id_device TEXT, FOREIGN KEY(id_device) REFERENCES DEVICES(id_device) )
	
	`);
	db.run(` CREATE TABLE IF NOT EXISTS SPHERE
	( id_sphere INTEGER PRIMARY KEY AUTOINCREMENT, rayon FLOAT NOT NULL, id_device TEXT, FOREIGN KEY(id_device) REFERENCES DEVICES(id_device) )
	
	`);
	db.run(` CREATE TABLE IF NOT EXISTS NEW-THINGS
	(id_things TEXT PRIMARY KEY, id_sg INTEGER, FOREIGN KEY(id_sg) REFERENCES SOUS-GROUPES(id_sg) )`);
});*/

SELECT block,horaire,name_sg FROM MESSAGES JOIN SOUS_GROUPES USING (id_sg) JOIN GROUPES USING (group_id) WHERE group_id = ? GROUP BY name_sg ORDER BY horaire DESC LIMIT 1 

/*   
function show_mesage(id_group){
	
    return new Promise((resolve, reject) => {

	db.all('SELECT block,horaire,name_sg FROM MESSAGES JOIN SOUS_GROUPES USING (id_sg) JOIN GROUPES USING (group_id) WHERE group_id = ? GROUP BY name_sg',[id_group],(err,resultat) =>{
		
		if(err){
			 console.log(`${err.message}`);
                	return reject(err);
                	
		}else{
			
			resolve(resultat);
		}
	    
	});
    });
}
function sous_group(id_group) {

    return new Promise((resolve, reject) => {
    
        db.all('SELECT * FROM SOUS_GROUPES WHERE group_id=?', [id_group], (err, stat) => {
        
            if (err) {
                console.log(`${err.message}`);
                return reject(err);
            } else {
                resolve(stat);
            }
        });
    });
}
*/

db.serialize( ()=>{
	
	//db.run(`DROP TABLE SOUS_GROUPES`);
	//db.run(`DROP TABLE DEVICES`);
	//db.run(`DROP TABLE USERS`);
	//db.run(`DROP TABLE VARIATION`);
	//db.run(`DROP TABLE PAVE`);
	//db.run(`DROP TABLE CYLINDRE`);
	//db.run(`DROP TABLE CYLINDRE_CYL`);
	//db.run(`DROP TABLE SPHERE`);
	//db.run(`DROP TABLE NEW_THINGS`);

	/*db.run(` CREATE TABLE IF NOT EXISTS sg
	(id_sg INTEGER PRIMARY KEY AUTOINCREMENT, name_sg TEXT NOT NULL, ville TEXT NOT NULL, date_creation DATE, group_id INTEGER, FOREIGN KEY(group_id) REFERENCES GROUPES(group_id)
	 )
	`);
	db.run(` CREATE TABLE IF NOT EXISTS users
	(id_user INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL, mail TEXT NOT NULL, phone TEXT NOT NULL, id_sg INTEGER, FOREIGN KEY(id_sg) REFERENCES GROUPES(id_sg) 
	)
	`);
	db.run(` CREATE TABLE IF NOT EXISTS devices
	(id_device TEXT PRIMARY KEY, name TEXT NOT NULL, volume_global FLOAT NOT NULL, volume_actuel FLOAT NOT NULL, id_sg INTEGER, FOREIGN KEY(id_sg) REFERENCES sg(id_sg)  )
	
	`);
	db.run(` CREATE TABLE IF NOT EXISTS variation
	(id_variation INTEGER PRIMARY KEY AUTOINCREMENT, volume FLOAT NOT NULL, date DATETIME NOT NULL, id_device TEXT, FOREIGN KEY(id_device) REFERENCES devices(id_device) )
	
	`);
	
	let stm_sg = db.prepare('INSERT INTO sg(name_sg,ville,date_creation,group_id) VALUES(?,?,?,?)');
	let stm_usr = db.prepare('INSERT INTO users(username,password,mail,phone,id_sg) VALUES(?,?,?,?,?)');
	let stm_device = db.prepare('INSERT INTO devices(id_device,name,volume_global,volume_actuel,id_sg) VALUES(?,?,?,?,?)');
	stm_sg.run("SOA","YAOUNDE","2025-06-03", 1);
	stm_sg.run("MBOUDA ","MBOUDA","2025-05-03", 1);
	stm_usr.run("wilfried@willnergy","sidney@2004","watercontrolesp32@gmail.com","+237679132064",1);
	stm_usr.run("jospin@willnergy","jospin@2004","jjoel4@gmail.com","+237696963231",1);
	stm_usr.run("mama@willnergy","mymom@1967","mama67@gmail.com","+237670395785",2);
	stm_device.run("wn1xed","petrol1",450.25, 235, 1);
	stm_device.run("wn2xed","gasoil1",450.25, 115, 1);*/
	db.all('SELECT * FROM devices',(err,row) =>{
		console.log(row);
	});
	db.serialize(()=>{
	
	/*db.run(`CREATE TABLE IF NOT EXISTS analyses(id_analyse INTEGER PRIMARY KEY AUTOINCREMENT, bonus FLOAT NOT NULL, actualisation FLOAT NOT NULL, date DATETIME NOT NULL, id_device TEXT, FOREIGN KEY(id_device) REFERENCES devices(id_device))`);
	
	let stm_ana = db.prepare('INSERT INTO analyses(bonus,actualisation,date,id_device) VALUES(?,?,?,?)');
	stm_ana.run(200.05,435,"2025-05-22 18:30:05","wn1xed");
	stm_ana.run(-50,65,"2025-05-22 18:40:05","wn2xed");*/
	
	

});
	
	
});

router.post('/endpoint_iot', async function(req, res, next){
    try {
        const id_de = req.query.id_device;
        const new_volume = req.query.volume_actuel;
        
        const device_sg_info = await info_device_and_sg(id_de);
        const last_volume = device_sg_info[0].volume_actuel;
        
        const bonus = new_volume - last_volume;
        const rapport = new_volume / volume_global;
        const prcent = rapport * 100;
        
        const date = getCurrentDateTime();
        const user_info = await get_user_info(id_de);
        
        if (bonus > 0) {
            await stm_ana.run(bonus, new_volume, date, id_de);
            for (let i = 0; i < user_info.length; i++) {
                await send_message(user_info[i].phone, `Recharge🟢 du liquide ${device_sg_info[0].name}, dans la station ${device_sg_info[0].name_sg} de ${bonus} soit un nouveau volume de ${new_volume}`);
            }
        } else if (prcent < 20) {
            await stm_ana.run(bonus, new_volume, date, id_de);
            for (let i = 0; i < user_info.length; i++) {
                await send_message(user_info[i].phone, `Oups⚠️ revoyez le liquide ${device_sg_info[0].name}, dans la station ${device_sg_info[0].name_sg} son volume est bas de ${new_volume}`);
            }
        }

        await update_device(id_de, new_volume);
        res.status(200).send({ message: "Mise à jour réussie." });
    } catch (error) {
        next(error); // Gérer les erreurs
    }
});
