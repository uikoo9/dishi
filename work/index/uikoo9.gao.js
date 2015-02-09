// js引入相关--------------------------------------------------------------------------------------------------------------------------
/**
 * js的使用和引入
 */ 
<script type="text/javascript">
	// some js code
</script>
<script type="text/javascript" src="demo.js"></script>

/**
 * noscript的使用
 */ 
<noscript>
	<p>您没有开启js功能！</p>
</noscript>

// 操作符，语句，函数----------------------------------------------------------------------------------------------------------------------
/**
 * typeof
 */ 
var msg = "china";
alert(typeof msg);	// string
alert(typeof 95);	// number
alert(typeof true);	// boolean
alert(typeof h);	// undefined

/**
 * instanceof
 */ 
alert(person instanceof Object);

/**
 * 相等操作符
 * 1.==和!=会先进行强制转换再比较
 * 2.===和!==不会进行强制转换		
 */ 
alert('55' == 55);	// true
alert('55' === 55);	// false

/**
 * for-in语句
 * 类似java中的for(String s : ss)
 */ 
for(var propName in window){
	alert(propName);
}

/**
 * label语句
 */ 
var labelNum = 0;

outermost:
for(var i=0; i<10; i++){
	for(var j=0; j<10; j++){
		if(i==5 && j==5){
			break outermost;
			// continue outermost;
		}
		num++;
	}
}

/**
 * 函数参数
 */ 
function doAdd(){
	if(arguments.length == 1){
		alert(arguments[0] + 10);
	}else if(arguments.length == 2){
		alert(arguments[0] + arguments[1]);
	}
}

// 五个基本类型------------------------------------------------------------------------------------------------------------------------------
/**
 * Undefined类型
 * 1.Undefined类型只有一个值，undefined
 */ 
var sex;

alert(sex);		//undefined
alert(age);		//error

alert(typeof sex);	//undefined
alert(typeof age);	//undefined

/**
 * Null类型
 * 1.Null类型只有一个值，null
 * 2.初始化变量时，最好设为null
 * 3.undefined派生自null
 */ 
alert(null == undefined);	//true
alert(null === undefined);	//false

/**
 * Boolean类型
 * 1.只有两个值，true和false
 * 2.可以使用Boolean()将变量转换为Boolean类型，或者使用！！
 */ 
// 各种变量与Boolean的转换
/*
			true	false
String		非空		""
Number		非0		0和NaN
Oject		非空		null
Undefined	-		undefined
 */
alert(Boolean(""));			//false
alert(!!"");				//false
alert(Boolean(0));			//false
alert(!!0);					//false
alert(Boolean(null));		//false
alert(!!null);				//false
alert(Boolean(undefined));	//false
alert(!!undefined);			//false

/**
 * Number类型
 * 1.最小值：Number.MIN_VALUE
 * 2.最大值：Number.MAX_VALUE
 * 3.NaN：非数值，js中除0不报错而返回NaN，用isNaN()可以判断
 * 4.数值转换：Number(),parseInt(),parseFloat()
 */ 
var a = 0.1;
var b = 0.2;
alert(a+b == 0.3);	//false

alert(isNaN(10));	//false

/**
 * String类型
 * 1.length，长度属性
 * 2.String()：null返回null，undefined返回undefined其余调用toString()
 */ 
var num = 10;
alert(num.toString()); 		// "10"
alert(num.toString(2)); 	// "1010"
alert(num.toString(8));		// "12"
alert(num.toString(16));	// "a"

var tonull = null;
var toun = undefined;
alert(String(tonull));	// "null"
alert(String(toun));	// "toun"

// 引用类型---------------------------------------------------------------------------------------------------------------------------------
/**
 * 引用类型
 * 1.可以动态的添加属性
 * 2.复制变量仅仅是复制了引用
 * 3.Object，Array，Date，RegExp，Function，基本包装类型（Boolean，Number，String），单体内置对象（Global，window，Math，）
 */ 
