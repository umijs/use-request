import React from 'react';
import styles from './index.css';
import Link from 'umi/link';

const BasicLayout: React.FC = (props) => {

  const routes = [{
    name: '默认用法',
    path: '/'
  }, {
    name: '手动触发(manual)',
    path: '/manual'
  }, {
    name: 'refreshOnWindowFocus',
    path: '/refreshOnWindowFocus'
  }, {
    name: '缓存',
    path: '/cache'
  }, {
    name: '预加载',
    path: '/preload'
  }, {
    name: '突变(mutate)',
    path: '/mutate'
  }, {
    name: 'refreshDeps',
    path: '/refreshDeps'
  }, {
    name: '轮询',
    path: '/polling'
  }, {
    name: '防抖',
    path: '/debounce'
  }, {
    name: '节流',
    path: '/throttle'
  }, {
    name: '分页',
    path: '/pagination'
  }, {
    name: '分页2',
    path: '/pagination1'
  }, {
    name: '分页3',
    path: '/pagination2'
  }, {
    name: 'loadMore',
    path: '/loadMore'
  }, {
    name: '并行请求',
    path: '/fetchKey'
  }, {
    name: '并行请求2',
    path: '/fetchKey2'
  }, {
    name: 'loadingDelay',
    path: '/loadingDelay'
  }];

  return (
    <div className={styles.layout}>
      <div className={styles.left}>
        <ul>
          {routes.map(i => (
            <li key={i.path}><Link to={i.path}>{i.name}</Link></li>
          ))}
        </ul>
      </div>
      <div className={styles.right}>
        {props.children}
      </div>
    </div>
  );
};

export default BasicLayout;
