//引入facebox插件
if( $('a[rel*=facebox]').length > 0 && "undefined" == typeof(facebox_start) ){
	$("body").append(" <scr"+"ipt lanague=\"javascript\" src=\"" + baseAddr + "js/plugin/facebox.js\"> <\/scri"+"pt>");
	setTimeout('facebox_start("facebox")',500);
}
//引入首页幻灯片插件
if( $('.lof-slidecontent').length > 0 ){
	$("body").append(" <scr"+"ipt lanague=\"javascript\" src=\"" + baseAddr + "js/plugin/slider.js\"> <\/scri"+"pt>");
}
//引入验证码插件
if($("#checkCode").length > 0 && "undefined" == typeof(createCode)){
	$("body").append(" <scr"+"ipt lanague=\"javascript\" src=\"" + baseAddr + "js/plugin/captchas.js\"> <\/scri"+"pt>");
}
//引入vertical menu插件
if( $('.webwidget_vertical_menu').length > 0 && "undefined" == typeof(vertical_menu_start) ){
	$("body").append(" <scr"+"ipt lanague=\"javascript\" src=\"" + baseAddr + "js/plugin/vertical_menu.js\"> <\/scri"+"pt>");
}
//引入shareto_button
if( $('.shareto_button').length > 0 ){
	$("body").append(" <scr"+"ipt lanague=\"javascript\" src=\"" + baseAddr + "js/plugin/shareto_button.js\"><\/scri"+"pt>");
}
//引入jphotogrid，目前只在about us 页面有，所以没考虑后加载的情况
if( $('#jphotogrid').length > 0 ){
	$("body").append(" <scr"+"ipt lanague=\"javascript\" src=\"" + baseAddr + "js/plugin/jphotogrid.js\"><\/scri"+"pt>");
}
//引入jp-container插件
if( $('#jp-container').length > 0 ){
	$("body").append(" <scr"+"ipt lanague=\"javascript\" src=\"" + baseAddr + "js/plugin/scroll.js\"><\/scri"+"pt>");
}
//引入highchart插件，要求，所用的id必须带有highchart字样
if($('div[id*="highchart"]').length > 0){
	$("body").append(" <scr"+"ipt lanague=\"javascript\" src=\"" + baseAddr + "js/plugin/highcharts.js\"> <\/scri"+"pt>");
}
//引入userAutoTips插件
function userAutoTips(args){
	if( "undefined" == typeof(userAutoTipsReady) ){
		$("body").append(" <scr"+"ipt lanague=\"javascript\" src=\"" + baseAddr + "js/plugin/userAutoTips.js\"> <\/scri"+"pt>");
	}
	var autoTipsFn = function(){
		userAutoTipsReady(args);
	};
	setTimeout(autoTipsFn, 500);
}

//加载选择群组/加入列表的方法文件（initall是使用这个文件必须是用的第一个方法）
function initall(nohistorymsg, grouplist){
	if( "undefined" == typeof(initallAddGroup) ){
		$("body").append(" <scr"+"ipt lanague=\"javascript\" src=\"" + baseAddr + "js/plugin/addgroup.js\"> <\/scri"+"pt>");
	}
	var initallFn = function(){
		initallAddGroup(nohistorymsg, grouplist);
	};
	setTimeout(initallFn, 500);
}

//引入好友列表插件
function loadFriendList(){
	$.getScript(baseAddr + "js/plugin/myfriend.js");
}
(function($) {
	//后加载的facebox插件，要求是必须有rel这个属性
	$.fn.facebox = function(){
		if( "undefined" == typeof(facebox_start) ){
			$("body").append(" <scr"+"ipt lanague=\"javascript\" src=\"" + baseAddr + "js/plugin/facebox.js\"> <\/scri"+"pt>");
		}
		var rel = $(this).attr("rel");
		setTimeout('facebox_start("'+rel+'")',500);
	};
	//后加载的vertical_menu插件，要求是必须用webwidget_vertical_menu这个class
	$.fn.webwidget_vertical_menu = function(){
		if( "undefined" == typeof(vertical_menu_start) ){
			$("body").append(" <scr"+"ipt lanague=\"javascript\" src=\"" + baseAddr + "js/plugin/vertical_menu.js\"> <\/scri"+"pt>");
		}else{
			setTimeout('vertical_menu_start()',500);
		}
	};
	//文件上传插件的引用
	$.fn.fileUploadUI = function(method, type){
		if("undefined" == typeof(fileUploadUIReady)){
			$("body").append(" <scr"+"ipt lanague=\"javascript\" src=\"" + baseAddr + "js/plugin/fileupload.js\"> <\/scri"+"pt>");
		}
		if( type == undefined ){
			type = "id";
		}
		var typeValue = $(this).attr(type);
		var fileUploadFn = function(){
			$("[" + type + "=" + typeValue + "]").fileUploadUIReady(method);
		};
		setTimeout(fileUploadFn, 500);
	};
	//输入框智能拉伸插件的引用
	$.fn.tah = function(opt, type){
		if( "undefined" == typeof(tah_start) ){
			$("body").append(" <scr"+"ipt lanague=\"javascript\" src=\"" + baseAddr + "js/plugin/input.js\"> <\/scri"+"pt>");
		}
		if( type == undefined ){
			type = "id";
		}
		var typeValue = $(this).attr(type);
		var tahFn = function(){
			$("[" + type + "=" + typeValue + "]").tahReady(opt);
		};
		setTimeout(tahFn, 500);
	};
	//提示框插件的引用
	$.fn.tipbox = function(options, type){
		if( "undefined" == typeof(tipbox_start) ){
			$("body").append(" <scr"+"ipt lanague=\"javascript\" src=\"" + baseAddr + "js/plugin/tipbox.js\"> <\/scri"+"pt>");
		}
		if( type == undefined ){
			type = "id";
		}
		var typeValue = $(this).attr(type);
		var tipboxFn = function(){
			$("[" + type + "=" + typeValue + "]").tipboxReady(options);
		};
		setTimeout(tipboxFn, 500);
	};
})(jQuery);
