var showMenu = false;
function openMenu(){
	mui('.mui-off-canvas-wrap').offCanvas('show');
	showMenu = true;
}
function closeMenu(){
	mui('.mui-off-canvas-wrap').offCanvas('close');
	showMenu = false;
}
window.addEventListener("tap", function(event){
	var target = EventUtil.getTarget(event);
	if(target.className.indexOf('mui-icon-bars') > 0){
		if(showMenu){
			closeMenu();
		}else{
			openMenu();
		}
	}else{
		if(showMenu){
			closeMenu();
		}
	}
});
window.addEventListener("swiperight", function(){
	if(!showMenu){
		openMenu();
	}
});
window.addEventListener("swipeleft", function(){
	if(showMenu){
		closeMenu();
	}
});