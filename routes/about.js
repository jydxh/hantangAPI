// 关于汉唐
const express = require('express')
// 引入连接池模块
const pool = require('../pool')
const router = express.Router()

// 公司简介接口(get /profile)
router.get('/info',(req,res,next)=>{
    var obj = req.query
    pool.query('select * from ht_about where aid=?',[obj.aid],(err,r)=>{
        if(err) {
            return next(err)
        }
        res.send({code:200,msg:'查询成功',data: r})
    })
})
// 公司大事件(get /event)
router.get('/event',(req,res,next)=>{
    // 查询所有的公司事件
    pool.query('select * from ht_event',(err,r)=>{
        if(err) {
            return next(err)
        }
        res.send({code: 200,msg: '公司大事件',data: r})
    })
})
// 旗下公司
router.get('/member',(req,res,next)=>{
    pool.query('select * from ht_member',(err,r)=>{
        if(err) {
            return next(err)
        }
        res.send({code:200,msg:'旗下公司',data: r})
    })
})


module.exports = router