package com.cyong.pojo;

import java.util.Date;

public class Transaction {
    private int Tid; //交易号
    private int Bid;    //书籍号
    private int Oid;    //订单号
    private int Uid;    //用户名
    private int Tstatus;    //交易状态
    private int Tboughtnum; //数量
    private int Tmark;  //星级
    private String Tcomment;    //评价
    private Date Tsubmittime;   //提交时间
    private Date Tpaytime;  //支付时间
    private Date Treceivetime;  //收货时间
    private Date Tcommenttime;  //评价时间

    public Transaction() {
    }

    public Transaction(int bid, int oid, int uid, int tstatus, int tboughtnum, int tmark, String tcomment, Date tsubmittime) {
        Bid = bid;
        Oid = oid;
        Uid = uid;
        Tstatus = tstatus;
        Tboughtnum = tboughtnum;
        Tmark = tmark;
        Tcomment = tcomment;
        Tsubmittime = tsubmittime;
    }

    public int getTid() {
        return Tid;
    }

    public void setTid(int tid) {
        Tid = tid;
    }

    public int getBid() {
        return Bid;
    }

    public void setBid(int bid) {
        Bid = bid;
    }

    public int getOid() {
        return Oid;
    }

    public void setOid(int oid) {
        Oid = oid;
    }

    public int getUid() {
        return Uid;
    }

    public void setUid(int uid) {
        Uid = uid;
    }

    public int getTstatus() {
        return Tstatus;
    }

    public void setTstatus(int tstatus) {
        Tstatus = tstatus;
    }

    public int getTboughtnum() {
        return Tboughtnum;
    }

    public void setTboughtnum(int tboughtnum) {
        Tboughtnum = tboughtnum;
    }

    public int getTmark() {
        return Tmark;
    }

    public void setTmark(int tmark) {
        Tmark = tmark;
    }

    public String getTcomment() {
        return Tcomment;
    }

    public void setTcomment(String tcomment) {
        Tcomment = tcomment;
    }

    public Date getTsubmittime() {
        return Tsubmittime;
    }

    public void setTsubmittime(Date tsubmittime) {
        Tsubmittime = tsubmittime;
    }

    public Date getTpaytime() {
        return Tpaytime;
    }

    public void setTpaytime(Date tpaytime) {
        Tpaytime = tpaytime;
    }

    public Date getTreceivetime() {
        return Treceivetime;
    }

    public void setTreceivetime(Date treceivetime) {
        Treceivetime = treceivetime;
    }

    public Date getTcommenttime() {
        return Tcommenttime;
    }

    public void setTcommenttime(Date tcommenttime) {
        Tcommenttime = tcommenttime;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "Tid=" + Tid +
                ", Bid=" + Bid +
                ", Oid=" + Oid +
                ", Uid=" + Uid +
                ", Tstatus=" + Tstatus +
                ", Tboughtnum=" + Tboughtnum +
                ", Tmark=" + Tmark +
                ", Tcomment='" + Tcomment + '\'' +
                ", Tsubmittime=" + Tsubmittime +
                ", Tpaytime=" + Tpaytime +
                ", Treceivetime=" + Treceivetime +
                ", Tcommenttime=" + Tcommenttime +
                '}';
    }
}
