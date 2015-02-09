mui.init();

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
	var className = target.className;
	if(className.indexOf('mui-icon-bars') > -1){
		if(showMenu){
			closeMenu();
		}else{
			openMenu();
		}
	}else if(className.indexOf('mui-icon-plus') > -1){
		qiao.h.prompt('待办事项', function(v){
			addItem(v);
		});
	}else if(className.indexOf('dela') > -1){
		delItem(target);
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
		initMenu();
	});
});

/**
 * 初始化待办事项
 */
function initList(){
	var $ul = $('#my_task_list');
	$ul.empty();
	for(var i=0; i<qiao.h.length(); i++){
		var key = qiao.h.key(i);
		if(key.indexOf('todolist') > -1){
			$ul.append(genLi(key, qiao.h.getItem(key)));
		}
	}
	
	showList($ul);
}
function genLi(key, value){
	var li = 
		'<li class="mui-table-view-cell">' +
			'<div class="mui-slider-right mui-disabled">' + 
				'<a class="mui-btn mui-btn-green dela" data-key="' + key + '" data-value="' + value + '">完成</a>' + 
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
function addItem(value){
	var $ul = $('#my_task_list');
	
	if(value){
		var key = 'todolist-' + qiao.h.length();
		$ul.prepend(genLi(key, value));
		showList($ul);
		qiao.h.insertItem(key, ''+value);
	}else{
		qiao.h.alert('请填写待办事项内容！');
	}
}

/**
 * 删除待办事项
 */
function delItem(target){
	var key = $(target).data('key');
	var value = $(target).data('value');
	var menukey = 'donelist-' + qiao.h.length();
	qiao.h.confirm('确定完成了？', function(){
		qiao.h.delItem(key);
		initList();
		
		qiao.h.insertItem(menukey, ''+value);
		initMenu();
	});
}

/**
 * 初始化侧滑菜单
 */
function initMenu(){
	var $ul = $('#done_list');
	
	$ul.empty();
	for(var i=0; i<qiao.h.length(); i++){
		var key = qiao.h.key(i);
		if(key.indexOf('donelist') > -1){
			$ul.append(genMenu(qiao.h.getItem(key)));
		}
	}
}
function genMenu(value){
	return '<li class="mui-table-view-cell"><a>' + value + '</a></li>';
}
