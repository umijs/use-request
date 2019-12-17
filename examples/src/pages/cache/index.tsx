import React from 'react';
import Link from 'umi/link';


export default () => {

  return (
    <div>
      <p>你可以尝试多次进入下面页面，我们会优先返回缓存的数据。</p>
      <ul>
        <li><Link to="/cache/intro">intro</Link></li>
        <li><Link to="/cache/article">article</Link></li>
      </ul>
    </div>
  );
};
