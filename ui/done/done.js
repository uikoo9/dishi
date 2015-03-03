// 初始化
mui.init({
	keyEventBind : {
		backbutton : false
	}
});


// 所有的方法都放到这里
mui.plusReady(function(){
	initDoneList();
	
	// 查看详情
	qiao.on('#donelist li', 'tap', function(){
		qiao.h.fire('detail', 'detailItem', {id:$(this).data('id'), page:'done'});
	});
	
	// 删除
	window.addEventListener('delItem', delItemHandler);
	
	// 滑动
	window.addEventListener('swipeleft', function(){
		qiao.h.hide('done', 'slide-out-left');
		qiao.h.show('list', 'slide-in-right');
		qiao.h.indexPage().evalJS("changeTabHandler('list');");
	});
});

// 初始化待办事项
function initDoneList(){
	var $ul = $('#donelist').empty();
	qiao.h.query(qiao.h.db(), 'select * from t_plan_day_done order by id desc', function(res){
		for (i = 0; i < res.rows.length; i++) {
			$ul.append(genLi(res.rows.item(i)));
		}

		showList($ul);
	});
}
function genLi(data){
	var id = data.id;
	var title = data.plan_title;
	var content = data.plan_content;
	
	var li = 
		'<li class="mui-table-view-cell mui-media" id="doneli_' + id + '" data-id="' + id + '" data-title="' + title + '" data-content="' + content + '">' +
			'<div class="mui-media-body">' + 
				title + '<p class="mui-ellipsis">' + content + '</p>' + 
			'</div>' + 
		'</li>';
		
	return li;
}
function showList(ul){
	if(ul.find('li').size() > 0 &&  ul.is(':hidden')) ul.show();
}

// 删除待办事项
function delItemHandler(event){
	var db = qiao.h.db();
	var todoId =event.detail.todoId;
	var title = event.detail.title;
	var content = event.detail.content ? event.detail.content : '暂无内容！';
	
	qiao.h.update(db, 'delete from t_plan_day_todo where id=' + todoId);
	qiao.h.query(db, 'select max(id) mid from t_plan_day_done', function(res){
		var id = (res.rows.item(0).mid) ? res.rows.item(0).mid : 0;
		qiao.h.update(db, 'insert into t_plan_day_done (id, plan_title, plan_content) values (' + (id+1) + ', "' + title + '", "' + content + '")');
		
		$('#donelist').prepend(genLi({id:(id+1),'plan_title':title,'plan_content':content})).show();
	});
}