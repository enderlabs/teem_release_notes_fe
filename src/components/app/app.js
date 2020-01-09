import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as notesActions from '../../redux/actions/notesActions';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Notes from '../notes/notes';

const mapStateToProps = state => ({
  
});

const notesActionsToProps = {
  getTicketInfo: notesActions.getTicketInfo
};

export class App extends React.PureComponent {
  static propTypes = {
    // loadMapTheme: PropTypes.func.isRequired,
    // loadUserEvents: PropTypes.func.isRequired,

  };

  constructor() {
    super();
    this.state = {
      ticketId: '',
      startDate: new Date()
    };
  }

  componentDidMount() {
    // const { loadMapTheme, loadUserEvents } = this.props;
  }

  onTicketIdChange = (event) => {
    this.setState({
      ticketId: event.target.value
    })
  }

  onDateChange = (date) => {
    this.setState({
      startDate: date
    });
  };

  onSubmit = (event) => {
    const { ticketId, startDate } = this.state;
    event.preventDefault();
    this.props.getTicketInfo(ticketId, startDate);
    // this.setState({
    //   ticketId: 'event.target.value'
    // })
  }

  render() {
    const { ticketId, startDate } = this.state;

    let disabled = true;
    if(ticketId) {
      disabled = false;
    }

    return (
      <div className="app">
        <h1>Release Notes Builder</h1>

        <div className={'flex_container'}>
          <DatePicker
            className={'margin_right'}
            selected={startDate}
            onChange={this.onDateChange}
          />
          <form onSubmit={this.onSubmit}>
            <input className={'margin_right'} placeholder={'Ticket Id'} value={ticketId} onChange={this.onTicketIdChange} />
            <button type='submit' disabled={disabled}>SUBMIT</button>
            {/* <div>{ticketId}</div> */}
          </form>
        </div>
        <br></br>
        <br></br>
        <Notes />

      </div>
    );
  }
}

export default connect(mapStateToProps, notesActionsToProps)(App);
