package com.cyong;

import com.cyong.pojo.BookDetail;
import com.cyong.pojo.BookInCart;
import com.cyong.pojo.BookSnapshot;
import com.cyong.service.BookServiceImpl;
import com.cyong.util.Define;
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
public class BookTest {

    @Autowired
    DataSource dataSource;
    @Autowired
    BookServiceImpl bookService;

    @Test
    public void testA() throws SQLException {
        System.out.println(dataSource.getClass());
        Connection connection = dataSource.getConnection();
        connection.close();
    }

    @Test
    public void  testB(){
        ArrayList<BookSnapshot> random8Books = bookService.getRandom8Books();
        System.out.println(random8Books);
    }

    @Test
    public void testC(){
        ArrayList<BookSnapshot> bookSnapshotsByKey = bookService.getBookSnapshotsByKey("小", 1, "Bid", Define.bookSnapshotPageSize);
        for (BookSnapshot bookSnapshot : bookSnapshotsByKey) {
            System.out.println(bookSnapshot);
        }
    }

    @Test
    public void testD(){
        int i = bookService.getBookSnapshotsPageCountByKey("");
        System.out.println(i);
    }

    @Test
    public void testE(){
        ArrayList<BookSnapshot>  BookSnapshot= bookService.getBookSnapshotsByType("2_1",1,"Bid",20);
        for (com.cyong.pojo.BookSnapshot bookSnapshot : BookSnapshot) {
            System.out.println(bookSnapshot);
        }
    }

    @Test
    public void testF(){
        BookInCart bookInCartByBid = bookService.getBookInCartByBid(4);
        System.out.println(bookInCartByBid);

    }

    @Test
    public void testG(){
        ArrayList<BookInCart> bookInCarts = bookService.getBookInCartBySid(3);
        for (BookInCart bookInCart : bookInCarts) {
            System.out.println(bookInCart);
        }

    }

    @Test
    public void testH(){
        BookDetail detailById = bookService.getBookDetailById(2);
        System.out.println(detailById);

    }

    @Test
    public void testI(){
        BookDetail detailById = bookService.getBookDetailById(2);
        detailById.setBprice(14);
        bookService.updateBookDetail(detailById);

    }

    @Test
    public void testJ(){
        BookDetail detailById = bookService.getBookDetailById(2);
        detailById.setBname("测试");
        bookService.addBook(detailById);

    }
}
