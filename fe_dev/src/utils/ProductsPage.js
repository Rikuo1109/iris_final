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
    shouldPrepareData = (prevProps, prevState) => {
        let key
        for (key of ['userID', 'category']) {
            if (prevProps[key] !== this.props[key]) return true
        }
        for (key of ['rate', 'minPrice', 'maxPrice', 'publisher', 'author']) {
            if (prevState[key] !== this.state[key]) return true
        }
        return false
    }
    prepareFilter = () => {
        const { rate, minPrice, maxPrice, publisher, author } = this.state
        const { userID, category } = this.props
        const filter = {
            userID: userID,
            rate: rate,
            min_price: minPrice.replace('.', ''),
            max_price: maxPrice.replace('.', ''),
            publisher: publisher,
            author_id: author,
            category_id: category || ''
        }
        let filter_string = ''
        for (let key in filter) {
            if (filter[key]) {
                filter_string = filter_string + `&${key}=${filter[key]}`
            }
        }
        return filter_string.length ? ('?' + filter_string.slice(1)) : ''
    }
    prepareData = async () => {
        let [success, body] = await ProductServices.getCommonProducts(this.prepareFilter())
        if (success) {
            this.setState({
                commonProducts: body.data.results,
            })
        }
        [success, body] = await ProductServices.getRecomendedProducts()
        if (success) {
            this.setState({
                recomendedProducts: body.data.recommended_books,
            })
        }
    }
    prepareAuthorOptions = async () => {
        let [success, body] = await AuthorServices.getAuthors(this.props.category)
        if (success) {
            this.setState({
                authorOptions: body.data && body.data.results && body.data.results.map(item => { return { label: item.name, value: item.uid } }),
            })
        }
    }
    preparePublisherOptions = async () => {
        let [success, body] = await PublisherServices.getPubliser()
        if (success) {
            this.setState({
                publisherOptions: body.data && body.data.results && body.data.results.map(item => { return { label: item.publisher, value: item.publisher } }),
            })
        }
    }
    componentDidMount() {
        this.prepareData()
        this.preparePublisherOptions()
        this.prepareAuthorOptions()
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.shouldPrepareData(prevProps, prevState)) {
            this.prepareData()
        }
        if (this.props.category !== prevProps.category) {
            this.prepareAuthorOptions()
        }
    }


    handleChange = ({ name, value }) => {
        console.log(name, value)
        this.setState({
            [name]: value,
        })
    }
    render() {
        console.log(this.prepareFilter())
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
                            title='SẢN PHẨM GỢI Ý'
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
