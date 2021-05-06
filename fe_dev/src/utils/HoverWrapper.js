import React, { PureComponent } from 'react'

export default class HoverWrapper extends PureComponent {
    render() {
        return (
            <div className={`default-hover-wrapper ${this.props.className || ''}`}>
                <div className='root'>
                    {this.props.rootComponent}
                </div>
                <div className={`child ${this.props.position || ''}`}>
                    {this.props.childComponent || null}
                </div>
            </div>
        )
    }
}
