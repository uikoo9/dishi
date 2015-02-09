/** 
 * 将data属性转为js对象
 */
$.fn.qdata = function(){
	var res = {};
	
	var data = $(this).attr('data');
	if(data){
		var options = data.split(';');
		for(var i=0; i<options.length; i++){
			if(options[i]){
				var opt = options[i].split(':');
				res[opt[0]] = opt[1];
			}
		}
	}
	
	return res;
};

/** 
 * 生成二维码
 * text：待生成文字
 * type：中文还是英文，cn为中文
 * render：展示方式，table为表格方式
 * width：宽度
 * height：高度
 * 注：需要引入<@jsfile 'qrcode'/>
 */
$.fn.qcode = function(options){
	if(options){
		var opt = {};
		if(typeof options == 'string'){
			opt.text = options;
		}else{
			if(options.text) opt.text = options.text;
			if(options.type && options.type == 'ch') opt.text = qcodetochar(opt.text);
			if(options.render && options.render == 'table') opt.render = options.render;
			if(options.width) opt.width = options.width;
			if(options.height) opt.height = options.height;
		}

		$(this).qrcode(opt);
	}
};

/** 
 * 返回顶部方法
 */
$.fn.qtotop = function(options) {
	var $this = $(this);
	$this.hide().click(function(){
		$("body, html").animate({
			scrollTop : "0px"
		});
	});
	
	var $window = $(window);
	$window.scroll(function(){
		if ($window.scrollTop()>0){
			$this.fadeIn();
		}else{
			$this.fadeOut();
		}
	});
};

/**
 * 封装一些常用方法
 * 1.ajax
 * 2.html
 * 3.ajaxinit
 * 4.to
 * 5.on
 * 6.ue
 */
var qiao = {};

qiao.ajaxoptions = {
	url 	: '',
	data 	: {},
	type 	: 'post',
	dataType: 'json',
	async 	: false
};
qiao.ajaxopt = function(options){
	var opt = $.extend({}, qiao.ajaxoptions);
	if(typeof options == 'string'){
		opt.url = options;
	}else{
		$.extend(opt, options);
	}
	
	return opt;
};
qiao.ajax = function(options){
	if(!options){
		alert('need options');
	}else{
		var opt = qiao.ajaxopt(options);
		opt.url = base + opt.url;
		
		var res;
		$.ajax(opt).done(function(obj){res = obj;});
		return res;
	}
};
qiao.html = function(options, target){
	var opt = qiao.ajaxopt(options);
	opt.dataType = 'html';
	
	var obj = target ? target : '#cruddiv';
	$(obj).empty().append(qiao.ajax(opt));
};
qiao.ajaxinit = function(){
	qmask.hide();
	$(document).ajaxStart(function(){
		qmask.show();
	});
	$(document).ajaxStop(function(){
		qmask.hide();
	});
};
qiao.to = function(url){
	if(url){
		window.location.href = url;
	}else{
		alert('need url');
	}
};
qiao.on = function(obj, event, func){
	$(document).off(event, obj).on(event, obj, func);
};
qiao.ue = function(id, options){
	if(typeof(UE) != "undefined"){
		if(!options){
			return UE.getEditor(id);
		}else if(typeof options == 'string'){
			if(options == 'mini'){
				return UE.getEditor(id, {toolbars: [['bold','italic','underline','forecolor','backcolor','|','fontfamily','fontsize','|','removeformat','formatmatch','pasteplain','|','source','link','unlink']]});
			}
		}else{
			return UE.getEditor(id, options);
		}
	}
	
	return {};
};

/**
 * 对bootstrap的封装
 * 1.alert
 * 2.confirm
 * 3.dialog
 * 4.msg
 * 5.tooltip
 * 6.popover
 * 7.bstree
 * 8.scrollspy
 * 9.initimg
 * 10.bstro
 */
