function HeroSheild(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated){
	this.base 	= Sprite;
	this.base(positionX, 350*commonConfiguration.Yresolution, imageUrl, isVisible, frameCount, rowCount, isAnimated);
}

HeroSheild.prototype = Object.create(Sprite.prototype);

HeroSheild.prototype.update = function(){
		if (this.x > 30*commonConfiguration.Xresolution || spriteVariables.hero.x > 80*commonConfiguration.Xresolution)
			this.x = spriteVariables.hero.x - 60*commonConfiguration.Xresolution;
}

HeroSheild.prototype.visiblityToggle = function(){
	this.isVisible = !this.isVisible;
}

