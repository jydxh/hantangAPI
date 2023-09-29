// 合作交流
const express = require('express')
// 引入连接池模块
const pool = require('../pool')
const router = express.Router()

router.post('/add',(req,res,next)=>{
	// 获取post传递的参数
	var obj = req.body
	// 把当前的时间戳添加到对象obj
	obj.ctime = Date.now()
	console.log(obj)
	// 执行SQL命令，插入数据
	pool.query('insert into ht_cooperate set ?',[obj],(err,r)=>{
		if(err) {
			return next(err)
		}
		console.log(r)
		res.send({code: 200, msg: '留言成功'})
	})
})

// 修改合作交流接口
// 接口地址：/v1/coop/update
// 请求方式：put
router.put('/update',(req,res,next)=>{
	// 获取post传递的参数
	var obj = req.body
	console.log(obj)
	// 执行SQL命令
	pool.query('update ht_cooperate set ? where cid=?',[obj,obj.cid],(err,r)=>{
		if(err) {
			return next(err)
		}
		console.log(r)
		// 成功的结果是对象，如果对象下changedRows属性值为0说明修改失败，否则修改成功
		if(r.changedRows===0) {
			res.send({code: 400, msg: '修改失败'})
		}else{
			res.send({code: 200, msg: '修改成功'})
		}
	})
})

module.exports = router