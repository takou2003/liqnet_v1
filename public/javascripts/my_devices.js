
var volume_rep = document.querySelectorAll("#v_p");
console.log(volume_rep);

function make_volume(hauteur){
	
	//
	if(hauteur < 60){
		volume_rep[1].style.backgroundColor="red";
	}else {
		volume_rep[1].style.backgroundColor="green";
	}
	var topping = 200-hauteur-2;
	volume_rep[1].style.height=`${hauteur}px`;
	volume_rep[1].style.top=`${topping}px`;
	
	
}
function view_message(id){

	window.location.href = `/messages?id_sg=${encodeURIComponent(id)}`;
}
