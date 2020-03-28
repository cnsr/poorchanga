import React, {Fragment, useState, useEffect, FC} from 'react';
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios'

import {defaultUrl} from '../config';

import {File, ThreadInterface} from '../interfaces/post';

import '../styles/thread.css'

interface paramInterface {
    board: string
}

interface AdditivesThread extends ThreadInterface {
    isThread: boolean
}

const Thread:FC<AdditivesThread> = (props: AdditivesThread) => {

    const history = useHistory();
    
    const params = useParams<paramInterface>();

    const openThread = (count: number) => {
        if (props.isThread) history.push(`/${params.board}/${count}/`);
    }

    // console.log(props);
    return (
        <div className='thread-wrapper' id={`thread-${props.count}`}>
        <div className='thread' id={`thread-${props.count}`}>
            <div className='thread-header'>
                <div className='username'>{props.username}</div>
                <div className='date'>{props.date}</div>
                <div className='count' onClick={e => openThread(props.count)}>>>{props.count}</div>
                { props.oppost === true ? <div className='isOp'>OP</div> : null }
            </div>
            <div className='thread-body'>
                <div className='thread-body-text'>
                    <p className='body-text'>
                        {props.text}
                    </p>
                </div>
                { props.replies.length > 0 ?
                <div className='thread-replies replies'>
                    <span className='pre-reply'><i>Replies: </i></span>
                    {props.replies!.map((reply) => 
                        (<span className='thread-reply reply' id={`reply=${reply}`} key={`reply=${reply}`}>
                            >>{reply}
                        </span>)
                    )}
                </div> : null }
            </div>
        </div>
        </div>
    )
}

export default Thread;