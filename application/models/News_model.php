<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//新闻控制器
class News_model extends CI_Model
{

    //构造函数
    public function __construct()
    {
        parent::__construct();
        //加载数据库的分组
        $this->load->database('default');
    }
    //发表新闻

    public function add($data){
        $this->db->insert('news', $data);
    }
    //查看文章
    public function news_type(){
        $data = $this->db->select('newsId,Title,TypeName,Date,Author')->from('news')->
        join('type', 'news.TypeId=type.TypeId')->order_by('Date', 'desc')->get()->result_array();
        return $data;
    }
    //查询对应的新闻
    public function check_news($newsId){
        $data = $this->db->where(array('newsId'=>$newsId))->get('news')->result_array();
        return $data;
    }
    //修改新闻文章
    public function update_news($newsId, $data){
        $this->db->update('news', $data, array('newsId'=>$newsId));
    }
    //删除新闻
    public function del_news($newsId){
        $this->db->delete('news', array('newsId'=>$newsId));
    }

}