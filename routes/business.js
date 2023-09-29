// 公司业务
const express = require('express')
// 引入连接池模块
const pool = require('../pool')
const router = express.Router()

router.get('/',(req,res,next)=>{
    var obj = req.query
    pool.query('select * from ht_business where bid=?',[obj.bid],(err,r)=>{
        if(err) {
            return next(err)
        }
        res.send({code:200,msg:'查询成功',data: r})
    })
})


module.exports = router