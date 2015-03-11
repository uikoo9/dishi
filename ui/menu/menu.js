mui.init();

mui.plusReady(function(){
	qiao.on('.quitli', 'tap', qiao.h.exit);
	qiao.on('.logoutli', 'tap', function(){
		qiao.h.indexPage().evalJS("logout();");
	});
});