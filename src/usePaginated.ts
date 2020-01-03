import { PaginationConfig } from 'antd/lib/pagination';
import { SorterResult } from 'antd/lib/table';
import { useCallback, useMemo, useRef, useEffect } from 'react';
import { BasePaginatedOptions, PaginatedFormatReturn, PaginatedOptionsWithFormat, PaginatedParams, PaginatedResult } from './types';
import useAsync from './useAsync';
import useUpdateEffect from './utils/useUpdateEffect';

const isEqual = require('lodash.isequal');

function usePaginated<R, Item, U extends Item = any>(
  service: (...p: PaginatedParams<U>) => Promise<R>,
  options: PaginatedOptionsWithFormat<R, Item, U>
): PaginatedResult<Item>
function usePaginated<R, Item, U extends Item = any>(
  service: (...p: PaginatedParams<U>) => Promise<PaginatedFormatReturn<Item>>,
  options: BasePaginatedOptions<U>
): PaginatedResult<Item>
function usePaginated<R, Item, U extends Item = any>(
  service: (...p: PaginatedParams<U>) => Promise<R>,
  options: BasePaginatedOptions<U> | PaginatedOptionsWithFormat<R, Item, U>
) {

  const {
    paginated,
    defaultPageSize = 10,
    refreshDeps = [],
    fetchKey,
    ...restOptions
  } = options;

  useEffect(() => {
    if (fetchKey) {
      console.warn(`useAPI pagination's fetchKey will not work!`);
    }
  }, []);

  const { data, params, run, loading, ...rest } = useAsync(
    service,
    {
      ...restOptions as any,
      defaultParams: [{
        current: 1,
        pageSize: defaultPageSize
      }]
    });

  const {
    current = 1,
    pageSize = defaultPageSize,
    sorter = {},
    filters = {}
  } = params && params[0] ? params[0] : ({} as any);

  // 只改变 pagination，其他参数原样传递
  const runChangePaination = useCallback((paginationParams) => {
    const [oldPaginationParams, ...rest] = params;
    run({
      ...oldPaginationParams,
      ...paginationParams,
    }, ...rest)
  }, [run, params]);

  const total = data?.total || 0;
  const totalPage = useMemo(() => Math.ceil(total / pageSize), [pageSize, total]);


  const onChange = useCallback(
    (c: number, p: number) => {
      let toCurrent = c <= 0 ? 1 : c;
      const toPageSize = p <= 0 ? 1 : p;

      const tempTotalPage = Math.ceil(total / toPageSize);
      if (toCurrent > tempTotalPage) {
        toCurrent = tempTotalPage;
      }
      runChangePaination({
        current: c,
        pageSize: p
      });
    },
    [total, runChangePaination],
  );

  const changeCurrent = useCallback(
    (c: number) => {
      onChange(c, pageSize);
    },
    [onChange, pageSize],
  );

  const changePageSize = useCallback(
    (p: number) => {
      onChange(current, p);
    },
    [onChange, current],
  );

  const changeCurrentRef = useRef(changeCurrent);
  changeCurrentRef.current = changeCurrent;
  /* 分页场景下，如果 refreshDeps 变化，重置分页 */
  useUpdateEffect(() => {
    /* 只有自动执行的场景， refreshDeps 才有效 */
    if (!options.manual) {
      changeCurrentRef.current(1);
    }
  }, [...refreshDeps]);

  // 表格翻页 排序 筛选等
  const changeTable = useCallback(
    (
      p: PaginationConfig,
      f?: Record<keyof U, string[]>,
      s?: SorterResult<U>,
    ) => {
      // antd table 的初始状态 filter 带有 null 字段，需要先去除后再比较
      const realFilter = { ...f };
      Object.entries(realFilter).forEach(item => {
        if (item[1] === null) {
          delete (realFilter as Object)[item[0] as keyof Object];
        }
      });

      /* 如果 filter，或者 sort 变化，就初始化 current */
      const needReload =
        !isEqual(realFilter, filters) ||
        s?.field !== sorter?.field ||
        s?.order !== sorter?.order;

      runChangePaination({
        current: needReload ? 1 : (p.current || 1),
        pageSize: p.pageSize || defaultPageSize,
        filters: f,
        sorter: s,
      });
    },
    [filters, sorter, runChangePaination],
  );

  return {
    loading,
    data,
    params,
    run,
    pagination: {
      current,
      pageSize,
      total,
      totalPage,
      onChange,
      changeCurrent,
      changePageSize,
    },
    tableProps: {
      dataSource: data?.list || [],
      loading,
      onChange: changeTable,
      pagination: {
        current,
        pageSize,
        total,
      },
    },
    sorter,
    filters,
    ...rest
  } as PaginatedResult<U>
}

export default usePaginated;