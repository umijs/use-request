import { getUserSchool } from '@/service';
import useAPI from '@umijs/use-api';
import { Spin } from 'antd';
import React, { useState } from 'react';


export default () => {

  const [userId, setUserId] = useState('1');
  const { data, loading } = useAPI(() => {
    return getUserSchool(userId);
  }, {
    refreshDeps: [userId]
  });

  return (
    <div>
      <p>refreshDeps 变化，会触发 useAPI 重新执行。</p>
      <ul>
        <li><a onClick={() => { setUserId('1') }}>user 1</a></li>
        <li><a onClick={() => { setUserId('2') }}>user 2</a></li>
        <li><a onClick={() => { setUserId('3') }}>user 3</a></li>
      </ul>
      <Spin spinning={loading}>
        School: {data}
      </Spin>
    </div>
  );
};
