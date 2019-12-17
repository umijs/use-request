import { changeUsername } from '@/service';
import useAPI from '@umijs/use-api';
import { Button, Input, message } from 'antd';
import React, { useState } from 'react';


export default () => {
  const [state, setState] = useState('');
  const { loading, run } = useAPI(changeUsername, {
    manual: true,
    onSuccess: (_, params) => {
      message.success(`修改为 ${params[0]} 成功`);
    }
  });

  return (
    <div>
      <Input
        onChange={e => setState(e.target.value)}
        value={state}
        placeholder="请输入用户名称"
        style={{ width: 240, marginRight: 16 }}
      />
      <Button loading={loading} onClick={() => run(state)}>修改</Button>
    </div>
  );
};
