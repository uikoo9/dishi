// 初始化
mui.init({
	subpages : [{
		id 		: 'listPage',
		url 	: 'view/list.html',
		styles 	: {
			top : '45px',
			bottom : 0
		}
	}],
	preloadPages : [{
		id : 'addPage',
		url : 'view/add.html',
		styles 	: {
			top : '45px',
			bottom : 0
		}
	}]
});

// 所有方法都放到这里
mui.plusReady(function(){
	// 退出
	qiao.h.exit();
	
	// tap事件
	window.addEventListener("tap", function(event){
		var target = qiao.eventUtil.getTarget(event);
		if(target.className.indexOf('mui-icon-plus') > -1){
			qiao.h.getPage('addPage').show();
		}
	});
});