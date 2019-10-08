<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PublicView extends CI_Controller {

    public function index()
    {
        $this->load->view('index/index.html');
    }

    public function login()
    {
        $this->load->view('index/pages/login.html');
    }

    public function register()
    {
        $this->load->view('index/pages/register.html');
    }

    public function heade()
    {
        $this->load->view('index/components/heade.html');
    }

    // 发送验证码
    public function sendCode()
    {
        $mobile = $this->input->post('phoneNumber');
        // 引入数据库，验证手机号是否已经注册
        $this->load->model('user_model','user');
        $exist = $this->user->checkMobile($mobile);
        if($exist != 0)
        {
            echo "exist";
            return false;
        }
        $data = array('mobile_number'=>$mobile);
        $this->session->set_userdata($data);
        $code = rand(123456,987654);
        $this->session->set_tempdata('code',$code,60);
        $param = "{$code},60";
        echo $mobile.'   ' ;
        echo $param;
        // $this->load->library('sms');
        // $sms_code = $this->sms->send($param,$mobile);
        // echo $sms_code;
    }



}
