import { Component } from "react";
import JwtAuthService from "services/JwtAuthService";
import { Spin, Alert, Card, Row, Col } from 'antd';
import { connect } from "react-redux";
const backgroundStyle = {
    backgroundImage: 'url(/img/others/img-17.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
}
class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        this.state = {
            verificationToken: params.get("token"),
            error: false,
            errorMessage: "",
            loaded: false
        }

    }
    async componentDidMount() {
        try {
            const temp = await JwtAuthService.verifyEmail(this.state.verificationToken);
            this.setState({
                verificationToken: temp,
                loaded: true,
                error: false
            })
        } catch (err) {
            this.setState({
                error: true,
                errorMessage: err.message,
                loaded: true
            })
        }

    }
    render() {
        const message = this.state.loaded === false ?
            <div><Spin></Spin></div> : (
                this.state.error === false ? <Alert
                    message="Success"
                    description="Email has been verified."
                    type="success"
                /> :
                    <div className="container-fluid">

                        <Alert
                            message="ERROR"
                            description={this.state.errorMessage}
                            type="error"
                        />
                    </div>
            )
        const container = <div className="h-100" style={backgroundStyle}>
            <div className="container d-flex flex-column justify-content-center h-100">
                <Row justify="center">
                    <Col xs={20} sm={20} md={20} lg={7}>
                        <Card>
                            <div className="text-center">
                                <img className="img-fluid" src={`/img/${this.props.currentTheme === 'light' ? 'logo.png' : 'logo-white.png'}`} alt="" />
                            </div>
                            {message}
                            <div className="text-left m-2 mt-4">
                                <p>Return to  <a href="/auth/login">Sign In</a></p>
                            </div>
                        </Card>
                    </Col>
                </Row></div>
        </div>
        return (container);
    }
}


const mapStateToProps = ({ theme }) => {
    const { currentTheme } = theme;
    return { currentTheme }
};

export default connect(mapStateToProps)(VerifyEmail);