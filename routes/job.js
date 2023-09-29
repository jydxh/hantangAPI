// 招贤纳士
const express = require('express')
// 引入连接池模块
const pool = require('../pool')
const router = express.Router()

router.get('/list',(req,res,next)=>{
    var obj = req.query
    if(!obj.pno) {
        obj.pno = 1
    }
    if(!obj.count) {
        obj.count = 10
    }
    var start = (obj.pno-1)*obj.count
    var size = parseInt(obj.count)
    pool.query('select * from ht_job order by jid desc limit ?,?',[start,size],(err,r)=>{
        if(err) {
            return next(err)
        }
        res.send({code:200,msg:'招贤纳士',data: r})
    })
})

// 职位详情
router.get('/detail',(req,res,next)=>{
    var obj = req.query
    pool.query('select * from ht_job where jid=?',[obj.jid],(err,r)=>{
        if(err) {
            return next(err)
        }
        if(r.length === 0){
            res.send({code:400,msg:'职位不存在'})
        }else{
            res.send({code:200,msg:'职位详情',data: r})
        }
    })
})

module.exports = router