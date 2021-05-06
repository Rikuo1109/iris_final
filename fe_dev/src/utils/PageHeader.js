import React, { PureComponent } from 'react';
import Search from './Search';
import IconAndTextButton from './IconAndTextButton';
import { routeConstants } from './constants/RouteConstant'
import IndexItem from './IndexItem';
import ProfileContext from '../context/ProfileContext';
import HoverWrapper from './HoverWrapper';
import { ProfileServices } from '../services/ProfileServices';

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
    handleLogout = async (reloadUserData) => {
        await ProfileServices.logout()
        localStorage['access'] = ''
        localStorage['refresh'] = ''
        reloadUserData()

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
                        <HoverWrapper
                            rootComponent={<IconAndTextButton
                                className='pointer'
                                icons={[
                                    { icon: 'arrow-down-icon icon24' },
                                ]}
                                texts={[{
                                    text: 'DANH MỤC SÁCH',
                                }]}
                                revert={true}
                                click={this.showIndex}
                            />}
                            childComponent={
                                <div className='hover-table'>
                                    {this.props.categories && this.props.categories.map && this.props.categories.map(item =>
                                        <HoverWrapper
                                            position='left'
                                            rootComponent={<IndexItem
                                                key={item.uid}
                                                label={item.label}
                                                children={item.children || null}
                                                url={'/the-loai/' + item.uid}
                                                onMouseOver={() => this.showChildren(item.children)}
                                                className={(item.children && this.state.children === item.children) ? 'focus' : ''}
                                            />}
                                            childComponent={
                                                item.children && item.children.length && item.children.map && <div className='hover-table'>
                                                    {item.children.map(child =>
                                                        <IndexItem
                                                            key={child.uid}
                                                            label={child.label}
                                                            children={child.children || null}
                                                            url={'/the-loai/' + child.uid}
                                                        />
                                                    )}
                                                </div>}
                                        >
                                        </HoverWrapper>
                                    )}
                                </div>
                            }
                        />

                        <Search
                            placeHolder='Bạn cần tìm gì ...'
                        />
                        <a href="tel:+84919852893">Call</a>
                    </div>
                    <div className='flex-align-right'>
                        <ProfileContext.Consumer>
                            {
                                profile => profile.uid === 0 ?
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
                                    /> :
                                    <HoverWrapper
                                        position='align-right'
                                        rootComponent={<IconAndTextButton
                                            icons={[
                                                { icon: 'account-icon icon24' },
                                            ]}
                                            texts={[{
                                                text: profile.name,
                                            }]}
                                        />}
                                        childComponent={
                                            <div className='hover-table'>
                                                <IndexItem
                                                    key='1'
                                                    label='Quản lý tài khoản'
                                                    className='account-menu'
                                                    url={routeConstants.ROUTE_ACCOUNT}
                                                />
                                                {profile.isAdmin ? <IndexItem
                                                    key='2'
                                                    label='Quản lý hệ thống'
                                                    className='account-menu'
                                                    url={routeConstants.ROUTE_ADMIN}
                                                /> : null}
                                                <IndexItem
                                                    key='3'
                                                    label='Đăng xuất'
                                                    className='account-menu'
                                                    onClick={() => this.handleLogout(profile.reloadUserData)}
                                                />
                                            </div>
                                        }
                                    />
                            }
                        </ProfileContext.Consumer>
                    </div>
                </div>
            </div >
        );
    }
}

export default PageHeader;