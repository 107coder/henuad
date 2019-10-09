<?php
defined('BASEPATH') OR exit('No direct script access allowed');

//后台新闻文章控制器
class Judges extends CI_Controller
{
    //构造函数
    public function __construct()
    {
        parent::__construct();
        $this->load->model('Judge_model');
        $this->load->model('Type_model');
    }
    //后台查看评委界面
    public function index(){
        $this->load->library('pagination');
        $perPage = 6;
        $config['base_url'] = site_url('admin/judges/index');
        $config['total_rows'] = $this->db->count_all_results('udges');
        $config['per_page'] = $perPage;
        $config['uri_segment'] = 4;
        $config['attributes'] = array('class' => 'am-disabled');

        $this->pagination->initialize($config);
        $data['total'] = $this->db->count_all_results('udges');
        $data['links'] = $this->pagination->create_links();
        $offset = $this->uri->segment(4);
        $this->db->limit($perPage,$offset);
        $this->load->helper('date');
        $data['judges'] = $this->Judge_model->judge_type();
        $this->load->view('admin/judges',$data);
    }
    //后台添加评委界面
    public function add_judges(){
        $data['type'] = $this->Type_model->check2();
        $this->load->helper('form');
        $this->load->view('admin/add_judge',$data);
    }
    //添加评委验证
    public function judges_verity(){
        //配置
        $config['upload_path']      = './judges/';
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

        $status = $this->form_validation->run('judges');
        if($status){

            $data = array(
                'Name' => $this->input->post('Name'),
                'Position' => $this->input->post('Position'),
                'Picture'	=> $info['file_name'],
                'Introduction'=> $this->input->post('Introduction'),
                'TypeId' => $this->input->post('TypeId')
            );
            $this->Judge_model->add($data);
            success('admin/judges/index', '添加成功');
        }else{
            $data['type'] = $this->Type_model->check2();
            $this->load->helper('form');
            $this->load->view('admin/add_judge',$data);
        };

    }
    //编辑评委界面
    public function edit(){
        $JudgesId = $this->uri->segment(4);
        $data['judges'] = $this->Judge_model->check_judge($JudgesId);
        $data['type'] = $this->Type_model->check2();
        $this->load->helper('form');
        $this->load->view('admin/judges_edit',$data);
    }
    //编辑评委验证
    public function judges_edit(){
        //配置
        $config['upload_path']      = './judges/';
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
        $status = $this->form_validation->run('judges');
        if($status){
            $JudgesId = $this->input->post('JudgesId');
            $data = array(
                'Name' => $this->input->post('Name'),
                'Position' => $this->input->post('Position'),
                'Picture'	=> $info['file_name'],
                'Introduction'=> $this->input->post('Introduction'),
                'TypeId' => $this->input->post('TypeId')
            );

            $data['judges'] = $this->Judge_model->update_judge($JudgesId, $data);
            success('admin/judges/index', '修改成功');
        }else{
            $data['type'] = $this->Type_model->check2();
            $this->load->helper('form');
            $this->load->view('admin/judges_edit',$data);
        };

    }
    //删除文章

    public function judges_del()
    {
        $JudgesId = $this->uri->segment(4);
        $this->Judge_model->del_Judge($JudgesId );
        success('admin/judges/index', '删除成功');
    }
}

