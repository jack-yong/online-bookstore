
function showLoading() {
    if ($('#loading').length == 0){
      $("body").append('<div id="loading" class="loading"><img src="' + baseAddr + 'css/images/loadingblue.gif" /></div>');
    }
    $('#loading').hide().addClass("loadingbg").css('opacity', 0.5).fadeIn(200);
    return false;
}

function hideLoading() {
	$('#loading').fadeOut(200, function(){
	      $("#loading").removeClass("loadingbg");
	      $("#loading").addClass("loadinghide");
	      $("#loading").remove();
	});
	return false;
}

function getStyle(){
	$.getScript(baseAddr + "js/element.js");
}
function openItIn(page, target)
{
	$.get(page,'', function(data) 
	{
		$(target).empty();
		$(target).append(data); 
	});
}
function gotonext(parament)
{
	location.href=parament;
}
//confirm delete
function delalert(url)
{
	if(confirm('确认删除?'))
    {
        location.href = url;
    }
}
function jumpafter3sec(time, url){
	setInterval(function()
    {
 	var second = $("#"+time).html();
 	if(second == 0)
 	{
 		this.location = $("#"+url).attr("href");
 	}
 	else
 	{
 	   $("#"+time).html(second-1);
 	}
    },1000);
}

//js unicode和gb2312之间的转码
var GB2312UnicodeConverter = {
    ToUnicode: function (str) {
        return escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
    }
    , ToGB2312: function (str) {
        return unescape(str.replace(/\\u/gi, '%u'));
    }
};

//写cookies
function nSetCookie(name,value,time)
{
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec*1);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getsec(str)
{
   var str1=str.substring(1,str.length)*1;
   var str2=str.substring(0,1);
   if (str2=="s"){
        return str1*1000;
   }else if (str2=="h"){
       return str1*60*60*1000;
   }else if (str2=="d"){
       return str1*24*60*60*1000;
   }
}

//读取cookies
function nGetCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}

//过滤字符串前后的空格
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

//填充状态提醒框
function fillTipBox(status,content){
	if ($('#tipboxWrapper').length == 0){
		 $("body").append("<div id=\"tipboxWrapper\"></div>");
	}
	var  tipContent = "<table><tr><td><img src='images/"+status+".png'/></td><td>&nbsp;"+content+"&nbsp;</td></tr></table>";	 
	$("#tipboxWrapper").html("<div  id=\"tipbox\"  class=\"mytipboxposition\"></div>");
	$("#tipbox").tipbox  ({
	         content:tipContent,
	         autoclose:true,
	         hasclose:false
	});
}
