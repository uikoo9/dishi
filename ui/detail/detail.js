// 初始化
mui.init();

// 所有方法都放到这里
mui.plusReady(function(){
	window.addEventListener('delItem', delItemHandler);
});

// 展示待办事项
function delItemHandler(event){
	var todoId =event.detail.todoId;
	var title = event.detail.title;
	
	qiao.h.update(db, 'delete from t_plan_day_todo where id=' + todoId);
	qiao.h.query(db, 'select max(id) mid from t_plan_day_done', function(res){
		var id = (res.rows.item(0).mid) ? res.rows.item(0).mid : 0;
		qiao.h.update(db, 'insert into t_plan_day_done (id, plan_title) values (' + (id+1) + ', "' + title + '")');
		
		$('#donelist').prepend(genLi({'plan_title':title})).show();
	});
}