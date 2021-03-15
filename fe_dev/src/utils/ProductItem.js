import React, { PureComponent } from 'react'
import RateBar from './RateBar'

export default class ProductItem extends PureComponent {
    render() {
        return (
            <div className='product-item'>
                <img src={this.props.image.replace('cache/w80', 'cache/w200') || ''} alt={this.props.name || 'Hình ảnh cho sản phẩm'} />
                <div><b>{this.props.name || ''}</b></div>
                <div className='rate-detail'>
                    <RateBar rate={this.props.rate_average} />
                    <div className='rate-count textTwo'>{`(${this.props.rate_count})`}</div>
                </div>
                <div>
                    <span className='price'><b>{this.props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ'}</b></span>
                    <span className='discount'>{this.props.discount}</span>
                </div>
            </div>
        )
    }
}
