import React, { useState, useEffect } from 'react';
import { Input, Button, Menu, Dropdown, Modal } from 'antd';
import axiosWithAuth from '../../../utils/axiosWithAuth';

function Reviews() {
  const { TextArea } = Input;
  const [toggle, setToggle] = useState(false);
  const [btnTitle, setBtnTitle] = useState('');
  const [displayModal, setDisplayModal] = useState(false);
  const [data, setData] = useState();
  const dummyData = [
    {
      mentor_id: '12',
      mentor_name: 'asdjk ajskdla',
    },
    {
      mentor_id: '123',
      mentor_name: 'Anthony Coman',
    },
    {
      mentor_id: '234',
      mentor_name: 'Ted Kim',
    },
    {
      mentor_id: '345',
      mentor_name: 'Phil Gailbraith',
    },
  ];

  useEffect(() => {
    axiosWithAuth()
      .get('/mentorsss') //will get mentors to select
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const onSubmit = e => {
    if (e.target.key) {
      return null;
    }
    // axiosWithAuth()
    //   .post('/profile', { content: 'string', mentor_id: 'string' })
    //   .then(res => {
    //     //success message
    //     console.log('Sent successfully');
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };

  const click = () => {
    setToggle(!toggle);
  };
  const handleBtnTitleChange = e => {
    setBtnTitle(e.key);
  };

  const menu = (
    <Menu>
      <Menu.Item
        style={{ padding: '10%' }}
        key={'Choose a Mentor'}
        onClick={handleBtnTitleChange}
      >
        {' '}
      </Menu.Item>
      {dummyData.map(obj => {
        // data.map
        return (
          <Menu.Item key={obj.mentor_name} onClick={handleBtnTitleChange}>
            {obj.mentor_name}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <>
      <h2>Please leave a review!</h2>
      {!toggle && <Button onClick={click}>Create Review</Button>}
      {toggle && (
        <div>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button style={{ marginBottom: '2%' }}>
              {btnTitle.length ? btnTitle : 'Choose a Mentor'}
            </Button>
          </Dropdown>
          <TextArea rows={6} style={{ marginBottom: '2%' }} />
          <Button
            type="primary"
            onClick={() => setDisplayModal(!displayModal)}
            style={{ marginBottom: '2%' }}
          >
            Submit
          </Button>
          <div>
            <Button onClick={click}>Cancel</Button>
          </div>
        </div>
      )}
      <Modal
        title="Submission"
        visible={displayModal}
        footer={[
          <Button key="back" onClick={() => setDisplayModal(!displayModal)}>
            Back
          </Button>,
          <Button key="submit" type="primary" onClick={onSubmit}>
            Submit
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to submit? You cannot edit or delete your review
          after submitting.
        </p>
      </Modal>
    </>
  );
}

export default Reviews;
