// 初始化
mui.init();

// 所有方法都放到这里
mui.plusReady(function(){
	// tap事件
	window.addEventListener("tap", function(event){
		var target = qiao.eventUtil.getTarget(event);
		if(target.className.indexOf('addItemBtn') > -1){
			addItem();
		}else if(target.className.indexOf('cancelItemBtn') > -1){
			qiao.h.getPage('addPage').hide();
		}else{
			
		}
	});
});

// 添加待办事项
function addItem(){
	var title = $.trim($('#addTitle').val());
	if(title){
		mui.fire(qiao.h.getPage('listPage'), 'addItem', {
			title : title,
			content : $('#addContent').val()
		});
	}else{
		qiao.h.tip('请填写待办事项标题！');		
	}
}