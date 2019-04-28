<?php
/**
 * Created by PhpStorm.
 * User: Heaven
 * Date: 2019/4/9
 * Time: 11:40
 */
$con = new mysqli("localhost","root","root","project");
if ($con->connect_error)
{echo "链接失败";}
//else {echo "连接成功";}
$code=isset($_POST["code"]) ? $_POST["code"] : "";

//$code =1;
//$uname = "lemon";
if ($code ==1)//请求所有数据渲染页面
{
    $sql="select * from data";
    $res=$con->query($sql);
    $data=$res->fetch_all(MYSQLI_ASSOC);
    //var_dump($data);
    $data = json_encode($data);
    echo $data;

}

$user=isset($_POST["user"]) ? $_POST["user"]:'';
$pass=isset($_POST["pass"]) ? $_POST["pass"]:'';
$phone=isset($_POST["phone"]) ? $_POST["phone"]:'';
$email=isset($_POST["email"]) ? $_POST["email"]:'';
//$code = 2;
//$user = "lemons";
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
//$code = 3;  $user = "lemons";  $pass = "123456";
//$phone="13622864049";  $email ="962810229@qq.com";
if ($code == 3)//注册成功时用户信息添加到user表并创建购用户物车表
{
    $sql = "insert into user values ('$user','$pass','$phone','$email')";
    if ($con->query($sql))
    {
        $sql_tab = 'CREATE TABLE `'.$user.'` (id varchar(255) ,color varchar(255),size varchar(255) ,version varchar(255), Quanlity int(30))';
        $con->query($sql_tab);
        echo "注册成功";
    }
    else {echo "注册失败";}
}
//$code =4;
//$user = "lemon";
//$pass = "123456";
//$judge = 'false';
if($code ==4) //登录
{
    $sql = "select user,password from user";
    $res = $con->query($sql);
    while($row = $res->fetch_row())
    {
        if ($row[0])
        {
            if ($row[0] == $user && $row[1] == $pass)
            { echo "correct"; break;}
//            else if ($row[0] != $user || $row[1] != $pass)
//            { echo  "error";  }
        }
    }

}

$currentPage=isset($_POST["currentPage"]) ? $_POST["currentPage"]:'';
$qty=isset($_POST["qty"]) ? $_POST["qty"]:'';
//$code = 5;
//$currentPage=1;
//$qty=4;
if ($code == 5)//列表商品
{
    $sql="select * from data";
    $res=$con->query($sql);
    $data=$res->fetch_all(MYSQLI_ASSOC);
    $arr = array_slice($data,($currentPage-1)*$qty,$qty);
    //返回：内容、数据总长度、当前页、每页数量
    $content=array(
        "arr"=>$arr,
        "len"=>count($data),
        "page"=>$currentPage-0,
        "qty"=>$qty-0
    );
    $content = json_encode($content);
    echo $content;
//    $data = json_encode($data);
//    echo $data;
}

if ($code == 6)//列表商品排序
{
    $sql="select * from data order by price";
    $res=$con->query($sql);
    $data=$res->fetch_all(MYSQLI_ASSOC);
    $arr = array_slice($data,($currentPage-1)*$qty,$qty);
    //返回：内容、数据总长度、当前页、每页数量
    $content=array(
        "arr"=>$arr,
        "len"=>count($data),
        "page"=>$currentPage-0,
        "qty"=>$qty-0
    );
    $content = json_encode($content);
    echo $content;
}

$id=isset($_POST["id"]) ? $_POST["id"] : "";
//$code = 7;
//$id ="001";
if ($code == 7)//渲染商品的详情页
{
    $sql = "select * from data where id = $id";
    $res = $con->query($sql);
    $content = array();
    while($row = $res->fetch_row())
    {
        if ($row[0])
        {
            $data = array(
                "id"=>$row[0], "title"=>$row[1],"img"=>$row[3],
                "url"=>$row[4], "price"=>$row[5],"color"=>$row[7],
                "size"=>$row[8], "version"=>$row[9],
            );
            array_push($content,$data);
//            $row = json_encode($row);
//            echo $row;
        }
    }
    $content = json_encode($content);
    echo $content;
}

