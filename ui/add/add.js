// 初始化
mui.init();

// 所有方法都放到这里
mui.plusReady(function(){
	qiao.on('tap', '.addItemBtn', addItem);
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