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
    async componentDidMount() {
        let [success, body] = await ProductServices.getRate(this.props.uid)
        if (success) {
            this.setState({
                datas: body.data && body.data.results,
            })
        }
    }

    render() {
        const { datas } = this.state
        return (
            datas && datas.length ?
                <div className='common-content-wrapper'>
                    <div className='title'>ĐÁNH GIÁ</div>
                    <div className='reviews'>
                        {datas.map(data =>
                            <div className='review-wrapper' key={data.uid}>
                                <div className='review-content'>{data.content || ''}</div>
                                <div className='row-wrapper'>
                                    <RateBar rate={data.rating || ''} />
                                    <div className='reiew-user'>Được đánh giá bởi <b>{data.name || ''}</b> vào {data.updated_at || ''}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div> : null
        )
    }
}
