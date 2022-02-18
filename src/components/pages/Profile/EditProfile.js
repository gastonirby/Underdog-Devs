import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Radio, Modal, Typography, message } from 'antd';

function EditProfile() {
  // Grab initial values from profile component
  const initialValues = {
    first_name: 'Hal',
    last_name: 'Jordan',
    email: 'greenguy123@gmail.com',
    location: 'Earth',
    company: 'Bloom Tech, SWE',
    tech_stack: 'React, JS, Python',
    commitment: 'Pair Programming',
  };

  const [ModalOpen, setModalOpen] = useState(false);
  const [radio, setRadio] = useState(initialValues);

  //// Event Handlers

  const showModal = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleOk = () => {
    setModalOpen(false);
  };

  const handleRadio = event => {
    setRadio(event.target.value);
  };

  ////

  //// Styling

  return (
    <>
      <Button onClick={showModal}>Edit</Button>
      <Modal visible={ModalOpen} onCancel={handleCancel} onOk={handleOk}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 14,
          }}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            initialValue={initialValues.first_name}
            rules={[
              {
                required: true,
                message: 'First Name Required!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            initialValue={initialValues.last_name}
            rules={[
              {
                required: true,
                message: 'Last Name Required!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            initialValue={initialValues.email}
            rules={[
              {
                required: true,
                message: 'Email Required!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            initialValue={initialValues.location}
            rules={[
              {
                required: true,
                message: 'Location Required!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Company/Position"
            name="company"
            initialValue={initialValues.company}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tech Stack"
            name="tech_stack"
            initialValue={initialValues.tech_stack}
            rules={[
              {
                required: true,
                message: 'Tech Stack Required!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Commitment"
            name="commitment"
            labelCol={{
              span: 13,
            }}
            wrapperCol={{
              span: 9,
            }}
          >
            <Radio.Group
              name="commitment"
              defaultValue={initialValues.commitment}
            >
              <Radio value="1:1 Mentoring" onClick={handleRadio}>
                1:1 Mentoring
              </Radio>
              <Radio value="Pair Programming" onClick={handleRadio}>
                Pair Programming
              </Radio>
              <Radio value="Neither" onClick={handleRadio}>
                Neither
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default EditProfile;