/**
 * 以下为处理策划菜单的事件
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
		$('#addDiv').slideToggle();
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

function initList(){
	qiao.h.clear();
	var $ul = $('#my_task_list');
	for(var i=0; i<qiao.h.length(); i++){
		var key = qiao.h.key(i);
		if(key.indexOf('todolist') > -1){
			genLi($ul, qiao.h.getItem(key));
		}
	}
	
	if($ul.find('li').size() == 0){
		genLi($ul, '没有待办事项！');
	}
}
function genLi(ul, value){
	var li = 
		'<li class="mui-table-view-cell">' +
			'<div class="mui-slider-right mui-disabled">' + 
				'<a class="mui-btn mui-btn-red">删除</a>' + 
			'</div>' + 
			'<div class="mui-slider-handle">' + 
				value + 
			'</div>' + 
		'</li>';
	
	ul.append(li);
}