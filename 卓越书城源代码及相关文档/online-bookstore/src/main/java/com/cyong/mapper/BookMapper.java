package com.cyong.mapper;

import com.cyong.pojo.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
//表示这个是一个mybatis的类
@Mapper
@Repository
public interface BookMapper {

    int addBook(BookDetail book);

    // 获取随机8本书s
    public ArrayList<BookSnapshot> getRandom8Books();

    // 按关键字key获取like的书籍列表
    public ArrayList<BookSnapshot> getBookSnapshotsByKey(@Param("key") String key,@Param("pageNow") int pageNow,@Param("refer") String refer,@Param("PageSize") int PageSize);

    //按类别码type获取的书籍列表
    public ArrayList<BookSnapshot> getBookSnapshotsByType(@Param("type") String type,@Param("pageNow") int pageNow,@Param("refer") String refer,@Param("PageSize") int PageSize);

    //获取书籍详情bean
    public BookDetail getBookDetailById(@Param("bid") int bid);

    //获取评价信息表
    public ArrayList<BookComment> getBookCommentByIdAndPage(@Param("Bid") int Bid,@Param("pageNow") int pageNow);

    //获取成交记录信息表
    public ArrayList<BookTradeRecord> getBookTradeRecordByIdAndPage(@Param("Bid") int Bid,@Param("pageNow") int pageNow);


    //oid订单中的书籍成交量全部+1
    public void AddSaledNum(@Param("oid") int oid);

    //书籍下的评论数量加一
    public void incCommentNum(@Param("bid") int bid);

    //获取key书籍snapshot应该分成的总页数
    public int getBookSnapshotsPageCountByKey(@Param("key") String key);

    //获取type书籍snapshot应该分成的总页数
    public int getBookSnapshotsPageCountByType(@Param("type")String type);

    public BookInCart getBookInCartByBid(@Param("Bid")int Bid);

    public ArrayList<BookInCart> getBookInCartBySid(@Param("Sid")int Sid);

    public void  delBookByBid(@Param("Bid")int Bid);

    public void  updateBookDetail(BookDetail bookDetail);

}
