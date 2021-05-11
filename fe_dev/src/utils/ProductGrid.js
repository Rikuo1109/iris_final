import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import ProductListType from './constants/enums/ProductListType'
import { routeConstants } from './constants/RouteConstant'
import ProductItem from './ProductItem'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

export default class ProductGrid extends PureComponent {
    constructor(props) {
        super(props);
        this.ref = React.createRef()
        this.state = {
            index: 0,
            childRefs: [],
        }
    }
    prepareRefs = () => {

    }
    hScroll = (offset) => {
        this.ref.current.scroll({
            top: 0,
            left: this.ref.current.scrollLeft + offset * (this.ref.current.offsetWidth - 250),
            behavior: 'smooth',
        })
    }
    render() {
        const type = this.props.type === ProductListType.OVERFLOW ? 'product-overflow hide-scrollbar' : 'product-grid'
        return (
            <div className='common-content-wrapper product-grid-wrapper'>
                <div className='title'>{this.props.title}</div>
                <div className='product'>
                    <LeftOutlined className='scroll-btn' onClick={() => this.hScroll(-1)} />
                    <div className={type} ref={this.ref}>
                        {this.props.datas && this.props.datas.map && this.props.datas.map(item =>
                            <Link to={item.uid ? (routeConstants.SHORT_BOOK_DETAIL + '/' + item.uid) : ''} key={item.uid}>
                                < ProductItem
                                    image={item.image}
                                    name={item.name}
                                    uid={item.uid}
                                    rate_average={item.rating}
                                    rate_count={item.rating_count}
                                    price={item.price}
                                    discount={item.discount}
                                />
                            </Link>
                        )}
                    </div>
                    <RightOutlined className='scroll-btn right' onClick={() => this.hScroll(1)} />
                </div>
            </div >
        )
    }
}
