import React, {Fragment, useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";

const Main: React.FC = () => {
    const history = useHistory();
    const [to, setTo] = useState('Poorchanga');
    const boards: Array<string> = ['int', 'd', 'bans', 'kc'];
    const [board, setBoard] = useState('');

    const handleChangeBoard = (board: string) => {
        setBoard(board);
        history.push(`/${board}/`)
    }

    return (<Fragment>
        <div className='welcome'>Welcome to {to}</div>
        <select value={board} defaultValue={board} onChange={(e) => handleChangeBoard(e.target.value)}>
            <option value=''></option>
            {boards.map(b => (<option key={b} value={b}>{b}</option>))}
        </select>
    </Fragment>)
}

export default Main;