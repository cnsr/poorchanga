import { types, Instance, getSnapshot } from "mobx-state-tree"
import {SettingsStore, SettingsModel } from './settingsStore'

export type RootStoreModel = Instance<typeof RootStore>;

export type RootStoreEnv = {
    settings: SettingsModel,
}

export const RootStore = types.model('RootStoreModel', {
    settings: SettingsStore,
})

export const createStore = (): RootStoreModel => {
    const settings: SettingsModel = SettingsStore.create()
    const env: RootStoreEnv = { settings };
    return RootStore.create({settings,}, env);
}

