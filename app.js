const express = require('express')
const cors = require('cors')
const aboutRouter = require('./routes/about')
const newsRouter = require('./routes/news')
const busiRouter = require('./routes/business')
const cultureRouter = require('./routes/culture')
const cooperateRouter = require('./routes/cooperate')
const jobRouter = require('./routes/job')
const contactRouter = require('./routes/contact')
const indexRouter = require('./routes/index')
const app = express()
app.listen(3000,()=>{
    console.log('服务器启动成功')
})

// 将post传参转为对象
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())
// 路由器使用
app.use( '/v1/about',aboutRouter )
app.use( '/v1/news',newsRouter )
app.use( '/v1/busi',busiRouter )
app.use( '/v1/culture',cultureRouter )
app.use( '/v1/cooperate',cooperateRouter )
app.use( '/v1/job',jobRouter )
app.use( '/v1/contact',contactRouter )
app.use( '/v1',indexRouter)

// 错误处理中间件
app.use( (err,req,res,next)=>{
    console.log(err)
    res.status(500).send({code:500,msg:'服务器端错误'})
} )