qiao.bs 	= {};
qiao.bs.modaloptions = {
	url 	: '',
	fade	: 'fade',
	close	: true,
	title	: 'title',
	btn		: false,
	okbtn	: '确定',
	qubtn	: '取消',
	msg		: 'msg',
	big		: false,
	show	: false,
	remote	: false,
	backdrop: 'static',
	keyboard: true,
	style	: ''
};
qiao.bs.modalstr = function(opt){
	var start = '<div class="modal '+opt.fade+'" id="bsmodal" tabindex="-1" role="dialog" aria-labelledby="bsmodaltitle" aria-hidden="true" style="position:fixed;top:20px;'+opt.style+'">';
	if(opt.big){
		start += '<div class="modal-dialog modal-lg"><div class="modal-content">';
	}else{
		start += '<div class="modal-dialog"><div class="modal-content">';
	}
	var end = '</div></div></div>';
	
	var head = '<div class="modal-header">';
	if(opt.close){
		head += '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
	}
	head += '<h3 class="modal-title" id="bsmodaltitle">'+opt.title+'</h3></div>';
	var body = '<div class="modal-body"><p><h4>'+opt.msg+'</h4></p></div>';
	var foot = '<div class="modal-footer"><button type="button" class="btn btn-primary bsok">'+opt.okbtn+'</button>';
	if(opt.btn){
		foot += '<button type="button" class="btn btn-default bscancel">'+opt.qubtn+'</button>';
	}
	foot += '</div>';
	
	return start + head + body + foot + end;
};
qiao.bs.alert = function(options, func){
	// options
	var opt = $.extend({}, qiao.bs.modaloptions);
	
	opt.title = '提示';
	if(typeof options == 'string'){
		opt.msg = options;
	}else{
		$.extend(opt, options);
	}
	
	// add
	$('body').append(qiao.bs.modalstr(opt));
	
	// init
	var $modal = $('#bsmodal'); 
	$modal.modal(opt);
	
	// bind
	qiao.on('button.bsok', 'click', function(){
		if(func) func();
		$modal.modal('hide');
	});
	qiao.on('#bsmodal', 'hidden.bs.modal', function(){
		$modal.remove();
	});
	
	// show
	$modal.modal('show');
};
qiao.bs.confirm = function(options, ok, cancel){
	// options
	var opt = $.extend({}, qiao.bs.modaloptions);

	opt.title = '确认操作';
	if(typeof options == 'string'){
		opt.msg = options;
	}else{
		$.extend(opt, options);
	}
	opt.btn = true;
	
	// append
	$('body').append(qiao.bs.modalstr(opt));
	
	// init
	var $modal = $('#bsmodal'); 
	$modal.modal(opt);
	
	// bind
	qiao.on('button.bsok', 'click', function(){
		if(ok) ok();
		$modal.modal('hide');
	});
	qiao.on('button.bscancel', 'click', function(){
		if(cancel) cancel();
		$modal.modal('hide');
	});
	qiao.on('#bsmodal', 'hidden.bs.modal', function(){
		$modal.remove();
	});
	
	// show
	$modal.modal('show');
};
qiao.bs.dialog = function(options, func){
	// options
	var opt = $.extend({}, qiao.bs.modaloptions, options);
	opt.big = true;
	
	// append
	$('body').append(qiao.bs.modalstr(opt));
	
	// ajax page
	var html = qiao.ajax({url:options.url, dataType:'html'});
	$('#bsmodal div.modal-body').empty().append(html);
	
	// init
	var $modal = $('#bsmodal'); 
	$modal.modal(opt);
	
	// bind
	qiao.on('button.bsok', 'click', function(){
		var flag = true;
		if(func){
			flag = func();
		}
		
		if(flag){
			$modal.modal('hide');
		}
	});
	qiao.on('#bsmodal', 'hidden.bs.modal', function(){
		$modal.remove();
	});
	
	// show
	$modal.modal('show');
};
qiao.bs.msgoptions = {
	msg  : 'msg',
	type : 'info',
	time : 2000
};
qiao.bs.msgstr = function(msg, type){
	return '<div class="alert alert-'+type+' alert-dismissible" role="alert" style="display:none;position:fixed;top:0;left:0;width:100%;z-index:2001;margin:0;text-align:center;" id="bsalert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+msg+'</div>';
};
qiao.bs.msg = function(options){
	var opt = $.extend({},qiao.bs.msgoptions);
	
	if(typeof options == 'string'){
		opt.msg = options;
	}else{
		$.extend(opt, options);
	}
	
	$('body').prepend(qiao.bs.msgstr(opt.msg,opt.type));
	$('#bsalert').slideDown();
	setTimeout(function(){
		$('#bsalert').slideUp(function(){
			$('#bsalert').remove();
		});
	},opt.time);
};
qiao.bs.popoptions = {
	animation 	: true,
	container 	: 'body',
	content		: 'content',
	html		: true,
	placement	: 'bottom',
	title		: '',
	trigger		: 'hover'//click | hover | focus | manual.
};
$.fn.bstip = function(options){
	var opt = $.extend({}, qiao.bs.popoptions);
	if(typeof options == 'string'){
		opt.title = options;
	}else{
		$.extend(opt, options);
	}
	
	$(this).data(opt).tooltip();
};
$.fn.bspop = function(options){
	var opt = $.extend({}, qiao.bs.popoptions);
	if(typeof options == 'string'){
		opt.content = options;
	}else{
		$.extend(opt, options);
	}
	
	$(this).popover(opt);
};
qiao.bs.tree = {};
qiao.bs.tree.options = {
	url 	: '/ucenter/menu',
	height 	: '600px',
	open	: true,
	edit	: false,
	checkbox: false,
	showurl	: true
};
$.fn.bstree = function(options){
	var opt = $.extend({}, qiao.bs.tree.options);
	if(options){
		if(typeof options == 'string'){
			opt.url = options;
		}else{
			$.extend(opt, options);
		}
	}
	
	var res = '加载失败！';
	var json = qiao.ajax(opt.url + '/tree');
	if(json && json.object){
		var tree = json.object;
		
		var start = '<div class="panel panel-info"><div class="panel-body" ';
		if(opt.height != 'auto') 
			start += 'style="height:600px;overflow-y:auto;"';
			start += '><ul class="nav nav-list sidenav" id="treeul" data="url:' + opt.url +';">';
		var children = qiao.bs.tree.sub(tree, opt);
		var end = '</ul></div></div>';
		res = start + children + end;
	}
	
	$(this).empty().append(res);
	qiao.bs.tree.init();
};
qiao.bs.tree.sub = function(tree, opt){
	var res = '';
	if(tree){
		var res = 
			'<li>' + 
				'<a href="javascript:void(0);" data="id:' + tree.id + ';url:' + tree.url + ';">' + 
					'<span class="glyphicon glyphicon-minus"></span>';
		if(opt.checkbox){
			res += '<input type="checkbox" class="treecheckbox" ';
			if(tree.checked){
				res += 'checked';
			}
			res += '/>';
		}
			res += tree.text;
		if(opt.showurl){
			res += '(' + tree.url + ')';
		}
		if(opt.edit)
			res += 
				'&nbsp;&nbsp;<span class="label label-primary bstreeadd">添加子菜单</span>' + 
				'&nbsp;&nbsp;<span class="label label-primary bstreeedit">修改</span>' + 
				'&nbsp;&nbsp;<span class="label label-danger  bstreedel">删除</span>';
			res += '</a>';
		var children = tree.children;
		if(children && children.length > 0){
				res += '<ul style="padding-left:20px;" id="treeid_' + tree.id + '" class="nav collapse ';
			if(opt.open) 
				res += 'in';
				res += '">';
			for(var i=0; i<children.length; i++){
				res += qiao.bs.tree.sub(children[i], opt);
			}
				res += '</ul>';
		}
		res += '</li>';
	}
	
	return res;
};
qiao.bs.tree.init = function(){
	qiao.on('#treeul .glyphicon-minus', 'click', function(){
		if($(this).parent().next().length > 0){
			$('#treeid_' + $(this).parents('a').qdata().id).collapse('hide');
			$(this).removeClass('glyphicon-minus').addClass('glyphicon-plus');
		}
	});
	qiao.on('#treeul .glyphicon-plus', 'click', function(){
		if($(this).parent().next().length > 0){
			$('#treeid_' + $(this).parents('a').qdata().id).collapse('show');
			$(this).removeClass('glyphicon-plus').addClass('glyphicon-minus');
		}
	});
	qiao.on('input.treecheckbox', 'change', function(){
		// 检测子级的
		var subFlag = $(this).prop('checked');
		$(this).parent().next().find('input.treecheckbox').each(function(){
			$(this).prop('checked', subFlag);
		});
		
		// 检测父辈的
		var parentFlag = true;
		var $ul = $(this).parent().parent().parent(); 
		$ul.children().each(function(){
			var checked = $(this).children().children('input').prop('checked');
			if(!checked) parentFlag = false;
		});
		$ul.prev().children('input').prop('checked', parentFlag);
	});
	
	qiao.bs.tree.url = $('#treeul').qdata().url;
	if(qiao.bs.tree.url){
		qiao.on('.bstreeadd', 'click', qiao.bs.tree.addp);
		qiao.on('.bstreedel', 'click', qiao.bs.tree.del);
		qiao.on('.bstreeedit', 'click', qiao.bs.tree.editp);
	}
};
qiao.bs.tree.addp = function(){
	qiao.bs.dialog({
		url 	: qiao.bs.tree.url + '/add/' + $(this).parent().qdata().id,
		title 	: '添加子菜单',
		okbtn 	: '保存'
	}, qiao.bs.tree.add);
};
qiao.bs.tree.add = function(){
	var res = qiao.ajax({url:qiao.bs.tree.url + '/save',data:$('#bsmodal').find('form').serialize()});
	qiao.bs.msg(res);

	if(res && res.type == 'success'){
		qiao.crud.url = qiao.bs.tree.url;
		qiao.crud.reset();
		return true;
	}else{
		return false;
	}
};
qiao.bs.tree.del = function(){
	var res = qiao.ajax({url:qiao.bs.tree.url + '/del/' + $(this).parent().qdata().id});
	qiao.bs.msg(res);
	
	if(res && res.type == 'success'){
		qiao.crud.url = qiao.bs.tree.url;
		qiao.crud.reset();
	}
};
qiao.bs.tree.editp = function(){
	qiao.bs.dialog({
		url 	: qiao.bs.tree.url + '/savep?id=' + $(this).parent().qdata().id,
		title 	: '修改菜单',
		okbtn 	: '保存'
	}, qiao.bs.tree.edit);
};
qiao.bs.tree.edit = function(){
	qiao.crud.url = qiao.bs.tree.url;
	return qiao.crud.save();
};
qiao.bs.spy = function(target,body){
	var $body = 'body';
	var $target = '.scrolldiv';
	
	if(body) $body = body;
	if(target) $target = target;
	
	$($body).scrollspy({target:$target});
};
qiao.bs.initimg = function(){
	$('img').each(function(){
		var clazz = $(this).attr('class');
		if(clazz){
			if(clazz.indexOf('img-responsive') == -1) $(this).addClass('img-responsive');
		}else{
			$(this).addClass('img-responsive');
		}
	});
};
qiao.bs.bstrooptions = {
	width 	: '500px',
	html 	: 'true',
	nbtext	: '下一步',
	place 	: 'bottom',
	title 	: '网站使用引导',
	content : 'content'
};
qiao.bs.bstroinit = function(selector, options, step){
	if(selector){
		var $element = $(selector);
		if($element.length > 0){
			var opt = $.extend({}, qiao.bs.bstrooptions, options);
			if(typeof options == 'string'){
				opt.content = options;
			}else{
				$.extend(opt, options);
			}
			
			$element.each(function(){
				$(this).attr({
					'data-bootstro-width'			: opt.width, 
					'data-bootstro-title' 			: opt.title, 
					'data-bootstro-html'			: opt.html,
					'data-bootstro-content'			: opt.content, 
					'data-bootstro-placement'		: opt.place,
					'data-bootstro-nextButtonText'	: opt.nbtext,
					'data-bootstro-step'			: step
				}).addClass('bootstro');
			});
		}
	}
};
qiao.bs.bstroopts = {
	prevButtonText : '上一步',
	finishButton : '<button class="btn btn-lg btn-success bootstro-finish-btn"><i class="icon-ok"></i>完成</button>',
	stopOnBackdropClick : false,
	stopOnEsc : false
};
qiao.bs.bstro = function(bss, options){
	if(bss && bss.length > 0){
		for(var i=0; i<bss.length; i++){
			qiao.bs.bstroinit(bss[i][0], bss[i][1], i);
		}
		
		var opt = $.extend({}, qiao.bs.bstroopts);
		if(options){
			if(options.hasOwnProperty('pbtn')){
				opt.prevButtonText = options.pbtn;
			}
			if(options.hasOwnProperty('obtn')){
				if(options.obtn == ''){
					opt.finishButton = '';
				}else{
					opt.finishButton = '<button class="btn btn-mini btn-success bootstro-finish-btn"><i class="icon-ok"></i>'+options.obtn+'</button>';
				}
			}
			if(options.hasOwnProperty('stop')){
				opt.stopOnBackdropClick = options.stop;
				opt.stopOnEsc = options.stop;
			}
			if(options.hasOwnProperty('exit')){
				opt.onExit = options.exit;
			}
		}
		
		bootstro.start('.bootstro', opt);
	}
};

