package com.cyong.controller;

import com.cyong.pojo.Shop;
import com.cyong.pojo.User;
import com.cyong.service.ShopServiceImpl;
import com.cyong.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;

@Controller
public class ShopController {
    @Autowired
    ShopServiceImpl shopService;

    @Autowired
    UserServiceImpl userService;

    @RequestMapping("/shopmanger")
    public String shopmanger(Model model, HttpSession session){
         String mangeruser = (String)session.getAttribute("mangeruser");
        User user = userService.queryUserByUnickname(mangeruser);
        int sid = shopService.getSidByUid(user.getUid());
        Shop shop = shopService.findShopBySid(sid);
        model.addAttribute("Shop",shop);
        return "shopmanger";

    }

    @RequestMapping("/updateShop")
    public String updateShop(@RequestParam("sid") String sid,
                             @RequestParam("name") String name,
                             @RequestParam("activity") String activity,
                             @RequestParam("transprice") String transprice,
                             @RequestParam("summary") String summary,
                             Model model, HttpSession session)
    {
        Shop shop = shopService.findShopBySid(Integer.parseInt(sid));
        shop.setSname(name);
        shop.setSactivity(activity);
        shop.setStransprice(Float.parseFloat(transprice));
        shop.setSsummary(summary);
        shopService.updateShop(shop);
        model.addAttribute("Shop",shop);
        return "shopmanger";
    }
}
