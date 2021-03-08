import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { routeConstants } from './constants/RouteConstant'
import ProductItem from './ProductItem'

export default class ProductGrid extends PureComponent {
    render() {
        console.log(this.props.datas && this.props.datas.map)
        return (
            <div className='common-content-wrapper product-grid-wrapper'>
                <div className='title'>{this.props.title}</div>
                <div className='product-grid'>
                    {this.props.datas && this.props.datas.map && this.props.datas.map(item =>
                        <Link to={item.uid ? (routeConstants.SHORT_BOOK_DETAIL + '/' + item.uid) : ''} key={item.uid}>
                            < ProductItem
                                image={item.image}
                                name={item.name}
                                uid={item.uid}
                                rate_average={item.rate_average}
                                rate_count={item.rate_count}
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
