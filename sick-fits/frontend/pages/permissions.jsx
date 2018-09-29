import React from 'react';
import PropTypes from 'prop-types';

import PleaseSignIn from '../components/PleaseSignIn';
import Permissions from '../components/Permissions';

const PermissionsPage = () => (
  <div>
    <PleaseSignIn>
      <Permissions />
    </PleaseSignIn>
  </div>
);

PermissionsPage.propTypes = {

};

export default PermissionsPage;
