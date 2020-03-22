import React, {Fragment, useState, useEffect, useCallback} from 'react';
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios'

import Thread from './Thread'
import '../styles/thread.css'

import {defaultUrl} from '../config';

interface BoardProps {
}

interface RouteParams {
    board: string
}

interface File {
    name: string
    original: string
    thumb: string
    filename: string
    filedata: string
}

interface ThreadInterface {
    replies: Array<number>,
    files: Array<File>,
    locked: boolean,
    roll: null
    infinite: false
    count: number
    oppost: boolean
    postcount: number
    username: string
    pinned: boolean
    op: boolean
    sage: boolean
    board: string
    countryname: string
    filecount: number
    date: string
    subject: string
    thread: null | string
    lastpost: string
    admin: boolean
    seal: boolean
    country: string | null
    trip: null | string
    banned: boolean
    text: string
}


const Main: React.FC<BoardProps> = (props) => {
    const board = useParams<RouteParams>().board;
    const history = useHistory();
    const [error, setError] = useState('');
    const boards: Array<string> = ['int', 'd', 'bans', 'kc'];
    const [pageSize, setPageSize] = useState(10);

    const [page, setPage] = useState(0);

    const perPage = (): number => {
        return page * pageSize;
    }

    const incrementPage = () => {
        if (Math.floor(threads!.length / pageSize) != page) setPage(page + 1)
    }

    const decrementPage = () => {
        if (page > 0) setPage(page - 1)
    }

    const [threads, setThreads] = useState<Array<ThreadInterface> | null>([]);

    const [isLoaded, setIsLoaded] = useState(false);

    const loadData = () => {
        if (!boards.includes(board)) {
            history.push('/error/404')
        }
        axios.get(`${defaultUrl}${board}/json/`).then(resp => {
            setThreads(resp.data)
            setIsLoaded(true);
            // console.log(resp.data[0])
        })
    }

    useEffect(() => {
        loadData();
    }, [])

    return (<Fragment>
        <span>current board: {board}</span>
        <span onClick={loadData}>REFRESH</span>
        <div className='threads'>
            { isLoaded ? threads!.slice(perPage(), perPage() + pageSize).map((thread) => {
                // let props = thread as ThreadInterface;
                return <Thread key={thread.count} {...thread}/>;
            }) : <span>"loading"</span>}
        </div>
        <div className='pagination'>
            <span onClick={decrementPage}>⮘</span>
            <span>{page}</span>
            <span onClick={incrementPage}>⮚</span>
        </div>
    </Fragment>)
}

export default Main;