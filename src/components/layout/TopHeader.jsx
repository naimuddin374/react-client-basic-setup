import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { Container, Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import logo from '../../assets/img/logo.png'
import { connect } from 'react-redux';
import { Authenticate } from '../../store/actions'



const authenticate = new Authenticate()
class TopHeader extends Component {
    state = {
        isOpen: false,
        isAuth: false
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.auth.isAuth === prevState.isAuth) return null
        return {
            isAuth: nextProps.auth.isAuth,
        }
    }


    toggle = () => {
        this.setState(prevState => {
            return { isOpen: !prevState.isOpen }
        });
    }

    logoutHandler = async () => {
        await authenticate.logoutHandler(this.props.history)
    }

    render() {
        let { wheelPosition: { clientY, deltaY } } = this.props
        let { isOpen, isAuth } = this.state

        return (
            <header id="header">
                <div className={(clientY > 100 && deltaY > 100) ? 'sticky-nav nav-wrapper' : 'nav-wrapper'} >
                    <Container className='p-0'>
                        <Navbar expand="md p-0">
                            <Link className='text-dark navbar-brand' to='/' style={{ color: '#eaeaea' }}>
                                <img src={logo} alt='logo' className='site-logo' />
                            </Link>
                            <NavbarToggler onClick={this.toggle}><i className='fa fa-bars' /></NavbarToggler>
                            <Collapse isOpen={isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <Link to="/about" className="nav-link">About</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/contact" className="nav-link">Contact</Link>
                                    </NavItem>
                                    {isAuth ?
                                        <>
                                            <NavItem >
                                                <Link to="/order" className="nav-link">Order</Link>
                                            </NavItem>
                                            <NavItem onClick={() => this.logoutHandler()}>
                                                <Link to="#" className="nav-link">Logout</Link>
                                            </NavItem>
                                        </> :
                                        <NavItem>
                                            <Link to="/login" className="nav-link">Login</Link>
                                        </NavItem>}
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </Container>
                </div>
            </header>
        )
    }
}

TopHeader.propTypes = {
    history: PropTypes.object.isRequired,
    wheelPosition: PropTypes.object
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps)(TopHeader) 