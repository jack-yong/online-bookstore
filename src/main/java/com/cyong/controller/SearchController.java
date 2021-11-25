package com.cyong.controller;

import com.cyong.common.Pager;
import com.cyong.pojo.BookSnapshot;
import com.cyong.service.BookServiceImpl;
import com.cyong.util.Define;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;

@Controller
public class SearchController {

    @Autowired
    private BookServiceImpl bookService;

    @RequestMapping("/Search")
    public String Search(Model model, @RequestParam("key") String key,
                         @RequestParam("dowhat") String dowhat,
                         @RequestParam("type") String type,
                         @RequestParam("refer") String refer,
                         @RequestParam("curPage") String currentPage
                            ){
        // 按关键字检索数据库中书籍，获取ArrayList
        ArrayList<BookSnapshot> bookSnapshotList=null;
        Pager pager = new Pager();
        int totalResult = 0;
        if(dowhat.equals("searchByKey")){
            bookSnapshotList = bookService.getBookSnapshotsByKey(key,Integer.parseInt(currentPage),refer,Define.bookSnapshotPageSize);
            totalResult = bookService.getBookSnapshotsPageCountByKey(key);
        }
        else if(dowhat.equals("searchByType")){
            bookSnapshotList = bookService.getBookSnapshotsByType(type,Integer.parseInt(currentPage),refer,Define.bookSnapshotPageSize);
            totalResult = bookService.getBookSnapshotsPageCountByType(type);
        }
        pager.setCurrentPage(Integer.parseInt(currentPage));
        pager.setPageSize(Define.bookSnapshotPageSize);
        pager.setTotolResults(totalResult);
        model.addAttribute("bookSnapshotLists",bookSnapshotList);
        System.out.println(pager);
        model.addAttribute("pager",pager);
        model.addAttribute("dowhat",dowhat);
        model.addAttribute("key",key);
        model.addAttribute("type",type);
        model.addAttribute("refer",refer);
        return "searchpage";

    }
}
