package com.cyong;

import com.cyong.pojo.BookInCart;
import com.cyong.pojo.BookSnapshot;
import com.cyong.pojo.Orderform;
import com.cyong.service.OrderformServiceImpl;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;


//加上这两个注解，运行测试方法的时候就会启动SpringBoot
@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)  //按照指定方法运行
public class orderformTest {

    @Autowired
    DataSource dataSource;
    @Autowired
    OrderformServiceImpl orderformService;

    @Test
    public void testA() throws SQLException {
        System.out.println(dataSource.getClass());
        Connection connection = dataSource.getConnection();
        connection.close();
    }

    @Test
    public void  testB(){
        Orderform orderform = new Orderform(1,1,1,165,20,new Date(),1);
        orderformService.addOrder(orderform);
        System.out.println(orderform.getOid());

    }

    @Test
    public void  testC(){
        Orderform orderform = orderformService.findOrderFormByOid(1);
        System.out.println(orderform);
    }

    @Test
    public void  testD(){
        int num = orderformService.getOrderPageCountByUid(1);
    }

    @Test
    public void  testE(){
        orderformService.deleteOrder(2);
    }

    @Test
    public void  testF(){
        ArrayList<Orderform> orderformArrayList = orderformService.findOrderFormsByUidByPage(3);
        for (Orderform orderform : orderformArrayList) {
            System.out.println(orderform);
        }
    }

    @Test
    public void  testG(){
        ArrayList<BookInCart> bookByOid = orderformService.findBookByOid(14);
        for (BookInCart bookInCart : bookByOid) {
            System.out.println(bookInCart);
        }
    }

    @Test
    public void  testH(){
        ArrayList<Orderform> orderformArrayList = orderformService.findBookBySid(6);
        for (Orderform orderform : orderformArrayList) {
            System.out.println(orderform);
        }
    }

}
