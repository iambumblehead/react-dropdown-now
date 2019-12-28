import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import FlatArrayExample from './flatArrayExample';
import ObjectArrayExample from './objectArrayExample';
import ZeroValObjectArrayExample from './zeroValObjectArrayExample';
import CustomArrowExample from './customArrowExample';

const reactDropdownNowUrl = '//github.com/iambumblehead/react-dropdown-now';
const reactDropdownUrl = '//github.com/fraserxu/react-dropdown';

class App extends Component {
  render () {
    return (
      <div>
        <header>
          <h2>
            <a href={reactDropdownNowUrl}>React Dropdown Now</a>
          </h2>
        </header>
        <section className='description'>
          <p>
            Simple Dropdown component for React,
            forked from <a href={reactDropdownUrl}>react-dropdown</a>
          </p>
          <div className='code'>
            <pre>
              { '$ npm install react-dropdown --save' }
            </pre>
          </div>
        </section>

        <section>
          <h3>Examples: </h3>
          <h4>Usage: </h4>
          <div className='code'>
            <pre>
              {`
<Dropdown
  options={options}
  onChange={this._onSelect}
  value={defaultOption}
  placeholder="Select an option" />
              `}
            </pre>
          </div>
        </section>

        <FlatArrayExample />
        <ObjectArrayExample />
        <ZeroValObjectArrayExample />
        <CustomArrowExample />

        <section>
          <h3>License: MIT</h3>
        </section>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
