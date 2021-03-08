import React, { PureComponent } from 'react'

const lst = [0, 1, 2, 3, 4]
export default class RateBar extends PureComponent {
    render() {
        if (this.props.rate)
            return (
                < div className='rate-bar' >
                    {
                        lst.map(item => <div key={item} className={`icon18 ${item < this.props.rate ? 'gold-star' : 'black-star'}`} ></div>)
                    }
                </div >
            )
        else
            return null
    }
}