$uname=isset($_POST["uname"]) ? $_POST["uname"] : "";
$color=isset($_POST["color"]) ? $_POST["color"] : "";
$size=isset($_POST["size"]) ? $_POST["size"] : "";
$version=isset($_POST["version"]) ? $_POST["version"] : "";
$Quanlity=isset($_POST["Quanlity"]) ? $_POST["Quanlity"] : "";

//$code = 8; $id ="001"; $color = "珠光贝母"; $Quanlity=99;
//$size = "8GB+128GB"; $version ="华为P30Pro全网通版";
//$uname ="lemon";
if ($code == 8)//插入到对应登录名的购物车
{
    $existen=false;
    $sql="select id from `$uname`";
    $check=$con->query($sql);
    while ($row=$check->fetch_row())
    {
        if ($row[0])
        {
            if ($row[0]==$id)
            {
                $existen = true;break;
            }
        }
    }
    if ($existen)//当有这个id进行更新
    {
        $update="update `$uname` set color='$color',size='$size',version='$version',Quanlity='$Quanlity' where id='$id'";
        $con->query($update);
        echo "update success";
    }
    else//没有id号则进行插入
    {
        $insert = "insert into $uname values ('$id','$color','$size','$version','$Quanlity')";
        $res_insert = $con->query($insert);
        echo "insert success";
    }
}

//$code = 9;  $uname = "lemon";  $id ="001";
if ($code == 9)//请求渲染购物车,根据id进行数组合并
{
    //查询数据并进行合并传出
    $sql = "select * from `$uname`";
    $obj = $con->query($sql);
    $dataAll = array();
    while ($row = $obj->fetch_row())
    {
        if ($row[0])
        {
            $data=array(
                "id"=> $row[0],"color"=> $row[1],"size"=> $row[2],
                "version"=> $row[3],"Quanlity"=> $row[4],
            );
            array_push($dataAll,$data);
        }
    }
    for ($s =0;$s<count($dataAll);$s++)
    {
        $id = $dataAll[$s]["id"];
        $sql="select img,title,des,price from data where id='$id'";
        $res = $con->query($sql);
        while($row=$res->fetch_row())
        {
            if ($row[0])
            {
                $dataAll[$s]["img"]=$row[0];
                $dataAll[$s]["title"]=$row[1];
                $dataAll[$s]["des"]=$row[2];
                $dataAll[$s]["price"]=$row[3];
            }
        }
    }
    $dataAll = json_encode($dataAll);
    echo $dataAll;
}

if ($code == 10)//点击减号商品时请求sql
{
    $sql = "select * from `$uname` where id='$id'";
    $res = $con->query($sql);//返回操作的对象
    $num='';
    while ($row=$res->fetch_row())
    {
        if ($row[0])
        {
            $num= $row[4];
        }
    }
    $num=(int)$num-1;
    $Update="update `$uname` set Quanlity='$num' where id='$id'";
    $con->query($Update);
    if ($num<1)
    {
        $num=1;
    }
    echo $num;
}
if ($code == 11)//点击加号商品时请求sql
{
    $sql = "select * from `$uname` where id='$id'";
    $res = $con->query($sql);//返回操作的对象
    $num='';
    while ($row=$res->fetch_row())
    {
        if ($row[0])
        {
            $num= $row[4];
        }
    }
    $num=(int)$num+1;
    $Update="update `$uname` set Quanlity='$num' where id='$id'";
    $con->query($Update);
    if ($num>100)
    {
        $num=100;
    }
    echo $num;
}
if ($code==12)//点击删除按钮商品时请求sql删除数据
{
    //传入删除的id号
    $del="delete from `$uname` where id='$id'";
    $res = $con->query($del);
}
?>