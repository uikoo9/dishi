// 初始化
mui.init({
	preloadPages : [{
		id : 'detail',
		url : 'view/detail.html',
		styles : {
			top: '45px',
			bottom: '50px'
		}
	}]
});

// 所有方法都放到这里
mui.plusReady(function(){
	plus.nativeUI.showWaiting();
	
	// 退出
	qiao.h.exit();
	
	// 初始化数据库
	initDb();
	
	// 创建页面
	var pageIds = ['done', 'list', 'add'];
	createPages(pageIds);
	
	//选项卡点击事件
	var activeTab = pageIds[1];
	qiao.on('.mytab', 'tap', function(){
		var targetTab = $(this).data('id');
		if(targetTab == activeTab){
			return;	
		}else{
			qiao.h.show(targetTab);
			qiao.h.hide(activeTab);
	
			activeTab = targetTab;
		}
	});
});

// 初始化数据库
function initDb(){
	var db = qiao.h.db();
	qiao.h.update(db, 'create table if not exists t_plan_day_todo (id unique, plan_title, plan_content)');
	qiao.h.update(db, 'create table if not exists t_plan_day_done (id unique, plan_title, plan_content)');
}

// 创建页面
function createPages(ids){
	var self = qiao.h.currentPage();
	for(var i=0;i<3;i++){
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