var qiao = {};
qiao.on = function(obj, event, func){
	$(document).off(event, obj).on(event, obj, func);
};

// 对mui以及nativejs相关封装
qiao.h = {};

// nativeui相关
qiao.h.tip = function(msg, options){
	mui.toast(msg, options);
};

// 提示框相关
qiao.h.modaloptions = {
	title 	: 'title',
	abtn	: '确定',
	cbtn	: ['确定','取消'],
	content	: 'content'
	
};
qiao.h.alert = function(options, ok){
	var opt = $.extend({}, qiao.h.modaloptions);
	
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
qiao.h.confirm = function(options, ok, cancel){
	var opt = $.extend({}, qiao.h.modaloptions);
	
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
qiao.h.prompt = function(options, ok, cancel){
	var opt = $.extend({}, qiao.h.modaloptions);
	
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

// 本地存储相关
qiao.h.length = function(){
	return plus.storage.getLength();
};
qiao.h.key = function(i){
	return plus.storage.key(i);
};
qiao.h.getItem = function(key){
	if(key){
		for(var i=0; i<qiao.h.length(); i++) {
			if(key == plus.storage.key(i)){
				return plus.storage.getItem(key);
			}
		};
	}
	
	return null;
};
qiao.h.insertItem = function(key, value){
	plus.storage.setItem(key, value);
};
qiao.h.delItem = function(key){
	plus.storage.removeItem(key);
};
qiao.h.clear = function(){
	plus.storage.clear();
};

// 退出
qiao.h.exittime = null;
qiao.h.exit = function(){
	mui.back = function() {
		//首次按键，提示‘再按一次退出应用’
		if(!qiao.h.exittime){
			qiao.h.exittime = new Date().getTime();
			mui.toast('再按一次退出应用');
			setTimeout(function() {
				qiao.h.exittime = null;
			}, 1000);
		}else{
			if(new Date().getTime() - qiao.h.exittime < 1000){
				plus.runtime.quit();
			}
		}
	};
};

// web sql
qiao.h.db = function(name, size){
	var db_name = name ? name : 'db_test';
	var db_size = size ? size : 2;
	
	return openDatabase(db_name, '1.0', 'db_test', db_size * 1024 * 1024);
};
qiao.h.update = function(db, sql){
	if(db &&sql) db.transaction(function(tx){tx.executeSql(sql);});
};
qiao.h.query = function(db, sql, func){
	if(db && sql){
		db.transaction(function(tx){
			tx.executeSql(sql, [], function(tx, results) {
				func(results);
			}, null);
		});
	}
};

// 页面相关
qiao.h.currentPage = function(){
	return plus.webview.currentWebview();
};
qiao.h.getPage = function(id){
	return id ? plus.webview.getWebviewById(id) : null;
};
qiao.h.show = function(id ,flag){
	if(id){
		var view = plus.webview.getWebviewById(id);
		view.show();
		if(flag) view.reload(true);
	}
};
qiao.h.hide = function(id){
	if(id){
		plus.webview.hide(id);
	}
};