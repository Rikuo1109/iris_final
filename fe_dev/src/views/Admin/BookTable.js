import { Tooltip } from 'antd';
import React, { PureComponent } from 'react'
import Table from '../../utils/table/Table';

export default class BookTable extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            columns: this.columns,
            data: [],
            currentPage: 1,
            pageSize: 25,
            totalRows: 0,
            isLoadingTable: true,
        }
    }

    columns = [
        {
            header: 'Tên sách',
            name: 'images',
            cell: 'images',
            headerClasses: 'table-header',
            cellClasses: 'table-cell',
        },
        {
            header: 'Tác giả',
            name: 'name',
            cell: 'name',
            headerClasses: 'table-header',
            cellClasses: 'table-cell',
        },
        {
            header: 'Số trang',
            name: 'name',
            cell: 'name',
            headerClasses: 'table-header',
            cellClasses: 'table-cell',
        },
        {
            header: 'Nhà xuất bản',
            name: 'name',
            cell: 'name',
            headerClasses: 'table-header',
            cellClasses: 'table-cell',
        },
        {
            header: 'Hành động',
            name: 'actions',
            cell: 'actions',
            headerClasses: 'table-header align-right',
            cellClasses: 'table-cell actions align-right',
            formatter: this.actionBaches,
        }
    ]

    prepareData = async (pageNo, pageSize) => {
        await this.setState({
            isLoadingTable: true,
        })
        // let data = {
        //     pageNo: pageNo ? pageNo : this.state.currentPage,
        //     pageSize: pageSize ? pageSize : this.state.pageSize,
        //     name: this.state.name,
        // }
        await this.setState({
            isLoadingTable: false,
        })
    }

    componentDidMount() {
        this.prepareData();
    }

    actionBaches = (cell, row) => {
        return (
            <div>
                <Tooltip title={'Chỉnh sửa'} placement="bottom" destroyTooltipOnHide={true}>
                    <div className="edit-btn" onClick={() => this.handleOpenUpdate(cell, row)}></div>
                </Tooltip>
                <Tooltip title={'Xoá'} placement="bottom" destroyTooltipOnHide={true}>
                    <div className="del-btn" onClick={(e) => this.handleDelBtn(cell, row)}></div>
                </Tooltip>
            </div>
        )
    }

    handlePagination = (currentPage, pageSize) => {
        this.setState({
            currentPage: currentPage,
            pageSize: pageSize,
        });
        this.prepareData(currentPage, pageSize);
    }

    render() {
        return (
            this.props.display ?
                <Table
                    rowKey='uid'
                    isLoading={this.state.isLoadingTable}
                    data={this.state.data}
                    className='df-table-container'
                    classNamePagination='km-pagination'
                    columns={this.state.columns}
                    pagination={{
                        currentPage: this.state.currentPage,
                        pageSize: this.state.pageSize,
                        totalRows: this.state.totalRows,
                        leftLabel: 'Người dùng:',
                    }}
                    apiPagination={this.handlePagination}
                /> : null
        )
    }
}
