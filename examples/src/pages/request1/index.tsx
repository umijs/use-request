import useAPI from '@umijs/use-api';
import React from 'react';

interface User {
  id: string,
  username: string
}

export default () => {
  const { data, error, loading } = useAPI<User>('/api/userInfo')

  if (error) return <div>failed to load</div>
  if (loading) return <div>loading...</div>
  return <div>hello {data?.username}!</div>
}
