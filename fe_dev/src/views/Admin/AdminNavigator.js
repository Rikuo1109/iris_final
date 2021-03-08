import React, { PureComponent } from 'react'
import AdminNavType from '../../utils/constants/enums/AdminNavType'
import IconAndTextButton from '../../utils/IconAndTextButton'

export default class AdminNavigator extends PureComponent {
    render() {
        return (
            <div class='admin-navigator'>
                <IconAndTextButton
                    texts={[{ text: 'Sách' }]}
                    icons={[{ icon: 'book-icon icon24' }]}
                    click={() => this.props.setActive(AdminNavType.BOOK)}
                    className={this.props.active === AdminNavType.BOOK ? 'active' : ''}
                />
                <IconAndTextButton
                    texts={[{ text: 'Người dùng' }]}
                    icons={[{ icon: '' }]}
                    click={() => this.props.setActive(AdminNavType.USER)}
                    className={this.props.active === AdminNavType.USER ? 'active' : ''}
                />
                <IconAndTextButton
                    texts={[{ text: 'Thể loại' }]}
                    icons={[{ icon: '' }]}
                    click={() => this.props.setActive(AdminNavType.CATEGORY)}
                    className={this.props.active === AdminNavType.CATEGORY ? 'active' : ''}
                />
                <IconAndTextButton
                    texts={[{ text: 'Tác giả' }]}
                    icons={[{ icon: '' }]}
                    click={() => this.props.setActive(AdminNavType.AUTHOR)}
                    className={this.props.active === AdminNavType.AUTHOR ? 'active' : ''}
                />
            </div>
        )
    }
}
