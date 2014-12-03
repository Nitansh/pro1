/***************************************************************************
*
*	Function Name :  onLoad
*	Description   :  This is the overall starting point to the game.
*	Input 		  :  Nothing
*	Outputs 	  :  Overall Game
*
***************************************************************************/

window.onload = function(){
	
	// should be done at time of initialization :)
	Globalcanvas        = document.getElementById("gameCanvas");
	Globalcontext       = Globalcanvas.getContext("2d");
	Globalcanvas.height = window.innerHeight;
	Globalcanvas.width  = window.innerWidth;	
	soundOn             = true;
	gameOn              = true;

	gameManager = new GameManager(spriteVariables);
	menuManager = new MenuManager(menuVariables);

	// Pubsub subscription
	try{
	radio('MenuManagerStateUpdate').subscribe([menuManager.stateChanger, menuManager]);
	radio('GameManagerStateUpdate').subscribe([gameManager.stateChanger, gameManager]);
	radio('GameOn').subscribe([gameManager.initGameScene, gameManager]);
	radio('HeroDieing').subscribe([gameManager.speedToggle, gameManager]);
	radio('HeroDied').subscribe([gameManager.speedToggle, gameManager],[gameManager.boolToggle, gameManager]);
	radio('TogglePauseButton').subscribe([gameManager.pauseVisiblityToggle,gameManager]);
	radio('HeroRocketPower').subscribe([spriteVariables.rocketHero.visiblityToggle, spriteVariables.rocketHero]);
	radio('HeroShieldOn').subscribe([spriteVariables.heroSheild.visiblityToggle, spriteVariables.heroSheild]);
	radio('UpdateScoreOnGameEnd').subscribe([spriteVariables.scoreBoard.updateScoreOnGameEnd, spriteVariables.scoreBoard],[spriteVariables.scoreBoard.toggleClass, spriteVariables.scoreBoard]);
	radio('UpdateCoinCount').subscribe([spriteVariables.scoreBoard.updateMyCoinCount, spriteVariables.scoreBoard]);
	radio('ToggleScoreBoardClass').subscribe([spriteVariables.scoreBoard.toggleClass, spriteVariables.scoreBoard]);
	radio('ApplyDormatClassToMeters').subscribe([spriteVariables.scoreBoard.applyDormatClass, spriteVariables.scoreBoard]);
	radio('RemoveDormatClassFromMetere').subscribe([spriteVariables.scoreBoard.removeDormatClass, spriteVariables.scoreBoard]);
	radio('AutoPilotOn').subscribe([spriteVariables.hero.autoPilotToggle, spriteVariables.hero]);
	}
	catch(err){
		console.log("error in Pubsub");
	}
	menuManager.showSplash();
	menuManager.paint();
	
	window.addEventListener("touchstart", getHeroInput, false);
	window.addEventListener("click", getInput, false);
	AndAud.CreateAudio("sound/game.mp3", true, 20);
	AndJump.CreateAudio("sound/jump.wav",false, 90);
	AndCoin.CreateAudio("sound/coin.wav",false, 90);
	AndHero.CreateAudio("sound/hero_fall.mp3",false, 90);
	AndCracker.CreateAudio("sound/cracker1.wav",false, 90);
	
	
};




function getHeroInput(event){
	spriteVariables.hero.onInput(event);
}


