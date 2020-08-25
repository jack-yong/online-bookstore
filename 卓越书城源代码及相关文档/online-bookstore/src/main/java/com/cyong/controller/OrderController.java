package com.cyong.controller;

import com.cyong.pojo.*;
import com.cyong.service.*;
import com.cyong.util.Define;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;


@Controller
public class OrderController {

    @Autowired
    ShopServiceImpl shopService;

    @Autowired
    OrderformServiceImpl orderformService;

    @Autowired
    TransactionServiceImpl transactionService;

    @Autowired
    BookServiceImpl bookService;

    @Autowired
    UserServiceImpl userService;

    @RequestMapping("/toSubmiteOrder")
    public String toSubmiteOrder(HttpSession session){
        session.setAttribute(Define.CART_TOKEN,true);
        return "redirect:/submitOrder";
    }

    @RequestMapping("/submitOrder")
    public String submitOrder(Model model, HttpServletRequest request
                          )
    {
        //先验证用户是否登录
        HttpSession session=request.getSession(true);
        String username=(String) session.getAttribute("loginuser");
        if(username == null) //未登录，跳转至登录界面
        {
            return "redirect:/user/login";
        }
        else {
          if(session.getAttribute(Define.CART_TOKEN) != null){
              session.removeAttribute(Define.CART_TOKEN);
                //获取当前购物车
              ArrayList<BookInCart> bookInCartBeanList=(ArrayList<BookInCart>) session.getAttribute("bookInCartBeanList");
                //将"打勾"商品按“店铺”归到同一订单中
              List<Orderform> orderBeanList=new ArrayList<Orderform>();
              for(int i=0;i<bookInCartBeanList.size();i++)
              {
                  BookInCart bookInCartBean=bookInCartBeanList.get(i);
                  if(bookInCartBean.isChecked() == true) //打勾的才加入
                      addToOrderList(bookInCartBean,orderBeanList);
              }

              //计算所有订单的小计价格+运费
              calOrderPrice(orderBeanList);
              //计算所有订单的总商品价格、总运费、总实付款
              float booksTotalPrice=0.0f; //总商品价
              float transTotalPrice=0.0f;//总运费
              float actualTotalPrice=0.0f; //总实付款
              for(int i=0;i<orderBeanList.size();i++)
              {
                  Orderform orderBean=orderBeanList.get(i);
                  booksTotalPrice += orderBean.getOtotalbooksprice();
                  transTotalPrice += orderBean.getOtotaltransprice();
              }
              actualTotalPrice=booksTotalPrice + transTotalPrice; //总实付款
              session.setAttribute("orderBeanList",orderBeanList);
              model.addAttribute("orderBeanList",orderBeanList);
              model.addAttribute("booksTotalPrice",booksTotalPrice);
              model.addAttribute("transTotalPrice",transTotalPrice);
              model.addAttribute("actualTotalPrice",actualTotalPrice);

          }
          else {
              model.addAttribute("orderBeanList", null);
          }
        }
        return "writeorder_page";
    }

    @RequestMapping("buyatonce")
    public String submitOrder(@RequestParam("Bid") String Bid,
                              Model model, HttpServletRequest request)
    {
        HttpSession session=request.getSession(true);
        String username=(String) session.getAttribute("loginuser");
        if(username == null) //未登录，跳转至登录界面
        {
            return "redirect:/user/login";
        }
        else {
            session.removeAttribute(Define.CART_TOKEN);
            BookInCart bookInCart = bookService.getBookInCartByBid(Integer.parseInt(Bid));
            bookInCart.setTboughtnum(1);

            //生成订单
            List<Orderform> orderBeanList=new ArrayList<Orderform>();
            addToOrderList(bookInCart,orderBeanList);  //把这本书加入订单

            //计算所有订单的小计价格+运费
            calOrderPrice(orderBeanList);

            //计算所有订单的总商品价格、总运费、总实付款
            float booksTotalPrice=0.0f; //总商品价
            float transTotalPrice=0.0f;//总运费
            float actualTotalPrice=0.0f; //总实付款
            for(int i=0;i<orderBeanList.size();i++)
            {
                Orderform orderBean=orderBeanList.get(i);
                booksTotalPrice += orderBean.getOtotalbooksprice();
                transTotalPrice += orderBean.getOtotaltransprice();
            }
            actualTotalPrice=booksTotalPrice + transTotalPrice; //总实付款
            session.setAttribute("orderBeanList",orderBeanList);
            model.addAttribute("orderBeanList",orderBeanList);
            model.addAttribute("booksTotalPrice",booksTotalPrice);
            model.addAttribute("transTotalPrice",transTotalPrice);
            model.addAttribute("actualTotalPrice",actualTotalPrice);
            return "writeorder_page";
        }
    }

