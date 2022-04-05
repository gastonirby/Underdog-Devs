import React, { useState } from 'react';
import { Input, Button, Menu, Dropdown } from 'antd';
import axiosWithAuth from '../../../utils/axiosWithAuth';

function Reviews() {
  const { TextArea } = Input;
  const [toggle, setToggle] = useState(false);
  const dummyData = [];

  const onSubmit = e => {
    axiosWithAuth()
      .post('/profile', { content: 'review goes here' })
      .then(res => {
        //success message
        console.log('Sent successfully');
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    alert('Sent successfully message');
  };

  const click = () => {
    setToggle(!toggle);
  };
  const draft = () => {
    alert('Draft saved');
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <p>1st menu item</p>
      </Menu.Item>
      <Menu.Item>
        <p>2st menu item</p>
      </Menu.Item>
      <Menu.Item>
        <p>3st menu item</p>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <h2>Please leave a review!</h2>
      {!toggle && <Button onClick={click}>Create Review</Button>}
      {toggle && (
        <div>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button>{Menu.Item ? `${Menu.Item.p}` : 'Mentor'}</Button>
          </Dropdown>
          <TextArea rows={4} />
          <Button onClick={draft}>Stored as draft</Button>
          <Button onClick={onSubmit}>Submit</Button>
          <div>
            <Button onClick={click}>Cancel</Button>
          </div>
        </div>
      )}
    </>
  );
}

export default Reviews;
