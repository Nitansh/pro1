function Sheild(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated, speed){
	this.base 	= Sprite;
	this.base(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated);
	this.speedX   = speed.x;
	this.speedY   = speed.y; 
	this.isPower  = true;
	this.frameThreshold = frameCount;
}

Sheild.prototype = Object.create(Sprite.prototype);

Sheild.prototype.update = function(){

	if (this.isVisible){
		this.y = ((this.y < (commonConfiguration.ClientHeight - this.speedY)) ? (this.y + this.speedY) : (commonConfiguration.YUpperLimit));
		if ((commonConfiguration.YUpperLimit) == this.y){
			if (Math.random() * 10 < 5)
				this.x = commonConfiguration.ClientWidth - commonConfiguration.rampWidth - 27;
			else
				this.x = commonConfiguration.rampWidth;
			this.isVisible = false;
		}
	}
}

Sheild.prototype.speedToggle = function(){
	this.speedY = -this.speedY;
}