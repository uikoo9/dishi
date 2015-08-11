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
	console.log(1);
	if(help == null){
		console.log(2);
		var content = '1.右上角添加事项<br/>2.点击事项查看详情<br/>3.长按事项删除<br/>4.右滑事项完成<br/>5.左滑显示完成事项';
		var sql = 'insert into t_plan_day_todo (id, plan_title, plan_content) values (1, "功能介绍", "' + content + '")';
		qiao.h.update(qiao.h.db(), sql);
		
		qiao.h.insertItem('help','notfirst');
	}
	
	initList();
}

// 初始化待办事项
function initList(){
	qmask.show();
	
	var $ul = $('#todolist').empty();
	qiao.h.query(qiao.h.db(), 'select * from t_plan_day_todo order by id desc', function(res){
		console.log(res.rows.length);
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