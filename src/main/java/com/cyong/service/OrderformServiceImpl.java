package com.cyong.service;

import com.cyong.mapper.OrderformMapper;
import com.cyong.pojo.BookInCart;
import com.cyong.pojo.Orderform;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class OrderformServiceImpl  implements OrderformService{

    @Autowired
    OrderformMapper orderformMapper;

    @Override
    public Orderform findOrderFormByOid(int oid) {
        return orderformMapper.findOrderFormByOid(oid);
    }

    @Override
    public int getOrderPageCountByUid(int uid) {
        return orderformMapper.getOrderPageCountByUid(uid);
    }

    @Override
    public void deleteOrder(int oid) {
        orderformMapper.deleteOrder(oid);
    }

    @Override
    public void addOrder(Orderform orderBean) {
        orderformMapper.addOrder(orderBean);
    }

    public ArrayList<Orderform> findOrderFormsByUidByPage(int uid){
        return orderformMapper.findOrderFormsByUidByPage(uid);
    }

    public ArrayList<Orderform> findBookBySid(int Sid){
        return orderformMapper.findBookBySid(Sid);
    }
    public ArrayList<BookInCart> findBookByOid(int Oid){
        return orderformMapper.findBookByOid(Oid);
    }

    public void findBookListInOrderList(ArrayList<Orderform> orderList){
        for(int i=0;i<orderList.size();i++){
            Orderform orderBean = orderList.get(i); //获取订单
            ArrayList<BookInCart> bookList = new ArrayList<BookInCart>(); //生成该订单所购书籍容器列表
            ArrayList<BookInCart> bookInCarts = orderformMapper.findBookByOid(orderBean.getOid());
            for (BookInCart bookInCart : bookInCarts) {
                bookList.add(bookInCart);
            }
            orderBean.setBookInCartBeanList(bookList); //将书籍列表加入该订单中
        }
    }
}
