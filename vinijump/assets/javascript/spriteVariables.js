function movableObject (){
	this.monkeyObject     =  new Array();
	this.halloweenObject  =  new Array();
	this.coinObject       =  new Array();
	this.objects          =  new Array();

	this.init();
	this.makeObjectArray();
};


movableObject.prototype.makeObjectArray = function(){
	this.objects.push(this.monkeyObject);
	this.objects.push(this.halloweenObject);
	this.objects.push(this.coinObject);
}


movableObject.prototype.init = function(){
	 var ySpeed = speedVariables.globalSpeedY;
	 
	for (var ctr = 0; ctr <= commonConfiguration.monkeyHalfCount; ctr++){
		if (0 == ctr%2)
			this.monkeyObject.push(new Monkey(commonConfiguration.rampWidth*commonConfiguration.Xresolution, commonConfiguration.YUpperLimit, "/game/monk.png", false, 4, 0, true , {x : 0 ,y : ySpeed}));
		else
			this.monkeyObject.push(new Monkey((commonConfiguration.ClientWidth - commonConfiguration.rampWidth - 76)*commonConfiguration.Xresolution, commonConfiguration.YUpperLimit, "/game/monk2.png", false, 4, 0, true , {x : 0 ,y : ySpeed}));
	}
	
	for (var ctr = 0; ctr <= commonConfiguration.halloweenHalfCount; ctr++){
		if (0 == ctr%2)
			this.halloweenObject.push(new Halloween(commonConfiguration.rampWidth*commonConfiguration.Xresolution, commonConfiguration.YUpperLimit, "/game/hell2.png", false, 2, 0, true , {x : 0 ,y : ySpeed}));
		else
			this.halloweenObject.push(new Halloween((commonConfiguration.ClientWidth - commonConfiguration.rampWidth - 55)*commonConfiguration.Xresolution, commonConfiguration.YUpperLimit, "/game/hell.png", false, 2, 0, true , {x : 0 ,y : ySpeed}));
	}
	
	
	for (var ctr = 0; ctr < commonConfiguration.CoinFullCount; ctr++){
		if ( ctr < commonConfiguration.CoinFullCount/2)
			this.coinObject.push(new Coin((commonConfiguration.ClientWidth - commonConfiguration.rampWidth - 40)*commonConfiguration.Xresolution, commonConfiguration.YUpperLimit, "/game/coin_Anim.png", false, 8, 8, true , {x : 0 ,y :ySpeed }));
		else
			this.coinObject.push(new Coin(commonConfiguration.rampWidth*commonConfiguration.Xresolution, commonConfiguration.YUpperLimit, "/game/coin_Anim.png", false, 8, 8, true , {x : 0 ,y :ySpeed }));
	}	
}

movable = new movableObject();


function SpriteVariables() {
	//Sprite(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated) generic code :D :D
	this.background   =  new Sprite(0, 0, "/game/gameBG.jpg", true, 1, 0, false);
	this.leftRamp1    =  new Ramp(0, -commonConfiguration.ClientHeight*commonConfiguration.Yresolution, "/game/ramp_l.png", true, 1, 0, false , {x : 0 ,y : speedVariables.globalSpeedY});
	this.leftRamp2    =  new Ramp(0, 0, "/game/ramp_l.png", true, 1, 0, false, {x : 0 ,y : speedVariables.globalSpeedY});
	this.rightRamp1   =  new Ramp((commonConfiguration.ClientWidth - commonConfiguration.rampWidth)*commonConfiguration.Xresolution, -commonConfiguration.ClientHeight*commonConfiguration.Yresolution , "/game/ramp_r.png", true, 1, 0, false , {x : 0 ,y : speedVariables.globalSpeedY});
	this.rightRamp2   =  new Ramp((commonConfiguration.ClientWidth - commonConfiguration.rampWidth)*commonConfiguration.Xresolution, 0, "/game/ramp_r.png", true, 1, 0, false , {x : 0 ,y : speedVariables.globalSpeedY});
	this.hero         =  new Hero((commonConfiguration.ClientWidth - commonConfiguration.rampWidth - this.Height)*commonConfiguration.Xresolution, 300*commonConfiguration.Yresolution, "/game/bhero.png", true, 32, 0, true , {x : 10000 ,y : 0});
	this.backButton   =  new Sprite((commonConfiguration.ClientWidth - 20)*commonConfiguration.Xresolution, (commonConfiguration.ClientHeight - 80)*commonConfiguration.Yresolution, "/game/pause.png", true, 1, 0, false);
	this.movable      =  movable.objects;
	//this.p1           =  
	this.p3           =  new SnowParticleSystem({x:commonConfiguration.ClientWidth*commonConfiguration.Yresolution, y:commonConfiguration.ClientHeight*commonConfiguration.Yresolution}, 50, {red:244, green:240, blue:145});
	this.rocket       =  new Rocket((commonConfiguration.ClientWidth - 27)*commonConfiguration.Xresolution/2, commonConfiguration.YUpperLimit*commonConfiguration.Yresolution, "/game/rocket.png", false, 1, 0, false , {x : 0 ,y : speedVariables.globalSpeedY});
	this.sheild       =  new Sheild((commonConfiguration.ClientWidth - commonConfiguration.rampWidth - 27)*commonConfiguration.Xresolution, (commonConfiguration.YUpperLimit - this.Height)*commonConfiguration.Yresolution, "/game/sheild_icon.png", false, 1, 0, false , {x : 0 ,y : speedVariables.globalSpeedY});
	this.rocketHero   =  new RocketHero((commonConfiguration.ClientWidth - 72)*commonConfiguration.Xresolution/2, this.hero.y*commonConfiguration.Yresolution , "/game/hero_R.png",false, 2, 0, true,  {x : 5, y : 0});
	this.heroSheild   =  new HeroSheild(this.hero.x , this.hero.y, "/game/sheild.png", false, 1, 0, false); 
	// it is not sprite but will have the update function so can be called by the generic framework
	this.scoreBoard   = new ScoreBoard();		
};

SpriteVariables.prototype.SetPosition = function(){
	this.hero = null;
	this.hero = new Hero((commonConfiguration.ClientWidth - commonConfiguration.rampWidth - 40)*commonConfiguration.Xresolution, 500*commonConfiguration.Yresolution, "/game/bhero.png", true, 32, 0, true , {x : 8 ,y : 0});

	for (var ctr = 0; ctr <= commonConfiguration.monkeyHalfCount; ctr++){
		this.movable[0][ctr].y = commonConfiguration.YUpperLimit*commonConfiguration.Yresolution;
		this.movable[0][ctr].isVisible = false;

		this.movable[1][ctr].y = commonConfiguration.YUpperLimit*commonConfiguration.Yresolution;
		this.movable[1][ctr].isVisible = false;
	}

	for (var ctr = 0; ctr < commonConfiguration.CoinFullCount; ctr++){
		this.movable[2][ctr].y = commonConfiguration.YUpperLimit*commonConfiguration.Yresolution;
		this.movable[2][ctr].isVisible = false;
	}

	this.leftRamp2.y = 0;
	this.leftRamp1.y = -commonConfiguration.ClientHeight*commonConfiguration.Yresolution;
	this.rightRamp2.y = 0;
	this.rightRamp1.y = -commonConfiguration.ClientHeight*commonConfiguration.Yresolution;
}

var spriteVariables = new SpriteVariables();
