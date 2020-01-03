import { getRandom } from '@/service';
import useAPI from '@umijs/use-api';
import React from 'react';


export default () => {
  const { data, loading, cancel, run } = useAPI(getRandom, {
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
