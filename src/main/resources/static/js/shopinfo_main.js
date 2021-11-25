//检测还能输入多少个汉字，并改变界面显示
function updateLeftStrLength(element)
{
    maxLength=$(element).attr('maxlength');
    
    //获取当前个数
    curStrLength= $(element).val().length;

    //计算剩余
    leftStrLength = maxLength - curStrLength;
    if(leftStrLength < 0) leftStrLength = 0;
    
    //更新显示
    $(element).parent('.uploaddiv').children('font').children('span').text(leftStrLength);
}

//检查上传信息的合法性
function checkShopInfoValidness()
{
    //获取表单数据
    icon = $('input[name=icon]').val();//头像
    shopname = $("input[name=shopname]").val().trim();
    transprice = $("input[name=transprice]").val().trim();
    
    //判空验证
    if(isEmpty(shopname)){$("input[name=shopname]").val("匿名店铺");}
    if(isEmpty(transprice)){alert('请填写每3本书籍的运费!'); return false;}

    //合法性验证
    //头像图片的格式只能是jpg
    if(!isEmpty(icon) && !isValidImageName(icon))
    {
        alert('店铺商标图片只能为jpg格式,请重新选择!');
        return false;   
    }
    
    if(!isValid(/\b\d+|[0-9]*\.?[0-9]+\b/,transprice))
    {
        alert('运费只能为非负整数或正小数');
        return false;
    }
    
    alert("已成功更新店铺信息!");
    return true;
}

//判空
function isEmpty(str){
    
    if(str == "")
        return true;
    else
        return false;
}

//以正则reg判合法性
function isValid(reg,str){
    if(reg.test(str))
        return true;
    else 
        return false;
}

function isValidImageName(book_image)
{
    suffix_name = book_image.substring(book_image.lastIndexOf('.') + 1);

    if(suffix_name == 'jpg')
        return true;
    else 
        return false;
}