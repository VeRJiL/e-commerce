import React from 'react';
import HomePage from './pages/homepage/homepage';
import { Switch, Route } from 'react-router-dom';
import ShopPage from './pages/shop/shop';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import Header from './components/header/header';
import { auth } from './firebase/firebase.utils';


class App extends React.Component {

  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({currentUser: user})
    });
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/siin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }

}

export default App;