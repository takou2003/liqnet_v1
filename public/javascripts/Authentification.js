
var hello = 0;
url = "http://192.168.43.87:3000/Authentification";
var informations = {};

document.getElementById("check").addEventListener("click", authentification);

async function fetch_data(url, data = {}){

   try {
        const response = await fetch(url, {
            method: 'POST', // Méthode HTTP
            headers: {
                'Content-Type': 'application/json' // Indiquer que nous envoyons des données JSON
            },
            body: JSON.stringify(data) // Convertir l'objet en chaîne JSON
        });

        // Vérifier si la réponse est réussie
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json(); // Traiter la réponse JSON
       return responseData; // Retourner les données de réponse
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Propager l'erreur
    }
}

function authentification(){
	
	informations.username =document.getElementById("username").value;
	informations.password =document.getElementById("password").value;
	if( informations.username == "" || informations.password == "" ){
		document.getElementById("reponse").innerHTML =`please check all input and try again ⚠️!!!`;	
		
	}
	
	fetch_data(url,informations)
	/*.then(data =>{
			
			var sous = data[0].id_sg;
			var id_user = data[0].id_user
			window.location.href = `/view_devices?id_s=${encodeURIComponent(sous)}&id_u=${encodeURIComponent(id_user)}`;
			console.log(data.length);
		
	
	})*/
	
	.then(data => {
            // Vérifier si 'data' est vide ou inexistant
         if (!data || data.length === 0) {
         
	    document.getElementById("reponse").innerHTML = `No data found. Please check your credentials. ⚠️`;
	    return; // Sortir de la fonction si aucune donnée n'est retournée
	} 

	if (data.length !== 0) {
		console.log("Mot de passe du serveur :", data[0].password);
    		console.log("Mot de passe entré :", informations.password);
    		
	    if (data[0].password !== informations.password) {
		document.getElementById("reponse").innerHTML = `Wrong Username or Password ⚠️`;
	    } else {
		var sous = data[0].id_sg;
		var id_user = data[0].id_user;
		window.location.href = `/view_devices?id_s=${encodeURIComponent(sous)}&id_u=${encodeURIComponent(id_user)}`;
	    }
	}
            
        })
        .catch(error => {
            document.getElementById("reponse").innerHTML = `An error occurred: ${error.message} ⚠️`;
        });

}


