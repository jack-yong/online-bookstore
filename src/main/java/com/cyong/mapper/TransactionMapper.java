package com.cyong.mapper;

import com.cyong.pojo.Transaction;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import javax.xml.crypto.Data;
import java.util.Date;

@Mapper
@Repository
public interface TransactionMapper {

    public void addTrade(Transaction transactionBean);

}
