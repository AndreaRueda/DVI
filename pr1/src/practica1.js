var MemoryGame = function (gs){
	this.gs = gs;
	//array de las cartas del juego
	this.cartas= new Array();
	//mensaje del estado del juego
	this.mensaje = "MemoryGame";
	//dice el numero de parejas encontradas
	this.numParejas = 0;
	//id de la carta volteada si la hay
	this.carIdVoltea = -1;//no hay ninguna

	this.semaforo = false;
	//dice cuantas cartas volteadas tengo solo sirve para encontrar una pareja
	this.cartasVolteadas = 0;

	/**
	*Inicializa el juego añadiendo las cartas, desordenándolas y
	*comenzando el bucle de juego.
	*/
	this.initGame = function(){

		this.cartas[0]= new Card("8-ball");
		this.cartas[1]= new Card("potato");
		this.cartas[2]= new Card("dinosaur");
		this.cartas[3]= new Card("kronos");
		this.cartas[4]= new Card("rocket");
		this.cartas[5]= new Card("unicorn");
		this.cartas[6]= new Card("guy");
		this.cartas[7]= new Card("zeppelin");
		this.cartas[8]= new Card("8-ball");
		this.cartas[9]= new Card("potato");
		this.cartas[10]= new Card("dinosaur");
		this.cartas[11]= new Card("kronos");
		this.cartas[12]= new Card("rocket");
		this.cartas[13]= new Card("unicorn");
		this.cartas[14]= new Card("guy");
		this.cartas[15]= new Card("zeppelin");

		//desordeno las cartas aleatoriamente
		this.cartas = this.cartas.sort(function() {return Math.random() - 0.5});
		//arranca el bucle del juego.
		this.loop();
		
	}

	/**
	*Dibuja el juego, esto es: (1) escribe el mensaje con el estado actual
	*del juego y (2) pide a cada una de las cartas del tablero que se dibujen.
	*/
	this.draw = function(){
		this.gs.drawMessage(this.mensaje);
		for (var i = 0; i < this.cartas.length; i++){
			this.cartas[i].draw(this.gs,i);
		}
	}

	/**
	*Es el bucle del juego. En este caso es muy sencillo: llamamos al
	*método draw cada 16ms (equivalente a unos 60fps). esto se realizará con
	*la función setInterval de Javascript.
	*/
	this.loop = function(){
		var self = this;
		setInterval(function(){self.draw();},16);
	}

	/**
	*Este método se llama cada vez que el jugador pulsa
	*sobre alguna de las cartas (identificada por el número que ocupan en el
	*array de cartas del juego). Es el responsable de voltear la carta y, si hay
	*dos volteadas, comprobar si son la misma (en cuyo caso las marcará como
	*encontradas). En caso de no ser la misma las volverá a poner boca abajo.
	*/
	this.onClick = function(carId){

		if(carId === this.carIdVoltea || this.semaforo || (carId === null)){
			return ;
		}

		if(this.cartasVolteadas === 0){//no hay ninguna carta volteada.
			this.cartasVolteadas++ ;
			this.carIdVoltea = carId;
			this.cartas[this.carIdVoltea].flip();
		}
		else if (this.cartasVolteadas === 1){

			this.cartas[carId].flip();

			if (this.cartas[carId].compareTo(this.cartas[this.carIdVoltea])){
				this.mensaje ="Match found!!!";
				this.cartas[carId].found();
				this.cartas[this.carIdVoltea].found();
				this.cartasVolteadas = 0;
				this.numParejas++;
				if(this.numParejas == 8){//as ganado
					this.mensaje = "You win!!"
				}
			}
			else{
				this.mensaje ="Try again";
				var self = this;
				this.semaforo = true;
				//con la funcion setTimeout me sirve para dar ese efecto (se den la vuelta pasado 400 milisegundos)
				setTimeout(function(){self.cartas[carId].flip()},400);
				setTimeout(function(){self.cartas[self.carIdVoltea].flip(); self.semaforo = false;},400);
				this.cartasVolteadas = 0;
			}
		}

	}

}


/**
*Esta clase representa la cartas del juego. Una carta se identifica por el nombre
*del sprite que la dibuja y puede estar en tres posibles estados: boca abajo,
*boca arriba o encontrada.
*/
var Card = function(sprite){
	//nombre del sprite( carta)
	this.sprite = sprite;
	/*estado de la carta
	*0 -> boca abajo
	*1 -> boca arriba
	*2 -> encontrada
	*/
	this.estado = 0;

	/**
	*Da la vuelta a la carta, cambiando el estado de la misma.
	*/
	this.flip = function(){
		if(this.estado === 0){
			this.estado = 1;
		}
		else if(this.estado === 1){
			this.estado = 0;
		}
		else if(this.estado === 2){
			this.found();//marca una carta como encontrada
		}

	}

	/**
	*Marca una carta como encontrada, cambiando el estado de la misma.
	*/
	this.found = function(){
		this.estado = 2;
	}

	/**
	*Compara dos cartas, devolviendo true si ambas
	*representan la misma carta.
	*/
	this.compareTo = function(otherCard){
		var mismaCard = false;
		if(this.sprite === otherCard.sprite){
			mismaCard = true;
		}
		return mismaCard;
	}

	/**
	*Dibuja la carta de acuerdo al estado en el que se encuentra.
	*Recibe como parámetros el servidor gráfico y la posición en la que se
	*encuentra en el array de cartas del juego (necesario para dibujar una
	*carta).
	*/
	this.draw = function(gs,pos){
		if(this.estado === 0){
			//se dibuja la carta especial( back) que indica q la carta esta boca abajo
			gs.draw("back",pos);
		}
		if( (this.estado === 1) ){
			gs.draw(this.sprite, pos);
		}
		if(this.estado === 2){
			gs.draw(this.sprite, pos);
		}
	}
}