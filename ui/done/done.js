// 初始化
mui.init();

// 所有的方法都放到这里
mui.plusReady(function(){
	initDoneList();
	
	window.addEventListener('delItem', delItemHandler);
});

// 初始化待办事项
function initDoneList(){
	var $ul = $('#donelist').empty();
	qiao.h.query(qiao.h.db(), 'select * from t_plan_day_done order by id desc', function(res){
		for (i = 0; i < res.rows.length; i++) {
			$ul.append(genLi(res.rows.item(i)));
		}

		showList($ul);
	});
}
function genLi(data){
	var li = 
		'<li class="mui-table-view-cell mui-media">' +
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

// 删除待办事项
function delItemHandler(event){
	var db = qiao.h.db();
	var todoId =event.detail.todoId;
	var title = event.detail.title;
	var content = event.detail.content;
	
	qiao.h.update(db, 'delete from t_plan_day_todo where id=' + todoId);
	qiao.h.query(db, 'select max(id) mid from t_plan_day_done', function(res){
		var id = (res.rows.item(0).mid) ? res.rows.item(0).mid : 0;
		qiao.h.update(db, 'insert into t_plan_day_done (id, plan_title, plan_content) values (' + (id+1) + ', "' + title + '", "' + content + '")');
		
		$('#donelist').prepend(genLi({'plan_title':title,'plan_content':content})).show();
	});
}