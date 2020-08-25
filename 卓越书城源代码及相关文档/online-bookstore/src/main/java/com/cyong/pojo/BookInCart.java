package com.cyong.pojo;

import com.cyong.util.Define;

public class BookInCart {
    private String Bid;
    private String Bimage;
    private float Bprice;
    private String Bname;
    private int Sid;
    private String Sicon;
    private String Sname;
    private float Boriprice;
    private int Tboughtnum;
    private int Tstatus;
    private boolean checked;

    public BookInCart() {
    }

    public BookInCart(String bid, String bimage, float bprice, String bname, int sid, String sicon, String sname, float boriprice) {
        Bid = bid;
        Bimage = "images/books/"+bimage;
        Bprice = bprice;
        Bname = bname;
        Sid = sid;
        Sicon = "images/shopicons/"+sicon;
        Sname = sname;
        Boriprice = boriprice;
        Tboughtnum = 1;
        Tstatus = Define.TRADESTATUS_WAITPAY;
        this.checked = true;
    }

    public String getBid() {
        return Bid;
    }

    public void setBid(String bid) {
        Bid = bid;
    }

    public String getBimage() {
        return "images/books/"+Bimage;
    }

    public void setBimage(String bimage) {
        Bimage = bimage;
    }

    public float getBprice() {
        return Bprice;
    }

    public void setBprice(float bprice) {
        Bprice = bprice;
    }

    public String getBname() {
        return Bname;
    }

    public void setBname(String bname) {
        Bname = bname;
    }

    public int getSid() {
        return Sid;
    }

    public void setSid(int sid) {
        Sid = sid;
    }

    public String getSicon() {
        return "images/shopicons/"+Sicon;
    }

    public void setSicon(String sicon) {
        Sicon = sicon;
    }

    public String getSname() {
        return Sname;
    }

    public void setSname(String sname) {
        Sname = sname;
    }

    public float getBoriprice() {
        return Boriprice;
    }

    public void setBoriprice(float boriprice) {
        Boriprice = boriprice;
    }

    public int getTboughtnum() {
        return Tboughtnum;
    }

    public void setTboughtnum(int tboughtnum) {
        Tboughtnum = tboughtnum;
    }

    public int getTstatus() {
        return Tstatus;
    }

    public void setTstatus(int tstatus) {
        Tstatus = tstatus;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    @Override
    public String toString() {
        return "BookInCart{" +
                "Bid='" + Bid + '\'' +
                ", Bimage='" + Bimage + '\'' +
                ", Bprice=" + Bprice +
                ", Bname='" + Bname + '\'' +
                ", Sid=" + Sid +
                ", Sicon='" + Sicon + '\'' +
                ", Sname='" + Sname + '\'' +
                ", Boriprice=" + Boriprice +
                ", Tboughtnum=" + Tboughtnum +
                ", Tstatus=" + Tstatus +
                ", checked=" + checked +
                '}';
    }
}
