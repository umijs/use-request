import { getUserList, disableUser } from '@/service';
import useAPI from '@umijs/use-api';
import { Button, Table, message } from 'antd';
import React from 'react';

export default () => {
  const { data, tableProps, mutate } = useAPI(getUserList, {
    paginated: true
  });

  const { run, history } = useAPI(disableUser, {
    manual: true,
    fetchKey: (id) => id,
    onSuccess: (_, params) => {
      message.success(`${params[0]} 禁用成功`);
      data?.list?.forEach(i => {
        if (i.id === params[0]) {
          i.disabled = true;
        }
      });
      mutate(data as any);
    }
  });

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '操作',
      dataIndex: 'id',
      width: '60%',
      render: (text: string, record: any) => {
        return <Button disabled={record.disabled} loading={history[text]?.loading} onClick={() => { run(text) }}>禁用</Button>
      }
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        如果设置了 fetchKey，我们会通过 key 将请求分类，全部维护在 history 对象中，你可以访问到所有的请求。<br />
        你可以快速点击下面的“禁用”试试。
      </div>
      <Table columns={columns} rowKey="id" {...tableProps} />
    </div>
  );
};