/**
 * Object类型
 * 1.方法介绍
 * 2.两种添加属性的办法
 */ 
var o = new Object();
o.hasOwnProperty('');		// 是否有某个属性
o.isPrototypeOf(o);			// 是否是某个对象的原型
o.propertyIsEnumerable('');	// 判断属性是否可以循环
o.toLocaleString();
o.toString();
o.valueOf();

o.name = '';
var oo = {
	name : ''
};

/**
 * Array类型
 * 1.数组的创建
 * 2.长度
 * 3.检测数组
 * 4.转换方法
 * 5.栈方法
 * 6.队列方法
 * 7.排序方法
 * 8.操作方法
 * 9.位置方法
 * 10.迭代方法
 */ 
// 数组的创建
var colors = new Array();
var colors = new Array(3);
var colors = new Array("1","2","3");

var colors = [1,2,3];
var colors = [];

var colors = [1,2,3];
colors.length = 2;
alert(colors[3]);	//undefined

// 数组添加项
var colors = [1,2,3];
colors[colors.length] = 4;
colors[colors.length] = 5;

// 检测数组
value instanceof Array
Array.isArray(value)	//较高浏览器支持

// 转换方法
var colors = [1,2,3];
alert(colors.toString());
alert(colors.valueOf());
alert(colors);				// 这三种结果都是1,2,3

// 栈方法
var colors = new Array();
colors.push(1,2);
alert(colors.length);	//2
alert(colors.pop());	//2
alert(colors.length);	//1

// 队列方法
var colors = new Array();
colors.push(1,2);
alert(colors.length);	//2
alert(colors.shift());	//1
colors.unshift(3);
alert(colors.length);	//2

// 排序方法
var values = [1,5,10,15];
values.sort();
alert(values);		//1,10,15,5
values.reverse();
alert(values);		//5,15,10,1

function compare(value1,value2){
	if(value1 < value2){
		return -1;
	}else if(value1 > value2){
		return 1;
	}else{
		return 0;
	}
}
values.sort(compare);

// 操作方法
var colors = [1,2];
alert(colors.concat(3));	// 1,2,3

var colors = [1,2,3,4];
alert(colors.slice(1, 3));	// 2,3 1<=x<3

// 位置方法
var colors = [1,2,3,4];
alert(colors.indexOf(3));		//2	查找3的位置
alert(colors.lastIndexOf(3));	//1	从末尾查找3的位置

// 迭代方法
var numbers = [1,2,3,4,5];
var every = numbers.every(function(item,index,array){
	return item > 1;
});
alert(every);	// false	evey就是每项都true才true

var some = numbers.some(function(item,index,array){
	return item > 4;
});
alert(some);	// true		some就是一项为true就true

var filter = numbers.filter(function(item,index,array){
	return item > 3;
}); 
alert(filter);	// 4,5		返回为true的项

var map = numbers.map(function(item,index,array){
	return item + 1;
});
alert(map);		// 2,3,4,5,6	返回函数操作后的结果

numbers.forEach(function(item,index,array){
	alert(1);	// 对每项进行操作
});

// 缩小方法
numbers.reduce();		
numbers.reduceRight();

/**
 * Date类型
 * 1.创建对象
 * 2.now()
 * 3.时间格式化方法
 * 4.其他方法
 */
// 1.创建对象
var date = new Date();
var date = new Date(Date.parse('May 25, 2004'));	// 必须传入毫秒数
var date = new Date(Date.UTC(year, month, day, hour, min, sec, ms));

// 2.当前时间
var start = Date.now();	// 高版本浏览器支持，慎用

// 3.时间格式化方法
toDateString();
toTimeString();
toLocaleDateString();
toLocaleTimeString();
toUTCString();

// 4.其他方法
getTime();	// ms
getFullYear();
getMonth();
getDate();
getDay();
getHours();
getMinutes();
getSeconds();
getMilliseconds();
getTimezoneOffset();	// 以上方法都有对应的set方法和UTC方法

