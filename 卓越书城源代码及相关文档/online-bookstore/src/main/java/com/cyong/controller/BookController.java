package com.cyong.controller;

import com.cyong.pojo.BookDetail;
import com.cyong.pojo.BookInCart;
import com.cyong.pojo.User;
import com.cyong.service.BookServiceImpl;
import com.cyong.service.ShopServiceImpl;
import com.cyong.service.UserServiceImpl;
import com.cyong.util.Define;
import com.cyong.util.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;

@Controller
public class BookController {
    @Autowired
    private BookServiceImpl bookService;

    @Autowired
    UserServiceImpl userService;

    @Autowired
    ShopServiceImpl shopService;

    @RequestMapping("/BookDetail")
    public String BookDetail(@RequestParam("dowhat") String dowhat,
                             @RequestParam("Bid") String Bid, Model model, HttpSession httpSession){
        if(dowhat.equals("findDetail"))
        {
            BookDetail bookDetail = bookService.getBookDetailById(Integer.parseInt(Bid));
            model.addAttribute("BookDetail",bookDetail);
            httpSession.setAttribute(Define.DETAIL_TOKEN,true);
        }
        return "detail_page";
    }

    @RequestMapping("/bookmanger")
    public String bookmanger(Model model, HttpServletRequest request){
        HttpSession session = request.getSession(true);
        String mangeruser =  (String)session.getAttribute("mangeruser");
        User user = userService.queryUserByUnickname(mangeruser);
        int sid = shopService.getSidByUid(user.getUid());
        ArrayList<BookInCart> bookInCarts = bookService.getBookInCartBySid(sid);
        model.addAttribute("bookInCarts",bookInCarts);
        return "bookmanger";
    }

    @RequestMapping("/bookedit")
    public String bookedit(@RequestParam("Bid") String Bid,
                           Model model, HttpServletRequest request)
    {
        BookDetail bookDetail = bookService.getBookDetailById(Integer.parseInt(Bid));
        model.addAttribute("bookDetail",bookDetail);
        return "bookedit";
    }

    @RequestMapping("/editbook")
    public String editbook(@RequestParam("Bid") String Bid,
                           @RequestParam("Bname") String Bname,
                           @RequestParam("fileName") MultipartFile file,
                           @RequestParam("Bprice") String Bprice,
                           @RequestParam("Bsalednum") String Bsalednum,
                           @RequestParam("Bcommentnum") String Bcommentnum,
                           @RequestParam("Bauthor") String Bauthor,
                           @RequestParam("Bpublisher") String Bpublisher,
                           @RequestParam("Boriprice") String Boriprice,
                           @RequestParam("Bversion") String Bversion,
                           @RequestParam("Bpagenum") String Bpagenum,
                           @RequestParam("Bwordnum") String Bwordnum,
                           @RequestParam("Bsize") String Bsize,
                           @RequestParam("Bpaperstyle") String Bpaperstyle,
                           @RequestParam("Bpackage") String Bpackage,
                           @RequestParam("Bisbn") String Bisbn,
                           @RequestParam("Bcontentsummary") String Bcontentsummary,
                           @RequestParam("Bauthorsummary") String Bauthorsummary,
                           @RequestParam("Bmediacomment") String Bmediacomment,
                           @RequestParam("Btastecontent") String Btastecontent,
                           Model model, HttpServletRequest request) throws FileNotFoundException {

        //上传图片
        File path = new File(ResourceUtils.getURL("classpath:").getPath());
        File upload = new File(path.getAbsolutePath(),"src/main/resources/static/images/books");
        String realPath = upload.getAbsolutePath().replace("\\target\\classes", "");
        File upfile = new File(realPath);

        //判断上传文件的保存目录是否存在
        if (!upfile.exists() && !upfile.isDirectory())
        {
            System.out.println(realPath+"目录不存在，需要创建");
            //创建目录
            upfile.mkdir();
        }
        String newBimge = "";
        BookDetail bookDetail = bookService.getBookDetailById(Integer.parseInt(Bid));

        if (!file.getOriginalFilename().isEmpty()){
            newBimge = FileUtil.getFileName(file.getOriginalFilename());
            FileUtil.upload(file,realPath,newBimge);
            bookDetail.setBimage(newBimge);
        }
        bookDetail.setBname(Bname);
        bookDetail.setBprice(Float.parseFloat( Bprice));
        bookDetail.setBsalednum(Integer.parseInt(Bsalednum));
        bookDetail.setBcommentnum(Integer.parseInt(Bcommentnum));
        bookDetail.setBauthor(Bauthor);
        bookDetail.setBpublisher(Bpublisher);
        bookDetail.setBoriprice(Float.parseFloat(Boriprice));
        bookDetail.setBversion(Integer.parseInt(Bversion));
        bookDetail.setBpagenum(Integer.parseInt(Bpagenum));
        bookDetail.setBwordnum(Integer.parseInt(Bwordnum));
        bookDetail.setBsize(Integer.parseInt(Bsize));
        bookDetail.setBpaperstyle(Bpaperstyle);
        bookDetail.setBpackage(Bpackage);
        bookDetail.setBisbn(Bisbn);
        bookDetail.setBcontentsummary(Bcontentsummary);
        bookDetail.setBauthorsummary(Bauthorsummary);
        bookDetail.setBmediacomment(Bmediacomment);
        bookDetail.setBtastecontent(Btastecontent);
        bookService.updateBookDetail(bookDetail);
        model.addAttribute("bookDetail",bookDetail);
        return "bookedit";
    }

