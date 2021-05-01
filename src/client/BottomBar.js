import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faCompass, faUser } from '@fortawesome/free-regular-svg-icons'


export default class App extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div className="bottomBar">
          <div><FontAwesomeIcon icon={faCompass} /></div>
          <div><FontAwesomeIcon icon={faComments} /></div>
          <div><FontAwesomeIcon icon={faUser} /></div>
      </div>
    );
  }
}
