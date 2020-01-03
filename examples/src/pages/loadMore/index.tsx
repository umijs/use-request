import useAPI from '@umijs/use-api';
import { Button, Spin } from 'antd';
import React from 'react';
import Link from 'umi/link';

interface Item {
  id: number,
  name: string
}

const resultData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function getList(nextId: any, limit: any): Promise<{ list: Item[], nextId: string | undefined }> {
  let start = 0;
  if (nextId) {
    start = resultData.findIndex((i) => i === nextId);
  }
  const end = start + limit;
  const list = resultData.slice(start, end).map((id) => ({
    id,
    name: `project ${id} (server time: ${Date.now()})`
  }));
  const nId = resultData.length >= end ? resultData[end] : null;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        list,
        nextId: nId + ''
      });
    }, 1000);
  });
}

export default () => {

  const { data, loading, loadMore, loadingMore } = useAPI((nextId) => {
    return getList(nextId, 3);
  }, {
    cacheKey: 'loadMoreDemo',
    loadMore: true
  });

  return (
    <div>
      <Spin spinning={loading}>
        <div style={{ margin: '16px 0' }}>
          {data?.list.map((l: any) =>
            <div key={l.id} style={{ height: 100, border: '1px solid #d0caca' }}>{l.name}</div>
          )}
        </div>
      </Spin>
      <Button
        onClick={loadMore}
        loading={loadingMore}
        disabled={!data?.nextId}
      >
        click to load more
      </Button>
      <div style={{ marginTop: 16 }}>
        <Link to="/another">
          go to another page
        </Link>
      </div>
    </div>
  );
};