/**
 * RegExp类型
 * 1.创建
 * 2.模式，三种：g，i，m
 * 3.属性
 * 4.方法
 */

// 1.创建
var ee = /pattern/flags;

// 2.模式
var ee = /patter/g;	// 全局
var ee = /patter/i;	// 不区分大小写
var ee = /patter/m;	// 多行

// 3.属性
var ee = /\[bc\]at/i;
alert(ee.global);		// 是否g模式
alert(ee.ignoreCase);	// 是否i模式
alert(ee.multiline);	// 是否m模式
alert(ee.lastIndex);	// 搜索下一个匹配项的字符位置
alert(ee.source);		// 正则表达式字符串

// 4.方法
var text = 'mom and dad and baby';
var pattern = /mom( and dad( and baby)?)?/gi;
var matches = pattern.exec(text);
alert(matches.index);	// 匹配的位置
alert(matches.input);	// 匹配的文字

/**
 * Function类型
 * 1.创建
 * 2.声明
 * 3.技巧
 * 4.属性
 * 5.length
 * 6.apply()和call()
 */
// 1.创建
function sum(){
	// do something
}
var sum = function(){
	// do something
};

// 2.声明
alert(sum(1,2));		// 正确
function sum(v, vv){
	return v + vv;
}

alert(sum(1,2));		// 会报错
var sum = function(v, vv){
	return v + vv;
};

// 3.技巧
function cc(name){
	return function(o1,o2){
		var v1 = o1[name];
		var v2 = o2[name];
		
		if(v1 < v2){
			return -1;
		}else if(v1 > v2){
			return 1;
		}else{
			return 0;
		}
	};
}
var data = [{name:'a'},{name:'b'}];
data.sort(cc('name'));

// 4.属性
function cc(num){	// 存在耦合
	if(num <= 1){
		return 1;
	}else{
		return num * cc(num - 1);
	}
}
function cc(num){	// arguments.callee代替了函数名
	if(num <= 1){
		return 1;
	}else{
		return num * arguments.callee(num - 1);
	}
}

// 5.length
function aa(){}
function bb(v1){}
function cc(v1,v2){}
alert(aa.length);	// 0
alert(bb.length);	// 1
alert(cc.length);	// 2

// 6.apply()和call()
function sum(num1,num2){
	return num1 + num2;
}
function summ(num1,num2){
	return sum.apply(this,arguments);
	return sum.apply(this,[num1,num2]);
	return sum.call(this,num1,num2);
}

/**
 * 基本包装类型：Boolean，Number，String
 * 1.Number的方法
 * 2.String的方法
 */
// 1.Number的方法
var num = 10;
alert(num.toFixed(2));			// 10.00
alert(num.toExponential(1));	// 1.0e+1

// 2.String的方法
var ss = "vvvv";
alert(ss.length);
alert(ss.charAt(1));
alert(ss.charCodeAt(1));
alert(ss.concat(1,2));	
alert(ss.slice(3, 7));
alert(ss.substring(3, 7));
alert(ss.substr(3,7));
alert(ss.indexOf('v'));
alert(ss.lastIndexOf('vv'));
alert();

/**
 * 单体内置对象
 * 1.Global对象
 * 2.Math对象
 */
// 1.Global对象
var uri = "http://www.wrox.com/illegal value.htm#start";
alert(encodeURI(uri));			// http://www.wrox.com/illegal%20value.htm#start，对应decodeURI()
alert(encodeURIComponent(uri));	// http%3A%2%2Fwww.wrox.com%2Fillegal%20value.htm%23start,这个方法使用比较多，对应decodeURIComonent()

var msg = "haha";
eval('alert(msg)');	// haha

