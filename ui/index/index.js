// 初始化
mui.init({
	subpages : [{
		id 		: 'list',
		url 	: 'view/list.html',
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
	window.addEventListener("tap", addItemHandler);
});

// 添加待办事项Handler
function addItemHandler(event){
	var listPage = qiao.h.getPage('list');
	
	var target = qiao.eventUtil.getTarget(event);
	if(target.className.indexOf('mui-icon-plus') > -1){
		qiao.h.prompt('待办事项', function(v){
			mui.fire(listPage, 'addItem', {
				value : v
			});
		});
	}
}
