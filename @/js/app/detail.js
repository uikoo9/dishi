define(function (require, exports, module) {
    'use strict';
    
    // import
    var qiao = require('../lib/qiao/qiao.js');
    
	// 初始化
	mui.init({
		keyEventBind : {
			backbutton : false,
			menubutton : false
		}
	});
	
	// 所有方法都放到这里
	mui.plusReady(function(){
		window.addEventListener('detailItem', detailItemHandler);
	});
	
	// 展示待办事项
	function detailItemHandler(event){
		qiao.indexPage().evalJS("showBackBtn();");
	
		var detailId =event.detail.id;
		var sql = 'select * from t_plan_day_todo where id=' + detailId;
		qiao.query(qiao.db(), sql, function(res){
			if(res.rows.length > 0){
				var data = res.rows.item(0);
				$('#detailTitle').text(data.plan_title);
				$('#detailContent').html(data.plan_content);
				
				qiao.show('detail', 'slide-in-right', 300);
			}
		});
	}
});