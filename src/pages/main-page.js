import React from 'react';
import { connect } from 'react-redux';

const MainPage = ({ isUserLoggedIn = false, userName = '' }) => {
  const titleContent = isUserLoggedIn ? `Привет, ${userName}` : 'Привет, Гость';
  return (
    <div>
      <h1>{titleContent}</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userName: state.user.userName,
  isUserLoggedIn: state.isUserLoggedIn,
});

export default connect(mapStateToProps)(MainPage);
