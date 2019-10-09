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

    //前台首页
    public function list_news()
    {
        $this->load->helper('date');
        $data['recent'] = $this->News_model->news_recent();
        $data['recent1'] = $this->News_model->news_recent1();
        $data['judges'] = $this->Judge_model->judge_type();
        $this->load->view('index/index.html',$data);
    }
    //前台新闻动态及更多新闻
    public function news_more()
    {
        $this->load->helper('date');
        $data['news'] = $this->News_model->news_type();
        $data['type'] = $this->Type_model->check1();
        $this->load->view('index/pages/moreNews.html',$data);
    }
    //前台评委动态
    public function judges_more()
    {
        $this->load->helper('date');
        $data['judges'] = $this->News_model->news_type();
        $data['type'] = $this->Type_model->check2();
        $this->load->view('index/pages/JudgesIntroduce.html',$data);
    }

}