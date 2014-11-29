function ScoreBoard(){
	try{
	this.ScoreBoardElement   = document.getElementById('scoreboard');
	this.autoPilotBar        = document.getElementById('AutoPilotBar');
	this.myScore             = document.getElementById('myScore');
	this.myHighScore         = document.getElementById('myHighScore');
	this.myCointCount        = document.getElementById('myCoins');
	this.myMultiplier        = document.getElementById('myMultiplier');
	this.mainMeter           = document.getElementById('meter');

	// Meter ScoreBoard thing 
	this.rocketMeter          = document.getElementById("RocketPowerMeter"); 
	this.rocketMeterCoins     = document.getElementById("RocketMeterMsg"); 
	this.shieldMeter          = document.getElementById("shieldPowerMeter"); 
	this.shieldMeterCoins     = document.getElementById("shieldMeterMsg"); 
	this.autoPlitotMeter      = document.getElementById("AutoPilotPowerMeter"); 
	this.autoPlitotMeterCoins = document.getElementById("AutoPilotMeterMsg");
	this.totalCoins           = document.getElementById("TotalCoins");
	}
	catch(err){
		console.log("Error in scoreBoard");
	} 

}

ScoreBoard.prototype.toggleClass = function(){
	try{
	this.ScoreBoardElement.classList.toggle('dormat');
	}catch(err){
	console.log("Toggle class");
	}
}

ScoreBoard.prototype.SetHtml = function(HTMLElement, value){
	try{
		HTMLElement.innerHTML = value;
	}catch(err){
		console.log("Error in setting HTML");
	}
}

ScoreBoard.prototype.GetHtml = function(HTMLElement){
	return parseInt(HTMLElement.innerHTML);
}

ScoreBoard.prototype.updateAutoPilotBar = function(){
	try{
	if (speedVariables.numberOfFrame % 5 == 0 && (this.autoPilotBar.max >= this.autoPilotBar.value)){
		if (this.autoPilotBar.max == this.autoPilotBar.value){
			spriteVariables.hero.autoPilot = true;
			spriteVariables.heroAutoFight = new HeroParticleSystem({x:commonConfiguration.ClientWidth-commonConfiguration.rampWidth, y:500 + 40}, 50, {red:227, green:140, blue:45});
			speedVariables.globalSpeedY = 40;
		}
		
		
		
		if (spriteVariables.hero.autoPilot){
			this.autoPilotBar.value -- ;
			if (this.autoPilotBar.value <= 0){
				spriteVariables.hero.autoPilot = false;
				if (spriteVariables.heroAutoFight){
					delete spriteVariables.heroAutoFight;
					speedVariables.globalSpeedY = 20;
				}
			}
		}else{
			this.autoPilotBar.value++;
		}
		
	}
	}
	catch(err){
		console.log("error in updating auto pilot bar");
	}
}


ScoreBoard.prototype.updateMyScore = function(){
	try{
	var value = this.GetHtml(this.myScore) + this.GetHtml(this.myMultiplier);
	this.SetHtml(this.myScore,value);
	}catch(err){
		console.log("error in updating score")
	}
}


ScoreBoard.prototype.updateMyCoinCount = function(){
	try{
	var value = this.GetHtml(this.myCointCount) + 1;
	this.SetHtml(this.myCointCount, value);
	}catch(err){
		console.log("error in updating coin count");
	}
}

ScoreBoard.prototype.updateMyMultiplier = function(){
	try{
	var value = this.GetHtml(this.myMultiplier) + 1;
	this.SetHtml(this.myMultiplier, value);
	}catch(err){
		console.log("error in updating multiplier");
	}
}

ScoreBoard.prototype.update = function(){
	try{
	this.updateMyScore();
	this.SetHtml(this.myHighScore, localStorage.highScore);
	this.updateHighScore();
	this.updateAutoPilotBar();
	}catch(err){
		console.log("error in update");
	}
}

ScoreBoard.prototype.updateHighScore = function(){
	try{
	if (typeof (Storage) !== undefined){
		if (this.GetHtml(this.myScore) >= parseInt(localStorage.highScore) || localStorage.highScore === undefined){
			// fire works on high score
			if (!spriteVariables.c1){
				spriteVariables.c1=  new Cracker();
			}
			localStorage.highScore = this.GetHtml(this.myScore);
		}
	}else{
			alert('we have to use phonegap technique')
	}
	}catch(err){
		console.log("error in updateHigh Score");
	}
}

