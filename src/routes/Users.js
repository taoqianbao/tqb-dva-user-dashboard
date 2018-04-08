import React from 'react';
import { connect } from 'dva';
import UsersComponent from '../components/Users';
import MainLayout from '../layouts/MainLayout';

function Users({ location }) {
  return (
    <MainLayout location={location}>
      <div>
        <UsersComponent />
      </div>
    </MainLayout>
  );
}

Users.propTypes = {
};

export default connect()(Users);
