import useRequest from '@umijs/use-request';
import React, { useState } from 'react';
import axios from 'axios';

type Response = { success: boolean }
export default () => {
  const [state, setState] = useState('');
  const { loading, run } = useRequest<Response>((username: string) => ({
    url: '/api/changeUsername',
    method: 'post',
    data: { username },
  }), {
    manual: true,
    requestMehod: (param: any) => {
      return axios(param);
    },
    onSuccess: (_, params) => {
      setState('');
      alert(`The username was changed to "${params[0]}" !`);
    }
  });

  return (
    <div>
      <input
        onChange={e => setState(e.target.value)}
        value={state}
        placeholder="Please enter username"
        style={{ width: 240, marginRight: 16 }}
      />
      <button onClick={() => run(state)}>
        {loading ? 'Editting...' : 'Edit'}
      </button>
    </div>
  );
};