// 2.Math对象
Math.max(args);
Math.min(args);
Math.ceil(25.9);	// 向上舍入，26
Math.floor(25.9);	// 向下舍入，25
Math.round(x);		// 四舍五入
Math.random();		// 公式：Math.floor(Math.random() * 可能值的总数  + 第一个可能的值);

// BOM---------------------------------------------------------------------------------------------------------------------------------
/**
 * window对象
 * 1.窗口及框架
 * 2.窗口位置
 * 3.窗口大小
 * 4.打开窗口
 * 5.判断弹出窗口是否被拦截
 * 6.间歇调用和超时调用
 * 7.系统对话框
 * 8.location对象
 * 9.navigator对象
 * 10.其他
 */
// 1.窗口及框架
window.frames[0]
window.frames["topFrame"]
top.frames[0]
top.frames["topFrame"]
frames[0]
frames["topFrame"]

// 2.窗口位置，获取窗口左边和上边，另外还有moveTo(),moveBy()方法
var leftPos = (typeof window.screenLeft == 'number') ? window.screenLeft : window.screenX;
var rightPos = (typeof window.screenTop == 'number') ? window.screenTop : window.screenY;

// 3.窗口大小，另外还有resizeTo(),resizeBy()方法
var pageWidth = window.innerWidth;
var pageHeight = window.innerHeight;

if(typeof pageWidth != 'number'){
	if(document.compatMode == 'CSS1Compat'){
		pageWidth = document.documentElement.clientWidth;
		pageHeight = document.documentElement.clientHeight;
	}else{
		pageWidth = document.body.clientWidth;
		pageHeight = document.body.clientHeight;
	}
}

// 4.打开窗口
window.open(url,target,str,boolean);
target : 可以为框架的name或者为：_self,_parent,_top,_blank
str : 
	height
	left
	top
	width
	fullscreen
	location
	menubar
	resizable
	scrollbars
	status
	toolbar
还可以是用win.close();方法关闭窗口

// 5.判断弹出窗口是否被拦截
var blocked = false;
try {
	var wroxWin = window.open('http://www.baidu.com','_blank');
	if(wroxWin == null){
		blocked = true;
	}
} catch(e){
	blocked = true;
}

if(blocked){
	alert('弹出窗口被拦截了！');
	
}

// 6.间歇调用和超时调用
// 超时调用
var timeoutId = setTimeout(function(){
	alert('nihao');
},1000);
clearTimeout(timeoutId);
// 间歇调用
var num = 0;
var max = 10;
var intervalId = null;

function incrementNumber(){
	num++;
	
	if(num == max){
		clearInterval(intervalId);
		alert('Done');
	}
}

intervalId = setInterval(incrementNumber, 500);

// 推荐用法
var num = 0;
var max = 10;
var intervalId = null;

function incrementNumber(){
	num++;
	
	if(num < max){
		setTimeout(incrementNumber, 500);
	}else{
		alert('Done');
	}
}

setTimeout(incrementNumber, 500);

// 7.系统对话框
alert();
confirm();
prompt();
// 以上三个是同步的，会组织js运行

find();
print();
// 这两个是异步的

// 8.location对象
// window.location 和 document.location是相同的
/**
 * 属性：
 * 1.hash		'#contents'
 * 2.host		'www.wrox.com:80'
 * 3.hostname	'www.wrox.com'
 * 4.href		'http://www.worx.com'
 * 5.pathname	'/wiley/'
 * 6.port		8080
 * 7.protocol	'http:'
 * 8.search		'?q=javascript'
 */
// 得到查询字符串参数
function getQueryStringArgs(){
	var qs = (location.search.length > 0 ? location.search.substring(1) : '');
	var args = {};
	var items = qs.length ? qs.split('&') : [];
	var item = null;
	var name = null;
	var value = null;
	var i = 0;
	var len = items.length;
	
	for(i=0; i < len; i++){
		item = items[i].split('=');
		name = decodeURIComponent(item[0]);
		value = decodeURIComponent(item[1]);
		
		if(name.length){
			args[name] = value;
		}
	}
	
	return args;
}

