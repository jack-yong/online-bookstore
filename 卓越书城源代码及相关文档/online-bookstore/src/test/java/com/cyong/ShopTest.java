package com.cyong;

import com.cyong.pojo.BookSnapshot;
import com.cyong.pojo.Shop;
import com.cyong.service.BookServiceImpl;
import com.cyong.service.ShopServiceImpl;
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
import java.util.ArrayList;

//加上这两个注解，运行测试方法的时候就会启动SpringBoot
@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)  //按照指定方法运行
public class ShopTest {
    @Autowired
    DataSource dataSource;
    @Autowired
    ShopServiceImpl shopService;

    @Test
    public void testA() throws SQLException {
        System.out.println(dataSource.getClass());
        Connection connection = dataSource.getConnection();
        connection.close();
    }

    @Test
    public void  testB(){
        Shop shop = shopService.findShopBySid(1);
        System.out.println(shop);
    }

    @Test
    public void  testC(){
        String siconBySid = shopService.getSiconBySid(1);
        System.out.println(siconBySid);
    }

    @Test
    public void  testD(){
        int sidByUid = shopService.getSidByUid(1);
        System.out.println(sidByUid);
    }

    @Test
    public void  testE(){
        shopService.addShop("世纪图书");
    }

    @Test
    public void  testF(){
        Shop shop = new Shop(11,"0.jpg");
        shopService.updateShop(shop);

    }



}
