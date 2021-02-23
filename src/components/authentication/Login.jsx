import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label, FormFeedback } from "reactstrap";
import TopBarProgress from "react-topbar-progress-indicator";
import { loginValidator } from "../../validators";
import { Authenticate } from "../../store/actions";






TopBarProgress.config({
    barColors: {
        "0": "#13c800",
        "0.5": "#62ee49",
        "1.0": "#13c800"
    },
    shadowBlur: 5
});

const defaultState = {
    phone_number: "",
    password: "",
    error: {},
    isLoading: false,
};



let authenticate = new Authenticate()

class Login extends Component {
    state = defaultState;


    changeHandler = (e) => {
        this.setState(prevState => {
            let { error } = prevState

            if (error[e.target.name])
                delete error[e.target.name]

            return {
                [e.target.name]: e.target.value,
                error
            }
        });
    };


    submitHandler = async (e) => {
        e.preventDefault();
        let validate = loginValidator(this.state)
        if (!validate.isValid) {
            this.setState({ error: validate.error })
            return;
        }

        this.setState({ isLoading: true })

        let response = await authenticate.loginHandler(this.state)
        if (response) {
            this.setState(defaultState)
            this.props.history.push('/')
        }
        this.setState({ isLoading: false })
    }



    render() {
        let { phone_number, password, error, isLoading } = this.state;

        return (
            <section id="login-page">
                <div>{isLoading && <TopBarProgress />}</div>

                <Form onSubmit={this.submitHandler}>
                    <FormGroup>
                        <Label for="phone">
                            Phone Number<span className="text-danger">*</span>
                        </Label>
                        <Input
                            type="text"
                            placeholder="Type here..."
                            onChange={this.changeHandler}
                            name="phone_number"
                            value={phone_number}
                            required
                            invalid={error.phone_number ? true : false}
                        />
                        {error.phone_number && <FormFeedback>{error.phone_number}</FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">
                            Password<span className="text-danger">*</span>
                        </Label>
                        <Input
                            type="password"
                            placeholder="Type here..."
                            onChange={this.changeHandler}
                            name="password"
                            value={password}
                            required
                            invalid={error.password ? true : false}
                        />
                        {error.password && <FormFeedback>{error.password}</FormFeedback>}
                    </FormGroup>

                    <Button
                        color=""
                        className="site-btn-dark"
                        block
                        type="submit"
                        disabled={this.state.isLoading}
                    >
                        {
                            this.state.isLoading ? "Please Wait ..." : "Login"
                        }
                    </Button>
                </Form>
            </section>
        );
    }
}


export default Login