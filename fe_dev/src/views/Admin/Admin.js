import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'
import { ProductServices } from '../../services/ProductServices';
import AdminNavType from '../../utils/constants/enums/AdminNavType';
import PageHeader from '../../utils/PageHeader';
import AdminNavigator from './AdminNavigator';
import AuthorTable from './AuthorTable';
import BookTable from './BookTable';
import CategoryTable from './CategoryTable';
import UserTable from './UserTable';

export default class Admin extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            active: AdminNavType.BOOK,
        }
    }

    async componentDidMount() {
        const categories = await ProductServices.getCategories()
        this.setState({
            categories: categories,
        })
    }

    setActive = id => {
        this.setState({
            active: id,
        })
    }
    render() {
        return (
            <div id='main-page'>
                <Helmet>
                    <title>Quản lý</title>
                </Helmet>
                <PageHeader categories={this.props.categories} />
                <div className='admin-page'>
                    <AdminNavigator active={this.state.active} setActive={this.setActive} />
                    <div className='admin-table'>
                        <BookTable display={this.state.active === AdminNavType.BOOK} />
                        <UserTable display={this.state.active === AdminNavType.USER} />
                        <CategoryTable display={this.state.active === AdminNavType.CATEGORY} />
                        <AuthorTable display={this.state.active === AdminNavType.AUTHOR} />
                    </div>
                </div>
            </div>
        )
    }
}
