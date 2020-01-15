import { getEmail } from '@/service';
import useRequest from '@umijs/use-request';
import { Select } from 'antd';
import React from 'react';

const { Option } = Select;

export default () => {
  const { data, loading, run, cancel } = useRequest(getEmail, {
    debounceInterval: 500,
    manual: true
  });

  return (
    <div>
      <p>Enter quickly to see the effect</p>
      <Select
        showSearch={true}
        placeholder="Select Emails"
        filterOption={false}
        onSearch={run}
        onBlur={cancel}
        loading={loading}
        style={{ width: 300 }}
      >
        {data && data.map((i) => <Option key={i}>{i}</Option>)}
      </Select>
    </div>
  );
};
