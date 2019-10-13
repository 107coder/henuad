<?php
defined('BASEPATH') OR exit('No direct script access allowed');

//后台留言控制器
class Users extends CI_Controller
{
    //构造函数
    public function __construct()
    {
        parent::__construct();
        $this->load->model('User_model');
    }
    //后台查看管理员列表
    public function index()
    {
        $this->load->library('pagination');
        $perPage = 6;
        $config['base_url'] = site_url('admin/users/index');
        $config['total_rows'] = $this->db->count_all_results();
        $config['per_page'] = $perPage;
        $config['uri_segment'] = 4;
        $config['attributes'] = array('class' => 'am-disabled');

        $this->pagination->initialize($config);
        $data['total'] = $this->db->count_all_results();
        $data['links'] = $this->pagination->create_links();
        $offset = $this->uri->segment(4);
        $this->db->limit($perPage, $offset);
        $this->load->helper('date');
        $data['user'] = $this->User_model->checkUsers();
        $this->load->view('admin/user', $data);
    }

    //删除用户
    public function user_del()
    {
        $mobileNumber = $this->uri->segment(4);
        $this->User_model->del_user($mobileNumber);
        success('admin/users/index', '删除成功');
    }
}