function getInput(event){
		try{
		var state = null;
		if (0 == menuManager.state.localeCompare('play') || 0 == menuManager.state.localeCompare('resumed')){
				spriteVariables.hero.onInput(event);
				
				if(spriteVariables.backButton.isVisible && !spriteVariables.hero.heroFalling && spriteVariables.backButton.Clicked(event))
				{	
					state = 'pause';
					AndAud.stopAudio();	
					radio('MenuManagerStateUpdate').broadcast(state);
					radio('GameManagerStateUpdate').broadcast(state);			
				}
			}else {
				if(menuVariables.main_menu.isVisible && menuVariables.main_menu.Clicked(event)){
					state = 'menu';
					// Make the Hero fall so we can reuse the previous code and logic
					try{
					radio('HeroDieing').broadcast();
					
					speedVariables.heroDied =  true;
					AndAud.stopAudio();
					radio('HeroDied').broadcast();
					}catch(err){
						console.log("error in hero dieing");
					}
				}
				if(menuVariables.backButton.isVisible && menuVariables.backButton.Clicked(event)){
					state = 'menu';
					radio('ApplyDormatClassToMeters').broadcast();
				}
				if(menuVariables.helpButton.isVisible && menuVariables.helpButton.Clicked(event)){
					state = 'help';
				}		
				if(menuVariables.aboutButton.isVisible && menuVariables.aboutButton.Clicked(event)){
					state = 'about';
					radio('RemoveDormatClassFromMetere').broadcast();
				}
		  		if(menuVariables.playButton.isVisible && menuVariables.playButton.Clicked(event)){			
					state = 'play';
					AndAud.playAudio();
					try{	
					radio('ToggleScoreBoardClass').broadcast();
					}catch(err){
						console.log("error in toggling class");
					}
				}
				if(menuVariables.resumeButton.isVisible && menuVariables.resumeButton.Clicked(event)){
					state = 'resumed';
				}
				if(menuVariables.soundButton.isVisible && menuVariables.soundButton.Clicked(event)){
					soundOn = !soundOn;	
					state = 'menu';
				}

				if (null !=  state){ 
					radio('MenuManagerStateUpdate').broadcast(state);
			    	radio('GameManagerStateUpdate').broadcast(state);
			    }
		}		
		 
		event.preventDefault();
		}catch(err){
		
		}
}

// event for the meter scoreBoard

rocketMeterUpdate = function(){
	try{
	if (parseInt(spriteVariables.scoreBoard.rocketMeterCoins.innerHTML) < parseInt(spriteVariables.scoreBoard.totalCoins.innerHTML)){
		var value = parseInt(localStorage.RocketMeter);
		value++;
		localStorage.RocketMeter = value;
		spriteVariables.scoreBoard.updateTotalCoinCountAfterPowerUp(localStorage.RocketMeter, value*100);
		spriteVariables.scoreBoard.updateMetreScoreBoard();
	}else{
		alert('You need ' + (parseInt(spriteVariables.scoreBoard.rocketMeterCoins.innerHTML) - parseInt(spriteVariables.scoreBoard.totalCoins.innerHTML)) +  ' coins to update');
	}
	}catch(err){
		console.log("error in rocketMeter Update");
	}
}

shieldMeterUpdate = function(){
	try{
	if (parseInt(spriteVariables.scoreBoard.shieldMeterCoins.innerHTML) < parseInt(spriteVariables.scoreBoard.totalCoins.innerHTML)){
		var value = parseInt(localStorage.shieldMeter);
		value++;
		localStorage.shieldMeter = value;
		spriteVariables.scoreBoard.updateTotalCoinCountAfterPowerUp(localStorage.shieldMeter, value*100);
		spriteVariables.scoreBoard.updateMetreScoreBoard();
	}else{
		alert('You need ' + (parseInt(spriteVariables.scoreBoard.shieldMeterCoins.innerHTML) - parseInt(spriteVariables.scoreBoard.totalCoins.innerHTML)) +  ' coins to update');
	}
	}catch(err){
		console.log("Shield Meter update");
	}
}

autoPlitotMeterUpadate = function(){
	try{
	if (parseInt(spriteVariables.scoreBoard.autoPlitotMeterCoins.innerHTML) < parseInt(spriteVariables.scoreBoard.totalCoins.innerHTML)){
		var value = parseInt(localStorage.autoPlitotMeter);
		value++;
		localStorage.autoPlitotMeter = value;
		spriteVariables.scoreBoard.updateTotalCoinCountAfterPowerUp(localStorage.autoPlitotMeter, value*100);
		spriteVariables.scoreBoard.updateMetreScoreBoard();
	}else{
		alert('You need ' + (parseInt(spriteVariables.scoreBoard.autoPlitotMeterCoins.innerHTML) - parseInt(spriteVariables.scoreBoard.totalCoins.innerHTML)) +  ' coins to update');
	}
	}catch(err){
		console.log("error in auto pilot meter update");
	}
}