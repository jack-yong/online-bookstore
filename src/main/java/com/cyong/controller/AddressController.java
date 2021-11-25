package com.cyong.controller;

import com.cyong.pojo.Address;
import com.cyong.pojo.User;
import com.cyong.service.AddressServiceImpl;
import com.cyong.service.UserServiceImpl;
import com.cyong.util.Define;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

@Controller
public class AddressController {
    @Autowired
    private AddressServiceImpl addressService;
    @Autowired
    private UserServiceImpl userService;

    @RequestMapping("/readAddress")
    @ResponseBody
    public String readAddress(Model model, HttpSession httpSession, HttpServletResponse response) throws IOException {
        String loginuser = (String) httpSession.getAttribute("loginuser");
        User user = userService.queryUserByUnickname(loginuser);
        ObjectMapper mapper = new ObjectMapper();
        ArrayList<Address> addressList = addressService.getAddressByUid(user.getUid());
        String jsonlist = mapper.writeValueAsString(addressList);
        return jsonlist;
    }

    @RequestMapping("/checkAddress")
    @ResponseBody
    public void checkAddress(@RequestParam("Aid") String Aid, HttpSession httpSession) {
        String loginuser = (String) httpSession.getAttribute("loginuser");
        User user = userService.queryUserByUnickname(loginuser);
        addressService.checkAddress(user.getUid(),Integer.parseInt(Aid));
    }

    @RequestMapping("/deleteAddress")
    @ResponseBody
    public void deleteAddress(@RequestParam("Aid") String Aid,
                              @RequestParam("isChecked") boolean isChecked,
                              HttpSession httpSession) {
        String loginuser = (String) httpSession.getAttribute("loginuser");
        User user = userService.queryUserByUnickname(loginuser);
        String addressid = addressService.deleteAddress(user.getUid(), Integer.parseInt(Aid));
        if(isChecked == true)
            addressService.checkAddress(user.getUid(),Integer.parseInt(addressid)); //让新的aid地址选中
        return;
    }

    @RequestMapping("/addAddress")
    @ResponseBody
    public String deleteAddress(@RequestParam("receiver_name") String receiver_name,
                              @RequestParam("receive_address") String receive_address,
                              @RequestParam("receive_code") String receive_code,
                              @RequestParam("receive_phone") String receive_phone,
                              @RequestParam("receive_fixphone") String receive_fixphone,
                              @RequestParam("loc_province") String loc_province,
                              @RequestParam("loc_city") String loc_city,
                              @RequestParam("loc_town") String loc_town,
                              @RequestParam("check") String check,
                              HttpSession httpSession) throws JsonProcessingException {
        String loginuser = (String) httpSession.getAttribute("loginuser");
        User user = userService.queryUserByUnickname(loginuser);
        Address addressBean=new Address(user.getUid() ,receiver_name, receive_address, receive_code, receive_phone, receive_fixphone, loc_province, loc_city, loc_town, check);
        addressService.addAddress(addressBean);
        if( Integer.parseInt(addressBean.getAcheck()) == Define.addressChecked) //设为了默认地址
            addressService.checkAddress(user.getUid(),addressBean.getAid()); //aid地址选中
        ObjectMapper jsonmapper = new ObjectMapper();
        HashMap<String,Object> map = new HashMap<>();
        map.put("address", addressBean);
        map.put("result", "SUCCESS");
        String json = jsonmapper.writeValueAsString(map);
        return json;
    }



}

