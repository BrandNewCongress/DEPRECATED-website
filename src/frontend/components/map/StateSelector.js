import React from 'react'
import { connect } from 'react-redux'
import { selectState } from '../../actions/index'
import { bindActionCreators } from 'redux'

class StateSelector extends React.Component {
  static propTypes = {
    states: React.PropTypes.array,
    selectState: React.PropTypes.func
  }

  constructor(props) {
    super(props)
    this.statesOnChange = this.statesOnChange.bind(this)
  }

  statesOnChange(event) {
    // console.log(event.target);
    // console.log(event.target.value);

    const value = event.target.value
    const selectedState = this.props.states.filter(
      (state) => state.abbreviation === value
    )[0]

    // console.log();
    this.props.selectState(selectedState)
  }

  buildSelect() {
    return this.props.states.map(
      (stateItem) => (
        <option
          key={stateItem.abbreviation}
          value={stateItem.abbreviation}
        >
          {stateItem.name}
        </option>)
    )
  }

  render() {
    return (

      <div className='container state-picker'>
        <div className='row'>
          <div className='col-xs-8'></div>
          <div className='col-xs-4 text-right'>


            <form className='form-inline'>
              <div className='input-group'>
                <select
                  id='states'
                  className='form-control'
                  name='states'
                  onChange={this.statesOnChange}
                >
                  <option>Select State...</option>
                  {this.buildSelect()}
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
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectState }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StateSelector)
