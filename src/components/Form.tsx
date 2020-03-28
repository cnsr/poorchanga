import React, {FC, useEffect, useState} from 'react';

import { observer } from 'mobx-react-lite';


const Form: FC<{}> = observer(() => {

    const [text, setText] = useState('');

    const bold = () => {
        wrap('**')
    }

    const wrap = (tag: string) => {
        let selection: string = window.getSelection()!.toString();
        if (selection) {
            // let text: string = (document.getElementById('input') as HTMLInputElement).value; // this should be selected from state
            let preformatted: Array<string> = text.split(selection);
            // replace with provided tag
            let formatted = `${tag}${selection}${tag}`;
            console.log(formatted);
            setText(preformatted.join(formatted))
        } else {
            let start: number = (document.getElementById('input') as HTMLInputElement).selectionStart!;
            let end: number = (document.getElementById('input') as HTMLInputElement).selectionEnd!;
            if (start === end) {
                let newText = text.substring(0, start) + tag + tag + text.substring(end, text.length);
                (document.getElementById('input') as HTMLInputElement).focus();
                (document.getElementById('input') as HTMLInputElement).selectionStart! = start - tag.length;
            setText(newText)
            }
        }
    }
    return (
        <div className='input-form'>
            <div className='controls'>
                <button className='control' onClick={bold}>B</button>
            </div>
            <div className='subcontrols'>

            </div>
            <textarea id='input' value={text} onChange={e => setText(e.target.value)}></textarea>
            <button>Post</button>
        </div>
    )
})

export default Form;