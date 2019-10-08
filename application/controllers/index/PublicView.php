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

    // 发送验证码
    public function sendCode()
    {
        
        $mobile = $this->input->post('phoneNumber');
        $code = rand(123456,987654);
        $this->session->set_userdata(['code'=>$code]);
        $param = "{$code},60"; 
        echo $param;
         $this->load->library('sms');
         $sms_code = $this->sms->send($param,$mobile);
        // echo $sms_code;
    }
    // 校验验证码是否正确
    public function checkCode($code)
    {
        
        $trueCode = $this->session->userdata('code');

        if(!empty($code)){
            if($code == $trueCode)
            {
                return true;
            }
        }
        return false;
    }


}
