// 初始化
mui.init();

// 所有方法都放到这里
mui.plusReady(function(){
	resetPage();
	qiao.on('.addItemBtn', 'tap', addItem);
});

// 重置页面
function resetPage(){
	$('#addContent').val('');
	$('#addTitle').val('');
}

// 添加待办事项
function addItem(){
	var title = $.trim($('#addTitle').val());
	if(!title){
		qiao.h.tip('请填写待办事项标题！');		
	}else{
		qiao.h.alert('添加成功！');
		resetPage();
		mui.fire(qiao.h.getPage('list'), 'addItem', {title : title});
	}
}