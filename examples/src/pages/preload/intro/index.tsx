import { getIntro } from '@/service';
import useAPI from '@umijs/use-api';
import { Spin } from 'antd';
import React from 'react';


export default () => {
  const { data, loading } = useAPI(getIntro, {
    cacheKey: 'intro'
  });

  return (
    <Spin spinning={!data && loading}>
      <p>Latest request time: {data?.time}</p>
      <p>{data?.data}</p>
    </Spin>
  );
};
