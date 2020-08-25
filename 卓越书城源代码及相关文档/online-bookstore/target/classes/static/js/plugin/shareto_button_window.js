-function(){
        sharetoBtnContain.centerpop.innerHTML = '<div style="border:10px solid #7F7F7F; width:300px;">\
                <div class="shareto_div_01" style="width:100%;">\
                        <div style="background:#F2F2F2;line-height:200%;padding-left:5px;">\
                                <div style="font-weight:bold;font-size:12px;float:left;">分享到各大网站</div>\
                                <div style="float:right"><img src="http://shareto.googlecode.com/svn/trunk/img/img_exit.gif" border="0" style="margin:4px 4px 0 0;cursor:pointer;" onclick="sharetoBtnContain.centerClose()"/></div>\
                                <div style="clear:both;height:0;"></div>\
                        </div>\
                        <div style=" background:#F2F2F2;border-bottom:1px solid #E5E5E5;padding-left:5px;">\
                                <div style="background:url(http://shareto.googlecode.com/svn/trunk/img/img_so.gif) no-repeat center;height:30px; width:281px">\
                                <input name="" type="text" onclick="this.value=\'\'" value="输入网站名或拼音缩写" style="background:#FFFFFF;border:none;margin:7px 0 0 28px;width:240px;" onkeyup = "sharetoBtnContain.choose(this)" />\
                                </div>\
                        </div>\
                        <div id="ckelist" class="shareto_div_03" style="height:300px;overflow-y:auto;">\
<a href="javascript:void(0);" onclick="share_to(\'tsina\');return false;" class="stitle"><span class="stico stico_tsina">新浪微博</span><input type="hidden" value="新浪微博SINA微博wb-weibo" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'huaban\');return false;" class="stitle"><span class="stico stico_huaban">花瓣网</span><input type="hidden" value="花瓣网hb-huaban" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'kaixin001\');return false;" class="stitle"><span class="stico stico_kaixin001">开心网</span><input type="hidden" value="开心网kaixin001-kx" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'gmail\');return false;" class="stitle"><span class="stico stico_gmail">Gmail</span><input type="hidden" value="gmail-google-gg-guge" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'tqq\');return false;" class="stitle"><span class="stico stico_fav">腾讯微博</span><input type="hidden" value="腾讯微博qq微博tqq-weibo-wb" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'qq\');return false;" class="stitle"><span class="stico stico_qq">QQ书签</span><input type="hidden" value="qq" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'renren\');return false;" class="stitle"><span class="stico stico_renren">人人网</span><input type="hidden" value="人人renren-rr" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'baidu\');return false;" class="stitle"><span class="stico stico_baidu">百度收藏</span><input type="hidden" value="百度baidushoucang-bd" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'douban\');return false;" class="stitle"><span class="stico stico_douban">豆瓣</span><input type="hidden" value="豆瓣db-douban" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'google\');return false;" class="stitle"><span class="stico stico_google">谷歌收藏</span><input type="hidden" value="谷歌google-gg-guge" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'51\');return false;" class="stitle"><span class="stico stico_51">51社区</span><input type="hidden" value="51" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'yahoo\');return false;" class="stitle"><span class="stico stico_yahoo">Yahoo!收藏</span><input type="hidden" value="Yahooshoucang-yhsc-yahu" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'taojianghu\');return false;" class="stitle"><span class="stico stico_taojianghu">淘江湖</span><input type="hidden" value="淘江湖taojianghu-taobao-tb" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'vivi\');return false;" class="stitle"><span class="stico stico_sina">新浪收藏</span><input type="hidden" value="新浪收藏xinlangshoucang-sina-xl" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'itieba\');return false;" class="stitle"><span class="stico stico_itieba"> i 贴吧</span><input type="hidden" value="i贴吧ibaidu-itieba-itb-baidu-bd" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'hotmail\');return false;" class="stitle"><span class="stico stico_live">Hotmail</span><input type="hidden" value="hotmail" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'douban9\');return false;" class="stitle"><span class="stico stico_douban9">豆瓣9点</span><input type="hidden" value="豆瓣9点douban9" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'115\');return false;" class="stitle"><span class="stico stico_115">115收藏</span><input type="hidden" value="115收藏shoucang" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'greader\');return false;" class="stitle"><span class="stico stico_greader">Google Reader</span><input type="hidden" value="googlereader-gugereader-ggrd-google reader" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'xianguo\');return false;" class="stitle"><span class="stico stico_xianguo">鲜果</span><input type="hidden" value="鲜果xianguo-xg" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'buzz\');return false;" class="stitle"><span class="stico stico_buzz">Google Buzz</span><input type="hidden" value="googlebuzz-gugebuzz-ggbz-google bazz" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'live\');return false;" class="stitle"><span class="stico stico_live">Live收藏</span><input type="hidden" value="live" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'hi\');return false;" class="stitle"><span class="stico stico_hi">百度空间</span><input type="hidden" value="百度空间baidukongjian-bdkj-hi" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'leshou\');return false;" class="stitle"><span class="stico stico_leshou">乐收网</span><input type="hidden" value="乐收leshou" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'qzone\');return false;" class="stitle"><span class="stico stico_qzone">Qzone</span><input type="hidden" value="qq空间qzone" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'youdao\');return false;" class="stitle"><span class="stico stico_youdao">有道书签</span><input type="hidden" value="有道youdao" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'t163\');return false;" class="stitle"><span class="stico stico_t163">网易微博</span><input type="hidden" value="网易微博t163-wangyiweibo-wywb-wb-weibo" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'csdn\');return false;" class="stitle"><span class="stico stico_csdn">CSDN网摘</span><input type="hidden" value="csdn" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'tsohu\');return false;" class="stitle"><span class="stico stico_tsohu">搜狐微博</span><input type="hidden" value="搜狐微博tsohu-wb-weibo" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'hexun\');return false;" class="stitle"><span class="stico stico_hexun">和讯收藏</span><input type="hidden" value="和讯hexun" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'bai\');return false;" class="stitle"><span class="stico stico_bai">白社会</span><input type="hidden" value="搜狐白社会baishehui-sohu-bsh-souhu" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'reddit\');return false;" class="stitle"><span class="stico stico_reddit">Reddit</span><input type="hidden" value="reddit" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'t139\');return false;" class="stitle"><span class="stico stico_t139">139说客</span><input type="hidden" value="139说客t139shuoke-sk" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'digg\');return false;" class="stitle"><span class="stico stico_digg">Digg </span><input type="hidden" value="Digg" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'myspace\');return false;" class="stitle"><span class="stico stico_myspace">Myspace</span><input type="hidden" value="myspace" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'delicious\');return false;" class="stitle"><span class="stico stico_delicious">Delicious</span><input type="hidden" value="Delicious" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'pdf\');return false;" class="stitle"><span class="stico stico_pdf">网页转PDF</span><input type="hidden" value="pdfonline" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'ymail\');return false;" class="stitle"><span class="stico stico_yahoo">Yahoo! mail</span><input type="hidden" value="ymail-yahoo-yh-yahu" /></a>\
<a href="javascript:void(0);" onclick="share_to(\'translate\');return false;" class="stitle"><span class="stico stico_google">google翻译</span><input type="hidden" value="translate-google-gg-guge-fanyi" /></a>\
<div style="clear:both"></div>\
                        </div>\
                        <div style="background:#F2F2F2;border-top:1px solid #E5E5E5;line-height:120%;padding-left:5px;">\
                                <div style="width:120px;float:left;font-size:10px"><a href="http://www.shareto.com.cn/intro.html" class="link_01" style="color:#333333;" target="_blank">这是什么工具?</a></div>\
                                <div style="width:80px;float:right;font-size:11px">\
                                        <img src="http://shareto.googlecode.com/svn/trunk/img/img_012.gif" border="none" />&nbsp;\
                                        <a href="http://www.shareto.com.cn/" style="color:#333333;" class="link_01" target="_blank">分享道</a>\
                                </div>\
                                <div style="clear:both"></div>\
                        </div>\
                </div>\
        </div>'
        sharetoBtnContain.center();
        var script = document.createElement('script'),
                        fn = function(){
                                try{
                                                var pageTracker = _gat._getTracker("UA-10046963-1");
                                                pageTracker._setDomainName("none");
                                                pageTracker._setAllowLinker(true);
                                                pageTracker._trackPageview();
                                } catch(err) {}
                        };
        script.src = 'http://www.google-analytics.com/ga.js';
        script.onload = fn;
        script.onreadystatechange = function(){
                if(/complete|loaded/.test(this.readyState))fn();
        }
        document.getElementsByTagName('head')[0].appendChild(script);
}()