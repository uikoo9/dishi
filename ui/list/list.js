// 初始化
mui.init({gestureConfig:{longtap:true}});

// 所有的方法都放到这里
mui.plusReady(function(){
	initList();
	
	// 查看详情
	qiao.on('#todolist li', 'tap', function(){
		qiao.h.fire('detail', 'detailItem', {id:$(this).data('id'), page:'list'});
	});
	
	// 长按
	var tapId = null;
	var tapTitle = null;
	var tapContent = null;
	qiao.on('#todolist li', 'longtap', function(){
		mui('.mui-popover').popover('toggle');
		tapId = $(this).data('id');
		tapTitle = $(this).data('title');
		tapContent = $(this).data('content');
	});
	
	// 完成
	qiao.on('#doneBtn', 'tap', function(){
		mui('.mui-popover').popover('toggle');
		qiao.h.fire('done', 'delItem', {todoId:tapId, title:tapTitle, content:tapContent});
	});
	
	// 添加
	window.addEventListener('addItem', addItemHandler);
});

// 初始化待办事项
function initList(){
	var $ul = $('#todolist').empty();
	qiao.h.query(qiao.h.db(), 'select * from t_plan_day_todo order by id desc', function(res){
		for (i = 0; i < res.rows.length; i++) {
			$ul.append(genLi(res.rows.item(i)));
		}

		showList($ul);
	});
	
	qiao.h.closeWaiting();
}
function genLi(data){
	var li = 
		'<li class="mui-table-view-cell mui-media" data-id="' + data.id + '" data-title="' + data.plan_title + '" data-content="' + data.plan_content + '">' +
			'<div class="mui-media-body">' + 
				data.plan_title + 
				(data.plan_content ? '<p class="mui-ellipsis">' + data.plan_content + '</p>' : '') + 
			'</div>' + 
		'</li>';
		
	return li;
}
function showList(ul){
	if(ul.find('li').size() > 0 &&  ul.is(':hidden')) ul.show();	
}

// 添加待办事项
function addItemHandler(event){
	var db = qiao.h.db();
	var title = event.detail.title;
	var content = event.detail.content;
	
	qiao.h.query(db, 'select max(id) mid from t_plan_day_todo', function(res){
		var id = (res.rows.item(0).mid) ? res.rows.item(0).mid : 0;
		qiao.h.update(db, 'insert into t_plan_day_todo (id, plan_title, plan_content) values (' + (id+1) + ', "' + title + '", "' + content + '")');
		
		$('#todolist').prepend(genLi({id:id+1, 'plan_title':title, 'plan_content':content})).show();
	});
}