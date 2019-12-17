import { getUserInfo } from '@/service';
import useAPI from '@umijs/use-api';
import { Spin } from 'antd';
import React from 'react';


export default () => {
  const { data, loading } = useAPI(getUserInfo, {
    refreshOnWindowFocus: true,
    focusTimespan: 5000
  });

  return (
    <div>
      <p>你可以尝试鼠标点击到其他地方，再点回来试试。（或者页面隐藏，再显示）</p>
      <Spin spinning={loading}>
        <div>userId: {data?.id}</div>
        <div>usrename: {data?.username}</div>
      </Spin>
    </div>
  );
};
