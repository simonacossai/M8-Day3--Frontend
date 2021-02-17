import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Label,
  Alert,
  Button,
} from "react-bootstrap";
import "./Login.css";
import { GiPadlockOpen } from "react-icons/gi";
import { Link, withRouter } from "react-router-dom";

class Login extends Component {
  viewpassword = () => {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  state = {
    user: {
      email: "",
      password: "",
    },
  };

  //updates the fields of the form
  updateUser = (e) => {
    let user = { ...this.state.user };
    let currentId = e.currentTarget.id;
    user[currentId] = e.currentTarget.value;
    this.setState({ user });
  };

        login = async (e) => {
            e.preventDefault();
            try {
                let response = await fetch(`http://localhost:3001/api/user/login`,
                    {
                        method: 'POST',
                        body: JSON.stringify(this.state.user),
                        headers: new Headers
                            ({
                            "Content-Type": "application/json"
                           })
                    })
                if (response.ok) {
                    let data = await response.json()
                    console.log(data)
                    let token= data.token;
                    localStorage.setItem('token',token)
                    localStorage.setItem('id', data._id)
                    this.setState({
                       user: {
                           email: '',
                           password: '',
                      }
                    })
                    this.props.history.push('/home')
                } else {
                    console.log('please check again')
                }
            } catch (e) {
                console.log(e)
                alert("email or password are incorrect")
            }
        }
      /*  componentDidMount() {
            let token = localStorage.getItem("token");
            if(token){
                this.props.history.push('/home')
            }
        }
    */
    render() {
        return (
            <div className="d-flex justify-content-center align-items-center login-div" style={{ flexDirection: "column" }}>
                <Container>
                    <Row className="text-center loginRow mt-5">
                   
                        <Col md={4} className="loginContainer text-left px-4">
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
                            <label htmlFor="password" className="text-left">Your password</label>
                            <InputGroup className="mb-1">
                                <InputGroup.Prepend >
                                    <InputGroup.Text id="email" ><GiPadlockOpen /></InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl type="password" id="password" placeholder="password"
                                   value={this.state.user.password}
                                   onChange={this.updateUser}/>
                            </InputGroup>
                            <div className="d-flex mb-3 mt-1">
                            <input type="checkbox" onClick={(e)=>this.viewpassword()} className="mr-2 mt-1 py-0"/><span className="login-p text-muted">Show Password</span>
                            </div>
                            <p className="text-muted login-p">By clicking join now you agree to the Linkedin User agreement, Privacy Policy, and Cookie Policy</p>
                            <Button  size="md" className="loginButton" active onClick={(e)=>this.login(e)}>
                               Log in                            </Button>{' '}
                            <div className="d-flex mt-2">
                                <hr></hr><span>OR</span><hr></hr>
                            </div>
                            <Link to="/register" style={{width:"100%"}}>
                            <Button  size="md" className="loginButton mt-2" active style={{width:"100%"}}>
                                Sign up
                            </Button>{' '}
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
  };


export default withRouter(Login);
