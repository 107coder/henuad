<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Type_model extends CI_Model
{
    //构造函数
    public function __construct()
    {
        parent::__construct();
        //加载数据库的分组
        $this->load->database('default');
    }
    //添加新闻类别
    public function add($data){
        $this->db->insert('type', $data);
    }
    //查看新闻类别
    public function check(){
        $data = $this->db->get('type')->result_array();
        return $data;
    }
    //查询对应的类别
    public function check_type($TypeId){
        $data = $this->db->where(array('TypeId'=>$TypeId))->get('type')->result_array();
        return $data;
    }
    //修改新闻文章栏目
    public function update_type($TypeId, $data){
        $this->db->update('type', $data, array('TypeId'=>$TypeId));
    }
    //删除栏目
    public function del($TypeId){
        $this->db->delete('type', array('TypeId'=>$TypeId));
    }


}
