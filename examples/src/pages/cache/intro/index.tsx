import { getIntro } from '@/service';
import useRequest from '@umijs/use-request';
import { Spin } from 'antd';
import React from 'react';


export default () => {
  const { data, loading } = useRequest(getIntro, {
    cacheKey: 'intro'
  });

  return (
    <Spin spinning={!data && loading}>
      <p>Latest request time: {data?.time}</p>
      <p>{data?.data}</p>
    </Spin>
  );
};
