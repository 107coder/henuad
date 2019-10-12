<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PrivateView extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        if(empty($this->session->mobile))
        {
            $url = site_url('index/PublicView/login');
            redirect($url);
            die;
        }
    }


    //个人信息

    public function userInfo()
    {
        $this->load->model('User_model','user');
        $mobile = $this->session->mobile;
        $where = ['mobileNumber'=>$mobile];
        $data['userInfo'] = $this->user->getInfo($where);
        $this->load->view('index/pages/user-info.html',$data);
    }


    //上传作品
    public function upload()
    {
        $this->load->view('index/pages/upload.html');
    }
    //我的作品
    public function myCreation()
    {
        $this->load->view('index/pages/mycreation.html');
    }
    //我的获奖
    public function myAward()
    {
        $this->load->view('index/pages/myAward.html');
    }
    //修改密码
    public function changePassword()
    {
        $this->load->view('index/pages/changePassword.html');
    }

}