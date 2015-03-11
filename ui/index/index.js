// 初始化
mui.init({
//	preloadPages : [{
//		id : 'detail',
//		url : 'view/detail.html',
//		styles : {
//			top: '45px',
//			bottom: '50px'
//		}
//	}]
});

var main=null;
var menu=null;
var showMenu = false;

// 所有方法都放到这里
mui.plusReady(function(){
//	// 初始化数据库
//	initDb();
//	
//	// 创建页面
//	createPages('add');
//	createPages('done');
//	createPages('list');
//	
//	// 返回事件
//	qiao.on('#backBtn', 'tap', function(){
//		$(this).hide(50, function(){
//			qiao.h.hide('detail');
//		});
//	});
	
	// 侧滑菜单
	main = qiao.h.indexPage();
	menu = mui.preload(qiao.h.page('menu', {left:0,width:'70%',zindex:-1}));
	qiao.on('.menua', 'tap', opMenu);
	main.addEventListener('maskClick', opMenu);
	mui.menu = function(){if($('.maindiv').is(':visible')) opMenu();};
	
	// 退出
	mui.back = function(){
		if(showMenu){
			closeMenu();
		}else{
			qiao.h.exit();
		}
	};
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

// menu
function opMenu(){
	if(showMenu){
		closeMenu();
	}else{
		openMenu();
	}
}
function openMenu(){
	menu.show('none', 0, function() {
		main.setStyle({
			mask: 'rgba(0,0,0,0.4)',
			left: '70%',
			transition: {
				duration: 150
			}
		});
		showMenu = true;
	});
}
function closeMenu(){
	main.setStyle({
		mask: 'none',
		left: '0',
		transition: {
			duration: 200
		}
	});
	showMenu = false;
	setTimeout(function() {
		menu.hide();
	}, 300);
}