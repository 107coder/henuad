<?php
defined('BASEPATH') OR exit('No direct script access allowed');

//后台新闻文章控制器
class News extends CI_Controller
{
    //构造函数
    public function __construct()
    {
        parent::__construct();
        $this->load->model('News_model');
        $this->load->model('Type_model');
    }
    //后台查看新闻界面
    public function index(){
        $this->load->library('pagination');
        $perPage = 6;
        $config['base_url'] = site_url('admin/news/index');
        $config['total_rows'] = $this->db->count_all_results('news');
        $config['per_page'] = $perPage;
        $config['uri_segment'] = 4;
        $config['attributes'] = array('class' => 'am-disabled');

        $this->pagination->initialize($config);
        $data['total'] = $this->db->count_all_results('news');
        $data['links'] = $this->pagination->create_links();
        $offset = $this->uri->segment(4);
        $this->db->limit($perPage,$offset);
        $this->load->helper('date');
        $data['news'] = $this->News_model->news_type();
        $this->load->view('admin/news',$data);
    }
    //后台发布新闻界面
    public function release_news(){
        $data['type'] = $this->Type_model->check1();
        $this->load->helper('form');
        $this->load->view('admin/release_news',$data);
    }
    //发布新闻验证
    public function news_verity(){
        //配置
        $config['upload_path']      = './uploads/';
        $config['allowed_types']    = 'gif|jpg|png|jpeg';
        $config['max_size']     = 10000;
        $config['file_name'] = time() - mt_rand(1000,9999);
        //载入上传类
        $this->load->library('upload', $config);
        $this->upload->do_upload('Picture');
        $wrong = $this->upload->display_errors();
        if($wrong){
            error($wrong);
        }
        //返回信息
        $info = $this->upload->data();
        //载入表单验证类
        $this->load->library('form_validation');

        $status = $this->form_validation->run('news');
        if($status){

            $data = array(
                'Title' => $this->input->post('Title'),
                'Author' => $this->input->post('Author'),
                'Picture'	=> $info['file_name'],
                'Content'=> $this->input->post('Content'),
                'Date'	=> time(),
                'TypeId' => $this->input->post('TypeId')
            );
            $this->News_model->add($data);
            success('admin/news/index', '发表成功');
        }else{
            $data['type'] = $this->Type_model->check1();
            $this->load->helper('form');
            $this->load->view('admin/release_news',$data);
        };

    }
    //编辑新闻界面
    public function edit(){
        $newsId = $this->uri->segment(4);
        $data['news'] = $this->News_model->check_news($newsId);
        $data['type'] = $this->Type_model->check1();
        $this->load->helper('form');
        $this->load->view('admin/news_edit',$data);
    }
    //编辑文章验证
    public function news_edit(){
        //配置
        $config['upload_path']      = './uploads/';
        $config['allowed_types']    = 'gif|jpg|png|jpeg';
        $config['max_size']     = 1000000;
        $config['file_name'] = time() - mt_rand(1000,9999);
        //载入上传类
        $this->load->library('upload', $config);
        $this->upload->do_upload('Picture');
        $wrong = $this->upload->display_errors();
        if($wrong){
            error($wrong);
        }
        //返回信息
        $info = $this->upload->data();

        $this->load->library('form_validation');
        $status = $this->form_validation->run('news');
        if($status){
            $newsId = $this->input->post('newsId');
            $data = array(
                'Title' => $this->input->post('Title'),
                'Author' => $this->input->post('Author'),
                'Picture'	=> $info['file_name'],
                'Content'=> $this->input->post('Content'),
                'Date'	=> time(),
                'TypeId'	=> $this->input->post('TypeId')
            );

            $data['news'] = $this->News_model->update_news($newsId, $data);
            success('admin/news/index', '修改成功');
        }else{
            $data['type'] = $this->Type_model->check1();
            $this->load->helper('form');
            $this->load->view('admin/news_edit',$data);
        };

    }
    //删除文章

    public function news_del()
    {
        $newsId = $this->uri->segment(4);
        $this->News_model->del_news($newsId);
        success('admin/news/index', '删除成功');
    }

}
