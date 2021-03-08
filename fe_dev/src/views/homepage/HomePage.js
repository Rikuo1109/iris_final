import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet';
import ProfileContext from '../../context/ProfileContext';
import PageFooter from '../../utils/PageFooter';
import PageHeader from '../../utils/PageHeader';
import ProductsPage from '../../utils/ProductsPage';


export default class HomePage extends PureComponent {
    render() {
        return (
            <div id='main-page'>
                <Helmet>
                    <title>Trang chủ</title>
                </Helmet>
                <PageHeader categories={this.props.categories} />
                <ProfileContext.Consumer>
                    {
                        profile => <ProductsPage
                            navData={this.props.categories}
                            uid={profile.uid}
                        />
                    }
                </ProfileContext.Consumer>
                <PageFooter />
            </div>
        )
    }
}
