
//删除订单oid
function deleteOrder(element,oid)
{
    if(confirm("确定要删除该订单吗？") == true)
    {
        
        $.ajax({
            type:"post", 
            url:"MyOrderClServlet?dowhat=deleteOrder", 
            data:{
                Oid:oid,
            },
            success:function(){
    
                //界面上删去该订单
                $(element).parents('.curorder_row_div').remove();
            }
        });
    }
}
