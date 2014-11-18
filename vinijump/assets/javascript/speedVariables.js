function SpeedVariables() {
	this.numberOfFrame   = 0;
	this.speedController = 1;
	this.objectFrequency = 15;
	this.startRandomIndex= 100;
	this.monkeyProb      = 30;
	this.halloweenProb   = 30;
	this.coinProb        = 10;
	this.void_obj        = 15;
	this.powerProb       = 15;
	this.coinCount       = 5;
	this.coinInProgess   = false;
	this.coinIndex       = 0;
	this.globalSpeedY    = 20; 
	this.fps             = 1000/40;
	this.heroDied        = false;
	this.rocketPowerCtr  = 500;
	this.sheildPowerCtr  = 500;
	this.autoPilotCtr    = 20;
};

var speedVariables = new SpeedVariables();