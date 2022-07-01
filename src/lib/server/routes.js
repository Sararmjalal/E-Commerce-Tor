
import AdminRouter from 'admin/router'


export default app => {
  app.get('/', (req, res, next) => {
    res.send('<h1> hello <span style="color: red" >world</span> </h1>')
  })

  app.use('/admin/', AdminRouter)

}