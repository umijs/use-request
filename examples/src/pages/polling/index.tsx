import { getRandom } from '@/service';
import useRequest from '@umijs/use-request';
import React from 'react';


export default () => {
  const { data, loading, cancel, run } = useRequest(getRandom, {
    pollingInterval: 1000,
    pollingWhenHidden: false
  });

  return (
    <div>
      <div>{loading ? 'loading...' : data}</div>
      <div>
        <button onClick={run}>start</button>
        <button onClick={cancel}>stop</button>
      </div>
    </div>
  );
};
