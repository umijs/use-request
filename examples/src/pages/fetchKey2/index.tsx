import useAPI from '@umijs/use-api';
import { Button, Spin } from 'antd';
import React from 'react';


const getArtitle = async (type: string): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`this is ${type} content`);
    }, 1000);
  })
}

export default () => {

  const { run, fetches } = useAPI(getArtitle, {
    manual: true,
    fetchKey: (type) => type,
  });

  return (
    <div>
      <div>
        <h1>Article A</h1>
        <Button onClick={() => { run('A') }}>run</Button>
        <Spin spinning={!!fetches['A']?.loading}>
          <p>{fetches['A']?.data}</p>
        </Spin>
      </div>
      <div>
        <h1>Article B</h1>
        <Button onClick={() => { run('B') }}>run</Button>
        <Spin spinning={!!fetches['B']?.loading}>
          <p>{fetches['B']?.data}</p>
        </Spin>
      </div>
      <div>
        <h1>Article C</h1>
        <Button onClick={() => { run('C') }}>run</Button>
        <Spin spinning={!!fetches['C']?.loading}>
          <p>{fetches['C']?.data}</p>
        </Spin>
      </div>

    </div>
  );
};
