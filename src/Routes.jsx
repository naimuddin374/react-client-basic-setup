import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import history from './utils/history';

// IMPORT COMPONENT
import Home from "./components/home";
import PageNotFound from "./components/pages/PageNotFound";
import TopHeader from './components/layout/TopHeader';
import Footer from './components/layout/Footer'
import Login from './components/authentication/Login'
import { connect } from 'react-redux';




class Routes extends Component {
    state = {
        wheelPosition: {},
        isAuth: false
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.auth.isAuth === prevState.isAuth) return null
        return {
            isAuth: nextProps.auth.isAuth,
        }
    }

    render() {
        let { wheelPosition, isAuth } = this.state

        return (
            <Router>
                <TopHeader history={history} wheelPosition={wheelPosition} />
                <main id="site-main" onWheel={(e) => this.setState({ wheelPosition: e })}>
                    <Switch>
                        <Route path="/login" exact component={Login} history={history} />
                        <Route path="/" exact component={Home} history={history} />
                        <Route path="/*" exact component={Home} history={history} />
                        {/* <Route path="/*" exact component={PageNotFound} history={history} /> */}
                    </Switch>
                </main>
                <Footer />
            </Router>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps)(Routes) 