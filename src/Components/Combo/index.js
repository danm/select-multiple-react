import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { killStyle, Select, Listbox, Checkbox, SaveButton, RejectButton, Down } from './style.js';
class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKillMenu = this.handleKillMenu.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.alternateCheck = this.alternateCheck.bind(this);
    this.saveUpdate = this.saveUpdate.bind(this);
    this.destroyUpdate = this.destroyUpdate.bind(this);

    this.state = {
      options: props.options,
      temporaryOptions: props.options,
      value: 'Select',
    };
  }
  
  static getDerivedStateFromProps(nextProps, state) {
    state.options = JSON.parse(JSON.stringify(nextProps.options));
    state.temporaryOptions = JSON.parse(JSON.stringify(nextProps.options));
    return state;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible === false && this.props.visible === true) {
      const d = ReactDOM.findDOMNode(this);
      const all = Array.from(d.querySelectorAll('input'));
      all[0].focus();
    }
  }

  handleChange(e) {
    const i = this.state.temporaryOptions.findIndex(o => o.value === e.target.value);
    this.alternateCheck(i);
  }

  alternateCheck(i) {
    const temporaryOptions = this.state.temporaryOptions;
    temporaryOptions[i].checked = !temporaryOptions[i].checked;
    this.setState({
      temporaryOptions,
    });
  }

  saveUpdate() {
    this.ref.focus();
    const selected = this.state.temporaryOptions.filter(r=>r.checked);
    this.setState({
      value: `${selected.length} Selected`,
    })
    this.props.onChange(this.state.temporaryOptions);
  }

  destroyUpdate() {
    this.handleKillMenu();
    this.ref.focus();
  }

  handleClick() {
    if (this.props.visible === false) {
      this.props.onChange(this.state.temporaryOptions);
    } 
  }

  handleKillMenu() {
    this.props.onClick();
    this.setState({
      temporaryOptions: this.state.options,
    });
  }

  handleKeyDown(e) {
    e.preventDefault();
    if (this.props.visible === true && e.key === 'ArrowDown') {
      const d = ReactDOM.findDOMNode(this);
      const focused = d.querySelector(`input:focus`);
      const all = Array.from(d.querySelectorAll('input'));
      const x = all.findIndex(r => focused.name === r.name);
      if (x < all.length - 1) all[x + 1].focus();
    }

    if (this.props.visible === true && e.key === 'ArrowUp') {
      const d = ReactDOM.findDOMNode(this);
      const focused = d.querySelector(`input:focus`);
      const all = Array.from(d.querySelectorAll('input'));
      const x = all.findIndex(r => focused.name === r.name);
      if (x > 0) all[x - 1].focus();
    }

    if (this.props.visible === true && e.key === ' ') {
      const d = ReactDOM.findDOMNode(this);
      const focused = d.querySelector(`input:focus`);
      const all = Array.from(d.querySelectorAll('input'));
      const i = all.findIndex(r => focused.name === r.name);
      this.alternateCheck(i);
    }

    if (this.props.visible === true && e.key === 'Enter') {
      this.saveUpdate();
    }

    if (this.props.visible === false && e.key === 'Enter') {
      this.handleClick();
    }

    if (this.props.visible === true && e.key === 'Escape') {
      this.destroyUpdate();
    }
  }

  render() {
    const options = this.state.temporaryOptions.map((o) => {
      return (
        <Checkbox key={o.key}>
          <input className={ this.props.className } name={`check-${o.key}`} id={`check-${o.key}`} type="checkbox" value={ o.value } checked={ o.checked } onChange={ this.handleChange } />
          <label htmlFor={`check-${o.key}`}><span>{ o.label }</span></label>
        </Checkbox>
      );
    });
    return (
      <div style={{ display:'inline-block' }} tabIndex="0" ref={e=>this.ref=e} className={`${this.props.className}-container`} onKeyDown={ this.handleKeyDown }>
        { this.props.visible ? <div style={ killStyle } onClick={ this.handleKillMenu } /> : null }
        <Select role="combobox" aria-haspopup="listbox" aria-expanded={this.props.visible} style={{ display: 'flex', justifyContent: 'space-between', marginRight: '-4px' }} onClick={ this.handleClick }>
          <span style={{ flexgrow: '2' }}>{ this.state.value }</span>
          { this.props.visible ? null : <Down /> }
          { this.props.visible ? <Save yes={ this.saveUpdate } no={ this.destroyUpdate } /> : null }
        </Select>
        { this.props.visible ? <Listbox role="listbox">{ options }</Listbox> : null }
      </div>
    );
  }
}

const Save = (props) => {
  return (
    <div style={{ flexgrow: "1", marginTop: "-2px", marginRight: "-4px" }}>
      <SaveButton onClick={ props.yes } />
      <RejectButton onClick={ props.no } />
    </div>
  );
}

export default App;
