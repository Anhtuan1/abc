<?php



$data_order_remi = $_POST['foo'];

$file_check  = fopen("check.txt","a");

//$data_old = fread($file_check,filesize("check.txt"));

//new data of remi
$buy_data_new = json_decode($data_order_remi)->{"buy"};
$sell_data_new = json_decode($data_order_remi)->{"sell"};

//old data
$data_buy_old   = fopen('order_id_buy.txt',"rw");
$data_sell_old  = fopen('order_id_sell.txt',"rw");
$buy_old = array();
$sell_old = array();
$a_old = explode(PHP_EOL,fread($data_buy_old,filesize("order_id_buy.txt")));
$b_old = explode(PHP_EOL,fread($data_sell_old,filesize("order_id_sell.txt")));

foreach($a_old as $value) {
	array_push($buy_old,explode(',',$value));
}

foreach($b_old as $value) {
	array_push($sell_old,explode(',',$value));
}

foreach ($buy_data_new as $value) {
	$flag = false;
	foreach ($buy_old as $v) {
		if(count($v)>1&&count($value)>1){
			if($v[0]==$value[0]&&$v[2]==$value[2]){
				$flag = true;
				break;			
			}
		}
		
	}
	
	if($flag==false){		
		fwrite($file_check,'BUY '.join(" ",$value).PHP_EOL);
	}
    
}

foreach ($sell_data_new as $value) {
	$flag = false;
	foreach ($sell_old as $v) {
		if(count($v)>1&&count($value)>1){
			if($v[0]==$value[0]&&$v[2]==$value[2]){
				$flag = true;
				break;			
			}
		}
		
	}
	
	if($flag==false){		
		fwrite($file_check, 'SELL '.join(" ",$value).PHP_EOL);
	}
    
}

//$_POST['bar'] = 'b';

//echo fwrite($file_check,$data_order_remi);

fclose($file_check);
?>