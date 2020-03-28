import React, {FC, useState, useEffect, Fragment} from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios'
import {defaultUrl} from '../config';

import Thread from './Thread';

import {File, ThreadInterface as PostInterface} from '../interfaces/post';

interface ThreadProps {
    id: number
}

interface paramInterface {
    board: string
    count: string
}

const OpenedThread: FC<ThreadProps> = observer((id) => {

    // const [oppost, setOppost] = useState<PostInterface | null>()
    const params = useParams<paramInterface>();
    const [posts, setPosts] = useState<Array<PostInterface> | null>()

    useEffect(() => {
        axios.get(`${defaultUrl}/${params.board}/thread/${params.count}/json`).then(response => {
            if (response.status >= 200 && response.status < 400) {
                setPosts(response.data);
            } else {
                console.log('error')
            }
        })
    }, []);

    // useEffect(() => {
    //     let oppostArray = posts?.filter((post) => post.oppost)
    //     if (oppostArray)
    //         setOppost(oppostArray[0])
    // }, [posts]);

    return (<Fragment>
        <span>Thread</span>
        { posts ? <Fragment>
        <div>
            {posts!.map((post, id) => {
                return <Thread key={post.count} {...{...post, isThread: false}}/>
            })}
        </div>
        </Fragment> : null }
    </Fragment>)
})

export default OpenedThread;