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
    // 后台查询所有用户数据
    public function checkUsers()
    {
        $data = $this->db->order_by('registerTime','asc')->get_where('user',['isAdmin'=>0])->result_array();
        return $data;
    }
    // 后台查询登录用户数据
    public function checkMobile1($mobile)
    {
        $data = $this->db->get_where('user',['mobileNumber'=>$mobile])->result_array();
        return $data;
    }
    // 登录验证
    public function checkLogin($data_arr)
    {
        $data = $this->db->get_where('user',$data_arr)->result_array();
        return $data;
    }
    
    //前后台密码修改
    public function change_pwd($mobileNumber,$data){
        $this->db->update('user',$data,array('mobileNumber' => $mobileNumber));
    }
    //后台删除用户
    public function del_user($mobileNumber){
        $this->db->delete('user', array('mobileNumber'=>$mobileNumber));
    }
}