<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User_model extends CI_Model {

    public function register($data_arr)
    {
        $this->db->insert('user',$data_arr);
        $aff_rows = $this->db->affected_rows();
        return $aff_rows;
    }

    // 检验手机号是否已经存在
    public function checkMobile($mobile)
    {
        $data = $this->db->get_where('user',['mobileNumber'=>$mobile])->num_rows();
        return $data;
    }
    // 登录验证
    public function checkLogin($where)
    {
        $data = $this->db->select('name,password,email,schoolName')->get_where('user',$where)->result_array();
        return $data;
    }
    
    //密码修改
    public function change_pwd($mobileNumber,$data){
        $this->db->update('user',$data,array('mobileNumber' => $mobileNumber));
    }

    // 补全用户信息
    public  function completeInfo($data_arr,$where)
    {
        return $this->db->update('user',$data_arr,$where);
    }

    // 获取用户信息
    public function getInfo($where)
    {
        return $this->db->select('mobileNumber,email,name,schoolName,professional,grade,personalProfil')->from('user')->where($where)->get()->result_array();
    }
}