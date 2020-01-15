import React from 'react';
import Link from 'umi/link';
import { getIntro, getArtitle } from '@/service';
import useRequest from '@umijs/use-request';


export default () => {

  const getArticleAction = useRequest(getArtitle, {
    manual: true,
    cacheKey: 'article'
  });

  const getIntroAction = useRequest(getIntro, {
    manual: true,
    cacheKey: 'intro'
  });

  return (
    <div>
      <p>When the mouse hovers over the link, the detail page data is preloaded.</p>
      <ul>
        <li><Link to="/preload/intro" onMouseEnter={() => getIntroAction.run()}>intro</Link></li>
        <li><Link to="/preload/article" onMouseEnter={() => getArticleAction.run()}>article</Link></li>
      </ul>
    </div>
  );
};
