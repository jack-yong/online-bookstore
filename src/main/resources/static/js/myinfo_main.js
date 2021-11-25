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
function checkMyInfoValidness()
{
    //获取表单数据
    avatar = $('input[name=avatar]').val();//头像
    nickname = $("input[name=nickname]").val().trim();
    birthday = $("input[name=birthday]").val().trim();

    //判空验证
    if(isEmpty(nickname)){$("input[name=nickname]").val("匿名");}
    if(isEmpty(birthday)){$("input[name=birthday]").val("0001-01-01");}
 
    //合法性验证
    //头像图片的格式只能是jpg
    if(!isEmpty(avatar) && !isValidImageName(avatar))
    {
        alert('头像图片只能为jpg格式,请重新选择!');
        return false;   
    }

    
    alert("已成功更新个人信息!");
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