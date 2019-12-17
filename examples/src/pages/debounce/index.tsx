import { getEmail } from '@/service';
import useAPI from '@umijs/use-api';
import { Select } from 'antd';
import React from 'react';

const { Option } = Select;

export default () => {
  const { data, loading, run, cancel } = useAPI(getEmail, {
    debounceInterval: 500,
    manual: true
  });

  return (
    <div>
      <p>如果设置了 debounceInterval， useAPI 将以防抖模式执行。你可以尝试快速输入字符。</p>
      <Select
        showSearch
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
