mui.init();
$(function(){
	initDb();
	
	mui.plusReady(function(){
		initList();
		initMenu();
	});
});

// 初始化数据库
function initDb(){
	db = qiao.h.db();
//	qiao.h.update(db, 'drop table t_plan_day');
//	qiao.h.update(db, 'drop table t_plan_day_done');
	qiao.h.update(db, 'create table if not exists t_plan_day (id unique, plan_content)');
	qiao.h.update(db, 'create table if not exists t_plan_day_done (id unique, plan_content)');
}

/**
 * 初始化待办事项
 */
function initList(){
	var $ul = $('#my_task_list').empty();
	qiao.h.query(db, 'select * from t_plan_day order by id desc', function(res){
		for (i = 0; i < res.rows.length; i++) {
			$ul.append(genLi(res.rows.item(i)));
		}

		showList($ul);
	});
}
function genLi(data){
	var li = 
		'<li class="mui-table-view-cell">' +
			'<div class="mui-slider-right mui-disabled">' + 
				'<a class="mui-btn mui-btn-green dela" data-id="' + data.id + '" data-content="' + data.plan_content + '">完成</a>' + 
			'</div>' + 
			'<div class="mui-slider-handle">' + 
				data.plan_content + 
			'</div>' + 
		'</li>';
		
	return li;
}
function showList(ul){
	if(ul.find('li').size() > 0 &&  ul.is(':hidden')) ul.show();
}

/**
 * 添加待办事项
 */
function addItem(value){
	var $ul = $('#my_task_list');
	
	if(value){
		qiao.h.query(db, 'select max(id) mid from t_plan_day', function(res){
			var id = (res.rows.item(0).mid) ? res.rows.item(0).mid : 0;
			qiao.h.update(db, 'insert into t_plan_day (id, plan_content) values (' + (id+1) + ', "' + value + '")');
			initList();
		});
	}else{
		qiao.h.tip('请填写待办事项内容！');
	}
}

/**
 * 删除待办事项
 */
function delItem(target){
	var id = $(target).data('id');
	var content = $(target).data('content');
	qiao.h.confirm('确定完成了？', function(){
		qiao.h.update(db, 'delete from t_plan_day where id=' + id);
		initList();
		
		qiao.h.query(db, 'select max(id) mid from t_plan_day_done', function(res){
			var id = (res.rows.item(0).mid) ? res.rows.item(0).mid : 0;
			qiao.h.update(db, 'insert into t_plan_day_done (id, plan_content) values (' + (id+1) + ', "' + content + '")');
			initMenu();
		});
	});
}

/**
 * 初始化侧滑菜单
 */
function initMenu(){
	var $ul = $('#done_list').empty();
	qiao.h.query(db, 'select * from t_plan_day_done order by id desc', function(res){
		for (i = 0; i < res.rows.length; i++) {
			$ul.append(genMenu(res.rows.item(i).plan_content));
		}
	});
}
function genMenu(value){
	return '<li class="mui-table-view-cell"><a>' + value + '</a></li>';
}

/**
 * 侧滑菜单
 */
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
	var target = qiao.eventUtil.getTarget(event);
	setTimeout(function(){
		if(target.className.indexOf('mui-icon-bars') > -1){
			if(showMenu){
				closeMenu();
			}else{
				openMenu();
			}
		}else if(target.className.indexOf('mui-icon-plus') > -1){
			qiao.h.prompt('待办事项', function(v){addItem(v);});
		}else if(target.className.indexOf('dela') > -1){
			delItem(target);
		}else{
			if(showMenu) closeMenu();
		}
	},100);
});
window.addEventListener("swiperight", function(){if(!showMenu) openMenu();});
window.addEventListener("swipeleft", function(){if(showMenu) closeMenu();});

qiao.h.exit();