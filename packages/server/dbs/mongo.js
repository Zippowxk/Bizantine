//1.导入mongooose模块
const Mongoose = require('mongoose');
//2.定义MongDB数据库的连接字符串：协议://主机地址:端口号/数据库名
const mdb_url = 'mongodb://localhost:27017/bizantine'
//3.建立和MongDB数据库的连接:
// useNewUrlParser:true  是否使用新的url地址转换方式
// useUnifiedTopology:true  是否使用新的用户安全策略
Mongoose.connect(mdb_url,{useNewUrlParser:true,useUnifiedTopology:true})
// 4.对连接过程进行处理
//4.1建立连接-----连接成功会触发connected事件
Mongoose.connection.on('connected',function (){
    console.log('数据库连接成功！！！连接地址是：'+mdb_url)
})
//4.2连接异常------回调函数的参数中保存了异常的信息
Mongoose.connection.on('error',function (err){
    console.log('数据库连接异常！！！'+err)
})
//4.3断开连接
Mongoose.connection.on('disconnected',function (){
    console.log('断开数据库的连接！！！')
})
 
//5.导出Mongoose
module.exports = Mongoose