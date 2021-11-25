package com.cyong;


import com.cyong.pojo.Address;
import com.cyong.service.AddressServiceImpl;
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
public class AddressTest {

    @Autowired
    DataSource dataSource;
    @Autowired
    AddressServiceImpl addressService;

    @Test
    public void testA() throws SQLException {
        System.out.println(dataSource.getClass());
        Connection connection = dataSource.getConnection();
        connection.close();
    }

    @Test
    public void  testB(){
        ArrayList<Address> addressArrayList = addressService.getAddressByUid(3);
        for (Address address : addressArrayList) {
            System.out.println(address);
        }
    }

    @Test
    public void  testC(){
        Address address = addressService.getAddressByAid(1);
        System.out.println(address);
    }

    @Test
    public void  testD(){
        addressService.checkAddress(3,2);
    }

    @Test
    public void  testE(){
        String s = addressService.deleteAddress(4, 7);
        System.out.println(s);
    }
}
