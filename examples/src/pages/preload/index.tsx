import React from 'react';
import Link from 'umi/link';
import { getIntro, getArtitle } from '@/service';
import useAPI from '@umijs/use-api';


export default () => {

  const getArticleAction = useAPI(getArtitle, {
    manual: true,
    cacheKey: 'article'
  });

  const getIntroAction = useAPI(getIntro, {
    manual: true,
    cacheKey: 'intro'
  });

  return (
    <div>
      <p>当鼠标 hover 到链接上时，会预加载详情页数据。</p>
      <ul>
        <li><Link to="/preload/intro" onMouseEnter={() => getIntroAction.run()}>intro</Link></li>
        <li><Link to="/preload/article" onMouseEnter={() => getArticleAction.run()}>article</Link></li>
      </ul>
    </div>
  );
};
