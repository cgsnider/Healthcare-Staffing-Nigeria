import React, { useState, useEffect, Component } from 'react';
import Select, { createFilter } from "react-select";
import {FixedSizeList as List} from 'react-window';
import AsyncSelect from 'react-select/async';
import { LoadingIndicatorProps } from 'react-select';
import '../styling/drop.css';
import RingLoader from 'react-spinners/RingLoader';
import PulseLoader from 'react-spinners/PulseLoader';
import CustomMenuList from './MenuList'

export function Drop(props){

    let myoptions;
    if (props.options){
        myoptions = props.options
    } else {
        myoptions = [
            {
                label: "All",
                value: "All",
            },
            {
                label: "Cardiologist1",
                value: "CA",
            },
            {
                label: "Cardiologist2",
                value: "CA2",
            },
            {
                label: "Cardiologist3",
                value: "CA3",
            },
        ]
    }
    
    
    const custom = {
        container: (provided, state) => ({
            ...provided,
        }),
        singleValue: (provided, state) => {
            const opacity=1;
            return {...provided, opacity}
        }
    }

    return (
        <div>
            <label htmlFor='posSelect'>{props.label}</label>
            <Select
                id='posSelect'
                styles={custom}
                options={myoptions}
                classNamePrefix="nick"
                onChange={(e) => props.setPosition(e)}
                placeholder={props.placeholder || "Choose..."}
                defaultValue={(props.initial)? {label: props.initial, value:''}:null}
            />
        </div>
    );
}

/**
 * 
 * async drop. use when dropdown options taken from resource
 */
export function Drop2(props) {

    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [Options, setOptions] = useState([]);

    useEffect( ()=> {
        let isMounted = true;
        if((Options.length===0 && inputValue===''))
            fetchOptions(isMounted);
        //console.log(Options)
        return () => {
            isMounted = false;
        };
    }, [])

    const fetchOptions = async(isMounted) => {
        try{
            let res = await fetch(`http://universities.hipolabs.com/search?name=`)
            let resJSON = await res.json();

            if(isMounted){
                setOptions(resJSON.map(item=> ({label: item.name, value: item.alpha_two_code})))
                //console.log(resJSON)
            }
        } catch(e) {
            console.error(e)
        }
    }

    const LoadingIndicator = () => {
        return (<RingLoader loading={true} size={20} height={1}/>);
    }

      // handle input change event
    const handleInputChange = value => {
        setValue(value);
    };
 
  // handle selection
    const handleChange = value => {
        console.log(value);
        setSelectedValue(value)
        props.setNewEducation(value.label)
        
    }

    const filterOptions = (inputValue) => {
        //console.log('options', Options);
        if(Options===null) return [];
        return Options.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
        
    }
    const promiseOptions = (inputValue) =>
        new Promise((resolve) => {
            setTimeout(()=>{
                resolve(filterOptions(inputValue));
            }, 1000)
    });
    const LoadingMessage = (props) => {
        return (
            <div style={props.getStyles('loadingMessage', props)}>
                <PulseLoader loading={true} >Loading</PulseLoader>
            </div>
        
        );
    }

    return (
        <AsyncSelect
            cacheOptions
            defaultOptions={true}
            value={selectedValue}
            loadOptions={promiseOptions}
            components={{ LoadingIndicator, LoadingMessage, CustomMenuList }}
            onInputChange={handleInputChange}
            onChange={handleChange}
            filterOption={createFilter({ ignoreAccents: false})}
            captureMenuScroll={false}
            placeholder={props.placeholder || "Select..."}
        />
        );

}

