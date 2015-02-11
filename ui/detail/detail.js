// 初始化
mui.init();

// 所有方法都放到这里
mui.plusReady(function(){
	window.addEventListener('detailItem', detailItemHandler);
	
	qiao.on('#backItemBtn', 'tap', function(){
		qiao.h.show('list');
		qiao.h.hide('detail');
	});
});

// 展示待办事项
function detailItemHandler(event){
	var detailId =event.detail.id;
	qiao.h.query(qiao.h.db(), 'select * from t_plan_day_todo where id=' + detailId, function(res){
		if(res.rows.length > 0){
			var data = res.rows.item(0);
			$('#detailTitle').text(data.plan_title);
			$('#detailContent').text(data.plan_content);
			
			qiao.h.show('detail');
			qiao.h.hide('list');
		}
	});
}