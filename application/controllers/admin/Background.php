<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//后台页面控制器
class Background extends CI_Controller
{
    //构造函数
    public function __construct()
    {
        parent::__construct();
        //$this->load->model('news_model');
    }
    //后台框架（从菜单栏）
    public function index(){
        $this->load->view('admin/index');
    }
    //默认欢迎界面
    public function welcome(){
        $this->load->helper('date');
        $this->load->view('admin/welcome_admin');
    }
    //产品管理界面
    public function product(){
        $this->load->view('admin/product');
    }
    //修改自己密码
    public function updatePwd(){
        $this->load->view('admin/updatePwd');
    }
    //修改密码验证
    public function pwd_verify(){
        $this->load->model('User_model');
        $this->load->library('pwdhash'); // 载入加密类
        //验证原始密码
        $mobileNumber = $this->session->userdata('mobileNumber');
        $userData = $this->User_model->checkMobile1($mobileNumber);
        $password = $this->input->post('password');
        if(!$this->pwdhash->CheckPassword($password,$userData[0]['password'])) error('原始密码错误');
        $passwordN = $this->input->post('passwordN');
        $passwordE = $this->input->post('passwordE');
        if($passwordN != $passwordE) error('两次密码不同');
        $data = array(
            'password' => $this->pwdhash->HashPassword($passwordN),
        );
        $this->User_model->change_pwd($mobileNumber,$data);
        success1('密码修改成功');
    }

}
