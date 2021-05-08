import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import ProductListType from './constants/enums/ProductListType'
import { routeConstants } from './constants/RouteConstant'
import ProductItem from './ProductItem'

export default class ProductGrid extends PureComponent {
    render() {
        const type = this.props.type === ProductListType.OVERFLOW ? 'product-overflow' : 'product-grid'
        return (
            <div className='common-content-wrapper product-grid-wrapper'>
                <div className='title'>{this.props.title}</div>
                <div className={type}>
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
            </div >
        )
    }
}
