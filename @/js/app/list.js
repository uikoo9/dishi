define(function (require, exports, module) {
    'use strict';
    
    // import
    var qiao = require('../lib/qiao.h.js');
    
	// 初始化
	mui.init({
		keyEventBind : {
			backbutton : false,
			menubutton : false
		},
		gestureConfig : {
			longtap:true
		}
	});
	
	var tapId = null;
	// 所有的方法都放到这里
	mui.plusReady(function(){
		// 获取列表
		initHelp();
		
		// 右滑菜单
		window.addEventListener('swiperight', function(){
			qiao.indexPage().evalJS("opMenu();");
		});
		
		// 查看详情
		qiao.on('#todolist li', 'tap', function(){
			qiao.fire('detail', 'detailItem', {id:$(this).data('id')});
		});
		
		// 完成
		qiao.on('.doneBtn', 'tap', function(){
			var $li = $(this).parent().parent();
			var id = $li.data('id');
			$li.remove();
			showList($('#todolist'));
			
			qiao.fire('menu', 'doneItem', {todoId:id});
			return false;
		});
		
		// 长按
		qiao.on('#todolist li', 'longtap', function(){
			tapId = $(this).data('id');
			qiao.pop();
		});
		
		// 删除
		qiao.on('.delli', 'tap', delItem);
		
		// 添加
		window.addEventListener('addItem', addItemHandler);
	});
	
	function initHelp(){
		var help = qiao.getItem('help');
		if(help == null){
			var content = '1.右上角添加事项<br/>2.点击事项查看详情<br/>3.长按事项删除<br/>4.右滑事项完成<br/>5.左滑显示完成事项';
			var sql = 'insert into t_plan_day_todo (id, plan_title, plan_content) values (1, "功能介绍", "' + content + '")';
			qiao.update(qiao.db(), sql);
			
			qiao.insertItem('help','notfirst');
		}
		
		initList();
	}
	
	// 初始化待办事项
	function initList(){
		var $ul = $('#todolist').empty();
		qiao.query(qiao.db(), 'select * from t_plan_day_todo order by id desc', function(res){
			for (var i = 0; i < res.rows.length; i++) {
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
			'<li class="mui-table-view-cell" id="todoli_' + id + '" data-id="' + id + '">' +
				'<div class="mui-slider-right mui-disabled">' + 
					'<a class="mui-btn mui-btn-red doneBtn">完成</a>' +
				'</div>' + 
				'<div class="mui-slider-handle">' + 
					'<div class="mui-media-body">' + 
						title + 
						'<p class="mui-ellipsis">'+content+'</p>' + 
					'</div>' + 
				'</div>' +
			'</li>';
			
		return li;
	}
	function showList(ul){
		if(ul.find('li').size() > 0 &&  ul.is(':hidden')) ul.show();	
	}
	
	// 添加待办事项
	function addItemHandler(event){
		// 主界面按钮修改
		qiao.indexPage().evalJS("hideBackBtn();");
		
		var db = qiao.db();
		var title = event.detail.title;
		var content = event.detail.content ? event.detail.content : '暂无内容！';
		
		qiao.query(db, 'select max(id) mid from t_plan_day_todo', function(res){
			var id = (res.rows.item(0).mid) ? res.rows.item(0).mid : 0;
			qiao.update(db, 'insert into t_plan_day_todo (id, plan_title, plan_content) values (' + (id+1) + ', "' + title + '", "' + content + '")');
			
			$('#todolist').prepend(genLi({id:id+1, 'plan_title':title, 'plan_content':content})).show();
		});
	}
	
	// 删除事项
	function delItem(){
		if(tapId){
			qiao.update(qiao.db(), 'delete from t_plan_day_todo where id=' + tapId);
			qiao.pop();
			initList();
		}
	}
});