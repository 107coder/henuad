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
    public function userInfo()
    {
        $this->load->model('User_model','user');
        $mobile = $this->session->mobile;
        $where = ['mobileNumber'=>$mobile];
        $data['userInfo'] = $this->user->getInfo($where);
        $this->load->view('index/pages/user-info.html',$data);
    }

    public function changePassword()
    {
        $this->load->view('index/pages/changePassword.html');
    }
}