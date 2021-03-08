import React, { PureComponent } from 'react'
import { ProductServices } from '../../services/ProductServices';
import RateBar from '../../utils/RateBar';

export default class BookRate extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            datas: []
        }
    }
    componentDidMount() {
        const datas = ProductServices.getRate()
        this.setState({
            datas: datas,
        })
    }

    render() {
        const { datas } = this.state
        return (
            datas.length ?
                <div className='common-content-wrapper'>
                    <div className='title'>ĐÁNH GIÁ</div>
                    <div className='reviews'>
                        {datas.map(data =>
                            <div className='review-wrapper'>
                                <div className='review-content'>{data.content || ''}</div>
                                <div className='row-wrapper'>
                                    <RateBar rate={data.numRate || ''} />
                                    <div className='reiew-user'>Được đánh giá bởi <b>{data.user || ''}</b> vào {data.time || ''}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div> : null
        )
    }
}