// assign()
location.assign('http://www.baidu.com');
window.location = 'http://www.baidu.com';
location.href = 'http://www.baidu.com';

replace();// 不会产生历史记录
location.reload(); // 加载
location.reload(true); // 从服务器加载

// 9.navigator对象
// 非ie检测插件
function hasPlugin(name){
	name = name.toLowerCase();
	for(var i=0; i< navigator.plugins.length; i++){
		if(navigator.plugins[i].name.toLowerCase().indexOf(name) > -1){
			return true;
		}
	}
	
	return false;
}
// ie检测插件
function hasIEPlugin(name){
	try{
		new ActiveXObject(name);
		return true;
	}catch(ex){
		return false;
	}
}
// 综合检测插件
function hasFlash(){
	var res = hasPlugin('Flash');
	if(!res){
		res = hasIEPlugin('ShockwaveFlash.ShockwaveFlash');
	}
	
	return res;
}

// 10.其他
// 注册处理程序
navigator.registerContentHandler('application/rss+xml','http://www.somereader.com?feed=%s','some reader');
navigator.registerProtocolHandler('mailto','http://www.somemail.com?cmd=%s','some mail');

// screen对象
window.resizeTo(screen.availWidth, screen.availHeight);

// history对象
history.go(-1);			// 后退
history.go(1); 			// 前进
history.go('baidu.com');// 最近的baidu.com页面
history.back();			// 后退
history.forward();		// 前进
history.length			// 历史记录数

// 客户端检测---------------------------------------------------------------------------------------------------------------------------------
/**
 * 1.能力检测
 * 2.怪癖检测
 * 3.浏览器检测
 */
// 是否可以使用getElement
function getElement(id){
	if(document.getElementById){
		return document.getElementById(id);
	}else if(document.all){
		return document.all[id];
	}else{
		throw new Error('error');
	}
}

// 是否支持某些方法
function isHostMethod(object, property){
	var t = typeof object[property];
	return t=='function' || (!!(t=='object' && object[property])) || t=='unknown';
}

// 是否支持Netscape插件
var hasNSPlugins = !!(navigator.plugins && navigator.plugins.length);

// 确定是否具有DOM1级能力
var hasDOM1 = !!(document.getElementById && document.createElement && document.getElementByTagName);

// 怪癖检测
var hasDontEnumQuick = function(){
	var o = {toString : function(){}};
	for(var prop in o){
		if(prop == 'toString'){
			return false;
		}
	}
	
	return true;
}();
var hasEnumShadowsQuirk = function(){
	var o = {toString : function(){}};
	var count = 0;
	for(var prop in o){
		if(prop == 'toString'){
			count++
		}
	}
	
	return (count > 1);
}();

