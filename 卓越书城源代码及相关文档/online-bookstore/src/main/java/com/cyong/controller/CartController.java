package com.cyong.controller;

import com.cyong.pojo.BookInCart;
import com.cyong.service.BookServiceImpl;
import com.cyong.util.CookieUtil;
import com.cyong.util.Define;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;

@Controller
public class CartController {

    @Autowired
    BookServiceImpl bookService;


    @RequestMapping("/AddCart")
    public String AddCart(Model model,
                          @RequestParam("dowhat") String dowhat,
                          @RequestParam("Bid") String Bid, HttpServletRequest request,
                          HttpServletResponse response) {
        HttpSession httpSession = request.getSession();
        String loginuser = (String) httpSession.getAttribute("loginuser");
        if (loginuser == null) {
            return "redirect:/user/login";
        } else {
            clearOrderListInSession(loginuser, httpSession);
            //获取session中的购物篮BookInCartBeanList表
            ArrayList<BookInCart> bookInCartBeanList = (ArrayList<BookInCart>) httpSession.getAttribute("bookInCartBeanList");
            if (httpSession.getAttribute(Define.DETAIL_TOKEN) != null) {
                httpSession.removeAttribute(Define.DETAIL_TOKEN);
                if (bookInCartBeanList == null) //购物框为空，第一次
                    bookInCartBeanList = new ArrayList<BookInCart>();

                int i;
                for (i = 0; i < bookInCartBeanList.size(); i++) {
                    BookInCart bookInCart = bookInCartBeanList.get(i);
                    if (Bid.equals(bookInCart.getBid())) //已存在，旧的，改变成数量+1
                    {
                        int tboughtnum = bookInCart.getTboughtnum();
                        bookInCart.setTboughtnum(++tboughtnum);
                        break;
                    }
                }
                if (i == bookInCartBeanList.size()) //不存在，新的,封装并添加
                {
                    //将本次欲加入购物车的书籍信息封装成BookInCartBean
                    BookInCart bookincart = bookService.getBookInCartByBid(Integer.parseInt(Bid));
                    bookincart.setChecked(true);
                    bookincart.setTboughtnum(1);
                    bookincart.setTstatus(Define.TRADESTATUS_WAITPAY);
                    //添加至购物框
                    bookInCartBeanList.add(bookincart);
                }
                //转发
                httpSession.setAttribute("bookInCartBeanList", bookInCartBeanList);    //更新session(注意!!是username+_bookInCartBeanList这个账户的)
            }
            model.addAttribute("bookInCartBeanList", bookInCartBeanList);
            CookieUtil.addCookie(request, response, "sessionid", httpSession.getId());
            return "cart_page";
        }
    }

    @RequestMapping("/lookCart")
    public String checkABookInCart(HttpSession session, Model model) {
        String loginuser = (String) session.getAttribute("loginuser");
        if (loginuser == null) //未登录，跳转至登录界面
        {
            return "redirect:/user/login";
        } else {
            clearOrderListInSession(loginuser, session);
            if (session.getAttribute("bookInCartBeanList") != null) {
                ArrayList<BookInCart> bookInCartBeanList = (ArrayList<BookInCart>) session.getAttribute("bookInCartBeanList");
                model.addAttribute("bookInCartBeanList", bookInCartBeanList);
                model.addAttribute("size", bookInCartBeanList.size());
            } else {
                model.addAttribute("bookInCartBeanList", null);
                model.addAttribute("size", 0);
            }
            return "cart_page";
        }
    }

    @RequestMapping("/checkABookInCart")
    public String checkABookInCart(HttpSession session,
                                   @RequestParam("index") int index,
                                   @RequestParam("checked") boolean checked,
                                   Model model) {
        ArrayList<BookInCart> bookInCartBeanList = (ArrayList<BookInCart>) session.getAttribute("bookInCartBeanList");
        bookInCartBeanList.get(index).setChecked(checked);
        session.setAttribute("bookInCartBeanList", bookInCartBeanList);
        model.addAttribute("bookInCartBeanList", bookInCartBeanList);
        return "cart_page";

    }

    @RequestMapping("/checkAllBooksInCart")
    public String checkAllBooksInCart(HttpSession session,
                                      @RequestParam("checked") boolean checked,
                                      Model model) {
        ArrayList<BookInCart> bookInCartBeanList = (ArrayList<BookInCart>) session.getAttribute("bookInCartBeanList");
        if (bookInCartBeanList != null)
            for (int index = 0; index < bookInCartBeanList.size(); index++)
                bookInCartBeanList.get(index).setChecked(checked);
        session.setAttribute("bookInCartBeanList", bookInCartBeanList);
        model.addAttribute("bookInCartBeanList", bookInCartBeanList);
        return "cart_page";

    }

    @RequestMapping("/updateBoughtNumInCart")
    public String updateBoughtNumInCart(HttpSession session,
                                        @RequestParam("index") int index,
                                        @RequestParam("boughtNum") int boughtNum,
                                        Model model) {
        ArrayList<BookInCart> bookInCartBeanList = (ArrayList<BookInCart>) session.getAttribute("bookInCartBeanList");
        bookInCartBeanList.get(index).setTboughtnum(boughtNum);
        session.setAttribute("bookInCartBeanList", bookInCartBeanList);
        model.addAttribute("bookInCartBeanList", bookInCartBeanList);
        return "cart_page";
    }


    @RequestMapping("/delABookInCart")
    public String delABookInCart(HttpSession session,
                                 @RequestParam("index") int index,
                                 Model model) {
        ArrayList<BookInCart> bookInCartBeanList = (ArrayList<BookInCart>) session.getAttribute("bookInCartBeanList");
        if (bookInCartBeanList != null && bookInCartBeanList.size() > 0)
            bookInCartBeanList.remove(index);
        session.setAttribute("bookInCartBeanList", bookInCartBeanList);
        model.addAttribute("bookInCartBeanList", bookInCartBeanList);
        return "cart_page";

    }

    @RequestMapping("/delAllBooksInCart")
    public String delABookInCart(HttpSession session,
                                 Model model) {
        ArrayList<BookInCart> bookInCartBeanList = (ArrayList<BookInCart>) session.getAttribute("bookInCartBeanList");
        if (bookInCartBeanList != null)
            bookInCartBeanList.clear();
        session.setAttribute("bookInCartBeanList", bookInCartBeanList);
        model.addAttribute("bookInCartBeanList", bookInCartBeanList);
        return "cart_page";
    }


    //删除存在session中的临时订单表
    void clearOrderListInSession(String username, HttpSession session) {
        if (username != null)
            session.removeAttribute("orderBeanList"); //删除临时的订单表
    }
}
