import { disableUser } from '@/service';
import useAPI from '@umijs/use-api';
import { Button, message } from 'antd';
import React from 'react';

export default () => {


  const { run, fetches } = useAPI(disableUser, {
    manual: true,
    fetchKey: (id) => id,
    onSuccess: (_, params) => {
      message.success(`Disabled user ${params[0]}`);
    }
  });

  return (
    <div>
      <ul>
        <li>user A: <Button loading={fetches['A']?.loading} onClick={() => { run('A') }}>disabled</Button></li>
        <li>user B: <Button loading={fetches['B']?.loading} onClick={() => { run('B') }}>disabled</Button></li>
        <li>user C: <Button loading={fetches['C']?.loading} onClick={() => { run('C') }}>disabled</Button></li>
      </ul>

    </div>
  );
};
