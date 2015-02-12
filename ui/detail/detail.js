// 初始化
mui.init();

// 所有方法都放到这里
mui.plusReady(function(){
	window.addEventListener('detailItem', detailItemHandler);
});

// 展示待办事项
function detailItemHandler(event){
	var page = event.detail.page;
	qiao.h.fire('HBuilder', 'showBackBtn', {page:page});

	var detailId =event.detail.id;
	var tableName = (page == 'list') ? 't_plan_day_todo' : 't_plan_day_done';
	var sql = 'select * from ' + tableName + ' where id=' + detailId;
	qiao.h.query(qiao.h.db(), sql, function(res){
		if(res.rows.length > 0){
			var data = res.rows.item(0);
			$('#detailTitle').text(data.plan_title);
			$('#detailContent').text(data.plan_content);
			
			qiao.h.show('detail');
			qiao.h.hide(page);
		}
	});
}