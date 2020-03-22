import React, {Fragment, useState, useEffect, FC} from 'react';
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios'

import {defaultUrl} from '../config';

import '../styles/thread.css'

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


const Thread:FC<ThreadInterface> = (props: ThreadInterface) => {
    console.log(props);
    return (
        <div className='thread-wrapper' id={`thread-${props.count}`}>
        <div className='thread' id={`thread-${props.count}`}>
            <div className='thread-header'>
                <div className='username'>{props.username}</div>
                <div className='date'>{props.date}</div>
                <div className='count'>>>{props.count}</div>
            </div>
            <div className='thread-body'>
                <div className='thread-body-text'>
                    <p className='body-text'>
                        {props.text}
                    </p>
                </div>
                <div className='thread-replies replies'>
                    {props.replies!.map((reply) => 
                        (<span className='thread-reply reply' id={`reply=${reply}`} key={`reply=${reply}`}>
                            >>{reply}
                        </span>)
                    )}
                </div>
            </div>
        </div>
        </div>
    )
}

export default Thread;