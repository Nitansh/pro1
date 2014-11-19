function RocketHero(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated, speed){
	this.base 	= Sprite;
	this.base(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated);
	this.speedX   = speed.x;
	this.speedY   = speed.y; 
    this.frameThreshold = frameCount;
}

RocketHero.prototype = Object.create(Sprite.prototype);


RocketHero.prototype.update = function(){

	if (this.isVisible){
		if (this.x > 250 || this.x < 80 )
			this.speedToggle();
		this.x += this.speedX;
		spriteVariables.hero.x = this.x;
	}
}

RocketHero.prototype.speedToggle = function(){
	this.speedX = -this.speedX;
}

RocketHero.prototype.visiblityToggle = function(){
	this.isVisible = !this.isVisible;
	// hard code is there rember for each build
	if (this.isVisible){
		for (var spriteObject in spriteVariables){
			if (spriteVariables[spriteObject].length){
					for (var ctr_type = 0; ctr_type < spriteVariables[spriteObject].length; ctr_type++){
							for (var ctr_no = 0; ctr_no < spriteVariables[spriteObject][ctr_type].length; ctr_no++){
								//update function
								if (spriteVariables[spriteObject][ctr_type][ctr_no].speedY)
									spriteVariables[spriteObject][ctr_type][ctr_no].speedY = 50;
								
							}
						}
			}else{
						if (spriteVariables[spriteObject].speedY)
							spriteVariables[spriteObject].speedY = 50;
			}
	}
	}
	else{
		for (var spriteObject in spriteVariables){
			if (spriteVariables[spriteObject].length){
					for (var ctr_type = 0; ctr_type < spriteVariables[spriteObject].length; ctr_type++){
							for (var ctr_no = 0; ctr_no < spriteVariables[spriteObject][ctr_type].length; ctr_no++){
								//update function
								spriteVariables[spriteObject][ctr_type][ctr_no].speedY = 20;
							}
						}
			}else{
						spriteVariables[spriteObject].speedY = 20;
			}
	}
	}
	spriteVariables.hero.x = this.x ; // becuse rocket property is hero property
}