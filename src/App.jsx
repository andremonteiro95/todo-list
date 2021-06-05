import { CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import store from './redux';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Navbar from './components/layout/Navbar';
import PublicRoute from './router/PublicRoute';
import PrivateRoute from './router/PrivateRoute';
import ProjectGrid from './components/projects/ProjectGrid';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <CssBaseline />
        <Navbar />
        <Switch>
          <PublicRoute path="/login">
            <Login />
          </PublicRoute>
          <PublicRoute path="/signup">
            <SignUp />
          </PublicRoute>
          <PrivateRoute path="/">
            <ProjectGrid />
          </PrivateRoute>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
