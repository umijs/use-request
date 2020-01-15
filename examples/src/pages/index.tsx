import { getUserInfo } from '@/service';
import React from 'react';
import useRequest from '@umijs/use-request';

export default () => {
  const { data, error, loading } = useRequest(getUserInfo)

  if (error) return <div>failed to load</div>
  if (loading) return <div>loading...</div>
  return <div>hello {data?.username}!</div>
}
