<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//新闻控制器
class Proposition_model extends CI_Model
{

    //构造函数
    public function __construct()
    {
        parent::__construct();
        //加载数据库的分组
        $this->load->database('default');
    }
    //上传命题

    public function add($data){
        $this->db->insert('file', $data);
    }
    //查看命题
    public function check_proposition(){
        $data = $this->db->select('FileId,Title,FileType,Time')->from('file')->
        order_by('Time', 'desc')->get()->result_array();
        return $data;
    }
    //查看某一类下的命题
    public function file_type($FileId){
        $data = $this->db->select('FileId,Title,Time,Icon,Path')->from('file')
        ->where(array('FileType'=>$FileId))->order_by('Time', 'desc')->get()->result_array();
        return $data;
    }

    //查询对应的命题
    public function found_proposition($FileId){
        $data = $this->db->where(array('FileId'=>$FileId))->get('file')->result_array();
        return $data;
    }
    //删除命题
    public function del_proposition($FileId){
        $this->db->delete('file', array('FileId'=>$FileId));
    }

}