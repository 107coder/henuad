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
    //查看新闻
    public function news_type(){
        $data = $this->db->select('newsId,Title,TypeName,Date,Author,Picture')->from('news')->
        join('type', 'news.TypeId=type.TypeId')->order_by('Date', 'desc')->get()->result_array();
        return $data;
    }
    //前台显示最近时间发布的开闭幕式一个新闻
    public function news_recent(){
        $data = $this->db->select('Title,Date,Content,Picture')->from('news')->
        join('type', 'news.TypeId=type.TypeId')->where(array('TypeName'=>'开闭幕式'))->limit(1)->get()->result_array();
        return $data;
    }
    //前台显示最近时间发布的两个新闻
    public function news_recent1(){
        $data = $this->db->select('Title,Date,Content,Picture')->from('news')->
        order_by('Date', 'desc')->limit(2)->get()->result_array();
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