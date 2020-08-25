/**
  * jQuery TAH Plugin
  * Using for Textarea-Auto-Height
  * @Version: 0.4
  * @Update: December 13, 2011
  * @Author: Phoetry (http://phoetry.me)
  * @Url: http://phoetry.me/archives/tah.html
  **/
~function($){
$.fn.tahReady=function(opt){
	opt=$.extend({
		moreSpace:10,
		maxHeight:600,
		animateDur:200
	},opt);
	return this.each(function(i,t){
		if(!$.nodeName(t,'textarea'))return;
		var ta=$(t).css({resize:'none',overflowY:'hidden'}),
			_ta=ta.clone().attr({id:'',name:'',tabIndex:-1}).css(function(css){
				$.each('width0fontSize0fontFamily0lineHeight0wordWrap0wordBreak0whiteSpace0letterSpacing'.split(0),function(i,t){css[t]=ta.css(t)});
				return $.extend(css,{
					width:ta.width()*1.5,
					position:'absolute',
					left:-9e5,
					height:0
				});
			}({})),
			valCur,stCur,stCache,defHeight=ta.height(),
			autoHeight=function(){
				(stCur=Math.max(defHeight,_ta.val(valCur=ta.val()).scrollTop(9e5).scrollTop())+(valCur&&opt.moreSpace))==stCache?0:
				(stCache=stCur)<opt.maxHeight?ta.stop().animate({height:stCur},opt.animateDur):ta.css('overflowY','auto');
			};
		ta.after(_ta).bind('blur focus input change propertychange keydown',autoHeight);
	});
};
}(jQuery);
function tah_start(){
	console.log("just to identify the file in initial.js");
}