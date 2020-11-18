import React from "react";
import { connect } from "react-redux";

import { userLogin } from "../../redux/actions/user"

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Alert
} from "reactstrap";

import { Redirect } from "react-router-dom";

// untuk mengambil state yang kita define
const mapStateToProps = (state) => {
  return {
    tested: state.Login
  }
}

// untuk define aksi yang kita ingin lakukan di mapdispatch props
const mapDispatchToProps = (dispatch) => {
  return {
    loginCheck: (email, password) => dispatch(userLogin(email, password))
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {
        email : "",
        password : ""
      },
      completefield: true
    }
  }
  
  handleValueForms(value, event) {
    let fields = this.state.fields
    fields[value] = event.target.value
    this.setState({fields})
  }
  
  submitForm(e) {
    e.preventDefault()
    let { loginCheck } = this.props // take dispatch function for auth check
    if(!this.state.fields.email || !this.state.fields.password) {
      this.setState({ completefield: false})
    } else {
      loginCheck(this.state.fields.email, this.state.fields.password)
    }
  }
  
  render() {
    let { tested } = this.props // define state & actions menggunakan props
    console.log(tested)
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent">
              {(tested.failedAuth)? 
                <Alert color="danger">
                  Pengguna tidak ditemukan
                </Alert> : ""
              }
              {(!this.state.completefield)? 
                <Alert color="danger">
                  Silahkan isi data form dengan lengkap
                </Alert> : ""
              }
              {(tested.errorAuth)? 
                <Alert color="danger">
                  Login
                </Alert> : ""
              }
              {(tested.auth) ? window.location.reload(true)  : ""}
              {(tested.auth) ? <Redirect to="/admin/index"/> : ""}
              <div className="btn-wrapper text-center">
                <img alt="..." src={require("assets/img/brand/badegan_logo.png")} width={100} />
                {/*<Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={loginCheck}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/github.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Github</span>
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/google.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>*/}
              </div>
              <div className="text-muted text-center">
                <h4>Sign in</h4>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form" onSubmit={this.submitForm.bind(this)}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" name="email" type="email" autoComplete="new-email" value={this.state.fields.email} onChange={this.handleValueForms.bind(this, "email")}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" name="password" type="password" autoComplete="new-password" value={this.state.fields.password} onChange={this.handleValueForms.bind(this, "password")}/>
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit">
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Create new account</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
