import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Table, Pagination, Popconfirm } from 'antd';
import styles from './Users.css';
import { PAGE_SIZE } from '../configs/constants';
import UserModal from './UserModal';

function Users({ dispatch, list: dataSource, loading, total, page: current }) {
    function deleteHandler(id) {
        console.warn(`TODO: ${id}`);
        dispatch({
            type: 'users/remove',
            payload: id,
        })
    }

    function pageChangeHandler(page) {
        dispatch(routerRedux.replace({
            pathname: '/users',
            query: { page }
        }))
    }

    function editHandler(id, values) {
        dispatch({
            type: 'users/patch',
            payload: { id, values },
        });
    }

    function createHandler(values) {
        dispatch({
            type: 'users/create',
            payload: values,
        });
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="">{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Website',
            dataIndex: 'website',
            key: 'website',
        },
        {
            title: 'Operation',
            key: 'operation',
            render: (text, record) => (
                <span className={styles.operation}>
                    <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
                        <a>Edit</a>
                    </UserModal>
                    <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
                        <a href="">Delete</a>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    return (
        <div className={styles.normal}>
            <div>
                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={dataSource}
                    rowKey={record => record.id}
                    pagination={false}
                />
                <Pagination
                    className="ant-table-pagination"
                    total={total}
                    current={current}
                    pageSize={PAGE_SIZE}
                    onChange={pageChangeHandler}
                />
            </div>
        </div>
    );
}

function mapStateToProps(state, ownProps) {
    const { list, total, page } = state.users;
    return {
        list,
        total,
        page,
        loading: state.loading.models.users,
    };
}

export default connect(mapStateToProps)(Users);