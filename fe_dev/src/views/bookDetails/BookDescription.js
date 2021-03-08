import React, { PureComponent } from 'react'
import { ProductServices } from '../../services/ProductServices';
import IconAndTextButton from '../../utils/IconAndTextButton';

export default class BookDescription extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            isCollapsed: true,
        }
    }
    componentDidMount() {
        const description = ProductServices.getBookDescription()
        this.setState({
            description: description,
        })
    }
    toggle = () => {
        const isCollapsed = !this.state.isCollapsed
        this.setState({
            isCollapsed: isCollapsed,
        })
    }
    render() {
        console.log(this.state.desciption)
        return (
            <div className='common-content-wrapper'>
                <div className='title'>MÔ TẢ</div>
                <div className={`description ${this.state.isCollapsed ? 'collapsed' : 'expand'}`} dangerouslySetInnerHTML={{ '__html': this.state.description }} />
                <IconAndTextButton
                    texts={[{
                        text: this.state.isCollapsed ? 'Xem thêm' : 'Thu gọn',
                    }]}
                    icons={[
                        {
                            icon: (this.state.isCollapsed ? 'arrow-down-icon' : 'arrow-up-icon') + ' icon24'
                        }
                    ]}
                    revert={true}
                    click={this.toggle}
                    className='center-button'
                />
            </div>
        )
    }
}