// 3.浏览器检测
var client = function(){
	// 呈现引擎
	var engine = {
		ie : 0,
		gecko : 0,
		webkit : 0,
		kthml : 0,
		opera : 0,
		
		ver : null
	};
	
	// 浏览器
	var browser = {
		ie : 0,
		firefox : 0,
		safari : 0,
		kong : 0,
		opera : 0,
		chrome : 0,
		
		ver : null
	};
	
	// 平台，设备和操作系统
	var system = {
		win : false,
		mac : false,
		x11 : false,
		
		// 移动设备
		iphone : false,
		ipod : false,
		ipad : false,
		ios : false,
		android : false,
		nokiaN : false,
		winMobile : false,
		
		// 游戏系统
		wii : false,
		ps : false
	};
	
	// 检测呈现引擎和浏览器
	var ua = navigator.userAgent;
	if(window.opera){
		engine.ver = browser.ver = window.opera.version();
		engine.opera = browser.opera = parseFloat(engine.ver);
	}else if(/AppleWebkit\/(\S+)/.test(ua)){
		engine.ver = RegExp['$1'];
		engine.webkit = parseFloat(engine.ver);
		
		// 确定是chrome还是safari
		if(/Chrome\/(\S+)/.test(ua)){
			browser.ver = RegExp['$1'];
			browser.chrome = parseFloat(browser.ver);
		}else if(/Version\/(\S+)/.test(ua)){
			browser.ver = RegExp['$1'];
			browser.safari = parseFloat(browser.ver);
		}else{
			// 近似地确定版本
			var safariVersion = 1;
			if(engine.webkit < 100){
				safariVersion = 1;
			}else if(engine.webkit < 312){
				safariVersion = 1.2;
			}else if(engine.webkit < 412){
				safariVersion = 1.3;
			}else{
				safariVersion = 2;
			}
			
			browser.safari = browser.ver = safariVersion;
		}
	}else if(/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){
		engine.ver = browser.ver = RegExp['$1'];
		engine.khtml = browser.konq = parseFloat(engine.ver);
	}else if(/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){
		engine.ver = RegExp['$1'];
		engine.gecko = parseFloat(engine.ver);
		
		// 确定是不是Firefox
		if(/Firefox\/(\S+)/.test(ua)){
			browser.ver = RegExp['$1'];
			browser.firefox = parseFloat(browser.ver);
		}
	}else if(/MSIE ([^;]+)/.test(ua)){
		engine.ver = browser.ver = RegExp['$1'];
		engine.ie = browser.ie = parseFloat(engine.ver);
	}
	
	// 检测浏览器
	browser.ie = engine.ie;
	browser.opera = engine.opera;
	
	// 检测平台
	var p = navigator.platform;
	system.win = p.indexOf('win') == 0;
	system.mac = p.indexOf('Mac') == 0;
	system.x11 = (p == 'X11') || (p.indexOf('Linux') == 0);
	
	// 检测Windows操作系统
	if(system.win){
		if(/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
			if(RegExp('$1') == 'NT'){
				switch(RegExp('$2')){
					case '5.0' : 
						system.win = '2000';
						break;
					case '5.1' : 
						system.win = 'XP';
						break;
					case '6.0' : 
						system.win = 'Vista';
						break;
					case '6.1' : 
						system.win = '7';
						break;
					default : 
						system.win = 'NT';
						break;
				}
			}else if(RegExp['$1'] == '9x'){
				system.win = 'ME';
			}else{
				system.win = RegExp['$1'];
			}
		}
	}
	
	// 移动设备
	system.iphone = ua.indexOf('iPhone') > -1;
	system.ipod = ua.indexOf('iPod') > -1;
	system.ipad = ua.indexOf('iPad') > -1;
	system.nokiaN = ua.indexOf('NokiaN') > -1;
	
	// windows mobile
	if(system.win == 'CE'){
		system.winMobile = system.win;
	}else if(system.win == 'Ph'){
		if(/Winodw Phone OS (\d+.\d+)/.test(ua)){
			system.win = 'Phone';
			system.winMobile = parseFloat(RegExp['$1']);
		}
	}
	
	// 检测iOS版本
	if(system.mac && ua.indexOf('Mobile') > -1){
		if(/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)){
			system.ios = parseFloat(RegExp.$1.replace('_', '.'));
		}else{
			system.ios = 2;// 不能正真检测出来，所以只能猜测
		}
	}
	
	// 检测Android版本
	if(/Android (\d+\.\d+)/.test(ua)){
		system.android = parseFloat(RegExp.$1);
	}
	
	// 游戏系统
	system.wii = ua.indexOf('Wii') > -1;
	system.ps = /playstation/i.test(ua);
	
	// 返回这些对象
	return {
		engine : engine,
		browser : browser,
		system : system
	};
}();

// DOM---------------------------------------------------------------------------------------------------------------------------------
/**
 * 1.Node类型
 * 2.Document类型
 * 3.Element类型
 * 4.Text类型
 * 5.Comment类型
 * 6.CDATASection类型
 * 7.DocumentType类型
 * 8.DocumentFragment类型
 * 9.Attr类型
 * 10.动态脚本
 * 11.动态样式
 * 12.操作表格
 * 13.NodeList
 */
