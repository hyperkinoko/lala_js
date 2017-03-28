jQuery(function() {
	var pictureArea = '#pic_area';
	var sliderArea = '#slider';
	var fadeSpeed = 600;
	var switchDelay = 5000;
	var opacityTrue = 1;
	var opacityFalse = 0.4;
	var imgWidth = 980;
	var timer = 0;
	var startX = 0;
	var curX = 0;
	
	var box = jQuery(pictureArea)[0];
	box.addEventListener("touchstart", touchHandler, false);
	box.addEventListener("touchmove", touchHandler, false);
	box.addEventListener("touchend", touchHandler, false);
	
	jQuery(pictureArea).children('img').css({display:'none'});
	var currentImg = jQuery(pictureArea + ' img:first').show().css({left: imgWidth});
	jQuery(sliderArea + " ul li:first").css({opacity: opacityTrue});
	jQuery(sliderArea + " ul li:not(:first)").css({opacity: opacityFalse});
	timer = setInterval(putImage, switchDelay);
	
	jQuery(sliderArea + ' ul li').click(function() {
		clearInterval(timer);
		var index = jQuery(sliderArea + ' ul li').index(this);
		jQuery(pictureArea).children('img').stop(true,true).css({display:'none'});
		currentImg = jQuery(pictureArea + ' img:eq(' + index + ')').show().css({left: imgWidth});
		jQuery(sliderArea + ' ul li:eq(' + index + ')').css({opacity: opacityTrue});
		jQuery(sliderArea + ' ul li:not(:eq(' + index + '))').css({opacity: opacityFalse});
		timer = setInterval(putImage, switchDelay);
	});
	
	function changeSlider() {
		var index = jQuery(pictureArea + ' img').index(currentImg);
		jQuery(sliderArea + ' ul li:eq(' + index + ')').css({opacity: opacityTrue});
		jQuery(sliderArea + ' ul li:not(:eq(' + index + '))').css({opacity: opacityFalse});
	}
	
	function putImage() {
		currentImg.animate({left:'0'}, fadeSpeed)
		.queue(function() {
			jQuery(this).hide().dequeue();
		});
		if(currentImg.get(0) != jQuery(pictureArea + ' img:last').get(0)) {
			currentImg = currentImg.next('img');
		} else {
			currentImg = jQuery(pictureArea + ' img:first');
		}
		currentImg.show().css({left: imgWidth*2});
		currentImg.animate({left: imgWidth}, fadeSpeed);
		changeSlider();
	}
	
	function touchHandler(e){
		e.preventDefault();
		var touch = e.touches[0];
		if(e.type == "touchstart") {
			startX = touch.pageX;
		}
		if(e.type == "touchmove") {
			curX = touch.pageX;
		}
		if(e.type == "touchend") {
			//alert("タッチ終了 startX=" + startX + " curX=" + curX);
			if(startX > curX) {
				clearInterval(timer);
				putImage();
				timer = setInterval(putImage, switchDelay);
				//alert("左にフリックされました。");
			}
		}
	}
});
