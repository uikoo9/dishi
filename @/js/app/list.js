// 初始化
mui.init({
	keyEventBind : {
		backbutton : false,
		menubutton : false
	},
	gestureConfig : {
		longtap:true
	}
});

var tapId = null;
// 所有的方法都放到这里
mui.plusReady(function(){
	// 获取列表
	initHelp();
	
	// 右滑菜单
	window.addEventListener('swiperight', function(){
		qiao.h.indexPage().evalJS("opMenu();");
	});
	
	// 查看详情
	qiao.on('#todolist li', 'tap', function(){
		qiao.h.fire('detail', 'detailItem', {id:$(this).data('id')});
	});
	
	// 完成
	qiao.on('.doneBtn', 'tap', function(){
		var $li = $(this).parent().parent();
		var id = $li.data('id');
		$li.remove();
		showList($('#todolist'));
		
		qiao.h.fire('menu', 'doneItem', {todoId:id});
		return false;
	});
	
	// 长按
	qiao.on('#todolist li', 'longtap', function(){
		tapId = $(this).data('id');
		qiao.h.pop();
	});
	
	// 删除
	qiao.on('.delli', 'tap', delItem);
	
	// 添加
	window.addEventListener('addItem', addItemHandler);
});

function initHelp(){
	var help = qiao.h.getItem('help');
	if(help == 'first'){
		qiao.h.update(qiao.h.db(), getSql(1, '事项5', '待办事项5'));
		qiao.h.update(qiao.h.db(), getSql(2, '事项4', '待办事项4'));
		qiao.h.update(qiao.h.db(), getSql(3, '事项3', '待办事项3'));
		qiao.h.update(qiao.h.db(), getSql(4, '事项2', '待办事项2'));
		qiao.h.update(qiao.h.db(), getSql(5, '事项1', '待办事项1'));
		qiao.h.update(qiao.h.db(), getSql(6, '功能8', '退出程序'));
		qiao.h.update(qiao.h.db(), getSql(7, '功能7', '右滑菜单'));
		qiao.h.update(qiao.h.db(), getSql(8, '功能6', '左上角查看完成事项'));
		qiao.h.update(qiao.h.db(), getSql(9, '功能5', '右上角添加待办事项'));
		qiao.h.update(qiao.h.db(), getSql(10, '功能4', '长按待办事项可以删除'));
		qiao.h.update(qiao.h.db(), getSql(11, '功能3', '右滑待办事项可以完成'));
		qiao.h.update(qiao.h.db(), getSql(12, '功能2', '点击待办事项可以查看详情'));
		qiao.h.update(qiao.h.db(), getSql(13, '功能1', '首页显示待办事项列表'));
		
		qiao.h.insertItem('help','notfirst');
	}
	
	initList();
}
function getSql(index, title, content){
	return 'insert into t_plan_day_todo (id, plan_title, plan_content) values (' + index + ', "' + title + '", "' + content + '")';
}

// 初始化待办事项
function initList(){
	qmask.show();
	
	var $ul = $('#todolist').empty();
	qiao.h.query(qiao.h.db(), 'select * from t_plan_day_todo order by id desc', function(res){
		for (i = 0; i < res.rows.length; i++) {
			$ul.append(genLi(res.rows.item(i)));
		}

		showList($ul);
	});
	
	qmask.hide();
}
function genLi(data){
	var id = data.id;
	var title = data.plan_title;
	var content = data.plan_content;
	
	var li = 
		'<li class="mui-table-view-cell" id="todoli_' + id + '" data-id="' + id + '">' +
			'<div class="mui-slider-right mui-disabled">' + 
				'<a class="mui-btn mui-btn-red doneBtn">完成</a>' +
			'</div>' + 
			'<div class="mui-slider-handle">' + 
				'<div class="mui-media-body">' + 
					title + 
					'<p class="mui-ellipsis">'+content+'</p>' + 
				'</div>' + 
			'</div>' +
		'</li>';
		
	return li;
}
function showList(ul){
	if(ul.find('li').size() > 0 &&  ul.is(':hidden')) ul.show();	
}

// 添加待办事项
function addItemHandler(event){
	// 主界面按钮修改
	qiao.h.indexPage().evalJS("hideBackBtn();");
	
	var db = qiao.h.db();
	var title = event.detail.title;
	var content = event.detail.content ? event.detail.content : '暂无内容！';
	
	qiao.h.query(db, 'select max(id) mid from t_plan_day_todo', function(res){
		var id = (res.rows.item(0).mid) ? res.rows.item(0).mid : 0;
		qiao.h.update(db, 'insert into t_plan_day_todo (id, plan_title, plan_content) values (' + (id+1) + ', "' + title + '", "' + content + '")');
		
		$('#todolist').prepend(genLi({id:id+1, 'plan_title':title, 'plan_content':content})).show();
	});
}

// 删除事项
function delItem(){
	if(tapId){
		qiao.h.update(qiao.h.db(), 'delete from t_plan_day_todo where id=' + tapId);
		qiao.h.pop();
		initList();
	}
}