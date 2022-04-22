import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { Statistic, Row, Col, Table } from 'antd';
// TODO: update page styling and functionality, see wireframes/NewDesignProposition/AdminWireframes/Dashboard

const columns = [
  {
    title: 'Ticket ID',
    dataIndex: 'ticketID',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
      {
        text: 'Submenu',
        value: 'Submenu',
        children: [
          {
            text: 'Green',
            value: 'Green',
          },
          {
            text: 'Black',
            value: 'Black',
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.ticketID.indexOf(value) === 0,
    sorter: (a, b) => a.ticketID - b.ticketID,
    sortDirections: ['descend'],
  },
  {
    title: 'Message',
    dataIndex: 'message',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],

    onFilter: (value, record) => record.ticketType.indexOf(value) === 0,
  },
  {
    title: 'Date Submitted',
    dataIndex: 'dateSubmitted',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.dateSubmitted < b.dateSubmitted,
  },
];

// const data = [
//   {
//     key: '1',
//     ticketID: '1234',
//     ticketType: 'Application',
//     dateSubmitted: '1/21/2022',
//   },
//   {
//     key: '2',
//     ticketID: '1233',
//     ticketType: 'Resource Request',
//     dateSubmitted: '1/20/2022',
//   },
//   {
//     key: '3',
//     ticketID: '1223',
//     ticketType: 'Escalation',
//     dateSubmitted: '1/19/2022',
//   },
//   {
//     key: '4',
//     ticketID: '1200',
//     ticketType: 'Application',
//     dateSubmitted: '1/10/2022',
//   },
// ];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

// TODO: make Ant Design Statistics pull ticket totals from ticket tables
const Dashboard = props => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const getTickets = () => {
      axiosWithAuth()
        .get('/resource-tickets')
        .then(res => {
          setTickets(res.data);
        });
    };
    getTickets();
  }, []);

  const data = [];

  // eslint-disable-next-line array-callback-return
  tickets.map(t => {
    const ticketDetails = {
      key: t.resource_ticket_id,
      ticketID: t.resource_ticket_id,
      message: t.message,
      dateSubmitted: t.created_at.substring(0, 10),
    };
    data.push(ticketDetails);
  });

  return (
    <div className="dashboard-container">
      <h2>Tickets Dashboard</h2>
      <div className="dashboard-statistics">
        <Row gutter={16}>
          <Col span={5}>
            <Statistic title="Escalation Tickets" value={3} />
          </Col>
          <Col span={5}>
            <Statistic title="Application Tickets" value={25} />
          </Col>
          <Col span={5}>
            <Statistic title="Resource Tickets" value={7} />
          </Col>
        </Row>
      </div>
      <div className="dashboard-table-container">
        <Table dataSource={data} columns={columns} onChange={onChange} />
      </div>
    </div>
  );
};

export default Dashboard;