// 1.Node类型
// NodeType
if(node.nodeType == Node.ELEMENT_NODE){// 非ie
	alert();
}
if(node.nodeType == 1){// 所有浏览器，与上相同
	alert();
}

// nodeName,nodeValue
if(node.nodeType == 1){
	value = node.nodeName;
}

// childNodes
var ss = node.childNodes[i];
var ss = node.childNodes.item(i);
var count = node.childNodes.length;

// childNodes to array
function convertToArray(nodes){
	var array = null;
	try{
		array = Array.prototype.slice.call(nodes,0);
	}catch(e){
		array = new Array();
		for(var i=0,len=nodes.length; i<len; i++){
			array.push(nodes[i]);
		}
	}
	
	return array;
}

// childNodes其他属性
node.parentNode;
node.nextSibling;
node.previousSibling;
pnode.childNodes[0] == pnode.firstChild;
pnode.childNodes[pnode.childNodes.length - 1] = pnode.lastChild;

// appendChild()
pnode.appendChild(node); // 返回node

// insertBefore()
pnode.insertBefore(node,pnode.firstNode);// 插入到第一个node前

// replaceChild()
pnode.replaceChild(node,pnode.firstNode);// 将替换第一个node

// removeChild()
pnode.removeChild(pnode.firstNode);// 移除第一个node，并返回

// cloneNode()
node.cloneNode(false);// 不复制子节点
node.cloneNode(true);// 包括复制子节点

// normalize()
pnode.normalize();// 在子节点中找到空文本节点并移除

// 2.Document类型
// 属性
document.nodeType 			// 9
document.nodeName 			// #document
document.documentElement 	// <html>
document.body				// <body>
document.title				// <title>
document.URL				// url
document.domain				// domain
document.referrer			// referrer

// 方法
document.getElementById(id);
document.getElementsByName(name);
var images = document.getElementsByTagName('img');
images.length;
images[0].src;
images.item(0).src;
images.namedItem('name');
images[i];// 数字调用item(),字符串调用namedItem()

// 集合
document.anchors; 	// 有name的<a>
document.links;		// 有href的<a>
document.forms;
document.images;

// 一致性检测
document.implementation.hasFeature(feature, version);

// 文档写入
document.write(text);
document.writeln(text);
document.open();
document.close();

// 3.Element类型
// 属性
var div = document.getElementById('myDiv');
alert(div.id);
alert(div.className);
alert(div.title);
alert(div.lang);
alert(div.dir);

// 特性
var div = document.getElementById('myDiv');
alert(div.getAttribute('id'));
alert(div.getAttribute('class'));
alert(div.getAttribute('title'));
alert(div.getAttribute('lang'));
alert(div.getAttribute('dir'));
alert(div.getAttribute('mine'));
// 一般都使用属性，只有涉及到自定义的特性才使用特性

// attributes属性
function outputAttributes(element){
	var pairs = new Array();
	var attrName,attrValue,i,len;
	
	for(i=0, len=element.attributes.length; i<len; i++){
		attrName = element.attributes[i].nodeName;
		attrValue = element.attributes[i].nodeValue;
		if(element.attributes[i].specified){
			pairs.push(attrName + '=\'' + attrValue + '\'');
		}
	}
	
	return pairs.join(' ');
}

// 创建元素
var div = document.createElement('div');
if(client.browser.ie && client.browser.ie <= 7){// 适用于低于ie7的版本
	var iframe = document.createElement('<iframe name=\'myiframe\'></iframe>');
	var input = document.createElement('<input type=\'checkbox\'/>');
	var button = document.createElement('button type=\'reset\'/>');
	var radio1 = document.createElement('<input type=\'radio\' name=\'choice\' value=\'1\'');
	var radio1 = document.createElement('<input type=\'radio\' name=\'choice\' value=\'2\'');
}

