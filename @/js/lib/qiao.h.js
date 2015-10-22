/**
 * exports.js
 * html5+相关封装
 */
define(function (require, exports, module) {
    'use strict';
    
	exports.on = function(obj, event, func){
		$(document).off(event, obj).on(event, obj, func);
	};
	
	// page相关
	exports.normalStyle = {top:'45px',bottom:0};
	exports.normalPage = function(id){
		return exports.page(id, {styles : exports.normalStyle});
	};
	exports.centerStyle = {top:'45px',bottom:'50px'};
	exports.centerPage = function(id){
		return exports.page(id, {styles:exports.centerStyle});
	};
	exports.page = function(id, options){
		var url = id + '.html';
	
		options.id = id;
		options.url = url;
		return options;
	};
	exports.indexPage = function(){
		return plus.webview.getWebviewById(plus.runtime.appid);
	};
	exports.currentPage = function(){
		return plus.webview.currentWebview();
	};
	exports.getPage = function(id){
		return id ? plus.webview.getWebviewById(id) : null;
	};
	exports.show = function(id, ani, time, func){
		if(id) plus.webview.show(id, ani, time, func);
	};
	exports.hide = function(id, ani, time){
		if(id) plus.webview.hide(id, ani, time);
	};
	exports.fire = function(id, name, values){
		mui.fire(exports.getPage(id), name, values);
	};
	
	// 以下为UI封装------------------------------------------------------------------------------
	// nativeui相关
	exports.tip = function(msg, options){
		plus.nativeUI.toast(msg,options);
	};
	exports.waiting = function(titile, options){
		plus.nativeUI.showWaiting(titile, options);
	};
	exports.closeWaiting = function(){
		plus.nativeUI.closeWaiting();
	};
	
	// popover
	exports.pop = function(){
		mui('.mui-popover').popover('toggle');
	};
	
	// actionsheet
	exports.sheet = function(title, btns,func){
		if(title && btns && btns.length > 0){
			var btnArray = [];
			for(var i=0; i<btns.length; i++){
				btnArray.push({title:btns[i]});
			}
			
			plus.nativeUI.actionSheet({
				title : title,
				cancel : '取消',
				buttons : btnArray
			}, function(e){
				if(func) func(e);
			});
		}
	};
	
	// 提示框相关
	exports.modaloptions = {
		title 	: 'title',
		abtn	: '确定',
		cbtn	: ['确定','取消'],
		content	: 'content'
	};
	exports.alert = function(options, ok){
		var opt = $.extend({}, exports.modaloptions);
		
		opt.title = '提示';
		if(typeof options == 'string'){
			opt.content = options;
		}else{
			$.extend(opt, options);
		}
		
		plus.nativeUI.alert(opt.content, function(e){
			if(ok) ok();
		}, opt.title, opt.abtn);
	};
	exports.confirm = function(options, ok, cancel){
		var opt = $.extend({}, exports.modaloptions);
		
		opt.title = '确认操作';
		if(typeof options == 'string'){
			opt.content = options;
		}else{
			$.extend(opt, options);
		}
		
		plus.nativeUI.confirm(opt.content, function(e){
			var i = e.index;
			if(i == 0 && ok) ok();
			if(i == 1 && cancel) cancel();
		}, opt.title, opt.cbtn);
	};
	exports.prompt = function(options, ok, cancel){
		var opt = $.extend({}, exports.modaloptions);
		
		opt.title = '输入内容';
		if(typeof options == 'string'){
			opt.content = options;
		}else{
			$.extend(opt, options);
		}
		
		plus.nativeUI.prompt(opt.content, function(e){
			var i = e.index;
			if(i == 0 && ok) ok(e.value);
			if(i == 1 && cancel) cancel(e.value);
		}, opt.title, opt.content, opt.cbtn);
	};
	
	// 以下为插件封装------------------------------------------------------------------------------
	// 本地存储相关
	exports.length = function(){
		return plus.storage.getLength();
	};
	exports.key = function(i){
		return plus.storage.key(i);
	};
	exports.getItem = function(key){
		if(key){
			for(var i=0; i<exports.length(); i++) {
				if(key == plus.storage.key(i)){
					return plus.storage.getItem(key);
				}
			};
		}
		
		return null;
	};
	exports.insertItem = function(key, value){
		plus.storage.setItem(key, value);
	};
	exports.delItem = function(key){
		plus.storage.removeItem(key);
	};
	exports.clear = function(){
		plus.storage.clear();
	};
	
	// web sql
	exports.db = function(name, size){
		var db_name = name ? name : 'db_test';
		var db_size = size ? size : 2;
		
		return openDatabase(db_name, '1.0', 'db_test', db_size * 1024 * 1024);
	};
	exports.update = function(db, sql){
		if(db &&sql) db.transaction(function(tx){tx.executeSql(sql);});
	};
	exports.query = function(db, sql, func){
		if(db && sql){
			db.transaction(function(tx){
				tx.executeSql(sql, [], function(tx, results) {
					func(results);
				}, null);
			});
		}
	};
	
	// 以下为功能封装------------------------------------------------------------------------------
	// 退出
	exports.exit = function(){
		exports.confirm('确定要退出吗？', function(){
			plus.runtime.quit();
		});
	};
	// 刷新
	exports.endDown = function(selector){
		var sel = selector ? selector : '#refreshContainer';
		mui(sel).pullRefresh().endPulldownToRefresh();
	};
});