<?php
defined('BASEPATH') OR exit('No direct script access allowed');

//后台登录控制器
class Login extends CI_Controller
{
    //构造函数
    public function __construct()
    {
        parent::__construct();
        $this->load->model('User_model');
    }
    //后台登陆界面
    public function index(){
        $this->load->view('admin/login');
    }
    //真正验证码
    public function code(){
        $config = array(
            'width' => 80,
            'height' => 30,
            'codeLen' => 3,
            'fontSize' => 16

        );
        $this->load->library('code',$config);
        $this->code->show();
    }
    //登录
    public function login_in(){
        $this->load->library('pwdhash'); // 载入加密类
        $code = $this->input->post('captcha');
        if(!isset($_SESSION)){
            session_start();
        }
        $this->load->helper('date');
        if(strtoupper($code) != $_SESSION['code']) error('验证码错误');

        $mobileNumber = $this->input->post('mobileNumber');
        $password = $this->input->post('password');
        var_dump($this->pwdhash->HashPassword($password));
        $userData = $this->User_model->checkMobile($mobileNumber);
        if(!$userData || $userData[0]['password'] != $this->pwdhash->HashPassword($password)) error('用户名或者密码错误');
        $sessionData = array(
            'mobileNumber'=> $mobileNumber,
            'login_time' => time()
        );
        $this->session->set_userdata($sessionData);
        success('admin/background/index','登录成功');
    }
    //退出登录
    public function login_out(){
        $this->session->sess_destroy();
        success('admin/login/index','退出成功');
    }
}
