# use-api
React Hooks for fetching, caching and updating asynchronous data

## Feature

* 自动请求/手动请求
* SWR(stale-while-revalidate)
* 缓存/预加载
* 屏幕聚焦重新请求
* 轮询请求
* 防抖
* 节流
* 分页
* 并发
* ......

## Install

```
npm i @umijs/use-api --save
```

## Usage

```
import useAPI from '@umijs/use-api';
```

```javascript
function Todos() {
  const { data, error, loading } = useAPI(fetchTodoList)

  return (
    <div>
      {loading && <span>Loading</span>}
      {error && <span>Error: {error.message}</span>}
      {data && (
        <ul>
          {data.map(todo => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

## Examples

[![Edit](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/umijs/use-api/tree/master/examples)

## API

```javascript
const {
  data,
  error,
  loading,
  run,
  params,
  cancel,
  refresh,
  stopPolling,
  mutate,
  history,
  // with pagination
  pagination,
  tableProps,
  sorter,
  filters
} = useAPI(service, {
  manual,
  refreshDeps,
  onSuccess,
  onError,
  formatResult,
  cacheKey,

  pollingInterval,
  pollingWhenHidden,

  fetchKey,

  refreshOnWindowFocus,
  focusTimespan,

  debounceInterval,
  throttleInterval,

  paginated,
  defaultPageSize
}); 
```

### Returns

* `data: undefined | any` 
  * service 返回的数据，默认为 `undefined`。
  * 如果有 `formatResult`, 则该数据为被格式化后的数据。

* `error: undefined | Error` 
  * service 抛出的异常，默认为 `undefined`。

* `loading: boolean` 
  * service 是否正在执行。

* `run: (...args: K) => Promise<T>`
  * 手动触发 service 执行，参数会传递给 service。
  * 返回值为 Promise，T 等于 data

* `params: any[]`
  * 当次执行的 service 的参数数组。比如你触发了 `run(1, 2, 3)`，则 params 等于 `[1, 2, 3]`

* `cancel: () => void`
  * 取消当前请求

* `refresh: () => void`
  * 使用上一次的 params，重新执行 service

* `stopPolling: () => void`
  * 停止轮询，在设置了 `options.pollingInterval` 时有效

* `mutate: (data) => void`
  * 直接修改 data，见 [例子]()

* `history` [类型](./src/types.ts#L23)
  * 默认情况下，新请求会覆盖旧请求。如果设置了 `fetchKey`，则可以实现多个请求并行，`history` 存储了多个请求的状态。参考 [例子]()

* `pagination` [类型](./src/types.ts#L87)
  * 分页数据及操作分页的方法。在 `options.paginated = true` 时有效。

* `tableProps` [类型](./src/types.ts#L96)
  * 适配 [antd Table](https://ant.design/components/table-cn/) 组件的数据结构，可以直接用在 Table 组件上，见 [例子]()。

* `sorter`
  * antd Table sorter，见 [例子](./examples/src/pages/antdTable/index.tsx)。

* `filters`
  * antd Table filters，见 [例子](./examples/src/pages/antdTable/index.tsx)。

### Options

所有的 Options 均是可选的。

* `refreshDeps: any[]` 
  * 在 `manual = false` 时，`refreshDeps` 变化，会触发 useAPI 重新执行。参考 [例子](./examples/src/pages/refreshDeps/index.tsx)
  * 在 `paginated = true` 的分页场景下，`refreshDeps` 变化，会初始化当前分页 `current` 至第一页。

* `manual: boolean`
  * 默认 `false`。 即在初始化时自动执行 service，参考 [例子](./examples/src/pages/index.tsx)
  * 如果设置为 `true`，则需要手动调用 `run` 触发执行，参考 [例子](./examples/src/pages/manual/index.tsx)

* `onSuccess: (data:any, params: any[]) => void`
  * service resolve 时触发，参数为 `data` 和 `params`, 参考 [例子](./examples/src/pages/manual/index.tsx)

* `onError: (error: Error, params: any[]) => void`
  * service 报错时触发，参数为 `error` 和 `params`。

* `fetchKey: (params: any[]) => string|number` 
  * 根据 params，获取当前请求的 key，设置之后，我们会在 `history` 中同时维护不同 `key` 值的请求状态，参考 [例子](./examples/src/pages/fetchKey/index.tsx)

* `cacheKey: string`
  * 请求唯一标识。如果设置了 `cacheKey`，我们会启用缓存机制。
  * 在缓存机制下，同样的请求我们会先返回缓存中的数据，同时会在背后发送新的请求，待新数据返回后，重新触发数据更新。
  * 缓存的的键值 `key` 为 `JSON.Stringify([cacheKey,...params,...refreshDeps])`
  * 参考 [例子](./examples/src/pages/cacheKey/index.tsx)
  
* `pollingInterval: number` 
  * 轮询间隔，单位毫秒。设置后，将进入轮询模式，定时触发 `run`。参考 [例子](./examples/src/pages/polling/index.tsx)

* `pollingWhenHidden: boolean`
  * 在页面隐藏时，是否继续轮询。默认为 `true`，即不会停止轮询。
  * 如果设置为 `true`, 在页面隐藏时会暂时停止轮询，页面重新显示时继续上次轮询。

* `refreshOnWindowFocus: boolean` 
  * 在屏幕重新获取焦点时，是否重新发起请求。默认为 `false`，即不会重新发起请求。
  * 如果设置为 `true`，在屏幕重新聚焦时，会重新发起请求。
  * 参考 [例子](./examples/src/pages/refreshOnWindowFocus/index.tsx)

* `focusTimespan: number`
  * 屏幕重新聚焦，如果每次都重新发起请求，不是很好，我们需要有一个时间间隔，在当前时间间隔内，不会重新发起请求。默认为 `5000ms`
  * 需要配置 `refreshOnWindowFocus` 使用。

* `debounceInterval: number`
  * 防抖间隔, 单位为毫秒，设置后，请求进入防抖模式。

* `throttleInterval：number`
  * 节流间隔, 单位为毫秒，设置后，请求进入节流模式。

* `formatResult: (response: any) => any`
  * 格式化请求结果，`onSuccess`, `data` 等参数均为格式化之后的数据。
  * 在分页场景下，格式化结果必须为 `{list: Item[], total: number}`。

* `paginated: boolean` 
  * 是否开启分页模式，默认为 `false`。
  * 如果设置为 `true`，则开启分页模式。在分页模式下，我们会自动管理 `current`、`pageSize`，同时会作为参数传递给 service。
  * 响应结果或 `formatResult` 结果必须为 `{list: Item[], total: number}`。

* `defaultPageSize: number`
  * 每页数据，默认为 `10`

### Todos

* [ ] staleTime: 在一定时间内，认为响应是新鲜的，不再去发送请求。
* [ ] loadMore: 加载更多数据，数据加载完会 append 到 `data.list` 上
* [ ] loadingMore: 是否正在加载更多中
* [ ] retry: 错误自动重试，设置重试次数 boolean/number
* [ ] retryDelay: 重试的时间间隔
* [ ] loadingTimeout: 超时时间，超时后触发 onLoadingSlow
* [ ] onLoadingSlow: 超时触发
* [ ] suspense
* [ ] initialData: 初始化 data
* [ ] loadingDelay
* [ ] mutate 接收函数

## License

[MIT](https://github.com/umijs/umi/blob/master/LICENSE)