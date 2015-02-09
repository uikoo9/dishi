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
 */
qiao.h = {};
qiao.h.length = function(){
	return plus.storage.getLength();
};
qiao.h.key = function(i){
	return plus.storage.key(i);
};
qiao.h.insertItem = function(key, value){
	plus.storage.setItem(key, value);
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
qiao.h.clear = function(){
	plus.storage.clear();
};