    @RequestMapping("/bookdel")
    public String bookdel(@RequestParam("Bid") String Bid,
                           Model model, HttpServletRequest request)
    {
        bookService.delBookByBid(Integer.parseInt(Bid));

        return "redirect:/bookmanger";
    }

    @RequestMapping("/Statebook")
    public String Statebook(Model model, HttpServletRequest request){
        return "Statebook";
    }

    @RequestMapping("/bookadd")
    public String bookadd(@RequestParam("Bname") String Bname,
                          @RequestParam("fileName") MultipartFile file,
                          @RequestParam("Bprice") String Bprice,
                          @RequestParam("Bsalednum") String Bsalednum,
                          @RequestParam("Bcommentnum") String Bcommentnum,
                          @RequestParam("Bauthor") String Bauthor,
                          @RequestParam("Bpublisher") String Bpublisher,
                          @RequestParam("Boriprice") String Boriprice,
                          @RequestParam("Bversion") String Bversion,
                          @RequestParam("Bpagenum") String Bpagenum,
                          @RequestParam("Bwordnum") String Bwordnum,
                          @RequestParam("Bsize") String Bsize,
                          @RequestParam("Bpaperstyle") String Bpaperstyle,
                          @RequestParam("Bpackage") String Bpackage,
                          @RequestParam("Bisbn") String Bisbn,
                          @RequestParam("Bcontentsummary") String Bcontentsummary,
                          @RequestParam("Bauthorsummary") String Bauthorsummary,
                          @RequestParam("Bmediacomment") String Bmediacomment,
                          @RequestParam("Btastecontent") String Btastecontent,
                          Model model, HttpServletRequest request) throws FileNotFoundException {
        //上传图片
        File path = new File(ResourceUtils.getURL("classpath:").getPath());
        File upload = new File(path.getAbsolutePath(),"src/main/resources/static/images/books");
        String realPath = upload.getAbsolutePath().replace("\\target\\classes", "");
        File upfile = new File(realPath);

        //获取sid
        HttpSession session = request.getSession(true);
        String mangeruser =  (String)session.getAttribute("mangeruser");
        User user = userService.queryUserByUnickname(mangeruser);
        int sid = shopService.getSidByUid(user.getUid());

        //判断上传文件的保存目录是否存在
        if (!upfile.exists() && !upfile.isDirectory())
        {
            System.out.println(realPath+"目录不存在，需要创建");
            //创建目录
            upfile.mkdir();
        }
        String newBimge = "";
        BookDetail bookDetail = new BookDetail();

        bookDetail.setBimage(newBimge);
        if (!file.getOriginalFilename().isEmpty()){
            newBimge = FileUtil.getFileName(file.getOriginalFilename());
            FileUtil.upload(file,realPath,newBimge);
            bookDetail.setBimage(newBimge);
        }
        bookDetail.setSid(sid);
        bookDetail.setBname(Bname);
        bookDetail.setBprice(Float.parseFloat( Bprice));
        bookDetail.setBsalednum(Integer.parseInt(Bsalednum));
        bookDetail.setBcommentnum(Integer.parseInt(Bcommentnum));
        bookDetail.setBauthor(Bauthor);
        bookDetail.setBpublisher(Bpublisher);
        bookDetail.setBoriprice(Float.parseFloat(Boriprice));
        bookDetail.setBversion(Integer.parseInt(Bversion));
        bookDetail.setBpagenum(Integer.parseInt(Bpagenum));
        bookDetail.setBwordnum(Integer.parseInt(Bwordnum));
        bookDetail.setBsize(Integer.parseInt(Bsize));
        bookDetail.setBpaperstyle(Bpaperstyle);
        bookDetail.setBpackage(Bpackage);
        bookDetail.setBisbn(Bisbn);
        bookDetail.setBcontentsummary(Bcontentsummary);
        bookDetail.setBauthorsummary(Bauthorsummary);
        bookDetail.setBmediacomment(Bmediacomment);
        bookDetail.setBtastecontent(Btastecontent);
        bookService.addBook(bookDetail);
        return "redirect:/bookmanger";
    }


}
