import useRequest from '@umijs/use-request';
import React from 'react';

interface User {
  id: string,
  username: string
}

export default () => {
  const { data, error, loading } = useRequest<User>('/api/userInfo')

  if (error) return <div>failed to load</div>
  if (loading) return <div>loading...</div>
  return <div>hello {data?.username}!</div>
}
