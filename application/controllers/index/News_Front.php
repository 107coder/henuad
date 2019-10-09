<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//前台页面控制器
class News_Front extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('News_model');
        $this->load->model('Judge_model');
        $this->load->model('Type_model');
    }


}