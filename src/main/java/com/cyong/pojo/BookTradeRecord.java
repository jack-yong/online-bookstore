package com.cyong.pojo;

public class BookTradeRecord {
    private String Uavatar;
    private String Unickname;
    private int Tboughtnum;
    private String Treceivetime;

    public BookTradeRecord() {
    }

    public BookTradeRecord(String uavatar, String unickname, int tboughtnum, String treceivetime) {
        Uavatar = uavatar;
        Unickname = unickname;
        Tboughtnum = tboughtnum;
        Treceivetime = treceivetime;
    }

    public String getUavatar() {
        return Uavatar;
    }

    public void setUavatar(String uavatar) {
        Uavatar = uavatar;
    }

    public String getUnickname() {
        return Unickname;
    }

    public void setUnickname(String unickname) {
        Unickname = unickname;
    }

    public int getTboughtnum() {
        return Tboughtnum;
    }

    public void setTboughtnum(int tboughtnum) {
        Tboughtnum = tboughtnum;
    }

    public String getTreceivetime() {
        return Treceivetime;
    }

    public void setTreceivetime(String treceivetime) {
        Treceivetime = treceivetime;
    }

    @Override
    public String toString() {
        return "BookTradeRecord{" +
                "Uavatar='" + Uavatar + '\'' +
                ", Unickname='" + Unickname + '\'' +
                ", Tboughtnum=" + Tboughtnum +
                ", Treceivetime='" + Treceivetime + '\'' +
                '}';
    }
}
