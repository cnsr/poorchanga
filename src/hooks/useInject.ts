import {RootStoreModel} from '../store/root';
import {useStore} from '../store/store';

export type MapStore<T> = (store: RootStoreModel) => T

const useInject = <T>(mapStore: MapStore<T>) => {
  const store = useStore()
  return mapStore(store)
}

export default useInject;