package com.cyong.controller;


import com.cyong.pojo.User;
import com.cyong.service.UserServiceImpl;
import com.cyong.util.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileNotFoundException;

@Controller
public class SelfInfoController {

    @Autowired
    private UserServiceImpl userService;

    @RequestMapping("/userinfo")
    public String userinfo(Model model,  HttpSession session){
        String loginuser = (String)session.getAttribute("loginuser");
        System.out.println(loginuser);
        User user = userService.queryUserByUnickname(loginuser);
        String uavatar = userService.getUavatarByUid(user.getUid());
        model.addAttribute("user",user);
        return "myinfo";
    }

    @RequestMapping("/updateMyInfo")
    public String updateMyInfo(@RequestParam("fileName") MultipartFile file,
                               @RequestParam("nickname") String nickname,
                               @RequestParam("realname") String realname,
                               @RequestParam("sex") String sex,
                               @RequestParam("address") String address,
                               @RequestParam("phone") String phone,
                               @RequestParam("email") String email,
                               Model model, HttpServletRequest request) throws FileNotFoundException {
        HttpSession session = request.getSession(true);
        String loginuser = (String)session.getAttribute("loginuser");
        File path = new File(ResourceUtils.getURL("classpath:").getPath());
        File upload = new File(path.getAbsolutePath(),"src/main/resources/static/images/avatars");
        String realPath = upload.getAbsolutePath().replace("\\target\\classes", "");

        File upfile = new File(realPath);

        //判断上传文件的保存目录是否存在
        if (!upfile.exists() && !upfile.isDirectory())
        {
            System.out.println(realPath+"目录不存在，需要创建");
            //创建目录
            upfile.mkdir();
        }
        String newuavatar = "";
        User user = userService.queryUserByUnickname(loginuser);
        System.out.println("内容是："+file.getOriginalFilename());
        if (!file.getOriginalFilename().isEmpty()){
            newuavatar =FileUtil.getFileName(file.getOriginalFilename());
            FileUtil.upload(file,realPath,newuavatar);
            user.setUavatar(newuavatar);
        }
        user.setUnickname(nickname);
        user.setUrealname(realname);
        user.setUsex(sex);
        user.setUaddress(address);
        user.setUemail(email);
        user.setUphone(phone);
        userService.updateUser(user);
        model.addAttribute("user",user);
        return "redirect:/userinfo";
    }

    @RequestMapping("myaddress_page")
    public String myaddress_page(){
        return "myaddress_page";
    }

    @RequestMapping("writeorder_addaddress")
    public String writeorder_addaddress(){
        return "writeorder_addaddress";
    }

}
