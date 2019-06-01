<?php
/**
 * Created by PhpStorm.
 * User: Heaven
 * Date: 2019/4/22
 * Time: 18:47
 */
$con = new mysqli("localhost","root","root","music");
if ($con->connect_error)
{echo "链接失败";}
//else {echo "连接成功";}
$code = isset($_POST["code"]) ? $_POST["code"] : "";

$user = isset($_POST["user"]) ? $_POST["user"] : "";
$pass = isset($_POST["pass"]) ? $_POST["pass"] : "";
$phone = isset($_POST["phone"]) ? $_POST["phone"] : "";
$email = isset($_POST["email"]) ? $_POST["email"] : "";
//$code = 1;$user="lemon";$pass = "123456";
if ($code == 1)//登录验证
{
    $sql = "select user,password from user";
    $res = $con->query($sql);
    while ($row = $res->fetch_row())
    {
        if ($row[0])
        {
            if ($row[0]==$user && $row[1]==$pass)
            {echo "correct";break;}
        }
    }
}
//$code = 2;$user="lemons";
if ($code == 2)//请求注册判断用户名是否相同
{
    $sql="select user from user";
    $res=$con->query($sql);
    $data = $res->fetch_all(MYSQLI_ASSOC);
    $existen = false;
    foreach ($data as $item)
    {
        if (in_array($user,$item))
        {
            echo "error";
            $existen = false;
            break;
        }
        else {$existen = true;}
    }
}
//$code=3;$user="lemonsss";$pass="123456";$phone="13622864048";$email="962810228@qq.com";
if ($code == 3)//注册成功时用户信息添加到user表并创建个人用户表
{
    $sql = "insert into user values ('$user','$pass','$phone','$email')";
    if ($con->query($sql))
    {
        $sql_tab = 'CREATE TABLE `'.$user.'` (introduct varchar(40) ,follow int(255),fans int(255) ,goods int(255),img varchar(255))';
        $con->query($sql_tab);
        $sql_ins = "insert into $user values ('一句话介绍你自己','0','0','0','../images/tou.png')";
        //echo $sql_ins;
        $con->query($sql_ins);
        echo "注册成功";
    }
    else {echo "注册失败";}
}
//$code = 4;$user="lemon";
if ($code == 4)//请求渲染用户表页面
{
    $sql = "select * from `$user`";
    $res = $con->query($sql);
    $data = $res->fetch_all(MYSQLI_ASSOC);
    //var_dump($data);
    $data = json_encode($data);
    echo $data;
}
//$code=5;
if ($code == 5)//请求渲染推荐页的数据
{
    $sql = "select * from data";
    $res = $con->query($sql);
    $data = $res->fetch_all(MYSQLI_ASSOC);
    //var_dump($data);
    $data = json_encode($data);
    echo $data;
}

$guid = isset($_POST["guid"]) ? $_POST["guid"] : "";
if ($code == 6)//请求音乐播放器的歌曲信息
{
    $sql = "select * from music_data where guid=$guid";
    $res = $con->query($sql);
    $data = $res->fetch_all(MYSQLI_ASSOC);
    $data = json_encode($data);
    echo $data;
}
?>