import { getUserInfo } from '@/service';
import useRequest from '@umijs/use-request';
import { Spin } from 'antd';
import React from 'react';


export default () => {
  const { data, loading } = useRequest(getUserInfo, {
    refreshOnWindowFocus: true,
    focusTimespan: 5000
  });

  return (
    <div>
      <p>You can try to click elsewhere and click back to try. (Or hide the page and show it again)</p>
      <Spin spinning={loading}>
        <div>userId: {data?.id}</div>
        <div>usrename: {data?.username}</div>
      </Spin>
    </div>
  );
};
