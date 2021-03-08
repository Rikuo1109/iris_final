import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

export default class IndexItem extends PureComponent {
    render() {
        return (
            <div className={`default-index-item ${this.props.className || ''}`} onMouseOver={this.props.set}>
                <Link to={this.props.url || ''}>
                    <div>
                        {this.props.label}
                    </div>
                    {this.props.children ? <div className='arrow-right-icon icon24' /> : null}
                </Link>
            </div>
        )
    }
}
