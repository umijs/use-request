import { changeUsername, getUserInfo } from '@/service';
import useAPI from '@umijs/use-api';
import React, { useState } from 'react';


export default () => {
  const [state, setState] = useState('');

  const { data, mutate } = useAPI(getUserInfo, {
    onSuccess: (data) => {
      setState(data.username);
    }
  });

  const editAction = useAPI(changeUsername, {
    manual: true,
    onSuccess: (_, params) => {
      mutate((d) => ({
        ...d,
        username: params[0]
      }));
      alert(`The username was changed to "${params[0]}" !`);
    }
  });

  return (
    <div>
      {data &&
        <>
          <div>userId: {data.id}</div>
          <div>usrename: {data.username}</div>
        </>
      }

      <input
        onChange={e => setState(e.target.value)}
        value={state}
        placeholder="Please enter username"
        style={{ width: 240, marginRight: 16 }}
      />
      <button onClick={() => editAction.run(state)}>
        {editAction.loading ? 'Editting...' : 'Edit'}
      </button>
    </div>
  );
};
