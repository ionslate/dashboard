import { useQueryClient } from 'react-query';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import { DataError } from './utils/fetcher';
import { useLogoutMutation, UserQuery, useUserQuery } from './__generated__';

function App() {
  const queryClient = useQueryClient();
  useUserQuery<UserQuery, DataError>(
    {},
    {
      retry: (failureCount, error) => error.code !== 401 && failureCount < 3,
    },
  );

  const { mutate: logout } = useLogoutMutation({
    onSuccess: () => {
      queryClient.removeQueries(useUserQuery.getKey({}));
    },
  });

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <ProtectedRoute path="/">
            <button onClick={() => logout({})}>LOGOUT</button>
          </ProtectedRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
