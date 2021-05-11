import React, { PureComponent } from 'react'
import TableSkeleton from './TableSkeleton';


class RowTreeTable extends PureComponent {
    render() {
        const { row, rowKey, rowIndex } = this.props;
        return (
            <tr className='row-table' key={rowKey ? rowKey : rowIndex}>
                {this.props.columns.map((col, index) =>
                    <td className={col.cellClasses ? col.cellClasses : ''} key={`${col.header}_${index}_${rowIndex}`}>
                        {(col.formatter !== void 0) ? (col.formatter(row[col.cell], row)) : (row[col.name])}
                    </td>
                )}
            </tr>
        )
    }
}

export default class TreeTable extends PureComponent {
    constructor(props) {
        super(props);
        this.defaultColumns = [
            {
                header: '',
                name: 'blank',
                cell: 'blank',
                headerClasses: 'table-header',
                cellClasses: 'table-cell',
            },
            {
                header: '',
                name: 'blank',
                cell: 'blank',
                headerClasses: 'table-header',
                cellClasses: 'table-cell',
            }
        ]
    }

    render() {
        const { data, className, rowKey, columns, isLoading } = this.props;
        if (!isLoading) {
            return (
                <div>
                    <div className={'table-container ' + (className ? className : '')}>
                        <table className='df-table-container'>
                            <thead>
                                <tr className="row-table">
                                    {columns.map((col, index) => <th key={col.name + index} className={col.headerClasses ? col.headerClasses : ''}>{col.header}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data &&
                                    data.length !== 0 &&
                                    data.map((row, index) => {
                                        return (
                                            < RowTreeTable
                                                key={row[rowKey]}
                                                rowKey={row[rowKey]}
                                                rowIndex={index}
                                                columns={columns}
                                                row={row}
                                            />
                                        )
                                    })
                                }
                            </tbody>
                            {
                                (!data || data.length === 0) &&
                                <tbody>
                                    <tr>
                                        <td className="super-table-row super-row-no-data last-row" colSpan={columns ? columns.length : null}><div>{'Không có dữ liệu'}</div></td>
                                    </tr>
                                </tbody>
                            }
                        </table>
                    </div>
                </div>
            )
        }
        else {
            return (
                <TableSkeleton />
            )
        }
    }
}
