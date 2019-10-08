<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Type extends CI_Controller
{

    // 构造函数

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Type_model');
    }

    //查看类别

    public function index()
    {
        $this->load->library('pagination');
        $perPage = 6;
        $config['base_url'] = site_url('admin/type/index');
        $config['total_rows'] = $this->db->count_all_results('type');
        $config['per_page'] = $perPage;
        $config['uri_segment'] = 4;
        $config['attributes'] = array('class' => 'am-disabled');

        $this->pagination->initialize($config);
        $data['total'] = $this->db->count_all_results('type');
        $data['links'] = $this->pagination->create_links();
        $offset = $this->uri->segment(4);
        $this->db->limit($perPage,$offset);
        $data['type'] = $this->Type_model->check();
        $this->load->view('admin/newsType', $data);
    }

    //添加类别

    public function add_type()
    {
        // $this->output->enable_profiler(TRUE);
        $this->load->helper('form');
        $this->load->view('admin/add_type');
    }


    // 添加类别动作

    public function add()
    {
        $this->load->library('form_validation');
        $status = $this->form_validation->run('type');

        if ($status) {

            $data = array(
                'TypeName' => $this->input->post('TypeName')
            );

            $this->Type_model->add($data);
            success('admin/type/index', '添加成功');
        } else {
            $this->load->helper('form');
            $this->load->view('admin/add_type');
        }
    }
    //编辑类别

    public function edit_type()
    {
        $TypeId = $this->uri->segment(4);
        $data['type'] = $this->Type_model->check_type($TypeId);

        $this->load->helper('form');
        $this->load->view('admin/edit_type', $data);
    }



    //编辑类别动作

    public function edit()
    {
        $this->load->library('form_validation');
        $status = $this->form_validation->run('type');

        if ($status) {

            $TypeId = $this->input->post('TypeId');
            $TypeName = $this->input->post('TypeName');

            $data = array(
                'TypeName' => $TypeName
            );

            $data['type'] = $this->Type_model->update_type($TypeId, $data);
            success('admin/type/index', '修改成功');
        } else {
            $this->load->helper('form');
            $this->load->view('admin/edit_type');
        }
    }

    //删除类别

    public function del()
    {
        $TypeId = $this->uri->segment(4);
        $this->Type_model->del($TypeId);
        success('admin/type/index', '删除成功');
    }

}
