function Ramp(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated, speed){
	this.base 	= Sprite;
	this.base(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated);
	
	this.speedX = speed.x;
	this.speedY = speed.y; 
}

Ramp.prototype = Object.create(Sprite.prototype);


Ramp.prototype.update = function(){

	// to be implemented
	
	if (this.y < - commonConfiguration.ClientHeight*commonConfiguration.Yresolution){
		this.y = commonConfiguration.ClientHeight*commonConfiguration.Yresolution;
	}
	
	this.y = ((this.y <= (commonConfiguration.ClientHeight*commonConfiguration.Yresolution - this.speedY)) ? (this.y + this.speedY) : -commonConfiguration.ClientHeight*commonConfiguration.Yresolution);
	
}

Ramp.prototype.speedToggle = function(){
	this.speedY = -this.speedY;
}