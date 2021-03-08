import React, { PureComponent } from 'react';
import Search from './Search';
import IconAndTextButton from './IconAndTextButton';
import { routeConstants } from './constants/RouteConstant'
import IndexItem from './IndexItem';
import { Modal } from 'reactstrap';

class PageHeader extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            indexIsShowed: false,
            children: null,
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.toggle !== this.props.toggle) {
            this.setState({
                indexIsShowed: false,
            })
        }
    }

    showIndex = () => {
        if (!this.state.indexIsShowed) {
            this.toggle()
        }
    }
    hideIndex = () => {
        if (this.state.indexIsShowed) {
            this.toggle()
        }
    }
    toggle = () => {
        const indexIsShowed = !this.state.indexIsShowed
        this.setState({
            indexIsShowed: indexIsShowed
        })
    }
    showChildren = data => {
        this.setState({
            children: data
        })
    }
    render() {
        return (
            <div className='main-header'>
                <div className='content-wrapper'>
                    <div className='flex-align-left'>
                        <a href={routeConstants.ROUTE_ROOT}>
                            <div className='logo' />
                        </a>
                        <IconAndTextButton
                            texts={[{
                                text: 'TRANG CHỦ',
                                href: routeConstants.ROUTE_ROOT,
                            }]}
                        />
                        <IconAndTextButton
                            className='pointer'
                            icons={[
                                { icon: 'arrow-down-icon icon24' },
                            ]}
                            texts={[{
                                text: 'DANH MỤC SÁCH',
                            }]}
                            revert={true}
                            click={this.showIndex}
                        />
                        <Search
                            placeHolder='Bạn cần tìm gì ...'
                        />
                    </div>
                    <div className='flex-align-right'>
                        <IconAndTextButton
                            className='custom-text-seperator'
                            icons={[
                                { icon: 'account-icon icon24' },
                            ]}
                            texts={[{
                                text: 'Đăng nhập',
                                href: routeConstants.ROUTE_LOGIN,
                            },
                            {
                                text: 'Đăng kí',
                                href: routeConstants.ROUTE_SIGNIN,
                            }]}
                            textSeperator='/'
                        />
                    </div>
                </div>
                <Modal isOpen={this.state.indexIsShowed} toggle={this.toggle} className={'index-table'} scrollable={true}>
                    <div className='left-table'>
                        {this.props.categories && this.props.categories.map && this.props.categories.map(item =>
                            <IndexItem
                                key={item.url}
                                label={item.label}
                                children={item.children || null}
                                url={'/the-loai' + item.url}
                                set={() => this.showChildren(item.children)}
                                className={(item.children && this.state.children === item.children) ? 'focus' : ''}
                            />)}
                    </div>
                    <div className='right-table'>
                        {this.state.children && this.state.children.map && this.state.children.map(item =>
                            <IndexItem
                                key={item.url}
                                label={item.label}
                                children={item.children || null}
                                url={'/the-loai' + item.url}
                            />)}
                    </div>
                </Modal>
            </div >
        );
    }
}

export default PageHeader;