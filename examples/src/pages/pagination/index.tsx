import { getUserList } from '@/service';
import useAPI from '@umijs/use-api';
import { List, Pagination, Select } from 'antd';
import React, { useState } from 'react';

export default () => {
  const [gender, setGender] = useState();
  const { data, loading, pagination } = useAPI(
    params => getUserList({ ...params, gender }),
    {
      paginated: true,
      refreshDeps: [gender]
    }
  );
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        1. 通过设置 paginated = true 即可启用分页模式。<br />
        2. 分页模式会自动管理 current, pageSize 等，并作为参数传递给 service。<br />
        3. 分页场景的 refreshDeps 变化，我们会重置 current 到第一页。<br />
        4. 分页场景需要数据结构满足 "total: number, list: Item[]"，如果不满足，可以通过 formatResult 转换一次。
      </div>
      <Select
        style={{ width: 180, marginBottom: 24 }}
        onChange={g => setGender(g)}
        placeholder="select gender"
        allowClear
      >
        <Select.Option value="male">male</Select.Option>
        <Select.Option value="female">female</Select.Option>
      </Select>
      <List
        dataSource={data && data.list}
        loading={loading}
        renderItem={item => (
          <List.Item>
            {item.name} - {item.email}
          </List.Item>
        )}
      />
      <Pagination
        {...(pagination as any)}
        showQuickJumper
        showSizeChanger
        onShowSizeChange={pagination.onChange}
        style={{ marginTop: 16, textAlign: 'right' }}
      />
    </div>
  );
};
