define(function (require, exports, module) {
    'use strict';
    
    // import
    var qiao = require('../lib/qiao/qiao.js');
    
	// 初始化
	mui.init({
		subpages : [qiao.normalPage('list')]
	});
	
	var main = null;
	var showMenu = false;
	var menu = null;
	var add = null;
	var detail = null;
	
	// 所有方法都放到这里
	mui.plusReady(function(){
		setColor("#f7f7f7");
		
		// 初始化数据库
		initDb();
		
		// 侧滑菜单
		main = qiao.indexPage();
		var menuoptions = qiao.page('menu', {
			styles : {
				left:0,
				width:'70%',
				zindex:-1
			}
		});
		menu = mui.preload(menuoptions);
		qiao.on('.mui-icon-bars', 'tap', opMenu);
		main.addEventListener('maskClick', opMenu);
		mui.menu = opMenu;
		
		// 添加
		add = mui.preload(qiao.normalPage('add'));
		qiao.on('.adda', 'tap', showAdd);
		qiao.on('.mui-icon-back', 'tap', hideAdd);
		
		// 详情
		detail = mui.preload(qiao.normalPage('detail'));
		
		// 退出
		mui.back = function(){
			if($('.adda').is(':hidden')){
				hideAdd();	
			}else if(showMenu){
				closeMenu();
			}else{
				qiao.exit();
			}
		};
	});
	
	// 初始化数据库
	function initDb(){
		var db = qiao.db();
		qiao.update(db, 'create table if not exists t_plan_day_todo (id unique, plan_title, plan_content)');
		qiao.update(db, 'create table if not exists t_plan_day_done (id unique, plan_title, plan_content)');
	}
	
	// menu
	function opMenu(){
		if(showMenu){
			closeMenu();
		}else{
			openMenu();
		}
	}
	function openMenu(){
		if($('.adda').is(':visible')){
			setColor("#333333");
			menu.show('none', 0, function() {
				main.setStyle({
					mask: 'rgba(0,0,0,0.4)',
					left: '70%',
					transition: {
						duration: 150
					}
				});
		
				showMenu = true;
			});
		}
	}
	function closeMenu(){
		setColor("#f7f7f7");
		main.setStyle({
			mask: 'none',
			left: '0',
			transition: {
				duration: 100
			}
		});
		
		showMenu = false;
		setTimeout(function() {
			menu.hide();
		}, 300);
	}
	
	// showAdd
	function showAdd(){
		showBackBtn();
		qiao.show('add', 'slide-in-bottom', 300);
	}
	function hideAdd(){
		hideBackBtn();
		qiao.getPage('add').hide();
		qiao.getPage('detail').hide();
	}
	function showBackBtn(){
		$('.menua').removeClass('mui-icon-bars').addClass('mui-icon-back');
		$('.adda').hide();
	}
	function hideBackBtn(){
		$('.menua').removeClass('mui-icon-back').addClass('mui-icon-bars');
		$('.adda').show();
	}
	
	// set color
	function setColor(color){
		if(mui.os.ios && color) plus.navigator.setStatusBarBackground(color);
	}
});