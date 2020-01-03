import Mock from 'mockjs'


const userInfo = Mock.mock({
  id: `@guid`,
  username: `@cname`
});

const article = Mock.mock('@paragraph');

const userSchool = (id) => {
  switch (id) {
    case '1':
      return 'Tsinghua University';
    case '2':
      return 'Beijing University';
    case '3':
      return 'Zhejiang University';
    default:
      return ''
  }
}

const email = (searchStr) => (
  Mock.mock({
    'data|5': ['@email'],
  })
)

const userList = (current, pageSize, gender) => (
  Mock.mock({
    total: 55,
    [`list|${pageSize}`]: [{
      id: '@guid',
      name: '@cname',
      'gender|1': ['male', 'female'],
      email: '@email',
      disabled: false
    }],
  })
)

export default {
  '/api/userInfo': (_, res) => {
    setTimeout(() => {
      res.json(userInfo)
    }, 1000)
  },
  'POST /api/changeUsername': (_, res) => {
    setTimeout(() => {
      res.json({ success: true })
    }, 1000)
  },
  '/api/article': (_, res) => {
    setTimeout(() => {
      res.json({
        data: article,
        time: new Date().getTime()
      })
    }, 1000)
  },
  '/api/intro': (_, res) => {
    setTimeout(() => {
      res.json({
        data: 'We are umijs team！',
        time: new Date().getTime()
      })
    }, 1000)
  },
  '/api/userSchool': (req, res) => {
    setTimeout(() => {
      res.json(userSchool(req.query.userId))
    }, 1000)
  },
  '/api/random': (req, res) => {
    setTimeout(() => {
      res.json(Mock.mock('@natural'))
    }, 1000)
  },
  '/api/email': (req, res) => {
    setTimeout(() => {
      res.json(email(req.query.search).data)
    }, 100)
  },
  '/api/userList': (req, res) => {
    const { current, pageSize, gender } = req.query;
    setTimeout(() => {
      res.json(userList(current, pageSize, gender))
    }, 1000)
  },
  '/api/disableUser': (req, res) => {
    setTimeout(() => {
      res.json({ success: true })
    }, 1500)
  },
}