    @RequestMapping("/sendBookBackToCart")
    @ResponseBody
    public String sendBookBackToCart(@RequestParam("orderIndex") String orderIndex,
                                     @RequestParam("bookIndex") String bookIndex,
                                     Model model, HttpServletRequest request) throws JsonProcessingException {
        HttpSession session=request.getSession(true);
        //获取订单表
        List<Orderform> orderBeanList= (ArrayList<Orderform>)session.getAttribute("orderBeanList");
        Orderform orderBean = orderBeanList.get(Integer.parseInt(orderIndex));
        orderBean.getBookInCartBeanList().remove(Integer.parseInt(bookIndex));

        if(orderBean.getBookInCartBeanList().size() == 0) //订单orderIndex中的书已被删完
        {
            System.out.println("订单orderIndex中的书已被删完");
            System.out.println(orderBeanList);
            orderBeanList.remove(Integer.parseInt(orderIndex)); //删去订单
            if(orderBeanList.size() == 0) //订单删光了
                session.removeAttribute("orderBeanList");
            return "";
        }
        else //没被删完，运费则可能会变，重新计算
        {
            System.out.println("订单orderIndex中的书没被删完");
            System.out.println(orderBeanList);
            orderBean.calOrderPrice();
            orderBean.calOrderTotalTransPrice();
            ObjectMapper jsonmapper = new ObjectMapper();
            HashMap<String,Float> map = new HashMap<>();
            map.put("totalTransPrice",orderBean.getOtotaltransprice());
            String json = jsonmapper.writeValueAsString(map);
            return json;
        }

    }

    @RequestMapping("/tomakeOrder")
    public String makeOrder(@RequestParam("Aid") String Aid,HttpSession session){
        session.setAttribute(Define.WRITEORDER_TOKEN,true);
        return "redirect:/makeOrder?Aid="+Aid;
    }


    @RequestMapping("/makeOrder")
    public String makeOrder(@RequestParam("Aid") String Aid,
                                     Model model,HttpServletRequest request){
        HttpSession session=request.getSession(true);
        String username=(String) session.getAttribute("loginuser");
        if(session.getAttribute(Define.WRITEORDER_TOKEN) != null) //最正常地提交订单
        {
            session.removeAttribute(Define.WRITEORDER_TOKEN);
                //获取订单表、购物车、地址号
            List<Orderform> orderBeanList=(ArrayList<Orderform>)session.getAttribute("orderBeanList");
            List<BookInCart> bookInCartBeanList=(ArrayList<BookInCart>) session.getAttribute("bookInCartBeanList");

            //将订单从session中购物车中删除+写入数据库
            removeSubmittedBookInCartAndAddOrder(username,Aid,orderBeanList,bookInCartBeanList);
            float payTotal = 0;
            for(int i=0;i<orderBeanList.size();i++)
            {
                Orderform orderBean = orderBeanList.get(i);
                payTotal += orderBean.getOtotalbooksprice() + orderBean.getOtotaltransprice();
            }
            model.addAttribute("result", "SUCCESS"); //成功标记
            model.addAttribute("payTotal", Float.toString(payTotal)); //成功标记
        }
        else {
            model.addAttribute("result", "INVALID"); //失败标记
        }
        return "tip_page";
    }


    @RequestMapping("/queryOrder")
    public String queryOrder( Model model,HttpServletRequest request){
        HttpSession session = request.getSession(true);
        String username=(String) session.getAttribute("loginuser");
        User user = userService.queryUserByUnickname(username);
        ArrayList<Orderform> orderformArrayList = orderformService.findOrderFormsByUidByPage(user.getUid());
        orderformService.findBookListInOrderList(orderformArrayList);
        model.addAttribute("orderformArrayList", orderformArrayList);
        return "myorder_page";
    }


