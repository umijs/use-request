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
      <p>loadingDelay can set delay loading, which can effectively prevent loading from flickering.</p>
      <Button onClick={trigger}>
        run
      </Button>

      <div style={{ margin: '24px 0', width: 300 }}>
        <Spin spinning={getTimeAction.loading}>
          Double Count: {getTimeAction.data}
        </Spin>
      </div>
      <div>
        <Spin spinning={withLoadingDelayAction.loading}>
          Double Count: {withLoadingDelayAction.data}
        </Spin>
      </div>
    </div>
  );
};
