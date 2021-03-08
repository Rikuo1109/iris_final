import React, { PureComponent } from 'react';
import { ProductServices } from '../services/ProductServices';
import HomePage from '../views/homepage/HomePage';

class DefaultLayout extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
        }
    }

    async componentDidMount() {
        const categories = await ProductServices.getCategories()
        this.setState({
            categories: categories,
        })
    }


    render() {
        return (
            <HomePage categories={this.state.categories} />
        );
    }
}

export default DefaultLayout;