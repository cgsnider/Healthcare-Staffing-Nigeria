import React, { useRef, useState } from 'react'

import { Editor } from '@tinymce/tinymce-react';
import ReactHtmlParser from 'react-html-parser';
export default function CreatePosting(props) {
    const editorRef = useRef(null);
    const [desc, setDesc] = useState(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const FormElement = (props) => {
        return (
            <div className='my-5'>
            <label>
                {props.label}
                {props.children}
            </label>
            
            </div>
        );
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <>
        <div className='mx-5'>
            <div>Create posting</div>
            <form onSubmit={handleSubmit}>
                <FormElement label="Title">
                    <input type='text' />
                </FormElement>
                <FormElement>
                    <Editor
                    apiKey='n7yht7pqtyj6b2zgy4pspu604122cie6snn96p044m2vi9fu'
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue="<p>This is the initial content of the editor.</p>"
                    init={{
                    height: 250,
                    width: 1000,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link',
                        'searchreplace',
                        'insertdatetime table help'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | link insertdatetime |alignleft aligncenter ' +
                    'alignright alignjustify | table bullist numlist outdent indent | ' +
                    'removeformat | searchreplace | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    images_file_types:'jpg'
                    }}
                />
              </FormElement>
                    <button onClick={log}>click</button>
            </form>
            
        </div>
        </>
    );
}