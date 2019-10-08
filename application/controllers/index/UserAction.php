<<<<<<< HEAD
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class UserAction extends CI_Controller {

    public function index()
    {
        // $this->session->flashdata();
        // print_r($_SESSION);
        $this->load->model('User_model','user');
        $mobile = '12345678910';
        var_dump($this->user->checkMobile($mobile));


    }

    public function login()
    {
        $this->load->view('index/login.html');
    }

    // 进行注册动作，验证验证码
    public function register_checkCode()
    {
        $mobile = $this->session->userdata('mobile_number');
        
        $code = $this->input->post('code');
        // echo strlen($mobile).'   '.strlen($code);
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

        // print_r($_POST);

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
                echo "right";
            }
        }
        else 
        {
            echo "error";
        }

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
}
=======
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class UserAction extends CI_Controller {

    public function index()
    {
        echo "this is userAction index";
        print_r($_SESSION);
        phpinfo();


    }

    public function login()
    {
        $this->load->view('index/login.html');
    }
}
>>>>>>> 8be0acb7abb277b941a11f25a9f3fc464f7c5d97
