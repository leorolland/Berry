import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faCompass, faUser } from '@fortawesome/free-regular-svg-icons'
import { NavigationContext } from "./context/NavigationContext";

export function BottomBar() {
  return (
    <>
      <NavigationContext.Consumer>
        {({ currentPage, changeCurrentPage }) => (
          <div className="bottomBar">
            <div onMouseDown={() => changeCurrentPage('explore')}>
              <FontAwesomeIcon icon={faCompass} />
              {currentPage == 'explore' && <hr />}
            </div>
            <div onMouseDown={() => changeCurrentPage('messages')}>
              <FontAwesomeIcon icon={faComments} />
              {currentPage == 'messages' && <hr />}

            </div>
            <div onMouseDown={() => changeCurrentPage('profile')}>
              <FontAwesomeIcon icon={faUser} />
              {currentPage == 'profile' && <hr />}
            </div>
          </div>
        )}
      </NavigationContext.Consumer>
    </>
  );
}
