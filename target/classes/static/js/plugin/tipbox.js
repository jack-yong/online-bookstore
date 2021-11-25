(function($){ 
	$.fn.tipboxReady = function(options){ 
		var defaults = {
			title:"", //标题
			content:"这里是内容", //内容
			formore:"",//链接的文字
			url:"http://www.baidu.com",//链接的地址
			hasclose:true, //有无close按钮
			autoclose:false, //是否自动关闭
			timeBeforeClose:"5000", //自动关闭的时间设置
			hasTriangle:false //是否有小三角
		};
		var options = $.extend(defaults, options); 
		
		return this.each(function(){ 
			var thisBox = $(this);	
			var me = this;
			var tip = new Tip(options);
			var classname = thisBox.attr("class");
			if( !classname || ""==classname ){
				thisBox.attr("class","tipbox");
			}else{
				thisBox.attr("class","tipbox "+classname);
			}
			thisBox.append(tip.generate());
			thisBox.find(".close").bind("click",function(){
				thisBox.attr("class","hidden");
			});
			if(options.autoclose){
				window.setTimeout(tip.close, options.timeBeforeClose,thisBox);
			}
		});
	}; 	
	
	function Tip(info){
		this.info = info;	
	}
	Tip.prototype = {
		generate:function (){
			var closeHtml="";
			if(this.info.hasclose && this.info.hasTriangle){
				closeHtml = "<span class=\"close\"></span>";
			}else if(!this.info.hasTriangle && this.info.hasclose){
				closeHtml = "<span class=\"close\" style=\"top:9px\"></span>";
			}
			var triangleHtml ="";
			if(this.info.hasTriangle){
				triangleHtml = "<span class=\"triangle-top\"></span>";
			}
			var mytip = "<div class=\"tipbox-wrapper\">" +
				triangleHtml +
				closeHtml + 
				"<div class=\"main-content\">" +
					"<div class=\"inner\">" +
						"<h2 class=\"title\">"+ this.info.title + "</h2>" +
						"<p>" + this.info.content+"</p>" +
					"</div>"+
					"<div class=\"rightalign\"><a class=\"blueletter\" href=\""+ this.info.url +"\">"+ this.info.formore +"</a></div>"+
				"</div>"+
			"</div>";
			return mytip;
		},
		close: function(obj){
			obj.attr("class","hidden");
		}
	}
})(jQuery); 
function tipbox_start(){
	console.log("just to identify the file in tipbox.js");
}