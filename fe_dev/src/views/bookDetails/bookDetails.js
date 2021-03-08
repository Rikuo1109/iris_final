import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet';
import { ProductServices } from '../../services/ProductServices';
import BookDescription from './BookDescription';
import ImagesViewer from '../../utils/ImagesViewer';
import PageHeader from '../../utils/PageHeader';
import ProductGrid from '../../utils/ProductGrid';
import RateBar from '../../utils/RateBar';
import BookRate from './BookRate';
import PageFooter from '../../utils/PageFooter';

const fields = [
    {
        tag: 'author',
        text: 'Tác giả',
    },
    {
        tag: 'numpage',
        text: 'Số trang',
    },
    {
        tag: 'bookCover',
        text: 'Loại bìa',
    },
    {
        tag: 'publisher',
        text: 'Nhà xuất bản',
    },
    {
        tag: 'ctyph',
        text: 'Công ty phát hành',
    },
]
export default class bookDetails extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pageTitle: 'IRIS',
            categories: [],
            uid: 0,
            name: '',
            discount: '',
            rate_average: 0,
            rate_count: 0,
            price: 0,
            author: '',
            numpage: 0,
            bookCover: '',
            publisher: '',
            ctyph: '',
            images: [],
            relatedProducts: [],
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.bookID !== this.props.match.params.bookID) {
            this.prepareData()
        }
    }

    componentDidMount() {
        this.prepareData()
    }

    prepareData = async () => {
        const uid = this.props.match.params.bookID;
        const bookInfo = await ProductServices.getBookDetails(uid)
        this.setState(Object.assign(bookInfo, { pageTitle: bookInfo.name ? bookInfo.name : 'IRIS' }))
        const relatedProducts = await ProductServices.getRelatedProducts(uid)
        this.setState({
            relatedProducts: relatedProducts,
        })
        const categories = await ProductServices.getCategories()
        this.setState({
            categories: categories
        })
    }

    render() {
        return (
            <div id='main-page'>
                <Helmet>
                    <title>{this.state.pageTitle}</title>
                </Helmet>
                <PageHeader categories={this.state.categories} />
                <div className='content-wrapper page-content detail-page'>
                    <div className='common-content-wrapper '>
                        <div className='info-title'>
                            <div className='book-title'>{this.state.name}</div>
                            <div className='rate-detail'>
                                <RateBar rate={this.state.rate_average} />
                                <div className='rate-count textTwo'>{this.state.rate_count + ' đánh giá'}</div>
                            </div>
                        </div>
                        <div className='info-detail'>
                            <ImagesViewer images={this.state.images} />
                            <div className='info-table'>
                                <div className='info-row'>
                                    <div>THÔNG TIN CHI TIẾT</div>
                                    <div>
                                        <span className='price'><b>{this.state.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ'}</b></span>
                                        <span className='discount'>{this.state.discount}</span>
                                    </div>
                                </div>
                                {fields.map(field =>
                                    <div className='info-row' key={field.tag}>
                                        <div className='textTwo'>{field.text}</div>
                                        <div>{this.state[field.tag]}</div>
                                    </div>)}
                            </div>
                        </div>
                    </div>
                    <ProductGrid
                        title='SẢN PHẨM TƯƠNG TỰ'
                        numColumn={5}
                        datas={this.state.relatedProducts}
                    />
                    <div className='wrapper'>
                        <BookDescription uid={this.props.match.params.bookID} />
                        <BookRate uid={this.props.match.params.bookID} />
                    </div>
                </div>
                <PageFooter />
            </div>
        )
    }
}
