import React from 'react';
import UpdateInfo from './UpdateInfo.jsx';
import UpdatePassword from './UpdatePassword.jsx';

const AccountSettings = (props) => {
  return(
    <div className="content-container">
      <UpdateInfo userData={props.userData} />
      <UpdatePassword />
    </div>
  );
}

export default AccountSettings;
