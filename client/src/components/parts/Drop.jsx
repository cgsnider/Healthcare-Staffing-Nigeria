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
            width: 300,
        }),
        singleValue: (provided, state) => {
            const opacity=1;
            return {...provided, opacity}
        }
    }

    return (
        <div className='pl-4'>
            <label htmlFor='posSelect'>{props.label}</label>
            <Select
                id='posSelect'
                styles={custom}
                options={myoptions}
                classNamePrefix="nick"
                onChange={(e) => props.setPosition(e)}
            />
        </div>
    );
}

/**
 * 
 * async drop. use when dropdown options taken from resource
 */
export function Drop2(props) {
    //const [myOptions, setMyOptions] = useState({});
    /*let myoptions = [
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
    ];*/
    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [Options, setOptions] = useState([]);

    useEffect( ()=> {
        let isMounted = true;
        if((Options.length===0 && inputValue===''))
            fetchOptions(isMounted);
        console.log(Options)
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
                console.log(resJSON)
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
        setSelectedValue(value);
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

    /*const MenuList = (props) => {
        const height = 35;
        const { options, children, maxHeight, getValue } = props;
        const [value] = getValue();
        const initialOffset = options.indexOf(value) * height;
        return (    
            <List
                height={maxHeight}
                itemCount={children.length}
                itemSize={height}
                initialScrollOffset={initialOffset}
            >
            {({ index, style }) => <div style={style}>{children[index]}</div>}
            </List>
        );
    }*/

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

        />
        );

}

//<input class="" autocapitalize="none" autocomplete="off" autocorrect="off" id="react-select-3-input" spellcheck="false" tabindex="0" type="text" aria-autocomplete="list" aria-expanded="true" aria-haspopup="true" aria-controls="react-select-3-listbox" aria-owns="react-select-3-listbox" role="combobox" value="" style="color: inherit; opacity: 1; width: 100%; grid-row-start: 1; grid-column-start: 2; grid-row-end: auto; grid-column-end: auto; font-family: inherit; font-size: inherit; font-style: inherit; font-variant-caps: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; min-width: 2px; border: 0px; margin: 0px; outline: 0px; padding: 0px; background-position: 0px center;"></input>
//<input class="" autocapitalize="none" autocomplete="off" autocorrect="off" id="react-select-3-input" spellcheck="false" tabindex="0" type="text" aria-autocomplete="list" aria-expanded="true" aria-haspopup="true" aria-controls="react-select-3-listbox" aria-owns="react-select-3-listbox" role="combobox" value="" style="color: inherit; opacity: 1; width: 100%; grid-row-start: 1; grid-column-start: 2; grid-row-end: auto; grid-column-end: auto; font-family: inherit; font-size: inherit; font-style: inherit; font-variant-caps: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; min-width: 2px; border: 0px; margin: 0px; outline: 0px; padding: 0px; background-position: 0px center;"></input>