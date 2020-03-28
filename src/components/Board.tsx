import React, {Fragment, useState, useEffect, useCallback} from 'react';
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios'
import { observer } from "mobx-react-lite";
import {onSnapshot} from 'mobx-state-tree';
import {RootStoreModel} from '../store/root';
import useInject from "../hooks/useInject";

import Thread from './Thread';
import Form from './Form';
import '../styles/thread.css';

import {File, ThreadInterface} from '../interfaces/post';

import {defaultUrl} from '../config';

const mapStore = (rootStore: RootStoreModel) => ({settings: rootStore.settings});

interface BoardProps {
}

interface RouteParams {
    board: string
}


const Main: React.FC<BoardProps> = observer((props) => {
    const { settings } = useInject(mapStore);

    const board = useParams<RouteParams>().board;
    const history = useHistory();
    const [error, setError] = useState('');
    const boards: Array<string> = ['int', 'd', 'bans', 'kc'];
    const [pageSize, setPageSize] = useState(10);

    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(1);

    const changePageSize = () => {
        setPageSize(settings.pageSize);
        if (threads) setPages(totalPages(threads.length))
    }

    useEffect(() => {
        if (page > pages) setPage(pages);
    }, [pages]);

    const [threads, setThreads] = useState<Array<ThreadInterface> | null>([]);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        changePageSize()
    }, [])


    onSnapshot(settings, changePageSize)

    
    const perPage = (): number => {
        return page * pageSize;
    }

    const totalPages = (th: number) => Math.floor(th / settings.pageSize);


    const incrementPage = () => {
        if (pages != page) setPage(page + 1)
    }

    const decrementPage = () => {
        if (page > 0) setPage(page - 1)
    }


    const loadData = () => {
        if (!boards.includes(board)) {
            history.push('/error/404')
        }
        axios.get(`${defaultUrl}${board}/json/`).then(resp => {
            setThreads(resp.data)
            setIsLoaded(true);
            setPages(totalPages(resp.data.length))
            // console.log(resp.data[0])
        })
    }

    useEffect(() => {
        loadData();
    }, [])

    return (<Fragment>
        <span>current board: {board}</span>
        <span onClick={loadData}>REFRESH</span>
        <Form />
        <div className='threads'>
            { isLoaded ? threads!.slice(perPage(), perPage() + pageSize).map((thread) => {
                // let props = thread as ThreadInterface;
                return <Thread key={thread.count} {...{...thread, isThread: true}}/>;
            }) : <span>"loading"</span>}
        </div>
        <div className='pagination'>
            { pages ? <Fragment>
                <span className={ page === 0 ? 'pager-disabled pager' : 'pager' } onClick={decrementPage}>⮘</span>
                {Array.from({length: pages + 1}, (x, i) => i).map(p => {
                    if (p !== page) return <span key={p} className='page-btn' onClick={() => setPage(p)}>{p}</span>
                    else return <span key={p} className='page-btn page-active'>{page}</span>
                })}
                <span className={ page === pages ? 'pager-disabled pager': 'pager' } onClick={incrementPage}>⮚</span>
            </Fragment> : null }
        </div>
    </Fragment>)
})

export default Main;