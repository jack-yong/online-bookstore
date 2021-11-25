/*
 * 触发响应操作函数
 */

//回到详情选项卡，页码隐藏
function onContentTabListener(){
    $('.pagebar').hide();
}

//获取评价数据（AJAX方式）
function ajaxListener(event){
    
    //根据ajaxObject获取应该生成的对象
    var ajaxObject;        
    switch(event.data.json.type)
    {
        case 'comment':ajaxObject=new ajaxComment('#comment_div',event.data.json);break;
        case 'traderecord':ajaxObject=new ajaxTradeRecord('#traderecord_table',event.data.json);break;
    }

    //计算下一页页码（根据触发源this的id）,并返回false表示是选项卡的切换,不需ajax更新
    if(ajaxObject.calPageNext(this) == false)
        return;
        
    //发送ajax请求，并构建回调函数
     $.ajax({   type: "post", 
                url: ajaxObject.getUrl(json.Bid), //构造ajax要请求的对象url
                cache:false, 
                async:false,  
                success: function(data,textstatus){ 

                    //对数据进行显示操作（主体条目部分、页码部分）
                    ajaxObject.appendInnerHTML(data);
            }});
}



//获取数据的抽象接口定义（可能是评价、成交记录）
function ajaxBase(father1,json1){
    
    /*
    *共同属性
    */
    father=father1;//要添加到的父元素
    json=json1; //json对象

    type=json.type;//种类
    pageCount=json.pageCount; //总页数
    pageRange=json.pageRange;//显示页码方块最大个数
    var pageNext; //下一页
    /*
    *共同方法
    */

    this.calPageNext=function(current){ //根据触发源id（跳转按钮？页码？选项卡）计算pageNext

        var id=$(current).attr('id');

         if(pageCount > 0)
         {
            if(id == type+'_tab') //点击评价选项卡或评价数连接
            {
                //隐藏之前div层，显示点击div层
                $('#'+type+'_tab').parent("ul").siblings(".current").removeClass("current").hide();
                $('#'+type+'_div').addClass("current").show();
                var height = $('#'+type+'_div').height()+ 66;
                $('#'+type+'_div').parent(".tabcontainer").css({"height":height+"px"});
                $('#'+type+'_tab').siblings(".current").removeClass("current");
                $('#'+type+'_tab').addClass("current");
                
                //隐藏页码条
                $('.pagebar').hide();
                
                //决定是否为第一次按选项卡，还是非第一次随意地切换
                if($(father).html() == '')  //第一次点选项卡
                {
                    this.appendPageBarHTML(); //添加页码条
                    pageNext=1;
                }
                else //非第一次，显示以前的页码条
                {
                    $('#'+type+'_pagebar').show();
                    return false;
                }
            }
            else if(id == (type+'_pagebtn')) // 点击跳转按钮的情况
            {
                pageNext=$('#'+type+'_pageedit').val();
                if(pageNext == "" || Math.round(pageNext) != pageNext || (pageNext > pageCount || pageNext < 1))
                    pageNext=1;
            }
            else //点击页码的情况
            {
                //获取当前所在页码          
                var pageNow=$('#'+type+'_pagebar').children('.pagediv.current').text();

                //获取用户点击的元素的文本（页码），计算出下一个要跳转的页码数
                pageNext=$(current).text();
                
                if(pageNext == '<')
                    pageNext=pageNow-1;
                else if(pageNext == '>')
                    pageNext=Number(pageNow)+1;
            }
            return true;
         }

         return false;
    };
    
    //以bid和page构造请求获取dowhat(评价或成交记录)信息的url
    this.getUrl=function getUrl(Bid){
        
        var dowhat='find'+type+'ByPage';

        return url='DetailClServlet?dowhat='+dowhat+'&Bid='+ Bid +'&pageNext=' + pageNext;
    };
    
    //添加页码条
    this.appendPageBarHTML=function(){

        $('#detail_tab').after('<div class="pagebar" id="'+type+'_pagebar"></div>');
        pageTo= pageCount < pageRange ? pageCount : pageRange;

        //上一页
        $('#'+type+'_pagebar').append('<div class="pagediv" style="color:#009966;">'+'<'+'</div>');
        
        //中间页码
        for(var i=1;i<=pageTo;i++)
            $('#'+type+'_pagebar').append('<div class="pagediv">'+i+'</div>');
        
        //下一页：根据pageTo页数上限看是否显示下一页标记
        $('#'+type+'_pagebar').append('<div class="pagediv" style="color:#009966;">'+'>'+'</div>');
        
        //显示跳转框等文本
        $('#'+type+'_pagebar').append('<span>&nbsp;&nbsp;共'+pageCount+'页，到第&nbsp;'+
                '<input type="text" class="pageedit" id="'+type+'_pageedit">'+'&nbsp;页&nbsp;'+
                '<input type="submit" class="graybutton" id="'+type+'_pagebtn"></span>'); //注意！！验证合法性
                
        //为页码按钮、跳转提交按钮设置响应
        $('#'+type+'_pagebar').children('.pagediv').click({'json':json},ajaxListener);
        $('#'+type+'_pagebar').children('.pagespan').children('.pagebtn').click({'json':json},ajaxListener);
    };
    
    //更新页码条
    this.updatePageBarHTML=function(){

        //暗pageNow页码
        $('#'+type+'_pagebar').children('.pagediv.current').removeClass("current");
        
        //决定是否显示“上一页”
        if(pageNext != 1) //非第一页
            $('#'+type+'_pagebar').children('.pagediv').first().show();
        else     //第一页
            $('#'+type+'_pagebar').children('.pagediv').first().hide();
        
        //决定是否显示“下一页”
        if(pageNext != pageCount) //非最后一页
            $('#'+type+'_pagebar').children('.pagediv').last().show();
        else     //最后一页
            $('#'+type+'_pagebar').children('.pagediv').last().hide();
        
        //计算pageTo
        var pageFrom=pageNext;
        var pageTo;
        if(pageCount <= pageRange)
        {
            pageFrom=1;
            pageTo=pageCount;
        }
        else
        {
            if(Number(pageNext)+Number(pageRange)-1 > pageCount) //超出范围，起点变化
                pageFrom=pageCount-pageRange+1;
            pageTo=pageRange;
        }

        //更新所有页码的文本
        for(var i=0;i<pageTo;i++)//所有pagediv样式从pageNext开始，页码文本+1
            $('#'+type+'_pagebar').children('.pagediv').eq(i+1).text(Number(pageFrom)+i);

        //高亮当前页页码
        $('#'+type+'_pagebar').children('.pagediv').eq(Number(pageNext)-Number(pageFrom)+1).addClass("current");
    };
}

