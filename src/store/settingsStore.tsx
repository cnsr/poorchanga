import {types, getSnapshot, applySnapshot, getEnv, Instance, cast} from 'mobx-state-tree';

import { RootStoreEnv } from './root';

export const SettingsStore = types.model('SettingsStore',
    {
        username: types.optional(types.string, "Pernd"),
        pageSize: types.optional(types.number, 10),
        userPosts: types.optional(types.array(types.number), []),
    })
    .actions(self => ({
        setUsername(username: string) {
            self.username = username;
        },
        setPageSize(pageSize: number) {
            if (pageSize >= 5 && pageSize <= 100)
                self.pageSize = pageSize;
        },
        read() {
            const env = getEnv<RootStoreEnv>(self);
        },
        create() {
            let snapshot = getSnapshot(self);
            let existingSettings = localStorage.getItem('settings');
            console.log(snapshot, JSON.stringify(snapshot));
            if (!existingSettings) {
                self.username = 'Pernd';
                self.pageSize = 10;
                self.userPosts = cast([]);
                localStorage.setItem('settings', JSON.stringify(snapshot));
                console.log('CREATED')
            } else {
                snapshot = JSON.parse(existingSettings);
                console.log('UPDATED', snapshot)
                applySnapshot(self, snapshot)
                
            }
        },
        update() {
            let snapshot = getSnapshot(self);
            localStorage.setItem('settings', JSON.stringify(snapshot));
        }
    }))


export type SettingsModel = Instance<typeof SettingsStore>;