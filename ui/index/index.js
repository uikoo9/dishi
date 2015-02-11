// 初始化
mui.init({
	subpages : [{
		id 		: 'list',
		url 	: 'view/list.html',
		styles 	: {
			top : '45px'
		}
	}]
});

// 所有的方法最好到放到这个里边
mui.plusReady(function(){
	// 退出
	qiao.h.exit();
	
	// 事件
	var listPage = null;
	window.addEventListener("tap", function(event){
		listPage = listPage ? listPage : qiao.h.getPage('list');
		
		var target = qiao.eventUtil.getTarget(event);
		setTimeout(function(){
			if(target.className.indexOf('mui-icon-plus') > -1){
				qiao.h.prompt('待办事项', function(v){
					mui.fire(listPage, 'addItem', {
						value : v
					});
				});
			}
		},100);
	});
});