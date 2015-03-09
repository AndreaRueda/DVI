/**
*------------------------------------------------------------------
* 							MemoryGame.Card Object
* -----------------------------------------------------------------
*/
// Represent the Card
var Card = function(sprite) {
	this.nameCard = sprite;
	// card states
	this.st_cardDown = true;
	this.st_cardOk = false;


	/**
	 * Turn the card and update its state
	 */
	this.flip = function () {
		if(!this.st_cardOk){
			if(this.st_cardDown){
				this.st_cardDown = false;
			}
			else {
				this.st_cardDown = true;
			}
		}
	};

	/**
	 * Mark the card as found
	 */
	this.found = function() {
		this.st_cardOk = true;
	};

	/**
	 * Compare two cards, return true if they're equals 
	 * @param  {Object} otherCard, card to comparated
	 */
	this.compareTo = function(otherCard) {
		return(this.nameCard === otherCard.nameCard);
	};


	/**
	 * Draw the card with its state respectly
	 * @param  {Object} gs, graphic service
	 * @param  {int} pos, position  in cards array
	 */
	this.draw = function(gs, pos) {
		if(this.st_cardDown){
			gs.draw("back", pos);	
		}
		else{
			gs.draw(this.nameCard, pos);
		}
	};
};

/**
*------------------------------------------------------------------
* 							MemoryGame Object
* -----------------------------------------------------------------
*/
var MemoryGame = function(gs){
	this.cards = new Array(); // número de cartas
	this.msg = "Memory Game";
	this.gserver = gs;

	//variables que te e sacado del metodo onclic
	this.okmatch = false;
	this.counturn = 0;
	this.auxCard = -1; //no se q valor quieres darle
	this.countWin = 0;

	/**
	 * Inicialization the game, add desorder cards and begin the game bucle
	 */
	this.initGame = function(){
		this.cards[0] = new Card("kronos");
		this.cards[1] = new Card("8-ball");
		this.cards[2] = new Card("guy"); //la carta back no tienes q ponerla
		this.cards[3] = new Card("potato");
		this.cards[4] = new Card("guy");//
		this.cards[5] = new Card("rocket");
		this.cards[6] = new Card("zeppelin");
		this.cards[7] = new Card("potato");
		this.cards[8] = new Card("kronos");
		this.cards[9] = new Card("dinosaur");
		this.cards[10] = new Card("unicorn");
		this.cards[11] = new Card("zeppelin");
		this.cards[12] = new Card("8-ball");
		this.cards[13] = new Card("dinosaur");
		this.cards[14] = new Card("unicorn");
		this.cards[15] = new Card("rocket");
		// desordeno el array de cartas
		this.cards.sort(function() {return Math.random() - 0.5});
		// llamada al bucle de juego
		this.loop();
	};

	/**
	* game bucle
	*/
	this.loop = function(){
		var that = this;
		setInterval(function(){that.draw();}, 16); // 60 fps
	};

	/**
	* Draw the game, write the current state message
	* draw each of cards on the table
	*/
	this.draw = function(){
		// draw message
		this.gserver.drawMessage(this.msg);
		// draw the game
		for (var i = 0; i < this.cards.length; i++) {
			this.cards[i].draw(this.gserver, i);
		};
	};

	/**
	* Identify the match bettwen two cards 
	*/
	this.onClick = function(cardId){ //Aqui la C era mayuscula
		// alert(':D');
		//var turnCard = this.cards[cardId];
		//var okmatch = true;
		//var counturn = 0;
		if(!this.okmatch){//semaforo en verde(true)			
			this.cards[cardId].flip();//
			this.counturn ++;


			console.log("counturn: " + this.counturn);
			if(this.counturn == 1){
				this.auxCard = this.cards[cardId];;
			}
			else if(this.counturn == 2){
				if(this.cards[cardId].compareTo(this.auxCard)){
					this.auxCard.found();
					this.cards[cardId].found();//el cambio por el turnCard
					this.msg = "Match Found!!";
					this.countWin ++;
					if(this.countWin == 8){
						this.msg = "You win!!";
					}
				}
				else{

					//aqui tienes que aplicar igual que en el loop
					var that = this;
					this.okmatch = true;
					setTimeout(function(){
						that.cards[cardId].flip();}, 900);
					setTimeout(function(){
						that.auxCard.flip();that.okmatch = false;}, 900);
					
					this.msg = "Try again";
				}

				this.counturn = 0; //deberian ir dentro
				
				//this.okmatch = true;
			}
		}
		//console.log("counturn final: " + this.counturn);
		//console.log("variable okmatch: " + this.okmatch);
	};
};