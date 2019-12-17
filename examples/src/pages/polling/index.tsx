import { getRandom } from '@/service';
import useAPI from '@umijs/use-api';
import { Spin } from 'antd';
import React from 'react';
import { Button } from 'antd';


export default () => {
  const { data, loading, stopPolling, run } = useAPI(getRandom, {
    pollingInterval: 1000,
    pollingWhenHidden: false
  });

  return (
    <div>
      <p>如果设置了 pollingInterval，则 useAPI 将循环请求，你可以通过 stopPolling/run 控制 暂停/开始。同时你可以通过 pollingWhenHidden 来设置是否在屏幕隐藏时，需要暂时关闭轮询。</p>
      <Spin spinning={loading}>
        {data}
      </Spin>
      <div style={{ marginTop: 16 }}>
        <Button.Group>
          <Button onClick={run}>开始</Button>
          <Button onClick={stopPolling}>暂停</Button>
        </Button.Group>
      </div>
    </div>
  );
};
