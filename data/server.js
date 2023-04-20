const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

const db = require('./db.json');

server.use(middlewares);

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
