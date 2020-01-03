import { getUserInfo } from '@/service';
import React from 'react';
import useAPI from '@umijs/use-api';

export default () => {
  const { data, error, loading } = useAPI(getUserInfo)

  if (error) return <div>failed to load</div>
  if (loading) return <div>loading...</div>
  return <div>hello {data?.username}!</div>
}
