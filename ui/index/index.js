// 初始化
mui.init({
//	preloadPages : [qiao.h.normalPage('add')]
});

var main = null;
var showMenu = false;
var menu = null;
var add = null;

// 所有方法都放到这里
mui.plusReady(function(){
	// 初始化数据库
	initDb();
	
	// 创建页面
	var list = mui.preload(qiao.h.normalPage('list'));
	list.show();
	
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
	
	// 显示添加页面
	add = mui.preload(qiao.h.normalPage('add'));
	qiao.on('.adda', 'tap', showAdd);
	
	// 退出
	mui.back = function(){
		if(showMenu){
			closeMenu();
		}else{
			qiao.h.exit();
		}
	};
	
	// 关闭等待
	qmask.hide();
});

// 初始化数据库
function initDb(){
	var db = qiao.h.db();
	qiao.h.update(db, 'create table if not exists t_plan_day_todo (id unique, plan_title, plan_content)');
	qiao.h.update(db, 'create table if not exists t_plan_day_done (id unique, plan_title, plan_content)');
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

// showAdd
function showAdd(){
	$('.menua').removeClass('mui-icon-bars').addClass('mui-icon-back');
	$('.adda').hide();
	qiao.h.show('add', 'slide-in-bottom', 500);
}