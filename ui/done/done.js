// 初始化
mui.init();

// 所有的方法都放到这里
mui.plusReady(function(){
	initDb();
	initDoneList();
	
	window.addEventListener('delItem', delItemHandler);
});

// 初始化数据库
function initDb(){
	db = qiao.h.db();
//	qiao.h.update(db, 'drop table t_plan_day_done');
	qiao.h.update(db, 'create table if not exists t_plan_day_done (id unique, plan_title, plan_content)');
}

// 初始化待办事项
function initDoneList(){
	var $ul = $('#donelist').empty();
	qiao.h.query(db, 'select * from t_plan_day_done order by id desc', function(res){
		for (i = 0; i < res.rows.length; i++) {
			$ul.append(genLi(res.rows.item(i)));
		}

		showList($ul);
	});
}
function genLi(data){
	return '<li class="mui-table-view-cell">' + data.plan_title + '</li>';
}
function showList(ul){
	if(ul.find('li').size() > 0 &&  ul.is(':hidden')) ul.show();
}

// 删除待办事项
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