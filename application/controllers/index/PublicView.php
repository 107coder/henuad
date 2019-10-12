<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PublicView extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        $this->load->model('News_model');
        $this->load->model('Judge_model');
        $this->load->model('Type_model');
    }
    public function index()
    {
        $this->load->helper('date');
        $data['recent'] = $this->News_model->news_recent();
        $data['recent1'] = $this->News_model->news_recent1();
        $data['judges'] = $this->Judge_model->judge_type();
        $this->load->view('index/index.html',$data);
    }

    public function login()
    {
        $this->load->view('index/pages/login.html');
    }

    public function register()
    {
        $this->load->view('index/pages/register.html');
    }

    //前台新闻动态及更多新闻
    public function news_more()
    {
        $this->load->helper('date');
        $TypeId = $this->uri->segment(4);
        if(isset($TypeId)){
            $data['news'] = $this->News_model->news_type1($TypeId);
        }else $data['news'] = $this->News_model->news_type();
        $data['type'] = $this->Type_model->check1();
        $this->load->view('index/pages/moreNews.html',$data);
    }
    //前台评委动态
    public function judges_more()
    {
        $this->load->helper('date');
        $TypeId = $this->uri->segment(4);
        if(isset($TypeId)) {
            $data['judges'] = $this->Judge_model->judge_type1($TypeId);
        }else $data['judges'] = $this->Judge_model->judge_type();
        $data['type'] = $this->Type_model->check2();
        $this->load->view('index/pages/JudgesIntroduce.html',$data);
    }
    public function heade()
    {
        $this->load->view('index/pages/components/heade.html');
    }
    public function newHeader()
    {
        $this->load->view('index/components/newHeader.html');
    }
    public function footer()
    {
        $this->load->view('index/components/footer.html');
    }   
    // 发送验证码
    public function sendCode()
    {
        $action = $this->input->post('action');
        $mobile = $this->input->post('phoneNumber');
        // 引入数据库，验证手机号是否已经注册
        $this->load->model('user_model','user');
        $exist = $this->user->checkMobile($mobile);
        
        if($exist != 0 && $action == "register")
        {
            echo "exist";
            return false;
        }else if($exist == 0 && $action == 'login')
        {
            echo "noexist";
            return false;
        }
        $data = array('mobile_number'=>$mobile);
        $this->session->set_userdata($data);
        $code = rand(123456,987654);
        $this->session->set_tempdata('code',$code,60);
        $param = "{$code},60";

        echo $code;
        //$this->load->library('sms');
        //$sms_code = $this->sms->send($param,$mobile);
        // echo $sms_code;
    }


}
