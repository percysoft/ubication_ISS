const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(__dirname + '/db.json');

const middlewares = jsonServer.defaults();

server.use(middlewares);


server.use(jsonServer.rewriter({
  '/empleados/emp': '/empleados',
  '/empleados/:id': '/editEmpleados',

}))

server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  next()
})

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running!');
  console.log('Source:', router.db.source);
});
