import { Tooltip } from 'antd';
import React, { PureComponent } from 'react'
import { ProductServices } from '../../services/ProductServices';
import Table from '../../utils/table/Table';

export default class BookTable extends PureComponent {
    constructor(props) {
        super(props);
        this.columns = [
            {
                header: 'Tên sách',
                name: 'name',
                cell: 'name',
                headerClasses: 'table-header',
                cellClasses: 'table-cell',
            },
            {
                header: 'Tác giả',
                name: 'authors',
                cell: 'authors',
                headerClasses: 'table-header',
                cellClasses: 'table-cell',
            },
            {
                header: 'Số trang',
                name: 'num_pages',
                cell: 'num_pages',
                headerClasses: 'table-header',
                cellClasses: 'table-cell',
            },
            {
                header: 'Nhà xuất bản',
                name: 'publisher',
                cell: 'publisher',
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
        this.state = {
            columns: [],
            data: [],
            currentPage: 1,
            pageSize: 25,
            totalRows: 0,
            isLoadingTable: true,
        }
    }

    prepareData = async (pageNo, pageSize) => {
        await this.setState({
            isLoadingTable: true,
        })
        // let data = {
        //     pageNo: pageNo ? pageNo : this.state.currentPage,
        //     pageSize: pageSize ? pageSize : this.state.pageSize,
        //     name: this.state.name,
        // }
        let [success, body] = await ProductServices.getCommonProducts()
        if (success && body.data) {
            this.setState({
                data: body.data.results,
                totalRows: body.data.count,
            })
        }
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
                    <div className="edit-btn" onClick={() => { }}></div>
                </Tooltip>
                <Tooltip title={'Xoá'} placement="bottom" destroyTooltipOnHide={true}>
                    <div className="del-btn" onClick={(e) => { }}></div>
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
        console.log(this.columns)
        return (
            this.props.display ?
                <Table
                    rowKey='uid'
                    isLoading={this.state.isLoadingTable}
                    data={this.state.data}
                    className='df-table-container'
                    classNamePagination='km-pagination'
                    columns={this.columns}
                    pagination={{
                        currentPage: this.state.currentPage,
                        pageSize: this.state.pageSize,
                        totalRows: this.state.totalRows,
                        leftLabel: 'Sách:',
                    }}
                    apiPagination={this.handlePagination}
                /> : null
        )
    }
}
