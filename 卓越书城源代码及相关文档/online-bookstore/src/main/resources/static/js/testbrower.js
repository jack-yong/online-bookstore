
//以下两个对象是检测浏览器名字及版本号所必须的
var browserName = navigator.userAgent.toLowerCase();
var mybrowser = {
    version: (browserName.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, '0'])[1],
    msie: /msie/i.test(browserName) && !/opera/.test(browserName),
    mozilla: /mozilla/i.test(browserName) && !/(compatible|webkit)/.test(browserName) && !this.chrome,
    chrome: /chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)
};
// 页面加载时运行以下if判断语句
$(document).ready(function(){
    if( mybrowser.msie && $.browser.version < 8 ){
    	if($(".pub_banner").attr("class") == "pub_banner"){
    		$(".pub_banner").after("<div id=\"browerbox\"></div>");
    	}else if($(".indexbg").attr("class") == "indexbg"){
    		$(".indexbg").prepend("<div id=\"browerbox\"></div>");
    	}
        var mytip = {
				title:"您的浏览器版本过低",
				content:"本页面未针对IE6和IE7进行优化，因此您在使用中可能遇到问题，建议使用IE8（或更高版本）、Chrome或是Firefox浏览器！",
				formore:"更新您的浏览器",
				url:baseAddr+"prompt.jsp",
				hasclose:false
		};
		$("#browerbox").tipbox(mytip);
    }        
});