import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as notesActions from '../../redux/actions/notesActions';

const mapStateToProps = state => ({
  notes: state.notesReducer.notes,
});

const notesActionsToProps = {
//   getTicketInfo: notesActions.getTicketInfo
};

export class Notes extends React.PureComponent {
  static propTypes = {};

  constructor() {
    super(); 
  }

  render() {
    const { notes } = this.props;

    console.log('NOTES => ', notes);
    

    return (
      <div>
        <h1>Notes</h1>
        {/* <div>{notes}</div> */}
      </div>
    );
  }
}

export default connect(mapStateToProps, notesActionsToProps)(Notes);
