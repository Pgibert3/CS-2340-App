import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import {Text} from 'react-native';

class App extends Component {
    render() {
        return (
            <Text>HiThereQQWEEQF</Text>
        );
    }

    // getPage(page) {
    //     switch (page) {
    //         case 'WELCOME_PAGE':
    //             return(<WelcomePage />);
    //         case 'LOGIN_PAGE':
    //             return (<LoginPage />);
    //         default:
    //             return (<Text>Error 404</Text>);
    //     }
    // }
}

const mapStateToProps = (state) => {
    return ({
        page: state.page,
    });
}

const mapDispatchToProps = (dispatch) => {
    return null;
}

export default connect(mapStateToProps, mapDipatchToProps)(App);
