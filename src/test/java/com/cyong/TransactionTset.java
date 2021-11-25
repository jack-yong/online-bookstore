package com.cyong;


import com.cyong.pojo.Shop;
import com.cyong.pojo.Transaction;
import com.cyong.service.TransactionServiceImpl;
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
import java.util.Date;

//加上这两个注解，运行测试方法的时候就会启动SpringBoot
@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)  //按照指定方法运行
public class TransactionTset {

    @Autowired
    DataSource dataSource;
    @Autowired
    TransactionServiceImpl transactionService;

    @Test
    public void testA() throws SQLException {
        System.out.println(dataSource.getClass());
        Connection connection = dataSource.getConnection();
        connection.close();
    }

    @Test
    public void  testB(){
        Transaction transaction = new Transaction(1,1,1,1,2,1,"",new Date());
        transactionService.addTrade(transaction);
    }
}
