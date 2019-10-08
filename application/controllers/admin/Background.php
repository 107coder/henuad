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

}
