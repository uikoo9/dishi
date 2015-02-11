// 初始化
mui.init();

// 所有方法都放到这里
mui.plusReady(function(){
	// 退出
	qiao.h.exit();
	
	var pageIds = ['done', 'list', 'add'];
	createPages(pageIds);
	
	//选项卡点击事件
	var activeTab = pageIds[1];
	qiao.on('.mytab', 'tap', function(){
		var targetTab = $(this).data('id');
		if(targetTab == activeTab){
			return;	
		}else{
			plus.webview.show(targetTab);
			plus.webview.hide(activeTab);
	
			activeTab = targetTab;
		}
	});
});

// 创建页面
function createPages(ids){
	var self = qiao.h.currentPage();
	for(var i=0;i<2;i++){
		var id = ids[i];
		var url = 'view/' + id + '.html';
		var sub = plus.webview.create(url, id, {
			top: '45px',
			bottom: '50px'
		});
		
		if(i != 1) sub.hide();
		
		self.append(sub);
	}
}