import React, { FC, Fragment, useState, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import {onSnapshot} from 'mobx-state-tree';
import {RootStoreModel} from '../store/root';
import useInject from "../hooks/useInject";

import '../styles/settings.css'

const mapStore = (rootStore: RootStoreModel) => ({settings: rootStore.settings});

const Settings:FC<{}> = observer(() => {
    const { settings } = useInject(mapStore);

    const [display, setDisplay] = useState(false);
    const [username, setUsername] = useState('');
    const [perPage, setPerPage] = useState(10);

    useEffect(() => {
        // initialize store by either getting latest snapshot from localStorage
        settings.create();
        setUsername(settings.username)
        setPerPage(settings.pageSize)
    }, [])


    const toggleDisplay = () => {
        setDisplay(!display);
    }

    const performSave = () => {
        settings.setUsername(username)
        settings.setPageSize(perPage)
    }

    onSnapshot(settings, settings.update);

    return (<Fragment>
        <button onClick={toggleDisplay}>Settings</button>
        { display ? <Fragment>
            <div className='settings'>
                <label htmlFor='settings-username'>Username</label>
                <input type='text' id='settings-username' defaultValue={username} onChange={e => setUsername(e.target.value)}/>
                <label htmlFor='settings-perpage'>Posts per page</label><span>{perPage}</span>
                <input type='range' id='settings-perpage' min={5} max={100} step={5} defaultValue={perPage} onChange={e => setPerPage(parseInt(e.target.value))}/>
                <button className='settings-save' onClick={performSave}>Save</button>
            </div>
        </Fragment> : null}
    </Fragment>)
})

export default Settings;