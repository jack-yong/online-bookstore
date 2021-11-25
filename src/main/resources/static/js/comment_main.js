$(document).ready(function(){
    
    //步骤条
    $(".stepcircle").eq(0).css("background","#009966");
    $(".stepcircle").eq(1).css("background","#009966");
    $(".stepcircle").eq(2).css("background","#009966");
    $(".stepcircle").eq(3).css("background","#009966");
    $(".stepcircle").eq(4).css("background","#009966");
    
    $(".stepname").eq(0).css("color","#009966");
    $(".stepname").eq(1).css("color","#009966");
    $(".stepname").eq(2).css("color","#009966");
    $(".stepname").eq(3).css("color","#009966");
    $(".stepname").eq(4).css("color","#009966");
    
    $(".stepbar").eq(0).css("background","#009966");
    $(".stepbar").eq(1).css("background","#009966");
    $(".stepbar").eq(2).css("background","#009966");
    $(".stepbar").eq(3).css("background","#009966");
});

//ajax请求将书籍的评价数据写入后台数据库(点击完成时)
function commentBook(oid,bid){
    
    //获取星星数量mark
    mark=$('.starbar').children('.fulstar').length;
    
    //获取评价comment
    comment=$('textarea[name=comment]').val().trim();

    //ajax将oid订单的bid书籍的星星数mark和评价comment写入数据库
    $.ajax({
        type:"post", 
        url:"CommentClServlet?dowhat=commentBook", 
        data:{
            Oid:oid,
            Bid:bid,
            Mark:mark,
            Comment:comment
        },
        success:function(){

            alert('评论成功！');
            window.location.href = "MyOrderClServlet?dowhat=locateOrder&Oid="+oid;

        }
    });
}

//鼠标放在星星上时
function onStar(element){
    
    //将该星星及其之前的星星全闪亮
    $(element).removeClass('emstar');
    $(element).addClass('fulstar');
    $(element).prevAll().removeClass('emstar');
    $(element).prevAll().addClass('fulstar');
    
    //该星星之后的星星全暗
    $(element).nextAll().removeClass('fulstar');
    $(element).nextAll().addClass('emstar');
}
