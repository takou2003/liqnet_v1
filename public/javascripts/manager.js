function view_sg(group_id){
	document.getElementById("sous").innerHTML =``;
	var add_option = document.createElement("div");
	add_option.setAttribute('class','add_space');
	add_option.innerHTML = `<p>+</p>`;
	document.getElementById("sous").appendChild(add_option);
	add_option.onclick = () =>{
		create_sg(group_id);		
	};
	
	fetch(`http://localhost:3000/show_sg?Mid=${group_id}`)
	.then( response => response.json())
	.then(datas => 
		datas.forEach( data =>{
		
			var sg = document.createElement("div");
			var sup = document.createElement("div");
			sg.setAttribute('class', 'view');
			sup.setAttribute('class', 'sm');
			sup.setAttribute('id', 'sm1');
			sg.innerHTML=`<p> ${data.name_sg} - ${data.ville} - ${data.date_creation} </p>`;
			document.getElementById("sous").appendChild(sg);
			document.getElementById("sous").appendChild(sup);
			sg.onclick = () => view_sg_info(data.id_sg);
		})
	)
	.catch(error => console.error('Error fetching data:', error));
}
function view_sg_info(sg_id){

	document.getElementById("device").innerHTML =``;
	var add_option1 = document.createElement("div");
	add_option1.setAttribute('class','add_space');
	add_option1.innerHTML = `<p>+</p>`;
	document.getElementById("device").appendChild(add_option1);
	add_option1.onclick = () =>{
	
		create_device(sg_id);
	};
	
	document.getElementById("user").innerHTML =``;
	var add_option2 = document.createElement("div");
	add_option2.setAttribute('class','add_space');
	add_option2.innerHTML = `<p>+</p>`;
	document.getElementById("user").appendChild(add_option2);
	add_option2.onclick = () =>{
	
		create_users(sg_id);
	};
	
	
	fetch(`http://localhost:3000/show_devices?Mde=${sg_id}`)
	.then(response => response.json())
	.then(datas => 
		datas.forEach( data =>{
			var sup = document.createElement("div");
			sup.setAttribute('class', 'sm');
			sup.setAttribute('id', 'sm1');
			var sg = document.createElement("div");
			sg.setAttribute('class', 'view');
			sg.innerHTML=`<p> ${data.id_device} - ${data.name} - ${data.volume_global} - ${data.volume_actuel} </p>`;
			document.getElementById("device").appendChild(sg);
			document.getElementById("device").appendChild(sup);
		})
	
	)
	.catch(error => console.error('Error fetching data:', error));
	
	fetch(`http://localhost:3000/show_users?Mde=${sg_id}`)
	.then(response => response.json())
	.then(datas => 
	
		datas.forEach( data =>{
			var sup = document.createElement("div");
			sup.setAttribute('class', 'sm');
			sup.setAttribute('id', 'sm1');
			var sg = document.createElement("div");
			sg.setAttribute('class', 'view');
			sg.innerHTML=`<p> ${data.username} - ${data.password} </p>`;
			document.getElementById("user").appendChild(sg);
			document.getElementById("user").appendChild(sup);
		})
	)
	.catch(error => console.error('Error fetching data:', error));
}

var add_group = document.createElement("div");
var add_sg = document.createElement("div");
var add_dev = document.createElement("div");
var add_user = document.createElement("div");
function create_group(){

	
	add_group.setAttribute('class','groups');
	add_group.innerHTML = `
	
		<input type="text" placeholder="Enter group-name" id="nx">
		<div>
			<button class="green" id="adding">Add</button>
			<button class="red" onclick="close_grp()">Cancel</button>
		</div>
		
	`;
	
	document.body.appendChild(add_group);
	adding.onclick = () => {
	
		var name =document.getElementById("nx").value;
		fetch_new_grp(name);
	};
	
}
function close_grp(){
	document.body.removeChild(add_group);
}
function fetch_new_grp(groupname){
	
	
	// Données à envoyer (format JSON)
	const data = { 
	  name: groupname 
	};

	// Requête POST avec fetch
	fetch("http://localhost:3000/add_group", {
	  method: "POST",
	  headers: {
	    "Content-Type": "application/json", // Spécifie le format JSON
	    'Accept': 'text/plain' // Demande une réponse texte
	  },
	  body: JSON.stringify(data) // Convertit l'objet en chaîne JSON
	})
	  .then(response => response.text()) // Transforme la réponse en text
	  .then(result => console.log("Succès :", result))
	  .catch(error => console.error("Erreur :", error));
}
function create_sg(group_id){

	add_sg.setAttribute('class','sg');
	add_sg.innerHTML = `
	
		<input type="text" placeholder="Enter name" id="name">
		<input type="text" placeholder="Enter town" id="town">
		<div>
			<button class="green" id="add_seg">Add</button>
			<button class="red" onclick="close_sg()">Cancel</button>
		</div>
		
	`;
	
	document.body.appendChild(add_sg);
	add_seg.onclick = () => {
	
		var name =document.getElementById("name").value;
		var town =document.getElementById("town").value;
		var json_element={
		
			nom_sg:name,
			nom_ville:town,
			id_group:group_id
		};
		
		fetch_new_sg(json_element);
		//console.log(json_element);
		
	};
}
function close_sg(){
	document.body.removeChild(add_sg);
}

