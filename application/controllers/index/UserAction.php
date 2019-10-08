<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class UserAction extends CI_Controller {

    public function index()
    {
        echo "this is userAction index";
        print_r($_SESSION);
        phpinfo();


    }

    public function login()
    {
        $this->load->view('index/login.html');
    }
}
