/**
 * 侧滑菜单
 */
var showMenu = false;
function openMenu(){
	mui('.mui-off-canvas-wrap').offCanvas('show');
	showMenu = true;
}
function closeMenu(){
	mui('.mui-off-canvas-wrap').offCanvas('close');
	showMenu = false;
}
window.addEventListener("tap", function(event){
	var target = qiao.eventUtil.getTarget(event);
	if(target.className.indexOf('mui-icon-bars') > -1){
		if(showMenu){
			closeMenu();
		}else{
			openMenu();
		}
	}else if(target.className.indexOf('mui-icon-plus') > -1){
		$('#addDiv').slideToggle().find('input').val('');
	}else{
		if(showMenu){
			closeMenu();
		}
	}
});
window.addEventListener("swiperight", function(){
	if(!showMenu){
		openMenu();
	}
});
window.addEventListener("swipeleft", function(){
	if(showMenu){
		closeMenu();
	}
});

$(function(){
	mui.plusReady(function(){
		initList();
	});
});

/**
 * 初始化待办事项
 */
function initList(){
	var $ul = $('#my_task_list');
	for(var i=0; i<qiao.h.length(); i++){
		var key = qiao.h.key(i);
		if(key.indexOf('todolist') > -1){
			$ul.append(genLi(qiao.h.getItem(key)));
		}
	}
	
	showList($ul);
}
function genLi(value){
	var li = 
		'<li class="mui-table-view-cell">' +
			'<div class="mui-slider-right mui-disabled">' + 
				'<a class="mui-btn mui-btn-red dela">删除</a>' + 
			'</div>' + 
			'<div class="mui-slider-handle">' + 
				value + 
			'</div>' + 
		'</li>';
	return li;
}
function showList(ul){
	if(ul.find('li').size() > 0 &&  ul.is(':hidden')) ul.show();
}

/**
 * 添加待办事项
 */
function addItem(){
	var $ul = $('#my_task_list');
	var $input = $('#addDiv input');
	var value = $.trim($input.val());
	
	if(value){
		$('#addDiv').slideUp(function(){
			$ul.prepend(genLi(value));
			showList($ul);
			qiao.h.insertItem('todolist-' + qiao.h.length(), ''+value);
		});
	}else{
		alert('请填写待办事项内容！');
	}
}

$(document).off('click','.dela').on('click','.dela',delItem);
function delItem(){
	qiao.h.confirm('确定完成了？', function(){
		alert(1);
	});
}
