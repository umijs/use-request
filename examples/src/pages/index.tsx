import { getUserInfo } from '@/service';
import useAPI from '@umijs/use-api';
import { Spin } from 'antd';
import React from 'react';


export default () => {
  const { data, loading } = useAPI(getUserInfo);

  return (
    <Spin spinning={loading}>
      <div>userId: {data?.id}</div>
      <div>usrename: {data?.username}</div>
    </Spin>
  );
};
