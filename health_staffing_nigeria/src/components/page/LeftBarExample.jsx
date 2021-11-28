import React from "react";
import './styling/LeftContainer.css';


export default class Checkbox extends React.Component {
    checkboxState = {
        isChecked: false,
    };
    
    checkboxChangeOnToggle = () => {
        const { filter, checkboxChangeHandler } = this.props;
        this.setState(( isChecked ) => (
            {
                isChecked: !isChecked,
            }
        ));
        checkboxChangeHandler(filter);
    };
    
    render() {
        const { filter } = this.props;
        const { isChecked } = this.checkboxState;
    
        return (
            <div className="checkbox">
                <label>
                    <input
                        type="checkbox"
                        value={filter}
                        state={isChecked}
                        onChange={this.checkboxChangeOnToggle}
                    />
                {filter}
                </label>
            </div>
        );
    }
};

    
  

export class LeftBarExampleBuilder {
    constructor() {
        this.filter_names = [
            'Position A-Z',
            'Location A-Z',
            'Highest Pay',
            'Lowest Pay',
            'Highest Hours',
            'Lowest Hours',
        ]; // Add any other filter names for the checkboxes here if you like

        this.selectedCheckboxes = new Set();

        this.toggleCheckbox = filter => {
            if (this.selectedCheckboxes.has(filter)) {
              this.selectedCheckboxes.delete(filter);
            } else {
              this.selectedCheckboxes.add(filter);
            }
        };

        this.createCheckbox = filter => (
            <Checkbox filter={filter} key={filter} 
                checkboxChangeHandler={this.toggleCheckbox}            
            />
        );
        
        this.createCheckboxes = () => (
            this.filter_names.map(this.createCheckbox)
        );
    }

    getFilterList() {
        return this.filter_names
    }

    toJSX() {
        return (
            <div className="container">
                <label> Sort: </label>
                <form> {this.createCheckboxes()} </form>
              </div>
        );
    }

    toString() {
        return `List of Filters: ${this.filter_names}`;
    }    
};