import { Avatar } from 'antd';
import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { connect } from 'react-redux';
import './Navbar.css';
import logo from '../Navbar/ud_logo2.png';
import { UserOutlined, FormOutlined } from '@ant-design/icons';
import { Dropdown, Layout, Menu, Modal } from 'antd';
import NavBarLanding from '../NavBarLanding/NavBarLanding';
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { getProfile } from '../../../state/actions/userProfile/getProfile';
import LoginButton from './NavbarFeatures/LoginButton';
import SignupButton from './NavbarFeatures/SignupButton';
import { useAuth0 } from '@auth0/auth0-react';

const { Header } = Layout;

const Navbar = ({ isAuthenticated, userProfile, getProfile }) => {
  const [profilePic] = useState('https://joeschmoe.io/api/v1/random');
  const [user, setUser] = useState({});
  const { authService } = useOktaAuth();
  const [modal, setModal] = useState(false);

  const openModal = () => setModal(true);

  const cancelOpen = () => setModal(false);

  const handleLogout = () => {
    setModal(false);
    localStorage.removeItem('role_id');
    localStorage.removeItem('token');
    authService.logout();
  };
  useEffect(() => {
    axiosWithAuth()
      .get(`/profile/current_user_profile/`)
      .then(user => {
        setUser(user.data);
        getProfile(user.data.profile_id);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (!user) {
    return <NavBarLanding />;
  }

  const accountMenu = (
    <Menu key="navAccountMenu">
      <Menu.Item key="navProfile" icon={<UserOutlined />}>
        <Link to="/profile">Profile Settings</Link>
      </Menu.Item>
      <Menu.Item key="navLogout" onClick={openModal}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Layout className="layout">
        <Header className="menuBar">
          <div className="logoDiv">
            <Link to="/dashboard">
              <img
                src={logo}
                alt="underdog devs logo"
                height="68"
                style={{ marginLeft: '1vw' }}
                role="button"
              />
            </Link>

            {Object.keys(user).length && (
              <div className="userInfo-and-profilePic">
                <Link
                  key="memosLinkNav"
                  to="/memos"
                  style={{ color: '#FFF' }}
                  className="memos"
                >
                  <FormOutlined className="memo-icon" />
                  Memos
                </Link>
                <Dropdown overlay={accountMenu} placement="bottom" arrow>
                  <div className="userInfo-and-profilePic">
                    <div className="profilePic">
                      <Avatar
                        size={50}
                        icon={<UserOutlined />}
                        src={profilePic}
                        alt="Account settings"
                      />
                    </div>
                    <div className="userInfo">
                      <div
                        className="username"
                        // eslint-disable-next-line jsx-a11y/aria-role
                        role="text"
                        aria-label="Account settings"
                      >
                        <div className="username">
                          Welcome {userProfile.first_name}
                        </div>
                      </div>
                    </div>
                  </div>
                </Dropdown>
              </div>
            )}
            {!isAuthenticated && (
              <div className="header_buttons">
                <LoginButton />
                <SignupButton />
              </div>
            )}
          </div>
        </Header>
      </Layout>
      <Modal
        visible={modal}
        onCancel={cancelOpen}
        onOk={handleLogout}
        title="Confirm Log Out"
        role="logout"
      >
        Are you sure you want to log out now?
      </Modal>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: localStorage.getItem('token'),
    userProfile: state.user.userProfile,
  };
};

export default connect(mapStateToProps, { getProfile })(Navbar);
