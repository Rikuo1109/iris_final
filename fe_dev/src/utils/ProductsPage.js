import React, { PureComponent } from 'react'
import Navigator from './Navigator'
import RateFilter from './RateFilter'
import PriceFilter from './PriceFilter'
import PublisherFilter from './PublisherFilter';
import { PublisherServices } from '../services/PublisherServices'
import AuthorFilter from './AuthorFilter';
import { AuthorServices } from '../services/AuthorServices';
import ProductGrid from './ProductGrid';
import { ProductServices } from '../services/ProductServices';
export default class ProductsPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            rate: 0,
            minPrice: '',
            maxPrice: '',
            publisher: null,
            publisherOptions: [],
            author: null,
            authorOptions: [],
            recomendedProducts: [],
            commonProducts: [],
        }
    }
    componentDidMount() {
        const recomendedProducts = ProductServices.getRecomendedProducts()
        this.setState({
            recomendedProducts: recomendedProducts,
        })
        const author = AuthorServices.getAuthors()
        this.setState({
            authorOptions: author.map(item => { return { label: item, value: item } }),
        })
        const publisher = PublisherServices.getPubliser()
        this.setState({
            publisherOptions: publisher.map(item => { return { label: item, value: item } }),
        })
    }

    handleChange = ({ name, value }) => {
        console.log(name, value)
        this.setState({
            [name]: value,
        })
    }
    render() {
        return (
            <div className='content-wrapper page-content product-page'>
                <div className='left-content'>
                    <Navigator data={this.props.navData} />
                    <RateFilter value={this.state.rate} handleChange={this.handleChange} />
                    <PriceFilter minValue={this.state.minPrice} maxValue={this.state.maxPrice} handleChange={this.handleChange} />
                    <AuthorFilter value={this.state.author} options={this.state.authorOptions} handleChange={this.handleChange} />
                    <PublisherFilter value={this.state.publisher} options={this.state.publisherOptions} handleChange={this.handleChange} />
                </div>
                <div className='right-content'>
                    {this.state.recomendedProducts.length ?
                        <ProductGrid
                            title='SẢN PHẨM PHỔ BIẾN'
                            numColumn={4}
                            datas={this.state.recomendedProducts}
                        /> : null
                    }
                    {this.state.commonProducts.length ?
                        <ProductGrid
                            title='SẢN PHẨM PHỔ BIẾN'
                            numColumn={4}
                            datas={this.state.commonProducts}
                        /> : null
                    }
                </div>
            </div>
        )
    }
}
