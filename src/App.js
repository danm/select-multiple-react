import React, { Component } from 'react';
import Combo from './Components/Combo';
import data from './menuData.json';

class App extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      menuVisible: false,
      menuValue: 'Select',
      menuOptions: data,
    };
  }

  handleClick() {
    this.setState({
      menuVisible: !this.state.menuVisible,
    })
  }

  handleChange(e) {
    this.setState({
      menuOptions: e,
      menuVisible: !this.state.menuVisible,
    });
  }

  render() {
    return (
      <div style={{height: 0, width: 0}}>
        <Combo
          visible={ this.state.menuVisible }
          value={ this.state.menuValue }
          options={ this.state.menuOptions }
          onClick={ this.handleClick }
          onChange={ this.handleChange }
          className='checkbox'
        />
        <div style={{ display: 'block', marginTop: '100px' }}>
          Selected: { this.state.menuOptions.filter(o=>o.checked).map(o=>o.value).join(' ')}
        </div>
        <div style={{ display: 'block', marginTop: '100px', width: '600px' }}>

          <p><strong>Mouse logic</strong></p>
          <p>Clicking on the select box activates the listbox and brings the first element into focus</p>
          <p>Clicking outside the listbox and select box acts as a save state action</p>
          <p>Clicking the tick in the select box acts as a save state action when the listbox is active</p>
          <p>Clicking outside the listbox and select box acts as a save state action</p>


          <p><strong>Keyboard logic</strong></p>
          
          <p>Enter - opens the listbox when it has focus</p>
          <p>Enter - Closes the listbox when it is active saving the state</p>
          <p>Escape - Closes the listbox when it is active ignoring changes</p>
          <p>Space - Checks the box that is focussed when the listbox is active</p>
          <p>Arrow up/down - Move to the next or previous checkbox when the listbox is active and focus is on a checkbox</p>

        </div>
      </div>
    );
  }
}

export default App;
