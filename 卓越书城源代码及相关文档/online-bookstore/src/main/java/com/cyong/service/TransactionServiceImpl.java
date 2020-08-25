package com.cyong.service;

import com.cyong.mapper.TransactionMapper;
import com.cyong.pojo.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionServiceImpl  implements TransactionService{

    @Autowired
    TransactionMapper transactionMapper;

    @Override
    public void addTrade(Transaction transactionBean) {
        transactionMapper.addTrade(transactionBean);
    }
}
