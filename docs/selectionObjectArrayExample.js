import React, { Component } from 'react';
import Selection from '../src/Selection';

class SelectionObjectArrayExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: { value: 'two', label: 'Two' },
    };
    this._onSelect = this._onSelect.bind(this);
  }

  _onSelect(option) {
    console.log('You selected ', option.label);
    this.setState({ selected: option });
  }

  render() {
    const { toggleMenuClassName, toggleOptionsClassName } = this.state;

    const options = [
      { value: 'one', label: 'One' },
      {
        value: 'two',
        label: 'Two',
        className: toggleOptionsClassName && 'my-custom-class',
      },
      {
        type: 'group',
        name: 'group1',
        items: [
          {
            value: 'three',
            label: 'Three',
            className: toggleOptionsClassName && 'my-custom-class',
          },
          { value: 'four', label: 'Four' },
        ],
      },
      {
        type: 'group',
        name: 'group2',
        items: [
          { value: 'five', label: 'Five' },
          { value: 'six', label: 'Six' },
        ],
      },
    ];

    const defaultOption = this.state.selected;
    const placeHolderValue =
      typeof this.state.selected === 'string'
        ? this.state.selected
        : this.state.selected.label;

    return (
      <section>
        <h3>Using selection outside the dropdown</h3>
        <div className="buttons">
          <button
            onClick={() =>
              this.setState({ toggleMenuClassName: !toggleMenuClassName })
            }
          >
            Toggle menu custom class
          </button>
          <button
            onClick={() =>
              this.setState({ toggleOptionsClassName: !toggleOptionsClassName })
            }
          >
            Toggle options custom class
          </button>
        </div>
        <Selection
          options={options}
          onChange={this._onSelect}
          value={defaultOption}
          className={toggleMenuClassName ? 'my-custom-class' : ''}
        />
        <div className="result">
          You selected
          <strong> {placeHolderValue} </strong>
        </div>
        <section>
          <h4>Options: </h4>
          <div className="code">
            <pre>
              {`
// import { Selection } from 'react-dropdown-now';

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two'${
    toggleOptionsClassName ? ", classNames 'my-custom-class'" : ''
  } },
  {
    type: 'group', name: 'group1', items: [
      { value: 'three', label: 'Three' },
      { value: 'four', label: 'Four'${
        toggleOptionsClassName ? ", className: 'my-custom-class'" : ''
      } }
    ]
  },
  {
    type: 'group', name: 'group2', items: [
      { value: 'five', label: 'Five' },
      { value: 'six', label: 'Six' }
    ]
  }
]
`}
            </pre>
          </div>
        </section>
      </section>
    );
  }
}

export default SelectionObjectArrayExample;