/**
 * crud相关方法
 * 1.crud
 * 2.index
 */
qiao.crud = {};
qiao.crud.url = '';
qiao.crud.init = function(){
	// menu click
	qiao.on('.menus', 'click', function(){
		var url = $(this).qdata().url;
		if(url){
			qiao.crud.url = url;
			qiao.crud.reset();
		}
	});
	qiao.crud.bindcrud();
	qiao.crud.bindpage();
};
qiao.crud.bindcrud = function(){
	qiao.on('.allcheck','change', function(){$('.onecheck').prop('checked',$(this).prop('checked'));});
	qiao.on('.addBtn', 'click', function(){qiao.crud.savep('添加')});
	qiao.on('.editbtn','click', function(){qiao.crud.savep('修改',$(this).parents('tr').qdata().id)});
	qiao.on('.queBtn', 'click', function(){qiao.crud.savep('查询')});
	qiao.on('.relBtn', 'click', function(){qiao.crud.reset();});
	qiao.on('.delBtn', 'click', function(){qiao.crud.del();});
	qiao.on('.delbtn', 'click', function(){qiao.crud.del($(this).parents('tr').qdata().id);});
};
qiao.crud.listopt = {pageNumber:1,pageSize:10};
qiao.crud.list = function(data){
	var opt = {url : qiao.crud.url + '/index'};
	if(data) $.extend(qiao.crud.listopt, data);
	opt.data = qiao.crud.listopt;
	
	qiao.html(opt);
};
qiao.crud.reset = function(){
	qiao.crud.listopt = {pageNumber:1,pageSize:10};
	qiao.crud.list();
};
qiao.crud.savep = function(title, id){
	if(title == '查询'){
		qiao.bs.dialog({title:title,url:qiao.crud.url + '/savep'}, function(){
			qiao.crud.list($('#bsmodal').find('form').serialize());
			return true;
		});
	}else{
		var url = id ? (qiao.crud.url + '/savep?id=' + id) : (qiao.crud.url + '/savep');
		qiao.bs.dialog({title:title,url:url}, function(){
			return qiao.crud.save();
		});
	}
};
qiao.crud.save = function(){
	var res = qiao.ajax({url:qiao.crud.url+'/save',data:$('#bsmodal').find('form').serialize()});
	qiao.bs.msg(res);

	if(res && res.type == 'success'){
		qiao.crud.list();
		return true;
	}else{
		return false;
	}
};
qiao.crud.del = function(id){
	var ids = [];
	
	if(id){
		ids.push(id);
	}else{
		$('.onecheck:checked').each(function(){ids.push($(this).parents('tr').qdata().id);});
	}
	
	if(!ids.length){
		qiao.bs.alert('请选择要删除的记录！');
	}else{
		qiao.bs.confirm('确认要删除所选记录吗（若有子记录也会同时删除）？',function(){
			var res = qiao.ajax({url:qiao.crud.url+'/del',data:{ids:ids.join(',')}});
			qiao.bs.msg(res);
			qiao.crud.list();
		});
	}
};
qiao.crud.bindpage = function(){
	qiao.on('.crudfirst', 'click', function(){
		if(!$(this).parent().hasClass('disabled')){
			qiao.crud.reset();
		}
	});
	qiao.on('.crudprev', 'click', function(){
		if(!$(this).parent().hasClass('disabled')){
			qiao.crud.list({pageNumber:qiao.crud.listopt.pageNumber - 1});
		}
	});
	qiao.on('.crudnext', 'click', function(){
		if(!$(this).parent().hasClass('disabled')){
			qiao.crud.list({pageNumber:qiao.crud.listopt.pageNumber + 1});
		}
	});
	qiao.on('.crudlast', 'click', function(){
		if(!$(this).parent().hasClass('disabled')){
			qiao.crud.list({pageNumber:$(this).qdata().page});
		}
	});
	qiao.on('.cruda', 'click', function(){
		if(!$(this).parent().hasClass('disabled')){
			qiao.crud.list({pageNumber:parseInt($(this).text())});
		}
	});
	qiao.on('.pagesize', 'change', function(){
		var value = $(this).val();
		if(value){
			qiao.crud.listopt.pageSize = value;
		}
		
		qiao.crud.list({pageSize:value});
	});
};

