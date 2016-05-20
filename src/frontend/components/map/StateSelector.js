import React from 'react';
import { Component } from 'react';

import { connect } from 'react-redux';

import { selectState } from '../../actions/index';
import { bindActionCreators } from 'redux';

class StateSelector extends Component {
  constructor(props) {
    super(props);

    this.statesOnChange = this.statesOnChange.bind(this);
  }

  statesOnChange(event) {
    // console.log(event.target);
    // console.log(event.target.value);

    let value = event.target.value;
    let selectedState = this.props.states.filter((state) => { return state.abbreviation == value})[0];

    // console.log();
    this.props.selectState(selectedState);
  }

  buildSelect() {
    return this.props.states.map((stateItem) => {
                        return (<option key={stateItem.abbreviation}
                                  value={stateItem.abbreviation}>{stateItem.name}</option>)
                        // return {
                        //   value: stateItem.abbreviation,
                        //   text: stateItem.name,
                        //   label: stateItem.name,
                        //   static: true
                        // };

                      });
  }

  render() {
    return (

      <div className="state-picker">
        <div className="row">
          <div className='col-xs-8'></div>
          <div className='col-xs-4 text-right'>


            <form className='form-inline'>
              <div className='input-group'>
                <select id="states" className="form-control" name="states" onChange={this.statesOnChange}>
                  <option>Select State...</option>
                  { this.buildSelect() }
                </select>
              </div>
            </form>


          </div>
        </div>
      </div>

    )
  }

}

function mapStateToProps(state) {
  return {
    states: state.states
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { selectState: selectState }, dispatch );
}

export default connect(mapStateToProps, mapDispatchToProps)(StateSelector);
