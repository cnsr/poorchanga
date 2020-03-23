// import { createStore } from "../stores/createStore"
import { connectReduxDevtools } from "mst-middlewares"
import {createContext, useContext} from 'react'

import {RootStoreModel, createStore} from './root'

connectReduxDevtools(require("remotedev"), createStore());

const StoreContext = createContext<RootStoreModel>({} as RootStoreModel);

export const useStore = () => useContext(StoreContext);

export const StoreProvider = StoreContext.Provider;