/**
 * 业务相关代码
 * 1.用户登录
 * 2.修改密码
 * 3.角色管理
 */
qiao.login = {};
qiao.login.init = function(options){
	qiao.on('.loginbtn', 'click', qiao.login.login);
	qiao.on('.loginform', 'keydown', function(e){if(e.keyCode == 13) qiao.login.login();});
};
qiao.login.login = function(){
	var $form = $('.loginform');
	var $h5 = $form.find('h5');
	
	var res = qiao.ajax({
		url : '/login/login',
		data : $form.serialize()
	});
	
	if(res){
		if(res.type == 'success'){
			$h5.text('登录成功，正在跳转。。。');
			qiao.to(base + res.msg);
		}else{
			$h5.text(res.msg);
		}
	}else{
		$h5.text('ajax fail');
	}
};
qiao.modifypwd = {};
qiao.modifypwd.init = function(){
	qiao.on('.modifyPwd', 'click', qiao.modifypwd.modifypwdp);
};
qiao.modifypwd.modifypwdp = function(){
	qiao.bs.dialog({
		url : '/login/modifyPwdp',
		title : '修改密码',
		okbtn : '修改'
	}, qiao.modifypwd.modifypwd);
};
qiao.modifypwd.modifypwd = function(){
	var newpwd = $.trim($('input[name="newpwd"]').val());
	if(!newpwd){
		qiao.bs.msg({msg:'请输入新密码！',type:'danger'});
		return false;
	}else{
		var res = qiao.ajax({url:'/login/modifyPwd',data:{password:newpwd}});
		qiao.bs.msg(res);
		if(res && res.type == 'success'){
			setTimeout(function(){
				qiao.to(base + '/login/logout');
			}, 1000);
		}
		return false;
	}
};
qiao.role = {};
qiao.role.init = function(){
	qiao.on('.roleadduserbtn',	'click', qiao.role.setuser);
	qiao.on('.roleaddurlbtn', 	'click', qiao.role.seturl);
	qiao.on('.mytr',			'click', function(){$(this).toggleClass('info');});
};
qiao.role.setuser = function(){
	var id = $(this).parents('tr').qdata().id;
	qiao.bs.dialog({
		url : '/ucenter/role/setUser/' + id,
		title : '设置用户',
		okbtn : '关闭'
	});
};
qiao.role.addUser = function(){
	var ids = [];
	$('tr.outtr').each(function(){if($(this).hasClass('info')) ids.push($(this).attr('data'));});
	
	var res = qiao.ajax({url:'/ucenter/role/addUser',data:{userids:ids.join(','),roleid:$('input[name="roleid"]').val()}});
	if(res && res.type == 'success'){
		$('tr.outtr').each(function(){if($(this).hasClass('info')) $(this).removeClass('outtr').addClass('intr').prependTo('table.intable');});
	}else{
		qiao.bs.msg(res);
	}
};
qiao.role.removeUser = function(){
	var ids = [];
	$('tr.intr').each(function(){if($(this).hasClass('info')) ids.push($(this).attr('data'));});
	
	var res = qiao.ajax({url:'/ucenter/role/removeUser',data:{rlids:ids.join(','),roleid:$('input[name="roleid"]').val()}});
	if(res && res.type == 'success'){
		$('tr.intr').each(function(){if($(this).hasClass('info')) $(this).removeClass('intr').addClass('outtr').prependTo('table.outtable');});
	}else{
		qiao.bs.msg(res);
	}
};
qiao.role.seturl = function(){
	var id = $(this).parents('tr').qdata().id;
	qiao.bs.dialog({
		url : '/ucenter/role/setUrl/' + id,
		title : '设置Url',
		okbtn : '保存'
	}, qiao.role.addUrl);
};
qiao.role.addUrl = function(){
	var ids = [];
	$('#treeul input:checked').each(function(){ids.push($(this).parent().qdata().id);});
	var res = qiao.ajax({url:'/ucenter/role/saveUrl',data:{ids:ids.join(','),roleid:$('input[name="roleid"]').val()}});
	
	if(res && res.type == 'success'){
		return true;
	}else{
		qiao.bs.msg(res);
		return false;
	}
};
qiao.role.removeUrl = function(){
	var urls = [];
	$('tr.intr').each(function(){if($(this).hasClass('info')) urls.push($(this).attr('data'));});
	
	var res = qiao.ajax({url:'/ucenter/role/removeUrl',data:{urls:urls.join(','),roleid:$('input[name="roleid"]').val()}});
	if(res && res.type == 'success'){
		$('tr.intr').each(function(){if($(this).hasClass('info')) $(this).removeClass('intr').addClass('outtr').prependTo('table.outtable');});
	}else{
		qiao.bs.msg(res);
	}
};