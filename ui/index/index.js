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
	// 等待界面
	qiao.h.waiting();
	
	// 初始化数据库
	initDb();
	
	// 创建页面
	createPages('add');
	createPages('done');
	createPages('list');
	
	//选项卡点击事件
	qiao.on('.mytab', 'tap', function(){
		if(!$(this).hasClass('mui-active')){
			var tapId = $(this).data('id');
			qiao.h.show(tapId);
			qiao.h.hide($('.mui-active').data('id'));
			
			changeTabHandler(tapId);
		}
	});
	
	// 返回事件
	qiao.on('#backBtn', 'tap', function(){
		$(this).hide(50, function(){
			qiao.h.hide('detail');
		});
	});
	
	// 滑动切换tab
	window.addEventListener('changeTab', changeTabHandler);
});

// 初始化数据库
function initDb(){
	var db = qiao.h.db();
	qiao.h.update(db, 'create table if not exists t_plan_day_todo (id unique, plan_title, plan_content)');
	qiao.h.update(db, 'create table if not exists t_plan_day_done (id unique, plan_title, plan_content)');
}

// 创建页面
function createPages(id){
	var sub = mui.preload(qiao.h.page(id));
	if(id == 'list'){
		sub.show();	
	}else{
		sub.hide();
	}
}

// 滑动切换tab
function changeTabHandler(page){
	if(page && $('.mui-active').data('id') != page){
		$('.mui-active').removeClass('mui-active');
		$('.mytab[data-id="'+page+'"]').addClass('mui-active');
	}
}