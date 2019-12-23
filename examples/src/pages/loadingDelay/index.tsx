import useAPI from '@umijs/use-api';
import { Button, Spin } from 'antd';
import React from 'react';

const getCurrentTime = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(new Date().getTime())
    }, 100);
  });
}

export default () => {

  const getTimeAction = useAPI(getCurrentTime);

  const withLoadingDelayAction = useAPI(getCurrentTime, {
    loadingDelay: 200
  });

  const trigger = () => {
    getTimeAction.run();
    withLoadingDelayAction.run();
  }

  return (
    <div>
      <p>loadingDelay 可以设置延迟 loading，可有效防止 loading 闪烁。</p>
      <Button onClick={trigger}>
        请求
      </Button>

      <div style={{ margin: '24px 0', width: 300 }}>
        <p>普通的 loading，会有闪烁</p>
        <Spin spinning={getTimeAction.loading}>
          Double Count: {getTimeAction.data}
        </Spin>
      </div>
      <div>
        <p>设置了 loadingDelay，如果数据响应很快，不会显示 loading</p>
        <Spin spinning={withLoadingDelayAction.loading}>
          Double Count: {withLoadingDelayAction.data}
        </Spin>
      </div>
    </div>
  );
};
