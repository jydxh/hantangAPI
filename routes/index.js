// 首页接口
const express = require('express')
// 引入连接池模块
const pool = require('../pool')
const router = express.Router()

// 轮播图接口
router.get('/banner',(req,res,next)=>{
    pool.query('select * from ht_banner',(err,r)=>{
        if(err) {
            return next(err)
        }
        res.send({code:200,msg:'轮播图',data: r})
    })
})

// 新闻中心接口
router.get('/list',(req,res,next)=>{
    pool.query('select nid,title from ht_news where cat_id in(10,20,30) limit 0,8',(err,r)=>{
        if(err) {
            return next(err)
        }
        res.send({code:200,msg:'新闻列表',data: r})
    })
})
// 合作伙伴
router.get('/partner',(req,res,next)=>{
    pool.query('select * from ht_partner',(err,r)=>{
        if(err) {
            return next(err)
        }
        res.send({code:200,msg:'合作伙伴',data: r})
    })
})


module.exports = router