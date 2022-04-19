import React, { useRef, useState, useEffect } from 'react'

import { Editor } from '@tinymce/tinymce-react';
import ReactHtmlParser from 'react-html-parser';
import { Drop } from '../../parts/Drop';
import { useNavigate } from 'react-router-dom';
import { getCategories, postJobPosting, getProfileData } from '../../../hooks/server';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
export default function CreatePosting(props) {

    useEffect( () => {
        let isMounted = true;
        fetchCategories(isMounted);
        fetchverification(isMounted);
        return()=> {
            isMounted=false;
        }
    }, []);

    

    const editorRef = useRef(null);

    const [categories, setCategories] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState({label: 'Cardiology', value: 'cardiology'});
    const [formData, setFormData] = useState({Title: '', Salary: 0, Descript: '', Slots: 1, Category: '', Shifts: 1});
    const [verification, setVerification] = useState(0);
    const navigate = useNavigate();

    const fetchCategories = async(isMounted) => {
        let items = await getCategories()
        .catch(err=>{console.error(err);})
        if (isMounted) {
            console.log(items);
            items[0].push({Category:'Other'})
            setCategories(items[0].map(cat => {
                return ({
                    label: cat.Category,
                    value: cat.Category
                })
            }), console.log(categories))
        }
        else console.log('aborted setCategories on unmounted component')
    }

    const fetchverification = async(isMounted) => {
        const data = await getProfileData()
        .catch(err=>{console.error(err);})
        if (isMounted) {
            setVerification(data[0][0].Verified==2?true:false, console.log(verification));
        }

    }

    const log = () => {
        if (editorRef.current) {
            setFormData({...formData, Descript: editorRef.current.getContent()});
            setFormData({...formData, Category: selectedCategory});
        }
    };

    //navigate back to home page
    const cancel = (e) => {
        e.preventDefault();
        navigate('/');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({...formData, Descript: editorRef.current.getContent(), Category: selectedCategory.label});
        postJobPosting({...formData, Descript: editorRef.current.getContent(), Category: selectedCategory.label})
        .catch(err=>{console.error(err);});
    }

    //remove whitespace from beginning and end of string and capitalize first letter of each word
    const formatString = (str) => {
        return str.trim().split(/\s+/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }


    return (
        <>
        <div className='mx-5'>
            {/*<div>Create posting</div>*/}
            {(!verification)?
            <div className='border mt-2 rounded bg-red-200'>
                <div className='pl-5 py-2'>
                    <FontAwesomeIcon icon={faCircleExclamation} size='2x'/>
                    <div className='pl-4 inline text-xl text-semibold'> Your account is not verified</div>
                    <div className='pl-12'>Your account must be verified to create job listings. 
                    You can apply for verification on your 
                    <span className='text-blue-600 underline hover:cursor-pointer' onClick={(e)=>navigate('/facility')}>profile page</span>.
                    If you have already submitted for verification, you can view your status on your Profile page while a member of our team 
                    reviews your profile for verification
                    </div>

                </div>
            </div>
            :
            <></>
            }
            <form onSubmit={handleSubmit} key={'1'}>
                
                <div className='form-element block py-3'>
                    <div className='left-side w-1/12 inline-block text-lg float-left text-right pr-3 font-bold text-[#777] overflow-x-auto'>Title</div>
                    <div className='right-side w-8/12 inline-block border-2'>
                        <input  type='text' name='jobTitle' id='jobTitle' className='w-full leading-3 p-1 rounded'  disabled={!verification} value={formData.Title} onInput={e=>setFormData({...formData, Title: e.target.value})} onBlur={e=>setFormData({...formData, Title: formatString(formData.Title)})} required/>

                    </div>
                </div>
                

                <div className='form-element block py-3'>
                    <div className='left-side w-1/12 inline-block text-lg float-left text-right pr-3 font-bold text-[#777] overflow-x-auto'>Salary</div>
                    <div className='right-side w-8/12 inline-block'>
                        <input type='number' name='salary' id='salary' className='w-2/12 leading-3 p-1 rounded' min='0' step='any' disabled={!verification} value={formData.Salary} onInput={e=>setFormData({...formData, Salary: e.target.value})} required/>
                    </div>
                </div>
                
                <div className='form-element block py-3'>
                    <div className='left-side w-1/12 inline-block text-lg float-left text-right pr-3 font-bold text-[#777] overflow-x-auto'>Description</div>
                    <div className='right-side w-8/12 inline-block'>

                        <Editor
                        disabled={!verification}
                        apiKey='n7yht7pqtyj6b2zgy4pspu604122cie6snn96p044m2vi9fu'
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue="<p>initial Job Description.</p>"
                        init={{
                        height: 250,
                        width: '100%',
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
                        images_file_types:'jpg',
                        
                        }}
                        />
                    </div>
                </div>
                
                <div className='form-element block py-3'>
                    <div className='left-side w-1/12 inline-block text-lg float-left text-right pr-3 font-bold text-[#777] overflow-x-auto'>Slots</div>
                    <div className='right-side w-8/12 inline-block'>
                        <input type='number' name='slots' id='slots' disabled={!verification} className='w-1/12 leading-3 p-1 rounded ' min='1' step='1' value={formData.Slots} onInput={e=>setFormData({...formData, Slots: e.target.value})} required/>

                    </div>
                </div>

                <div className='form-element block py-3'>
                    <div className='left-side w-1/12 inline-block text-lg float-left text-right pr-3 font-bold text-[#777] overflow-x-auto'>Category</div>
                    <div className='right-side w-auto inline-block'>
                        <Drop options={categories} initial='Cardiology' setPosition={setSelectedCategory}/>
                    </div>
                </div>

                <div className='form-element block py-3'>
                    <div className='left-side w-1/12 inline-block text-lg float-left text-right pr-3 font-bold text-[#777] overflow-x-auto'>Shifts</div>
                    <div className='right-side w-8/12 inline-block'>
                        <input type='number' name='shifts' disabled={!verification} id='shifts' className='w-1/12 leading-3 p-1 rounded' min='1' step='1' value={formData.Shifts} onInput={e=>setFormData({...formData, Shifts: e.target.value})}/>

                    </div>
                </div>

                <div className='form-element block py-3'>
                    <div className='left-side w-1/12 inline-block text-lg float-left text-right pr-3 font-bold text-[#777] overflow-x-auto'>Visibility</div>
                    <div className='right-side w-8/12 inline-block'>
                        {/**set values to whatever values represent active or not in db */}
                        <input type="radio" id="visChoice1"
                        name="visibility" value="1" checked disabled={!verification}
                        onChange={e=>setFormData({...formData, Visibility: e.target.value})}/>
                        <label htmlFor="visChoice1" className='pr-4 pl-2 font-bold'>Active</label>

                        <input type="radio" id="visChoice2"
                        name="visibility" value="2" disabled={!verification}
                        onChange={e=>{setFormData({...formData, Visibility: e.target.value})}}/>
                        <label htmlFor="visChoice2" className='pr-4 pl-2 font-bold'>Hidden</label>

                    </div>
                </div>
                <div className='form-element block py-3'>
                    <div className='h-1 left-side w-1/12 inline-block text-lg float-left text-right pr-3 font-bold text-[#777] overflow-x-hidden '></div>
                    <div className='right-side w-8/12 inline-block'>
                        <button onClick={log} disabled={!verification} className='border border-b-gray-800 border-slate-500 py-1 px-4 mb-10 w-auto mr-1 bg-cmg-mid text-slate-100 rounded'>Create Posting</button>
                        <button onClick={cancel} className='border border-b-gray-800 border-slat-500 py-1 px-2 mb-10 w-auto ml-1 bg-red-600 text-slate-200 rounded'>Cancel</button>

                    </div>
                </div>
            </form>
            
        </div>
        </>
    );
}