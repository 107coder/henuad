<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//新闻控制器
class Judge_model extends CI_Model
{

    //构造函数
    public function __construct()
    {
        parent::__construct();
        //加载数据库的分组
        $this->load->database('default');
    }
    //添加评委

    public function add($data){
        $this->db->insert('udges', $data);
    }
    //查看文章
    public function judge_type(){
        $data = $this->db->select('JudgesId,Name,TypeName,Position')->from('udges')->
        join('type', 'udges.TypeId=type.TypeId')->order_by('JudgesId', 'asc')->get()->result_array();
        return $data;
    }

}
