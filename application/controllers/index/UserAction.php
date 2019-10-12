<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class UserAction extends CI_Controller {

    public function index()
    {

    }
    public function setSession()
    {

    }

    public function getSession(){
        print_r($_SESSION);
    }
    public function login()
    {
        $this->load->view('index/login.html');
    }

    // 校验验证码是否正确
    public function checkCode($code = '')
    {
        if(!isset($_SESSION['code']))
        {
            return false;
        }
        $trueCode = $this->session->tempdata('code');
        // echo $trueCode;
        if(!empty($code)){
            if($code == $trueCode)
            {
                return true;
            }
        }
        return false;
    }

    // 进行注册动作，验证验证码
    public function register_checkCode()
    {
        $mobile = $this->session->userdata('mobile_number');
        
        $code = $this->input->post('code');

        if(strlen($mobile) == 11 && strlen($code) == 6)
        {
            if( $this->checkCode($code) )
            {
                echo "right";
                return true;
            }
            else
            {
                echo "error";
                return false;
            }
        }
        else
        {
            echo "length error";
            return false;
        }
    }
    // 设置密码
    public function register_setPassword()
    {
        $this->load->library('pwdhash'); // 载入加密类
        $this->load->model('User_model','user');

        $password = $this->input->post('password');
        $confirmPassword = $this->input->post('confirmPassword');
        $mobile = $this->session->userdata('mobile_number');

        if(empty($password) || empty($confirmPassword))
        {
            echo "empty";
            return false;
        } 
        if($password == $confirmPassword)
        {
            $data_arr = array(
                'password' => $this->pwdhash->HashPassword($password),
                'mobileNumber' => $mobile,
                'registerTime' => time()
            );
            $aff_rows = $this->user->register($data_arr);
            if($aff_rows == 1)
            {
                $sess_data  = array(
                    'mobile' => $mobile,
                    'eomplete' => 0
                );
                $this->session->set_userdata($sess_data);

                echo "right";
            }
        }
        else 
        {
            echo "error";
        }

    }

    // 进行登录动作，验证验证码
    public function login_checkCode()
    {
        
        $this->load->model('User_model','user'); // 载入数据库
        // 从session中获取获取验证码的手机号
        $mobile = $this->session->userdata('mobile_number');
        $data_arr = array(
            'mobileNumber' => $mobile
        );
        $data = $this->user->checkLogin($data_arr);
        if(empty($data))
        {
            $msg = "手机号不存在，请先注册！";
            error($msg);
            return false;
        }
        
        $code = $this->input->post('mobileCode');
        if(strlen($mobile) == 11 && strlen($code) == 6)
        {
            if( $this->checkCode($code) )
            {
                if(empty($data[0]['name']) || empty($data[0]['email']) || empty($data[0]['schoolName']))
                {
                    $sess_data = ['complete' => 0];
                }
                $sess_data['mobile'] = $mobile;
                $this->session->set_userdata($sess_data);
                $url = "";
                $msg = "登录成功！";
                success($url,$msg);
                return true;
            }
            else
            {
                $msg = "验证码不正确！";
                error($msg);
                return false;
            }
        }
        else
        {
            $msg = "对不起，输入有误！";
            error($msg);
            return false;
        }
    }


    function login_password()
    {
        $this->load->library('pwdhash'); // 载入加密类
        $this->load->model('User_model','user');

        $password = $this->input->post('password');
        $mobile = $this->input->post('mobile1');

        // 判断是否为空
        if(empty($password) || empty($mobile))
        {
            $msg = "账号或密码不能为空！";
            error($msg);
        } 
        $data_arr = array(
            'mobileNumber' => $mobile
        );
        $data = $this->user->checkLogin($data_arr);
        if(empty($data))
        {
            $msg = "手机号不存在，请先注册！";
            error($msg);
            return false;
        }
        if($this->pwdhash->CheckPassword($password,$data[0]['password']))
        {
            if(empty($data[0]['name']) || empty($data[0]['email']) || empty($data[0]['schoolName']))
            {
                $sess_data = ['eomplete' => 0];
            }
            $sess_data['mobile'] = $mobile;
            $this->session->set_userdata($sess_data);
            $url = "";
            $msg = "登录成功！";
            success($url,$msg);
        }
        else 
        {
            $msg = "用户名或密码错误，请重新登录！";
            error($msg);
        }
       
       

    }


    // 退出登录
    function loginOut()
    {
        session_destroy();
        $msg = "退出成功！";
        $url = "";

        success($url,$msg);
    }
}
