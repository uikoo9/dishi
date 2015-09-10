// 初始化
mui.init({
	keyEventBind : {
		backbutton : false
	}
});


// 所有的方法都放到这里
mui.plusReady(function(){
	initDoneList();
	
	// 添加已完成事项
	window.addEventListener('doneItem', doneItemHandler);
});

// 初始化待办事项
function initDoneList(){
	var $ul = $('#donelist').empty();
	qiao.h.query(qiao.h.db(), 'select * from t_plan_day_done order by id desc', function(res){
		for (i = 0; i < res.rows.length; i++) {
			$ul.append(genLi(res.rows.item(i).plan_title));
		}

		showList($ul);
	});
}
function genLi(title){
	return '<li class="mui-table-view-cell">' + title + '</li>';
}
function showList(ul){
	if(ul.find('li').size() > 0 &&  ul.is(':hidden')) ul.show();
}

// 添加已完成事项
function doneItemHandler(event){
	var todoId = event.detail.todoId;

	var db = qiao.h.db();
	qiao.h.query(db, 'select * from t_plan_day_todo where id=' + todoId, function(res){
		if(res.rows.length > 0){
			var data = res.rows.item(0);
			
			qiao.h.query(db, 'select max(id) mid from t_plan_day_done', function(res1){
				$('#donelist').prepend('<li class="mui-table-view-cell>test</li>').prepend(genLi(data.plan_title)).show();
				
				var id = (res1.rows.item(0).mid) ? res1.rows.item(0).mid : 0;
				qiao.h.update(db, 'insert into t_plan_day_done (id, plan_title, plan_content) values (' + (id+1) + ', "' + data.plan_title + '", "' + data.plan_content + '")');
				qiao.h.update(db, 'delete from t_plan_day_todo where id=' + todoId);
			});
		}
	});
}