import { useRef } from 'react';
import { BaseOptions, BasePaginatedOptions, BaseResult, LoadMoreFormatReturn, LoadMoreOptions, LoadMoreOptionsWithFormat, LoadMoreParams, LoadMoreResult, OptionsWithFormat, PaginatedFormatReturn, PaginatedOptionsWithFormat, PaginatedParams, PaginatedResult } from './types';
import useAsync from './useAsync';
import usePaginated from './usePaginated';
import useLoadMore from './useLoadMore';

function useAPI<R, P extends any[], U, UU extends U = any>(
  service: (...args: P) => Promise<R>,
  options: OptionsWithFormat<R, P, U, UU>
): BaseResult<U, P>
function useAPI<R, P extends any[]>(
  service: (...args: P) => Promise<R>,
  options?: BaseOptions<R, P>
): BaseResult<R, P>
function useAPI<R, Item, U extends Item = any>(
  service: (...params: LoadMoreParams) => Promise<R>,
  options: LoadMoreOptionsWithFormat<R, Item, U>
): LoadMoreResult<Item>
function useAPI<R, Item, U extends Item = any>(
  service: (...params: LoadMoreParams) => Promise<LoadMoreFormatReturn<Item>>,
  options: LoadMoreOptions<U>
): LoadMoreResult<Item>
function useAPI<R, Item, U extends Item = any>(
  service: (...params: PaginatedParams<U>) => Promise<R>,
  options: PaginatedOptionsWithFormat<R, Item, U>
): PaginatedResult<Item>
function useAPI<R, Item, U extends Item = any>(
  service: (...params: PaginatedParams<U>) => Promise<PaginatedFormatReturn<Item>>,
  options: BasePaginatedOptions<U>
): PaginatedResult<Item>
function useAPI(service: any, options: any = {}) {

  const { paginated, loadMore } = options;

  const paginatedRef = useRef(paginated);
  const loadMoreRef = useRef(loadMore);

  if (paginatedRef.current !== paginated) {
    throw Error('You should not modify this paginated of options');
  }

  if (loadMoreRef.current !== loadMore) {
    throw Error('You should not modify this loadMore of options');
  }

  paginatedRef.current = paginated;

  if (loadMore) {
    return useLoadMore(service, options);
  } else if (paginated) {
    return usePaginated(service, options);
  } else {
    return useAsync(service, options);
  }
}

export {
  useAsync,
  usePaginated,
  useLoadMore
};

export default useAPI;
