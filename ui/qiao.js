var qiao = {};
qiao.eventUtil = {
	// 添加事件
	addHandler : function(element, type, handler){
		if(element.addEventListener){
			element.addEventListener(type, handler, false);
		}else if(element.attachEvent){
			element.attachEvent('on' + type, handler);
		}else{
			element['on' + type] = handler;
		}
	},
	
	// 移除事件
	removeHandler : function(element, type, handler){
		if(element.removeEventListener){
			element.removeEventListener(type, handler, false);
		}else if(element.detachEvent){
			element.detachEvent('on' + type, handler);
		}else{
			element['on' + type] = null;
		}
	},
	
	// 得到事件
	getEvent : function(event){
		return event ? event : window.event;
	},
	
	// 得到对象
	getTarget : function(event){
		return event.target || event.srcElement;
	},
	
	// 阻止默认行为
	preventDefault : function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	},
	
	// 停止事件传播
	stopPropagation : function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	},
	
	// 得到相关对象
	getRelatedTarget : function(event){
		if(event.relatedTarget){
			return event.relatedTarget;
		}else if(event.toElement){
			return event.toElement;
		}else if(event.fromElement){
			return event.fromElement;
		}else{
			return null;
		}
	},
	
	// 返回鼠标按键，0左键，1中间，2右键
	getButton : function(event){
		if(document.implementation.hasFeature('MouseEvents','2.0')){
			return event.button;
		}else{
			switch(event.button){
				case 0 :
				case 1 :
				case 3 :
				case 5 :
				case 7 :
					return 0;
				case 2 :
				case 6 :
					return 2;
				case 4 :
					return 1;
			}
		}
	},
	
	// 返回鼠标滚动增量
	getWheelDelta : function(event){
		if(event.wheelDelta){
			return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
		}else{
			return -event.detail * 40;
		}
	},
	
	// 得到按键代码
	getCharCode : function(event){
		if(typeof event.charCode == 'number'){
			return event.charCode;
		}else{
			return event.keyCode;
		}
	}
};

/**
 * 对mui以及nativejs相关封装
 * 1.提示框
 * 2.本地存储
 * 3.退出
 * 4.websql
 */
qiao.h = {};

// 提示框相关
qiao.h.tip = function(msg){
	mui.toast(msg);
};
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