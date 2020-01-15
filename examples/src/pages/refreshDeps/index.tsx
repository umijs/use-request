import { getUserSchool } from '@/service';
import useRequest from '@umijs/use-request';
import { Spin } from 'antd';
import React, { useState, useEffect } from 'react';


export default () => {

  const [userId, setUserId] = useState('1');
  const { data, run, loading } = useRequest(() => {
    return getUserSchool(userId)
  }, {
    refreshDeps: [userId]
  });

  return (
    <div>
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
