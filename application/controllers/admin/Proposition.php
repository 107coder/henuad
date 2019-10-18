<?php
defined('BASEPATH') OR exit('No direct script access allowed');

//后台命题控制器
class Proposition extends CI_Controller
{
    //构造函数
    public function __construct()
    {
        parent::__construct();
        $this->load->model('Proposition_model');
    }
    //后台命题界面
    public function index(){
        $this->load->library('pagination');
        $perPage = 6;
        $config['base_url'] = site_url('admin/proposition/index');
        $config['total_rows'] = $this->db->count_all_results('file');
        $config['per_page'] = $perPage;
        $config['uri_segment'] = 4;
        $config['attributes'] = array('class' => 'am-disabled');

        $this->pagination->initialize($config);
        $data['total'] = $this->db->count_all_results('file');
        $data['links'] = $this->pagination->create_links();
        $offset = $this->uri->segment(4);
        $this->db->limit($perPage,$offset);
        $this->load->helper('date');
        $data['proposition'] = $this->Proposition_model->check_proposition();
        $this->load->view('admin/proposition',$data);
    }
    //后台上传命题界面
    public function upload_proposition(){
        $this->load->helper('form');
        $this->load->view('admin/add_proposition');
    }
    //上传命题验证
    public function proposition_verity(){
        $this->load->library('upload');
        //配置图标
        $config['upload_path']   = './propositions_Icon/';
        $config['allowed_types']    = 'gif|jpg|png|jpeg';
        $config['max_size']     = 10000;
        $config['file_name'] = time() - mt_rand(1000,9999);
        //载入上传类
        $this->upload->initialize($config);
        $this->upload->do_upload('Icon');
        $wrong = $this->upload->display_errors();
        if($wrong){
            error($wrong);
        }
        $info = $this->upload->data();
        //配置文件
        $config1['upload_path']   = './propositions_File/';
        $config1['allowed_types']    = 'zip|rar|docx';
        $config1['max_size']   = 10000;
        $config1['file_name'] = time() - mt_rand(1000,9999);
        //载入上传类
        $this->upload->initialize($config1);
        $this->upload->do_upload('Path');
        $wrong = $this->upload->display_errors();
       if($wrong){
            error($wrong);
       }
        //返回信息
        $info1 = $this->upload->data();
        //载入表单验证类
        $this->load->library('form_validation');

        $status = $this->form_validation->run('proposition');
        if($status){

            $data = array(
                'Title' => $this->input->post('Title'),
                'FileType' => $this->input->post('FileType'),
                'Icon'	=> $info['file_name'],
                'Path'=> $info1['file_name'],
                'Time'	=> time(),
                'Content' => $this->input->post('Content')
            );
            $this->Proposition_model->add($data);
            success('admin/proposition/index', '上传成功');
        }else{
            $this->load->helper('form');
            $this->load->view('admin/add_proposition');
        };

    }

    //删除命题

    public function proposition_del()
    {
        $FileId = $this->uri->segment(4);
        $this->Proposition_model->del_proposition($FileId);
        success('admin/proposition/index', '删除成功');
    }

}

