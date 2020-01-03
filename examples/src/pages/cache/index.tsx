import React from 'react';
import Link from 'umi/link';


export default () => {

  return (
    <div>
      <p>You can try to enter the following page multiple times, we will return the cached data first.</p>
      <ul>
        <li><Link to="/cache/intro">intro</Link></li>
        <li><Link to="/cache/article">article</Link></li>
      </ul>
    </div>
  );
};
