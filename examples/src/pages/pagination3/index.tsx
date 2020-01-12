import { getUserList } from '@/service';
import useAPI from '@umijs/use-api';
import { Button, Table } from 'antd';
import React from 'react';

export default () => {
  const { tableProps, filters, sorter, refresh } = useAPI(({ current, pageSize, sorter, filters }) => {
    const params: any = { current, pageSize };
    if (sorter?.field && sorter?.order) {
      params[sorter.field] = sorter.order;
    }
    if (filters) {
      Object.entries(filters).forEach(i => {
        params[i[0]] = i[1];
      });
    }
    return getUserList(params);
  }, {
    paginated: true
  });

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'id',
      dataIndex: 'id',
      sorter: true,
      sortOrder: sorter?.field === 'id' ? sorter?.order : false,
    },
    {
      title: 'gender',
      dataIndex: 'gender',
      filters: [{ text: 'male', value: 'male' }, { text: 'female', value: 'female' }],
      filteredValue: filters?.gender,
    },
  ];

  return (
    <div>
      <Button onClick={refresh} style={{ marginBottom: 16 }}>刷新</Button>
      <Table columns={columns} rowKey="id" {...tableProps} />
    </div>
  );
};
