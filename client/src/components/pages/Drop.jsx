import React from 'react';
import Select from "react-select"
import '../styling/drop.css'

export default function Drop(props){
    const myoptions = [
        {
            label: "Cardiologist",
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
        <div>
            <label>here is the dropdown</label>
            <Select
                styles={custom}
                isMulti
                options={myoptions}
                classNamePrefix="nick"
            />
        </div>
    );
}

//<input class="" autocapitalize="none" autocomplete="off" autocorrect="off" id="react-select-3-input" spellcheck="false" tabindex="0" type="text" aria-autocomplete="list" aria-expanded="true" aria-haspopup="true" aria-controls="react-select-3-listbox" aria-owns="react-select-3-listbox" role="combobox" value="" style="color: inherit; opacity: 1; width: 100%; grid-row-start: 1; grid-column-start: 2; grid-row-end: auto; grid-column-end: auto; font-family: inherit; font-size: inherit; font-style: inherit; font-variant-caps: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; min-width: 2px; border: 0px; margin: 0px; outline: 0px; padding: 0px; background-position: 0px center;"></input>
//<input class="" autocapitalize="none" autocomplete="off" autocorrect="off" id="react-select-3-input" spellcheck="false" tabindex="0" type="text" aria-autocomplete="list" aria-expanded="true" aria-haspopup="true" aria-controls="react-select-3-listbox" aria-owns="react-select-3-listbox" role="combobox" value="" style="color: inherit; opacity: 1; width: 100%; grid-row-start: 1; grid-column-start: 2; grid-row-end: auto; grid-column-end: auto; font-family: inherit; font-size: inherit; font-style: inherit; font-variant-caps: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; min-width: 2px; border: 0px; margin: 0px; outline: 0px; padding: 0px; background-position: 0px center;"></input>