function fetch_new_sg(json_element){

	// Requête POST avec fetch
	fetch("http://localhost:3000/add_sg", {
	  method: "POST",
	  headers: {
	    "Content-Type": "application/json", // Spécifie le format JSON
	    'Accept': 'text/plain' // Demande une réponse texte
	  },
	  body: JSON.stringify(json_element) // Convertit l'objet en chaîne JSON
	})
	  .then(response => response.text()) // Transforme la réponse en text
	  .then(result => console.log("Succès :", result))
	  .catch(error => console.error("Erreur :", error));
}
function create_device(sg_id){

	add_dev.setAttribute('class','sg');
	add_dev.setAttribute('id','dev');
	add_dev.innerHTML = `
	
		<input type="text" placeholder="Enter name" id="name">
		<input type="text" placeholder="Enter id" id="id_dev">
		<input type="text" placeholder="Enter global volume" id="volume">
		<div>
			<button class="green" id="valid">Add</button>
			<button class="red" onclick="close_device()">Cancel</button>
		</div>
		
	`;
	
	document.body.appendChild(add_dev);
	valid.onclick = () => {
	
		var name   = document.getElementById("name").value;
		var id_dev = document.getElementById("id_dev").value;
		var volume = document.getElementById("volume").value;
		var json_element={
		
			nom_device:name,
			volume_gl:volume,
			id_sg:sg_id,
			id_device:id_dev
		};
		
		fetch_new_device(json_element);
		//console.log(json_element);
		
	};
}
function close_device(){
	document.body.removeChild(add_dev);
}

function fetch_new_device(json_element){

	// Requête POST avec fetch
	fetch("http://localhost:3000/add_device", {
	  method: "POST",
	  headers: {
	    "Content-Type": "application/json", // Spécifie le format JSON
	    'Accept': 'text/plain' // Demande une réponse texte
	  },
	  body: JSON.stringify(json_element) // Convertit l'objet en chaîne JSON
	})
	  .then(response => response.text()) // Transforme la réponse en text
	  .then(result => console.log("Succès :", result))
	  .catch(error => console.error("Erreur :", error));
}
function create_users(sg_id){

	add_user.setAttribute('class','sg');
	add_user.setAttribute('id','usr');
	add_user.innerHTML = `
	
		<input type="text" placeholder="Enter name" id="username">
		<input type="password" placeholder="Enter password" id="password">
		<input type="text" placeholder="Enter mail" id="mail">
		<input type="text" placeholder="Enter phone" id="phone">
		
		<div>
			<button class="green" id="valid2">Add</button>
			<button class="red" onclick="close_user()">Cancel</button>
		</div>
		
	`;
	
	document.body.appendChild(add_user);
	valid2.onclick = () => {
	
		var username   = document.getElementById("username").value;
		var password = document.getElementById("password").value;
		var mail = document.getElementById("mail").value;
		var phone = document.getElementById("phone").value;
		
		var json_element={
		
			username:username,
			password:password,
			mail:mail,
			phone:phone,
			id_sg:sg_id
		};
		
		fetch_new_user(json_element);
		//console.log(json_element);
		
	};
}
function close_user(){
	document.body.removeChild(add_user);
}

function fetch_new_user(json_element){

	// Requête POST avec fetch
	fetch("http://localhost:3000/add_user", {
	  method: "POST",
	  headers: {
	    "Content-Type": "application/json", // Spécifie le format JSON
	    'Accept': 'text/plain' // Demande une réponse texte
	  },
	  body: JSON.stringify(json_element) // Convertit l'objet en chaîne JSON
	})
	  .then(response => response.text()) // Transforme la réponse en text
	  .then(result => console.log("Succès :", result))
	  .catch(error => console.error("Erreur :", error));
}

function togglePasswordVisibility() {
            const passwordInput = document.getElementById('password');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
}
function deletex(id){

	fetch(`http://localhost:3000/dlt-grp?id=${id}`)
	.then(response => response.text())
	.then(result => console.log("Succès :", result))
	.catch(error => console.error("Erreur :", error));
}
