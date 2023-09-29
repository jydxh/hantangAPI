// 联系我们
const express = require('express')
// 引入连接池模块
const pool = require('../pool')
const router = express.Router()

// 地址列表
router.get('/list',(req,res,next)=>{
    pool.query('select * from ht_contact order by cid desc',(err,r)=>{
        if(err) {
            return next(err)
        }
        res.send({code:200,msg:'联系我们',data: r})
    })
})


module.exports = router