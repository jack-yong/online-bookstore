package com.cyong.service;

import com.cyong.pojo.*;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

public interface BookService {
    int addBook(BookDetail book);

    // 获取随机8本书s
    public ArrayList<BookSnapshot> getRandom8Books();

    // 按关键字key获取like的书籍列表
    public ArrayList<BookSnapshot> getBookSnapshotsByKey( String key,  int pageNow,  String refer,int PageSize);

    //按类别码type获取的书籍列表
    public ArrayList<BookSnapshot> getBookSnapshotsByType(String type, int pageNow, String refer,int PageSize);

    //获取书籍详情bean
    public BookDetail getBookDetailById(int bid);

    //获取评价信息表
    public ArrayList<BookComment> getBookCommentByIdAndPage(int Bid, int pageNow);

    //获取成交记录信息表
    public ArrayList<BookTradeRecord> getBookTradeRecordByIdAndPage( int Bid,int pageNow);

    public ArrayList<BookInCart> getBookInCartBySid(int Sid);

    public void  delBookByBid(int Bid);

    public void  updateBookDetail(BookDetail bookDetail);

    //oid订单中的书籍成交量全部+1
    public void AddSaledNum(int oid);

    //书籍下的评论数量加一
    public void incCommentNum(int bid);

    //获取key书籍snapshot应该分成的总页数
    public int getBookSnapshotsPageCountByKey(String key);

    //获取type书籍snapshot应该分成的总页数
    public int getBookSnapshotsPageCountByType(String type);

    public int getPageCount(int rowCount,int pageSize);

    public BookInCart getBookInCartByBid(int Bid);

}
