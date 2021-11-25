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
function checkUpLoadInfoValidness()
{
    //获取表单数据
    book_name = $("input[name=book_name]").val().trim();
    book_author = $("input[name=book_author]").val().trim();
    book_publisher = $("input[name=book_publisher]").val().trim();
    book_publishdate = $("input[name=book_publishdate]").val().trim();
    book_image = $('input[name=book_image]').val();//书籍图片
    book_oriprice= $("input[name=book_oriprice]").val().trim();
    book_price = $("input[name=book_price]").val().trim();
    book_stocknum = $("input[name=book_stocknum]").val().trim();
    book_version = $("input[name=book_version]").val().trim();
    book_pagenum = $("input[name=book_pagenum]").val().trim();
    book_wordnum  = $("input[name=book_wordnum]").val().trim();
    book_printdate = $("input[name=book_printdate]").val().trim();
    book_size = $("input[name=book_size]").val().trim();
    book_printnum = $("input[name=book_printnum]").val().trim();
    book_isbn = $("input[name=book_isbn]").val().trim();
    book_contentsummary  = $("textarea[name=book_contentsummary]").val().trim();
    book_authorsummary   = $("textarea[name=book_authorsummary]").val().trim();
    book_mediacomment  = $("textarea[name=book_mediacomment]").val().trim();
    book_tastecontent  = $("textarea[name=book_tastecontent]").val().trim();

    //判空验证
    if(isEmpty(book_name)){alert('书籍标题不能为空!');return false;}
    if(isEmpty(book_author)){alert('作者名称不能为空!');return false;}
    if(isEmpty(book_publisher)){alert('出版社不能为空!');return false;}
    if(isEmpty(book_publishdate)){alert('出版日期不能为空!');return false;}
    if(isEmpty(book_image)){alert('请为书籍选择图片!');return false;}
    if(isEmpty(book_oriprice)){alert('定价不能为空!');return false;}
    if(isEmpty(book_price)){alert('促销价不能为空!');return false;}
    if(isEmpty(book_oriprice)){alert('定价不能为空!');return false;}
    if(isEmpty(book_stocknum)){alert('数量不能为空!');return false;}
    if(isEmpty(book_contentsummary)){$("textarea[name=book_contentsummary]").val("暂无");}
    if(isEmpty(book_authorsummary)){$("textarea[name=book_authorsummary]").val("暂无");}
    if(isEmpty(book_mediacomment)){$("textarea[name=book_mediacomment]").val("暂无");}
    if(isEmpty(book_tastecontent)){$("textarea[name=book_tastecontent]").val("暂无");}
    
    //合法性验证
    //书图片的格式只能是jpg
    if(!isValidImageName(book_image))
    {
        alert('书籍图片只能为jpg格式,请重新选择!');
        return false;   
    }
    if(!isValid(/\b\d+|[0-9]*\.?[0-9]+\b/,book_oriprice))
    {
        alert('定价只能为正整数或正小数');
        return false;
    }
    if(!isValid(/\b\d+|[0-9]*\.?[0-9]+\b/,book_price))
    {
        alert('促销价只能为正整数或正小数!');
        return false;
    }
    if(!isValid(/^[1-9]\d*$/,book_stocknum))
    {
        alert('数量只能为正整数!');
        return false;
    }
    if(!isValid(/^[1-9]\d*$/,book_version))
    {
        alert('版次只能为正整数!');
        return false;
    }
    if(!isValid(/^[1-9]\d*$/,book_pagenum))
    {
        alert('页数只能为正整数!');
        return false;
    }
    if(!isValid(/^[1-9]\d*$/,book_wordnum))
    {
        alert('字数只能为正整数!');
        return false;
    }
    if(!isValid(/^[1-9]\d*$/,book_size))
    {
        alert('开本只能为正整数!');
        return false;
    }
    if(!isValid(/^[1-9]\d*$/,book_printnum))
    {
        alert('印次只能为正整数!');
        return false;
    }
//    if(!isValid(/^\d{3}-\d-\d{3}-\d{5}-\d$/,book_isbn))
//    {
//        alert('国际标准书号ISBN有误!');
//        return false;
//    }

    alert('您已成功发布一本新的书籍!');
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

//分类表
var typeTable=[['待定'],
               ['治愈系','动漫','幽默','言情'],
               ['文学','传记','艺术','摄影','成功'],
               ['当代','近代','古典','国外','悬疑','惊悚','科幻','武侠','军事','社会','都市','乡土','职场','财经','历史','影视'],
               ['科普','图画书','英语'],
               ['教材','外语','考试','中小学教辅','工具书'],
               ['孕期','两性','早教','亲子','保健','运动','美妆','时尚','手工/DIY','美食','旅游','休闲','家庭/家居','风水/占卜'],
               ['历史','古籍','哲学/宗教','文化','政治/军事','法律','社会学科','心理学'],
               ['科普','建筑','医学','计算机','自然科学','农林','工业'],
               ['管理','投资理财','经济','音像']];

//当大分类改变时，小分类项目变化
function onParentTypeChange()
{
    //先获取大类号
    parent_num = $('select[name=book_parent_type]').val();
    
    //获取小类元素
    $child_select =  $('select[name=book_child_type]');
    
    //取出小类到列表中
    $child_select.empty(); 
    for(i=0;i<typeTable[parent_num].length;i++)
        $child_select.append("<option value='"+ i +"'>"+ typeTable[parent_num][i] +"</option>");
}

function isValidImageName(book_image)
{
    suffix_name = book_image.substring(book_image.lastIndexOf('.') + 1);

    if(suffix_name == 'jpg')
        return true;
    else 
        return false;
}
