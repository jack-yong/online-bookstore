package com.cyong.pojo;

import java.util.Date;

public class User {
    private int Uid;
    private String Upassword; //密码
    private String Uavatar; //头像
    private String Unickname; //昵称
    private String Urealname; //真实姓名
    private String Usex;    //性别
    private String Uaddress;  //收货地址
    private String Uphone;  //号码
    private String Uemail;  //邮箱
    private Date  Ubirthday;    //生日

    public User() {
    }

    public User(String upassword, String uavatar, String unickname, String urealname, String usex, String uaddress, String uphone, String uemail, Date ubirthday) {
        Upassword = upassword;
        Uavatar = uavatar;
        Unickname = unickname;
        Urealname = urealname;
        Usex = usex;
        Uaddress = uaddress;
        Uphone = uphone;
        Uemail = uemail;
        Ubirthday = ubirthday;
    }

    public User(String upassword,String unickname){
        Upassword = upassword;
        Unickname = unickname;
    }

    public int getUid() {
        return Uid;
    }

    public void setUid(int uid) {
        Uid = uid;
    }

    public String getUpassword() {
        return Upassword;
    }

    public void setUpassword(String upassword) {
        Upassword = upassword;
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

    public String getUrealname() {
        return Urealname;
    }

    public void setUrealname(String urealname) {
        Urealname = urealname;
    }

    public String getUsex() {
        return Usex;
    }

    public void setUsex(String usex) {
        Usex = usex;
    }

    public String getUaddress() {
        return Uaddress;
    }

    public void setUaddress(String uaddress) {
        Uaddress = uaddress;
    }

    public String getUphone() {
        return Uphone;
    }

    public void setUphone(String uphone) {
        Uphone = uphone;
    }

    public String getUemail() {
        return Uemail;
    }

    public void setUemail(String uemail) {
        Uemail = uemail;
    }

    public Date getUbirthday() {
        return Ubirthday;
    }

    public void setUbirthday(Date ubirthday) {
        Ubirthday = ubirthday;
    }

    @Override
    public String toString() {
        return "User{" +
                "Uid=" + Uid +
                ", Upassword='" + Upassword + '\'' +
                ", Uavatar='" + Uavatar + '\'' +
                ", Unickname='" + Unickname + '\'' +
                ", Urealname='" + Urealname + '\'' +
                ", Usex='" + Usex + '\'' +
                ", Uaddress='" + Uaddress + '\'' +
                ", Uphone='" + Uphone + '\'' +
                ", Uemail='" + Uemail + '\'' +
                ", Ubirthday=" + Ubirthday +
                '}';
    }
}
