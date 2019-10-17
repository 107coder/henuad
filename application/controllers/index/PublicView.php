<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PublicView extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        $this->load->model('News_model');
        $this->load->model('Judge_model');
        $this->load->model('Type_model');
        $this->load->model('Proposition_model');
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
    //前台有关广告节
    public function about()
    {
        $this->load->view('index/pages/about.html');
    }
    //赛事须知
    public function know()
    {
        $this->load->view('index/pages/know.html');
    }
    //命题页面
    public function load()
    {
        $this->load->helper('date');
        $data['type'] = $this->Proposition_model->file_type('命题类');
        $data['type1'] = $this->Proposition_model->file_type('非命题类');
        $this->load->view('index/pages/load.html',$data);
    }
    //某一命题下载
    public function download($url){
        //$this->load->library('zip');
        $this->load->helper('download');
        force_download($url,NULL,TRUE);
        //$this->zip->download('latest_stuff.zip');//renamed
    }
    //某一命题页面
    public function proposition_detail(){
        $FileId = $this->uri->segment(4);
        $data['type'] = $this->Proposition_model->found_proposition($FileId);
        $this->load->view('',$data);
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
    //前台联系我们
    public function contact()
    {
        $this->load->view('index/pages/contact.html');
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
        $data_arr = array();
        $method = [NULL,'register','login'];
        if(!in_array($action,$method))
        {
            $data_arr["Stata"] = '00001';
            $data_arr['Message'] = '数据错误';
            echo json_encode($data_arr);  
            return false;
        }
        else if($exist != 0 && $action == "register")
        {
            $data_arr['Stata'] = '00000';
            $data_arr['Message'] = "用户已存在";
            echo json_encode($data_arr);  
            return false;
        }else if($exist == 0 && $action == 'login')
        {
            $data_arr['Stata'] = '00000';
            $data_arr['Message'] = "用户不存在";
            echo json_encode($data_arr);
            return false;
        }else{
            $data = array('mobile_number'=>$mobile);
            $this->session->set_userdata($data);
            $code = rand(123456,987654);
            $this->session->set_tempdata('code',$code,60*15);
            $param = "{$code},{60*15}";
    
            $data_arr = array(
                'Stata'=>'10000',
                'Message' => '发送成功',
                'Code'    => $code
            );
            echo json_encode($data_arr);
            //$this->load->library('sms');
            //$sms_code = $this->sms->send($param,$mobile);
            // echo $sms_code;
        }

    }


}
