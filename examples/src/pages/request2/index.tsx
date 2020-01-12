import useAPI from '@umijs/use-api';
import React, { useState } from 'react';


export default () => {
  const [state, setState] = useState('');
  const { loading, run } = useAPI((username) => ({
    url: '/api/changeUsername',
    method: 'post',
    data: { username },
  }), {
    manual: true,
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
