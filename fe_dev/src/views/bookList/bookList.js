import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet';
import { ProductServices } from '../../services/ProductServices';
import PageHeader from '../../utils/PageHeader';
import PageFooter from '../../utils/PageFooter';
import ProductsPage from '../../utils/ProductsPage';

export default class bookList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pageTitle: 'IRIS',
            navData: [],
            categories: [],
            category: '',
        }
    }

    async componentDidMount() {
        const categories = await ProductServices.getCategories()
        const category = this.getCategory(this.props.match.params.categoryPath, categories)
        this.setState({
            navData: category.children,
            category: category.url,
            pageTitle: category.label,
        })
        this.setState({
            categories: categories,
        })
    }

    componentDidUpdate(prevProps, prevState) {
        const category = this.getCategory(this.props.match.params.categoryPath, this.state.categories)
        this.setState({
            navData: category.children,
            category: category.url,
            pageTitle: category.label,
        })
    }


    getCategory = (path, categories) => {
        if (categories.map) {
            let result = null
            categories.forEach(element => {
                const tempResult = this.getCategory(path, element)
                if (tempResult) result = tempResult
            });
            if (result) return result
        } else {
            if (path === categories.url.slice(1)) {
                return categories
            } else if (categories.children) {
                return this.getCategory(path, categories.children)
            }
        }
        return false
    }

    render() {
        return (
            <div id='main-page'>
                <Helmet>
                    <title>{this.state.pageTitle}</title>
                </Helmet>
                <PageHeader categories={this.state.categories} toggle={this.state.category} />
                <ProductsPage
                    navData={this.state.navData}
                    category={this.state.category}
                />
                <PageFooter />
            </div>
        )
    }
}
