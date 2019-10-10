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
    //查看评委
    public function judge_type(){
        $data = $this->db->select('JudgesId,Name,TypeName,Position,Picture')->from('udges')->
        join('type', 'udges.TypeId=type.TypeId')->order_by('udges.TypeId', 'asc')->get()->result_array();
        return $data;
    }
    //查看某一分类下的评委
    public function judge_type1($TypeId){
        $data = $this->db->select('JudgesId,Name,TypeName,Position,Picture')->from('udges')->
        join('type', 'udges.TypeId=type.TypeId')->where(array('udges.TypeId'=>$TypeId))->order_by('JudgesId', 'asc')->get()->result_array();
        return $data;
    }
    //查询对应的评委
    public function check_judge($JudgesId){
        $data = $this->db->where(array('JudgesId'=>$JudgesId))->get('udges')->result_array();
        return $data;
    }
    //修改评委
    public function update_judge($JudgesId, $data){
        $this->db->update('udges', $data, array('JudgesId'=>$JudgesId));
    }
    //删除评委
    public function del_judge($JudgesId){
        $this->db->delete('udges', array('JudgesId'=>$JudgesId));
    }

}
