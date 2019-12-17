import { changeUsername, getUserInfo } from '@/service';
import useAPI from '@umijs/use-api';
import { Button, Input, message, Spin } from 'antd';
import React, { useState } from 'react';


export default () => {
  const [state, setState] = useState('');

  const { data, loading, mutate } = useAPI(getUserInfo, {
    onSuccess: (data) => {
      setState(data.username);
    }
  });

  const changeAction = useAPI(changeUsername, {
    manual: true,
    onSuccess: (_, params) => {
      message.success(`修改为 ${params[0]} 成功`);
      mutate({
        ...(data as any),
        username: params[0]
      });
    }
  });

  return (
    <div>
      <p>通过 mutate 可以直接修改 data</p>
      <Spin spinning={loading}>
        <div>userId: {data?.id}</div>
        <div>usrename: {data?.username}</div>

        <Input
          onChange={e => setState(e.target.value)}
          value={state}
          placeholder="请输入用户名称"
          style={{ width: 240, marginRight: 16, marginTop: 16 }}
        />
        <Button loading={changeAction.loading} onClick={() => changeAction.run(state)}>修改</Button>
      </Spin>
    </div>
  );
};
