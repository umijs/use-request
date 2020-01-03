# useAPI

Production-ready React Hooks library for manage asynchronous data.

[![NPM version][image-1]][1] [![NPM downloads][image-2]][2]

## 特性

- 自动请求/手动请求
- SWR(stale-while-revalidate)
- 缓存/预加载
- 屏幕聚焦重新请求
- 轮询
- 防抖
- 节流
- 并行请求
- loading delay
- 分页
- 加载更多，数据恢复 + 滚动位置恢复
- [ ] 错误重试
- [ ] 请求超时管理
- [ ] suspense
- ......

## 在线体验

[![Edit](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/zealous-haslett-0kzo4)

## 快速开始

### 安装

```shell
$ npm i @umijs/use-api --save
# or 
$ yarn add @umijs/use-api
```

### 使用

```javascript
//service 为异步函数。
const {data, error, loading} = useAPI(service);
```

```jsx
import React from 'react';
import useAPI from '@umijs/use-api';

export default () => {
  const { data, error, loading } = useAPI(getUserInfo)

  if (error) return <div>failed to load</div>
  if (loading) return <div>loading...</div>
  return <div>hello {data.username}!</div>
}
```

在这个例子中， useAPI 接收了一个异步函数 `getUserInfo` ，在组件初次加载时，自动触发该函数执行。同时 useAPI 会自动管理异步请求的 `loading` , `data` , `error` 等状态。

## 文档
* 示例
  * [默认请求](#默认请求)
  * [手动触发](#手动触发)
  * [突变](#突变)
  * [轮询](#轮询)
  * [防抖](#防抖)
  * [节流](#节流)
  * [缓存 & SWR](#缓存--swr)
  * [并行请求](#并行请求)
  * [Loading Delay](#loading-delay)
  * 高级用法
    * [分页](分页)
    * [加载更多](加载更多)
* [API](#api)
* [高级 API](#高级-API)
  * [分页 API](#分页-API)
  * [加载更多 API](#加载更多-API)


#### 默认请求

[代码示例](./examples/src/pages/index.tsx)

如 [快速开始](#使用) 例子一样， useAPI 在组件初始化时会默认执行 service。

#### 手动触发

[代码示例](./examples/src/pages/manual/index.tsx)

通过设置 `options.manual = true` , 则需要手动调用 `run` 时才会触发执行。

```jsx
const { loading, run } = useAPI(changeUsername, {
  manual: true,
});

<button onClick={() => run('new name')}>
    {loading ? 'Editting...' : 'Edit'}
</button>
```

#### 突变

[代码示例](./examples/src/pages/mutate/index.tsx)

你可以通过 `mutate` ，直接修改 `data` 。 `mutate` 函数参数可以为 `newData` 或 `(data)=> newData` 。

```jsx
const { data, mutate } = useAPI(getUserInfo);

<button onClick={() => mutate('new name')}>
    Edit
</button>
```

#### 轮询

[代码示例](./examples/src/pages/polling/index.tsx)

通过设置 `pollingInterval` ，进入轮询模式，定时触发函数执行。同时可以通过设置 `pollingWhenHidden = false` ，在屏幕不可见时，暂时暂停定时任务。

- 你可以通过 `run` / `cancel` 来 开启/停止 轮询。
- 在 `manual=true` 时，需要第一次执行 `run` 后，才开始轮询。

```jsx
const { data, loading } = useAPI(getUserInfo, {
  pollingInterval: 1000,
  pollingWhenHidden: false
});
```

#### 防抖

[代码示例](./examples/src/pages/debounce/index.tsx)

通过设置 `debounceInterval` ，则进入防抖模式。此时如果频繁触发 `run` ，则会以防抖策略进行请求。

```jsx
const { data, loading, run } = useAPI(getUserInfo, {
  debounceInterval: 500
});
```

#### 节流

[代码示例](./examples/src/pages/throttle/index.tsx)

通过设置 `throttleInterval` ，则进入节流模式。此时如果频繁触发 `run` ，则会以节流策略进行请求。

```jsx
const { data, loading, run } = useAPI(getUserInfo, {
  throttleInterval: 500
});
```

#### 缓存 & SWR

[代码示例](./examples/src/pages/cache/index.tsx)

如果设置了 `cacheKey` ， useAPI 会将当前请求结束数据缓存起来。下次组件初始化时，如果有缓存数据，我们会优先返回缓存数据，然后在背后发送新请求，也就是 SWR 的能力。

```jsx
const { data, loading, run } = useAPI(getInfo, {
  cachekey: 'getInfoKey'
});
```

![1](https://user-images.githubusercontent.com/12526493/71711341-91114e00-2e3b-11ea-8509-96b8be4dfa4f.gif)


#### 预加载

[代码示例](./examples/src/pages/preload/index.tsx)

同一个 `cacheKey` 的请求，是全局共享的，也就是你可以提前加载数据。利用该特性，可以很方便的实现预加载。你可以在线上例子中体验一下。

#### 屏幕聚焦重新请求

[代码示例](./examples/src/pages/refreshOnWindowFocus/index.tsx)

如果你设置了 `refreshOnWindowFocus = true` ，则在浏览器窗口 `refouc` 和 `revisible` 时，会重新发起请求。

你可以通过设置 `focusTimespan` 来设置请求间隔，默认为 `5000ms` 。

```jsx
const { data, loading } = useAPI(getUserInfo, {
  refreshOnWindowFocus: true,
  focusTimespan: 5000
});
```

#### 并行请求

[代码示例1](./examples/src/pages/fetchKey/index.tsx)
[代码示例2](./examples/src/pages/fetchKey2/index.tsx)

通过 `fetchKey` ，可以将请求进行分类，每一类的请求都有独立的状态，你可以在 `fetches` 中找到所有的请求。

```jsx
const { run, fetches } = useAPI(disableUser, {
  manual: true,
  fetchKey: (id) => id,
});
```

![2](https://user-images.githubusercontent.com/12526493/71711420-ecdbd700-2e3b-11ea-90b3-2584c6f395df.gif)

![3](https://user-images.githubusercontent.com/12526493/71711424-ef3e3100-2e3b-11ea-8bda-f9e0b3642340.gif)


#### Loading Delay

[代码示例](./examples/src/pages/loadingDelay/index.tsx)

通过设置 `loadingDelay` ，可以延迟 `loading` 变成 `true` 的时间，有效防止请求抖动。

```jsx
const withLoadingDelayAction = useAPI(getCurrentTime, {
    loadingDelay: 200
});
```

![4](https://user-images.githubusercontent.com/12526493/71711470-375d5380-2e3c-11ea-9727-38d00c45cf0c.gif)

#### refreshDeps

[代码示例](./examples/src/pages/refreshDeps/index.tsx)

当某些 `state` 变化时，我们需要重新执行异步请求，一般我们会这样写代码：

```jsx
const [userId, setUserId] = useState('1');
const { data, run, loading } = useAPI(getUserSchool, { manual: true });
useEffect(() => {
  run(userId);
}, [userId]);
```

`refreshDeps` 是一个语法糖，让你更方便的实现上面的功能。当 `refreshDeps` 变化时，我们会重新执行异步请求。

```jsx
const [userId, setUserId] = useState('1');
const { data, run, loading } = useAPI(() => {
  return getUserSchool(userId)
}, {
  refreshDeps: [userId]
});
```

### 高级用法

#### 分页

通过设置 `options.paginated = true` ， useAPI 将以分页模式运行，此时会有以下特性：

- useAPI 会自动管理分页 `current` , `pageSize` 。service 的第一个参数为 `{current, pageSize}` 。
- service 返回的数据结构必须为 `{list: Item[], total: number}` ，如果不满足，可以通过 `options.formatResult` 转换一次。
- 会额外返回 `pagination` 字段，包含所有分页信息，及操作分页的函数。
- `refreshDeps` 变化，会重置 `current` 到第一页，并重新发起请求，一般你可以把 pagination 依赖的条件放这里。
- 更多信息可查看 [API](#分页-1)。


##### 示例 1

[代码示例](./examples/src/pages/pagination/index.tsx)

普通的分页场景，我们会自动管理 `current` 和 `pageSize` 

```jsx
const { data, loading, pagination } = useAPI(
  ({ current, pageSize }) => getUserList({ current, pageSize }),
  {
    paginated: true,
  }
);
```

##### 示例 2

[代码示例](./examples/src/pages/pagination1/index.tsx)

由于 antd [Table](https://ant.design/components/table-cn/) 使用比较广泛，我们特别支持了 antd Table 需要的分页格式，及 `sorter` 、 `filters` 等。你可以通过 `result.tableProps` ， `result.filters` ， `result.sorter` 访问到这些属性。 

```jsx
const { tableProps, sorter, filters } = useAPI((params) => {
  return getUserList(params);
}, {
  paginated: true
});

return (<Table columns={columns} rowKey="id" {...tableProps} />);
```

##### 示例 3

[代码示例](./examples/src/pages/pagination2/index.tsx)

在 `cacheKey` 场景下， `run` 的参数 `params` 是可以缓存的，利用这个特点，我们可以实现 pagination 相关条件的缓存。

一个复杂的带条件，带缓存的 pagination 例子。

![5](https://user-images.githubusercontent.com/12526493/71711583-a5a21600-2e3c-11ea-9a03-b57b20d536db.gif)


#### 加载更多

[代码示例](./examples/src/pages/loadMore/index.tsx)

通过设置 `options.loadMore = true` ， useAPI 将以 loadMore 模式运行，此时会有以下特性：

- service 返回的数据结构必须包含 `{list: Item[], nextId: string|undefined}` ，如果不满足，可以通过 `options.formatResult` 转换一次。
- useAPI 会自动管理列表数据 。service 的第一个参数为 `nextId`。
- 会额外返回 `result.loadingMore` 和 `result.loadMore` 。
- `refreshDeps` 变化，会清空当前数据，并重新发起请求，一般你可以把 loadMore 依赖的条件放这里。
- 更多信息可查看 [API](#加载更多)。

```jsx
const { data, run, loadMore, loading, loadingMore } = useAPI((nextId) => {
  return getUserList(nextId);
}, {
  loadMore: true
});
```

![6](https://user-images.githubusercontent.com/12526493/71711620-ca968900-2e3c-11ea-8e73-e93f535cc271.gif)


### API

```javascript
const {
  data,
  error,
  loading,
  run,
  params,
  cancel,
  refresh,
  mutate,
  fetches,
} = useAPI(service, {
  manual,
  initialData,
  refreshDeps,
  onSuccess,
  onError,
  formatResult,
  cacheKey,
  loadingDelay,
  defaultParams,
  pollingInterval,
  pollingWhenHidden,
  fetchKey,
  refreshOnWindowFocus,
  focusTimespan,
  debounceInterval,
  throttleInterval,
}); 
```

#### 返回

- `data: undefined | any`

- service 返回的数据，默认为 `undefined`。
  - 如果有 `formatResult`, 则该数据为被格式化后的数据。

- `error: undefined | Error`

  - service 抛出的异常，默认为 `undefined`。

- `loading: boolean`

  - service 是否正在执行。

- `run: (...args: any[]) => Promise`

  - 手动触发 service 执行，参数会传递给 service。

- `params: any[]`

  - 当次执行的 service 的参数数组。比如你触发了 `run(1, 2, 3)`，则 params 等于 `[1, 2, 3]`

- `cancel: () => void`

  - 取消当前请求。
  - 如果有轮询，停止。

- `refresh: () => void`

  - 使用上一次的 params，重新执行 service。

- `mutate: data | (data)=>newData`

  - 直接修改 data。

- `fetches: {[key:string]: {loading,data,error,params,cancel,refresh,mutate,run}}` 

  - 默认情况下，新请求会覆盖旧请求。如果设置了 `fetchKey`，则可以实现多个请求并行，`fetches` 存储了多个请求的状态。
  - 外层的状态为最新触发的 fetches 数据。

#### 参数

所有的 Options 均是可选的。

- `manual: boolean`

  - 默认 `false`。 即在初始化时自动执行 service。
  - 如果设置为 `true`，则需要手动调用 `run` 触发执行。

- `initialData: any` 

  - 默认的 data

- `refreshDeps: any[]`

  - 在 `manual = false` 时，`refreshDeps` 变化，会触发 service 重新执行。

- `formatResult: (response: any) => any`

  - 格式化请求结果。

- `onSuccess: (data:any, params: any[]) => void`

  - service resolve 时触发，参数为 `data` 和 `params`
  - 如果有 `formmatResult` ，则 `data` 为格式化后数据。

- `onError: (error: Error, params: any[]) => void`

  - service 报错时触发，参数为 `error` 和 `params`。

- `fetchKey: (...params: any[]) => string`

  - 根据 params，获取当前请求的 key，设置之后，我们会在 `fetches` 中同时维护不同 `key` 值的请求状态。

- `cacheKey: string`

  - 请求唯一标识。如果设置了 `cacheKey`，我们会启用缓存机制。
  - 我们会缓存每次请求的 `data` , `error` , `params` , `loading` 。 
  - 在缓存机制下，同样的请求我们会先返回缓存中的数据，同时会在背后发送新的请求，待新数据返回后，重新触发数据更新。

- `defaultParams: any[]` 

  - 如果 `manual=false` ，自动执行 `run` 的时候，默认带上的参数。

- `loadingDelay: number`

  - 设置显示 loading 的延迟时间，避免闪烁。

- `pollingInterval: number`

  - 轮询间隔，单位为毫秒。设置后，将进入轮询模式，定时触发 `run`。

- `pollingWhenHidden: boolean`

  - 在页面隐藏时，是否继续轮询。默认为 `true`，即不会停止轮询。
  - 如果设置为 `false` , 在页面隐藏时会暂时停止轮询，页面重新显示时继续上次轮询。

- `refreshOnWindowFocus: boolean`

  - 在屏幕重新获取焦点或重新显示时，是否重新发起请求。默认为 `false`，即不会重新发起请求。
  - 如果设置为 `true`，在屏幕重新聚焦或重新显示时，会重新发起请求。

- `focusTimespan: number`

  - 屏幕重新聚焦，如果每次都重新发起请求，不是很好，我们需要有一个时间间隔，在当前时间间隔内，不会重新发起请求。默认为 `5000ms`
  - 需要配置 `refreshOnWindowFocus` 使用。

- `debounceInterval: number`

  - 防抖间隔, 单位为毫秒，设置后，请求进入防抖模式。

- `throttleInterval：number`

  - 节流间隔, 单位为毫秒，设置后，请求进入节流模式。

### 高级 API

基于基础的 useAPI，我们可以进一步封装，实现多种定制需求。当前 useAPI 内置了 `分页` 和 `加载更多` 两种场景。你可以参考代码，实现自己的封装。参考 [usePaginated](./src/usePaginated.ts)、[useLoadMore](./src/useLoadMore.ts) 的实现。

#### 分页 API

```javascript
const {
  ...,
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPage: number;
    onChange: (current: number, pageSize: number) => void;
    changeCurrent: (current: number) => void;
    changePageSize: (pageSize: number) => void;
  };
  tableProps: {
    dataSource: Item[];
    loading: boolean;
    onChange: (
      pagination: PaginationConfig,
      filters?: Record<keyof Item, string[]>,
      sorter?: SorterResult<Item>,
    ) => void;
    pagination: {
      current: number;
      pageSize: number;
      total: number;
    };
  };

  sorter?: SorterResult<Item>;
  filters?: Record<keyof Item, string[]>;
} = useAPI(service, {
  ...,
  paginated,
  defaultPageSize,
  refreshDeps,
}); 
```

##### 返回

- `pagination`

  - 分页数据及操作分页的方法。

- `tableProps`

  - 适配 [antd Table](https://ant.design/components/table-cn/) 组件的数据结构，可以直接用在 Table 组件上。

- `sorter`

  - antd Table sorter。

- `filters`

  - antd Table filters。

##### 参数

- `paginated: boolean`

  - 是否开启分页模式，默认为 `false`。
  - 如果设置为 `true`，则开启分页模式。在分页模式下，service 的第一个参数为 `{curret, pageSize, sorter, filters}` 。
  - 响应结果或 `formatResult` 结果必须为 `{list: Item[], total: number}`。

- `refreshDeps` 

  - 分页模式下， `refreshDeps` 变化，会重置 `current` 到第一页，并重新发起请求，一般你可以把依赖的条件放这里。

#### 加载更多 API

```javascript
const {
  ...,
  loadMore,
  loadingMore,
} = useAPI(service, {
  ...,
  loadMore,
  refreshDeps,
}); 
```

##### 返回

- `loadMore: ()=>void` 

  - 触发加载更多

- `loadingMore: boolean` 

  - 是否正在加载更多

##### 参数

- `loadMore: boolean`

  - 是否开启加载更多模式，默认为 `false`。
  - 如果设置为 `true`，则开启加载更多模式。在该模式下，service 的第一个参数为 `nextId` 。
  - 响应结果或 `formatResult` 结果必须为 `{list: Item[], nextId: string|undefined}`。

- `refreshDeps`

  - 加载更多模式下， `refreshDeps` 变化，会清空当前数据，并重新发起请求，一般你可以把依赖的条件放这里。

## 致谢
- [zeit/swr](https://github.com/zeit/swr)
- [tannerlinsley/react-query](https://github.com/tannerlinsley/react-query)

## License

[MIT](https://github.com/umijs/use-api/blob/master/LICENSE)

[1]:	https://www.npmjs.com/package/@umijs/use-api
[2]:	https://npmjs.org/package/@umijs/use-api
[image-1]:	https://img.shields.io/npm/v/@umijs/use-api.svg?style=flat
[image-2]:	https://img.shields.io/npm/dm/@umijs/use-api.svg?style=flat
