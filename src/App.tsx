import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LogoutButton from './components/LogoutButton';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import { DataError } from './utils/fetcher';
import { UserQuery, useUserQuery } from './__generated__';

function App() {
  useUserQuery<UserQuery, DataError>(
    {},
    {
      retry: (failureCount, error) => error.code !== 401 && failureCount < 3,
    },
  );

  return (
    <div className="App bg-gray-900 h-screen box-border">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/reset">
            <ResetPassword />
          </Route>
          <ProtectedRoute path="/">
            <LogoutButton />
          </ProtectedRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
