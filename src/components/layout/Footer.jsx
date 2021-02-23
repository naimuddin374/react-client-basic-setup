import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';



const Footer = () => {
    return (
        <footer id="footer">
            <Container>
                <Row>
                    <Col>
                        <h5 className="h5 font-nun">Social Network</h5>
                        <p className="font-size-1">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero aut ipsum corrupti perspiciatis ipsa quo ex temporibus eos eaque quibusdam?
                    </p>
                        <div className="d-flex">
                            <span> <a className="nav-link pl-0 text-dark" href="/#" ><i className="fab fa-twitter"></i></a></span>
                            <span><a className="nav-link text-dark" href="/#" ><i className="fab fa-telegram-plane"></i></a></span>
                            <span><a className="nav-link text-dark" href="/#" ><i className="fab fa-facebook-f"></i></a></span>
                            <span><a className="nav-link text-dark" href="/#" ><i className="fab fa-youtube"></i></a></span>
                        </div>
                    </Col>
                    <Col>
                        <div className="company pl-3 pt-2">
                            <h5 className="font-nun h5">Our Service</h5>
                            <div className="d-flex flex-column">
                                <Link to="/about" >About</Link>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="company pl-3 pt-2">
                            <h5 className="font-nun h5">Support</h5>
                            <div className="d-flex flex-column">
                                <Link to='/contact'>Contact</Link>
                                <Link to='/privacy-policy'>Privacy Policy</Link>
                                <Link to='/terms-condition'>Terms of Condition</Link>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="newsletter border text-center">
                            <h5 className="h5 font-nun">Stay Connected</h5>
                            <p className="font-size-1">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                            <div className="d-flex justify-content-center">
                                <input type="text" className="form-control" placeholder="Email" />
                            </div>
                            <button className="btn my-2">Sign Up</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}
export default Footer