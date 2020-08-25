package com.cyong.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Address {
    private int Aid; //地址号
    private int Uid;    //用户名
    private String Areceivername;   //收货人姓名
    private String Aaddress;    //收货地址
    private String Acode;   //邮政编码
    private String Aphone;  //手机
    private String Afixphone;   //座机
    private String Aprovince;   //省
    private String Acity;   //市
    private String Atown;   //区
    private String Acheck;  //是否正使用

    public Address() {
    }

    public Address(int uid, String areceivername, String aaddress, String acode, String aphone, String afixphone, String aprovince, String acity, String atown, String acheck) {
        Uid = uid;
        Areceivername = areceivername;
        Aaddress = aaddress;
        Acode = acode;
        Aphone = aphone;
        Afixphone = afixphone;
        Aprovince = aprovince;
        Acity = acity;
        Atown = atown;
        Acheck = acheck;
    }

    @JsonProperty("Aid")
    public int getAid() {
        return Aid;
    }

    public void setAid(int aid) {
        Aid = aid;
    }

    @JsonProperty("Uid")
    public int getUid() {
        return Uid;
    }

    public void setUid(int uid) {
        Uid = uid;
    }

    @JsonProperty("Areceivername")
    public String getAreceivername() {
        return Areceivername;
    }

    public void setAreceivername(String areceivername) {
        Areceivername = areceivername;
    }

    @JsonProperty("Aaddress")
    public String getAaddress() {
        return Aaddress;
    }

    public void setAaddress(String aaddress) {
        Aaddress = aaddress;
    }

    @JsonProperty("Acode")
    public String getAcode() {
        return Acode;
    }

    public void setAcode(String acode) {
        Acode = acode;
    }

    @JsonProperty("Aphone")
    public String getAphone() {
        return Aphone;
    }

    public void setAphone(String aphone) {
        Aphone = aphone;
    }

    @JsonProperty("Afixphone")
    public String getAfixphone() {
        return Afixphone;
    }

    public void setAfixphone(String afixphone) {
        Afixphone = afixphone;
    }

    @JsonProperty("Aprovince")
    public String getAprovince() {
        return Aprovince;
    }

    public void setAprovince(String aprovince) {
        Aprovince = aprovince;
    }

    @JsonProperty("Acity")
    public String getAcity() {
        return Acity;
    }

    public void setAcity(String acity) {
        Acity = acity;
    }

    @JsonProperty("Atown")
    public String getAtown() {
        return Atown;
    }

    public void setAtown(String atown) {
        Atown = atown;
    }

    @JsonProperty("Acheck")
    public String getAcheck() {
        return Acheck;
    }

    public void setAcheck(String acheck) {
        Acheck = acheck;
    }

    @Override
    public String toString() {
        return "Address{" +
                "Aid=" + Aid +
                ", Uid=" + Uid +
                ", Areceivername='" + Areceivername + '\'' +
                ", Aaddress='" + Aaddress + '\'' +
                ", Acode='" + Acode + '\'' +
                ", Aphone='" + Aphone + '\'' +
                ", Afixphone='" + Afixphone + '\'' +
                ", Aprovince='" + Aprovince + '\'' +
                ", Acity='" + Acity + '\'' +
                ", Atown='" + Atown + '\'' +
                ", Acheck='" + Acheck + '\'' +
                '}';
    }
}
