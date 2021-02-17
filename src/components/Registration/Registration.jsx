import React, { Component } from 'react'
import { Container, Row, Col, InputGroup, FormControl, Label, Button, Alert} from 'react-bootstrap';
import { GiPadlockOpen } from 'react-icons/gi';
import { FaUserAlt, FaGraduationCap } from 'react-icons/fa'
import './Registration.css'
import { Link, withRouter } from 'react-router-dom'

class Registration extends Component {
    viewpassword = () => {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }
    
    state = {
        user: {
            name: '',
            surname: '',
            email: '',
            password: '',
            username: ''
        },
    }
    updateUser = (e) => {
        let user = { ...this.state.user }
        let currentId = e.currentTarget.id
        user[currentId] = e.currentTarget.value
        this.setState({ user })
    }
    Registration = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch(`http://localhost:3001/api/user/register`, {
                method: 'POST',
                body: JSON.stringify(this.state.user),
                headers: new Headers
                    ({
                        "Content-Type": "application/json"
                    })
            })
            if (response.ok) {
                alert('New user registered!')
                this.props.history.push("/");
                console.log("aaaaaaaaaaaaa")
                this.setState({
                    user: {
                        name: '',
                        surname: '',
                        email: '',
                        password: '',
                        username: ''
                    }
                })
            } else {
                console.log('please check again')
            }
        } catch (e) {
            console.log(e)

        }
    }
    render() {
        return (
            <div className="d-flex justify-content-center align-items-center mb-4 mt-5" style={{ flexDirection: "column" }}>
                <Container>
                    {this.state.success && <Alert variant="primary">
                        successfully registered!
                    </Alert>}
                    {this.state.error && <Alert variant="danger" >
                       OOPS something went wrong! Try again later
                    </Alert>}
                    <Row className="text-center loginRow mt-2">
                        <Col md={6} className="RegistrationContainer text-left px-5 py-3 mt-0">
                            <Row>
                                <label htmlFor="name" className="text-left">Your name</label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend >
                                        <InputGroup.Text id="name"><FaUserAlt /></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="name"
                                        aria-label="name"
                                        id="name"
                                        aria-describedby="basic-addon1"
                                        value={this.state.user.name}
                                        onChange={this.updateUser}
                                    />
                                </InputGroup>
                                <label htmlFor="surname" className="text-left">Your surname</label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend >
                                        <InputGroup.Text id="surname"><FaUserAlt /></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="surname"
                                        aria-label="surname"
                                        id="surname"
                                        aria-describedby="basic-addon1"
                                        value={this.state.user.surname}
                                        onChange={this.updateUser}
                                    />
                                </InputGroup>
                                <label htmlFor="email" className="text-left">Your email</label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend >
                                        <InputGroup.Text id="email">@</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="email"
                                        aria-label="email"
                                        id="email"
                                        aria-describedby="basic-addon1"
                                        value={this.state.user.email}
                                        onChange={this.updateUser}
                                    />
                                </InputGroup>
                                <label htmlFor="username" className="text-left">Your username</label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend >
                                        <InputGroup.Text id="username"><FaUserAlt /></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="username"
                                        aria-label="username"
                                        id="username"
                                        aria-describedby="basic-addon1"
                                        value={this.state.user.username}
                                        onChange={this.updateUser}
                                    />
                                </InputGroup>
                                <label htmlFor="password" className="text-left">Your password</label>
                                <InputGroup className="mb-1">
                                    <InputGroup.Prepend >
                                        <InputGroup.Text ><GiPadlockOpen /></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl type="password" id="password" placeholder="password"
                                        value={this.state.user.password}
                                        onChange={this.updateUser} />
                                </InputGroup>
                                <div className="d-flex mb-3 mt-1">
                                    <input type="checkbox" onClick={(e) => this.viewpassword()} className="mr-2 mt-1 py-0" /><span className="login-p text-muted">Show Password</span>
                                </div>
                            </Row>
                            <Container>
                                <Row className="text-center loginRow mt-2">
                                    <Col md={8}>
                                        <Button size="md" className="loginButton" style={{ width: "100%" }} active onClick={(e) => this.Registration(e)}>
                                            Sign up
                                    </Button>{' '}
                                        <div className="d-flex mt-2">
                                            <hr></hr><span>OR</span><hr></hr>
                                        </div>
                                        <Link to="/">
                                            <Button size="md" className="loginButton mt-2" active style={{ width: "100%" }}>
                                                Log in
                                    </Button>{' '}
                                        </Link>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>

                    </Row>
                </Container>
            </div>
        )
    }
}
export default withRouter(Registration); 