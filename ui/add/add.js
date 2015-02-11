// 初始化
mui.init();

// 所有方法都放到这里
mui.plusReady(function(){
	initDb();
	qiao.on('.addItemBtn', 'tap', addItem);
});

// 初始化数据库
function initDb(){
	db = qiao.h.db();
//	qiao.h.update(db, 'drop table t_plan_day');
	qiao.h.update(db, 'create table if not exists t_plan_day_todo (id unique, plan_title, plan_content)');
}

// 添加待办事项
function addItem(){
	var title = $.trim($('#addTitle').val());
	if(!title){
		qiao.h.tip('请填写待办事项标题！');		
	}else{
		qiao.h.query(db, 'select max(id) mid from t_plan_day_todo', function(res){
			var id = (res.rows.item(0).mid) ? res.rows.item(0).mid : 0;
			qiao.h.update(db, 'insert into t_plan_day_todo (id, plan_title) values (' + (id+1) + ', "' + title + '")');
			
			qiao.h.hide('add');
			qiao.h.show('list', true);
		});
	}
}