ScoreBoard.prototype.updateTotalCoinCount = function(){
	try{
	if (typeof (Storage) !== undefined){
			if  (localStorage.coinCount === undefined)
				localStorage.coinCount = this.GetHtml(this.myCointCount);
			else
				localStorage.coinCount = parseInt(localStorage.coinCount) + this.GetHtml(this.myCointCount); 
		}else{
			alert('we have to use phonegap technique')
		}
	}catch(err){
		console.log("error in update total coin count");
	}	
}

ScoreBoard.prototype.updateScoreOnGameEnd = function(){
	try{
	this.SetHtml(this.myScore, 0);
	this.updateTotalCoinCount();
	this.SetHtml(this.myCointCount, 0);
	this.updateHighScore();
	this.autoPilotBar.value = 0;
	}catch(err){
		console.log("error in update in high score on game on end");
	}
}

ScoreBoard.prototype.applyDormatClass = function(){
	try{
	this.mainMeter.classList.add('dormat');
	}catch(err){
		console.log("error in apply Dormant class");
	}
}

ScoreBoard.prototype.removeDormatClass = function(){
	try{
	this.mainMeter.classList.remove('dormat');
	this.updateMetreScoreBoard();
	}catch(err){
		console.log("error in remove dormant class");
	}
}

ScoreBoard.prototype.updateMetreScoreBoard = function(){
	try{
	if (typeof (Storage) !== undefined){
		// updating the coin count in meter scoreBaord
		if (localStorage.coinCount !== undefined)
			this.SetHtml(this.totalCoins, localStorage.coinCount);
		else{
			localStorage.coinCount = 0;
			this.SetHtml(this.totalCoins, localStorage.coinCount);
		}
		// updating the scoreBoard for Rocket

		if (localStorage.RocketMeter !== undefined)
			this.rocketMeter.value = parseInt(localStorage.RocketMeter)*10;
		else{
			localStorage.RocketMeter = 0;
			this.rocketMeter.value = parseInt(localStorage.RocketMeter)*10;
		}

		if (localStorage.RocketMeter == '10'){
			this.SetHtml(this.rocketMeterCoins, 0);
		}else{
			this.SetHtml(this.rocketMeterCoins, ((parseInt(localStorage.RocketMeter)? parseInt(localStorage.RocketMeter): 1/2) * 2) * 100 )
		}

		if (localStorage.shieldMeter !== undefined)
			this.shieldMeter.value = parseInt(localStorage.shieldMeter)*10;
		else{
			localStorage.shieldMeter = 0;
			this.shieldMeter.value = parseInt(localStorage.shieldMeter)*10;
		}

		if (localStorage.shieldMeter == '10'){
			this.SetHtml(this.shieldMeterCoins, 0);
		}else{
			this.SetHtml(this.shieldMeterCoins, ((parseInt(localStorage.shieldMeter)? parseInt(localStorage.shieldMeter): 1/2) * 2) * 100 )
		}

		if (localStorage.autoPlitotMeter !== undefined)
			this.autoPlitotMeter.value = parseInt(localStorage.autoPlitotMeter)*10;
		else{
			localStorage.autoPlitotMeter = 0;
			this.autoPlitotMeter.value = parseInt(localStorage.autoPlitotMeter)*10;
		} 

		if (localStorage.autoPlitotMeter == '10'){
			this.SetHtml(this.autoPlitotMeterCoins, 0);
		}else{
			this.SetHtml(this.autoPlitotMeterCoins, ((parseInt(localStorage.autoPlitotMeter)? parseInt(localStorage.autoPlitotMeter): 1/2) * 2) * 100 )
		}

	}else{
		alert('we have to use phonegap technique');
	}
	}catch(err){
		console.log("error in update my score");
	}
}

ScoreBoard.prototype.updateTotalCoinCountAfterPowerUp =  function(key, value){
	key -= value;
	localStorage.coinCount -= value; 
}