//ajax请求并显示评价条目的类
function ajaxComment(father1,json1){
    
    ajaxBase.apply(this, arguments); //继承基类
    
    
    // 添加所有条目
    this.appendInnerHTML=function(data){

        //获得评价数据的数组
        var beanList=eval('('+data+')');

        //显示一条条的评价
        $(father).empty(); // 清空原有内容   
        for(var i=0;i<beanList.length;i++)
            $(father).append(this.getEachRowHTML(beanList[i]));
        
        //更新tabcontainer的高度，防止异常
        $('#'+type+'_div').parent(".tabcontainer").css({"height":($('#'+type+'_div').height()+66)+"px"});
        
        //更新页码
        this.updatePageBarHTML();
    };
    
    this.getEachRowHTML=function(bean){  
                return  '<div class="commentdiv">'+
                '<div class="avatardiv">'+
                    '<img src="" style="background-image:url('+bean.Uavatar+');"/><br>'+
                    bean.Unickname+
                '</div>'+
                '<div class="contentdiv">'+bean.Tcomment +'</div>'+
                '<div class="datediv">'+bean.Tcommenttime +'</div>'+
            '</div>';
    };
}

//ajax请求并显示成交记录条目的类
function ajaxTradeRecord(father1,json1){
    
    ajaxBase.apply(this, arguments);
    
    // 添加所有条目
    this.appendInnerHTML=function(data){

        //获得评价数据的数组
        var beanList=eval('('+data+')');

        //显示一条条的评价
        $(father).empty(); // 清空原有内容 
        $(father).append('<tr class="tabletitle"><td>买家</td><td>昵称</td><td>数量</td><td>成交时间</td></tr>'); //显示表头
        for(var i=0;i<beanList.length;i++)
            $(father).append(this.getEachRowHTML(beanList[i]));
        
         //更新tabcontainer的高度，防止异常
        $('#'+type+'_div').parent(".tabcontainer").css({"height":($('#'+type+'_div').height()+66)+"px"});

        //更新页码
        this.updatePageBarHTML();
    };
    
    //显示一条成交记录条目
    this.getEachRowHTML=function(bean){  

            return  '<tr class="tablevalue"><td><img src="" style="background-image:url('+bean.Uavatar+');"/></td>'+
            '<td>'+bean.Unickname+'</td>'+
            '<td>'+bean.Tboughtnum+'</td>'+
            '<td>'+bean.Treceivetime+'</td></tr>';
    };
    
}