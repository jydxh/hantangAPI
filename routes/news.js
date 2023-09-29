// 新闻中心
const express = require('express')
// 引入连接池模块
const pool = require('../pool')
const router = express.Router()
// 新闻分类
router.get('/catlist',(req,res,next)=>{
    pool.query('select * from ht_cat',(err,r)=>{
        if(err) {
            return next(err)
        }
        res.send({code:200,msg:'新闻分类',data: r})
    })
})
// 新闻列表
router.get('/list',(req,res,next)=>{
	// 获取get传递的参数
	var obj = req.query
	console.log(obj)
	// 如果当前页码为空，设置默认为第1页
	if(!obj.pno) {
		obj.pno = 1
	}
	// 如果每页数据量为空，设置默认为5条
	if(!obj.count) {
		obj.count = 5
	}
	console.log(obj)
	// 计算开始查询的值
	var start = (obj.pno-1)*obj.count
	// 将每页数据量转为数值型
	var size = parseInt(obj.count)
	// 执行SQL命令
	pool.query('select nid,title,ctime,cat_id from ht_news where cat_id=? order by ctime desc limit ?,?;select count(*) as n from ht_news where cat_id=?',[obj.cat_id,start,size,obj.cat_id],(err,r)=>{
		if(err) {
			return next(err)
		}
		console.log(r)
		res.send({
			code: 200,
			msg: '新闻列表',
			data: r[0], //把查询的第1个SQL命令结果响应
			total: r[1][0].n,  //查询的总数据量
			pages: Math.ceil( r[1][0].n/size ), //总页码
			pno: obj.pno
		})
	})
})
// 新闻详情
router.get('/detail',(req,res,next)=>{
    var obj = req.query
    pool.query('select * from ht_news where nid=?',[obj.nid],(err,r)=>{
        if(err) {
            return next(err)
        }
        if(r.length === 0){
            res.send({code:400,msg:'新闻不存在'})
        }else{
            res.send({code:200,msg:'新闻详情',data: r})
        }
    })
})


module.exports = router