// 初始化
mui.init();

// 所有的方法都放到这里
mui.plusReady(function(){
	initList();
	
//	qiao.on('.detaildiv', 'tap', function(){
//		mui.fire(qiao.h.getPage('detail'), 'detailItem', {id:$(this).data('id')});
//	});
	
//	qiao.on('.dela', 'tap', function(){
//		var todoId = $(this).data('id');
//		var title = $(this).data('title');
//		$(this).parent().parent().remove();
//		
//		mui.fire(qiao.h.getPage('done'), 'delItem', {todoId:todoId, title:title, content:'123'});
//	});

	qiao.on('#todolist li', 'tap', function(){
		qiao.h.fire('detail', 'detailItem', {id:$(this).data('id'), page:'list'});
	});
	
	window.addEventListener('addItem', addItemHandler);
});

// 初始化待办事项
function initList(){
	var $ul = $('#todolist').empty();
	qiao.h.query(qiao.h.db(), 'select * from t_plan_day_todo order by id desc', function(res){
		for (i = 0; i < res.rows.length; i++) {
			$ul.append(genLi(res.rows.item(i)));
		}

		showList($ul);
	});
	
	qiao.h.closeWaiting();
}
function genLi(data){
	var li = 
		'<li class="mui-table-view-cell mui-media" data-id="' + data.id + '">' +
			'<div class="mui-media-body">' + 
				data.plan_title + 
				(data.plan_content ? '<p class="mui-ellipsis">' + data.plan_content + '</p>' : '') + 
			'</div>' + 
		'</li>';
		
	return li;
}
function showList(ul){
	if(ul.find('li').size() > 0 &&  ul.is(':hidden')) ul.show();	
}

// 添加待办事项
function addItemHandler(event){
	var db = qiao.h.db();
	var title = event.detail.title;
	var content = event.detail.content;
	
	qiao.h.query(db, 'select max(id) mid from t_plan_day_todo', function(res){
		var id = (res.rows.item(0).mid) ? res.rows.item(0).mid : 0;
		qiao.h.update(db, 'insert into t_plan_day_todo (id, plan_title, plan_content) values (' + (id+1) + ', "' + title + '", "' + content + '")');
		
		$('#todolist').prepend(genLi({id:id+1, 'plan_title':title, 'plan_content':content})).show();
	});
}