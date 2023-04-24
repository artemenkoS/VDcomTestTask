const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '/db.json'));
const middlewares = jsonServer.defaults();

const db = require('./db.json');

server.use(function (req, res, next) {
  setTimeout(next, 500);
});
server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.path === '/signin') {
    if (req.method === 'POST') {
      res.cookie('user-id', db.user.id, {
        httpOnly: true,
        sameSite: 'strict',
      });
      res.json(db.user);
    } else {
      res.sendStatus(401);
    }
  } else if (req.path === '/logout') {
    res.clearCookie('user-id');
    res.json({ status: 'ok' });
  } else {
    next();
  }
});

server.get('/user', (req, res, next) => {
  if (('user', req.headers.cookie)) {
    res.json(db.user);
  } else {
    res.sendStatus(401);
  }
});

server.get('/contacts', (req, res) => {
  const page = req.query.page ?? 1;
  const size = req.query.size ?? 5;
  const order = req.query.order ?? 'asc';
  const orderBy = req.query.orderBy ?? 'clientName';
  const search = req.query.search?.toLowerCase() ?? '';

  const data = !search ? db.contacts : db.contacts.filter((v) => v.clientName.toLowerCase().search(search) !== -1);

  data.sort((a, b) => {
    if (typeof a[orderBy] === 'string') {
      if (a[orderBy] > b[orderBy]) {
        return order === 'asc' ? 1 : -1;
      }
      if (a[orderBy] < b[orderBy]) {
        return order === 'asc' ? -1 : 1;
      }
    }
    if (typeof a[orderBy] === 'number') {
      return order === 'asc' ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy];
    }

    return 0;
  });

  res.jsonp({
    content: data.slice(size * (page - 1), size * page),
    pagination: {
      page,
      size,
      totalElements: data.length,
      totalPages: Math.round(data.length / size),
    },
  });
});

server.use(router);
server.listen(11148, () => {
  console.log('JSON Server is running');
});
