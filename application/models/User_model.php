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
    public function checkLogin($where)
    {
        $data = $this->db->select('name,password,email,schoolName')->get_where('user',$where)->result_array();
        return $data;
    }
    
    //后台密码修改
    public function change_pwd($mobileNumber,$data){
        $this->db->update('user',$data,array('mobileNumber' => $mobileNumber));
    }

    // 补全用户信息
    public function completeInfo($data_arr,$where)
    {
        return $this->db->update('user',$data_arr,$where);
    }

    // 获取用户信息
    public function getInfo($where)
    {
        return $this->db->select('mobileNumber,email,name,schoolName,professional,grade,personalProfil')->from('user')->where($where)->get()->result_array();
    }

    //后台删除用户
    public function del_user($mobileNumber){
        $this->db->delete('user', array('mobileNumber'=>$mobileNumber));
    }
}