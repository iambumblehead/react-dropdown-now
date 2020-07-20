import React, { Component } from 'react';
import Dropdown from '../src';

const options = ['one', 'two', 'three'];

class ControlledExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
    };
    this._onSelect = this._onSelect.bind(this);
  }

  _onSelect(option) {
    console.log('You selected ', option.label);
    this.setState({ selected: option });
  }

  render() {
    const selectedOption = this.state.selected;
    const placeHolderValue =
      typeof this.state.selected === 'string'
        ? this.state.selected
        : this.state.selected.label;

    return (
      <section>
        <h3>Controlled Example </h3>
        <Dropdown
          options={options}
          onChange={this._onSelect}
          value={selectedOption}
          placeholder="Select an option"
        />
        <Dropdown
          options={options}
          onChange={this._onSelect}
          value={selectedOption}
          placeholder="Select an option"
        />
        <div className="result">
          These dropdowns share the selected value
          <strong> {placeHolderValue} </strong>
        </div>
      </section>
    );
  }
}

export default ControlledExample;