// 元素子节点
for(var i=0, len=element.childNodes.length; i<len; i++){
	if(element.childNodes[i].nodeType == 1){
		// ....
	}
}

// 4.Text类型
var element = document.createTextNode('hello');
element.normalize();// 将文本节点合并
var text = element.splitText(5);// 将文本节点分隔

// 5.Comment类型
var comment = document.createComment('comment');

// 6.CDATASection类型
var cd = document.createCDATASection('');//xml中

// 7.DocumentType类型
alert(document.doctype.name);// 'HTML'

// 8.DocumentFragment类型
var fragment = document.createDocumentFragment();
var ul = document.getElementById('myul');
var li = null;

for(var i=0; i<3; i++){
	li = document.createElement('li');
	li.appendChild(document.createTextNode(i+1));
	fragment.appendChild(li);
}
ul.appendChild(fragment);
// 可以避免多次渲染文档

// 9.Attr类型
var attr = document.createAttribute('align');
attr.value = 'left';
element.setAttributeNode(attr);

// 10.动态脚本
// 外部
function loadScript(url){
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	
	document.body.appendChild(script);
}
// 内部
function loadScriptString(code){
	var script = document.createElement('script');
	script.type = 'text/javascript';
	try{
		script.appendChild(document.createTextNode(code));
	}catch(e){
		script.text = code;
	}
	
	document.body.appendChild(script);
}

// 11.动态样式
// 外部
function loadStyles(url){
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = url;
	
	var head = document.getElementsByName('head')[0];
	head.appendChild(link);
}
// 内部
function loadStyleString(css){
	var style = document.createElement('style');
	style.type = 'text/css';
	try{
		style.appendChild(document.creatTextNode(css));
	}catch(e){
		style.styleSheet.cssText = css;
	}
	
	var head = document.getElementsByName('head')[0];
	head.appendChild(style);
}

// 操作表格
var table = document.createElement('table');
table.border = 1;
table.width = '100%';

var tbody = document.createElement('tbody');
table.appendChild(tbody);

tbody.insertRow(0);
tbody.rows[0].insertCell(0);
tbody.rows[0].cells[0].appendChild(document.createElement('cell 1.1'));
tbody.rows[0].insertCell(1);
tbody.rows[0].cells[1].appendChild(document.createElement('cell 2.1'));

tbody.insertRow(1);
tbody.rows[1].insertCell(0);
tbody.rows[1].cells[0].appendChild(document.createElement('cell 1.2'));
tbody.rows[1].insertCell(1);
tbody.rows[1].cells[1].appendChild(document.createElement('cell 2.2'));

document.body.appendChild(table);

// 13.NodeList
// NodeList,NamedNodeMap,HTMLCollection都是动态的，所以以下代码会造成死循环
var divs = document.getElementsByTagName('div');
var i,div;

for(i=0; i<div.length; i++){
	div = document.createElement('div');
	document.body.appendChild(div);
}

// DOM扩展---------------------------------------------------------------------------------------------------------------------------------
/**
 * 1.选择符API
 * 2.HTML5
 */
// 1.选择符API
var div = document.querySelector('#div');
var divs = document.querySelectorAll('div');
var flag = div.matchesSelector('#div');// true

// 2.HTML5
var divs = document.getElementByClassName('.div');
div.classList.remove('test');
div.classList.add('test');
div.classList.toggle('test');
div.classList.contains('test');

var focus = document.activeElement;
var flag = document.hasFocus();
var ready = document.readyState;// loading，complete
var head = document.head;
var charset = document.charset;
var appId = div.dataset.appId;// data-appId="1"

// 插入标记
element.innerHTML;
element.outerHTML;
element.insertAdjacentHTML();

element.scrollIntoView();

// 事件---------------------------------------------------------------------------------------------------------------------------------
var EventUtil = {
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
