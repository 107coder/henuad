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
    public function checkLogin($data_arr)
    {
        $data = $this->db->get_where('user',$data_arr)->result_array();
        return $data;
    }
    
    //密码修改
    public function change_pwd($mobileNumber,$data){
        $this->db->update('user',$data,array('mobileNumber' => $mobileNumber));
    }
}