<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PrivateAction extends CI_Controller
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

    public function index()
    {
        echo "1111";
    }

//    补全个人信息
    public function updateUserInfo()
    {
        $this->load->model('User_model','user'); // 载入数据库类
        $mobile = $this->session->mobile;
        $name = $this->input->post("name");
        $email = $this->input->post('email');
        $schoolName = $this->input->post('schoolName');
        $professional = $this->input->post('professional');
        $grade = $this->input->post('grade');
        $personalProfil = $this->input->post('personalProfil');

        $data_arr = array(
            'name' => $name,
            'email' => $email,
            'schoolName' => $schoolName,
            'professional' => $professional,
            'grade' => $grade,
            'personalProfil' => $personalProfil
        );
        $where = array('mobileNumber'=>$mobile);

        $status = $this->user->updateUserInfo($data_arr,$where);

        if($status)
        {
            printWithJson('10000','保存成功');
        }
        else
        {
            printWithJson('00000','保存失败');
            exit;
        }
    }

    // 前端页面修改密码
    public function changePassword()
    {
        $this->load->library('pwdhash'); // 载入加密类
        $this->load->model('User_model','user'); // 载入数据库类

        $mobile = $this->session->mobile;
        $passwordOld = $this->input->post('OldPwd');
        $passwordNew = $this->input->post('NewPwd');
        $password = $this->pwdhash->HashPassword($passwordNew);

        $where = array('mobileNumber'=>$mobile);
        $data = $this->user->checkLogin($where);

        if(empty($data))
        {
            $result = array(
                'Stata'=>'00000',
                'Message' => '原密码错误'
            );
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
            return;
        }
        if($this->pwdhash->checkPassword($passwordOld,$data[0]['password']))
        {
            $data_arr = array('password'=>$password);
            $status = $this->user->updateUserInfo($data_arr,$where);
            if($status)
            {
                $result = array(
                    'Stata'=>'10000',
                    'Message' => '修改成功'
                );
                echo json_encode($result,JSON_UNESCAPED_UNICODE);
                session_destroy();
                return true;
            }
        }
        $result = array(
            'Stata'=>'00000',
            'Message' => '原密码错误'
        );
        echo json_encode($result,JSON_UNESCAPED_UNICODE);

    }

    // 向前端发送个人信息
    public function getInfoAPI()
    {
        $this->load->model('User_model','user');
        $mobile = $this->session->mobile;
        $where = ['mobileNumber'=>$mobile];
        $data = $this->user->getInfo($where);
        if(!empty($data))
        {
            $data[0]['IsOk'] = 'OK';
            printWithJson('10000','',$data[0]);
        }else{
            printWithJson('00000','服务器错误');
        }
    }
}