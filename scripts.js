const rueda = document.getElementById('rueda');
const start = document.getElementById('start');
const inputs = document.querySelectorAll('.inputs');

let fps = 50;

let aceleracionTiempo;
let velocidadConstante;
let aceleracion;
let velocidadVariable = aceleracion;
let friccion;

let iniciarAceleracion;
let iniciarVelocidadConstante;
let desaceleracion;

let power = 0;

let angulo = 0;

let mostrarInfo;
let segundos = 1;

rueda.addEventListener("click", switchOnOff);
start.addEventListener("click", switchOnOff);

function switchOnOff(){
	if(power == 0){

		inputs.forEach(input=>{
			input.setAttribute("disabled", "");
			input.style.opacity = ".1";
		})

		aceleracionTiempo = document.getElementById("aceleracion").value;
		velocidadConstante = document.getElementById("velocidad").value;
		friccion = document.getElementById("friccion").value;

		aceleracion = velocidadConstante / aceleracionTiempo;
		velocidadVariable = aceleracion;
		iniciarAceleracion = setInterval(acelerar, fps);

		mostrarInfo = setInterval(info, 1000);
		
		power = 1;

		start.innerHTML = "Frenar";
		start.classList.replace("acelerar", "detener");
	}
	else if(power == 2){
		clearInterval(iniciarVelocidadConstante);
		desaceleracion = setInterval(desacelerar, fps);
		power = 3;
	}
}

function acelerar(){
	angulo += ((velocidadVariable * fps) / 1000);
	velocidadVariable += ((aceleracion * fps) / 1000);
	if(velocidadVariable >= velocidadConstante){
		clearInterval(iniciarAceleracion);
		velocidadVariable = velocidadConstante
		iniciarVelocidadConstante = setInterval(mantenerVelocidad, 50);
		power = 2;
	}
	rueda.style.transform = `rotate(${angulo}deg)`;
}

function mantenerVelocidad(){
	angulo += ((velocidadConstante * fps) / 1000);
	if(angulo >= 360){
		angulo = angulo - 360
	}
	rueda.style.transform = `rotate(${angulo}deg)`;
}

function desacelerar(){
	if(velocidadVariable < (velocidadConstante * 1) / 100){
		clearInterval(desaceleracion);
		clearInterval(mostrarInfo);
		power = 0;
		segundos = 1;
		start.innerHTML = "Acelerar";
		start.classList.replace("detener", "acelerar");
		inputs.forEach(input=>{
			input.removeAttribute("disabled");
			input.style.removeProperty("opacity");
		})
	}
	else{
		velocidadVariable = velocidadVariable / friccion;
		angulo += ((velocidadVariable * fps) / 1000);
		rueda.style.transform = `rotate(${angulo}deg)`;
	}
}

function info(){
	segundos++
	console.log(`PASARON ${segundos} SEGUNDOS, LA VELOCIDAD ES DE ${velocidadVariable} GRADOS POR SEGUNDO, Y SE RECORRIÓ ${angulo} grados.`);
}