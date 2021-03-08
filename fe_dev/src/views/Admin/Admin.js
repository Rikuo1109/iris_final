import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'
import { ProductServices } from '../../services/ProductServices';
import AdminNavType from '../../utils/constants/enums/AdminNavType';
import PageHeader from '../../utils/PageHeader';
import AdminNavigator from './AdminNavigator';

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
                </div>
            </div>
        )
    }
}
