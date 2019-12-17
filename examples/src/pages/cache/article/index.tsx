import { getArtitle } from '@/service';
import useAPI from '@umijs/use-api';
import { Spin } from 'antd';
import React from 'react';


export default () => {
  const { data, loading } = useAPI(getArtitle, {
    cacheKey: 'article'
  });

  return (
    <Spin spinning={!data && loading}>
      {data}
    </Spin>
  );
};