    @RequestMapping("ordermanger")
    public String ordermanger( Model model,HttpServletRequest request){
        HttpSession session = request.getSession(true);
        String mangeruser =  (String)session.getAttribute("mangeruser");
        User user = userService.queryUserByUnickname(mangeruser);
        int sid = shopService.getSidByUid(user.getUid());
        ArrayList<Orderform> orderforms = orderformService.findBookBySid(sid);
        model.addAttribute("orderforms",orderforms);
        return "ordermanger";
    }


    //将书籍添加到订单表中
    //查找目前的订单里是否有与bookInCartBean.sid相同的店铺
    //若相同，追加进去
    //若未找到，新增至orderList尾
    void addToOrderList(BookInCart bookInCartBean,List<Orderform> orderBeanList)
    {
        int j;
        for(j=0;j<orderBeanList.size();j++)
        {
            Orderform oldOrder= orderBeanList.get(j); //j号订单

            if(bookInCartBean.getSid() == oldOrder.getBookInCartBeanList().get(0).getSid())
            {
                oldOrder.getBookInCartBeanList().add(bookInCartBean);
                break;
            }
        }
        if(j >= orderBeanList.size()) //未找到
        {
            //构建订单表（初始只含一本书）
            Orderform newOrder=new Orderform();
            newOrder.getBookInCartBeanList().add(bookInCartBean);

            //添加第一本书时获取店铺(订单)的id、图标、名称、单位运费
            Shop shopBean = shopService.findShopBySid(bookInCartBean.getSid());
            newOrder.setSid(shopBean.getSid());
            newOrder.setSicon(shopBean.getSicon());
            newOrder.setSname(shopBean.getSname());
            newOrder.setStransprice(shopBean.getStransprice());

            //新增到orderList
            orderBeanList.add(newOrder);

        }
    }

    //计算订单列表的运费+小计运费
    void calOrderPrice(List<Orderform> orderBeanList)
    {
        for(int i=0;i<orderBeanList.size();i++)
        {
            Orderform orderFormBean = orderBeanList.get(i);
            orderFormBean.calOrderPrice();
            orderFormBean.calOrderTotalTransPrice();
        }
    }

    //删除购物车中已提交过的商品、将订单写入到数据库
    void removeSubmittedBookInCartAndAddOrder(String username,String aid,
                                              List<Orderform> orderBeanList,List<BookInCart> bookInCartBeanList){


        if(orderBeanList != null && orderBeanList.size() > 0)
        {
            for(int orderIndex=0;orderIndex < orderBeanList.size();orderIndex++)
            {
                Orderform orderBean=orderBeanList.get(orderIndex);
                List<BookInCart> submittedBookList=orderBean.getBookInCartBeanList(); //订单orderIndex
                User user = userService.queryUserByUnickname(username);
                orderBean.setUid(user.getUid());
                orderBean.setAid(Integer.parseInt(aid));
                orderBean.setOsubmittime(new Date());
                orderformService.addOrder(orderBean);

                for(int sIndex=0;sIndex < submittedBookList.size();sIndex++)
                {
                    BookInCart submittedBook=submittedBookList.get(sIndex); //第sIndex本订了的书

                    //将交易信息写入交易
                    Transaction transactionBean=new Transaction(Integer.parseInt(submittedBook.getBid()),orderBean.getOid() ,user.getUid(), Define.TRADESTATUS_WAITPAY, submittedBook.getTboughtnum(), 0,"", new Date() );
                    transactionService.addTrade(transactionBean);

                    //从购物车中删除
                    if(bookInCartBeanList != null && bookInCartBeanList.size() > 0)
                    {
                        for(int cIndex=0;cIndex < bookInCartBeanList.size();cIndex++)
                        {
                            BookInCart cartBook=bookInCartBeanList.get(cIndex);//购物车中的第cIndex本书
                            if(submittedBook.getBid() == cartBook.getBid())
                            {
                                bookInCartBeanList.remove(cIndex); //从购物车中删除
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
}
