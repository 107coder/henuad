<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class MY_Controller extends CI_Controller
{
    public function __construct(){
        parent::__construct();

        $mobileNumber = $this->session->userdata('mobileNumber');
        if(!$mobileNumber) {
            redirect('admin/logon/index');


        }
    }
}
