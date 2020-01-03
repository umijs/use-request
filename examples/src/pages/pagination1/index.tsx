import { getUserList } from '@/service';
import useAPI from '@umijs/use-api';
import { List, Pagination } from 'antd';
import React from 'react';

export default () => {
  const { data, loading, pagination } = useAPI(
    ({ current, pageSize }) => getUserList({ current, pageSize }),
    {
      paginated: true,
    }
  );
  return (
    <div>
      <List
        dataSource={data?.list}
        loading={loading}
        renderItem={(item: any) => (
          <List.Item>
            {item.name} - {item.email}
          </List.Item>
        )}
      />
      <Pagination
        {...(pagination as any)}
        showQuickJumper={true}
        showSizeChanger={true}
        onShowSizeChange={pagination.onChange}
        style={{ marginTop: 16, textAlign: 'right' }}
      />
    </div>
  );
};
