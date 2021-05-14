import { VscSearchStop } from 'react-icons/vsc';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthProvider from './components/AuthProvider';
import Layout from './components/Layout';
import MessageCard from './components/Message/MessageCard';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <div className="App bg-gray-900 text-gray-100 h-screen box-border">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/reset">
              <ResetPassword />
            </Route>
            <ProtectedRoute
              path="/"
              requiredRoles={[
                'CONTENT_MANAGER',
                'CONTENT_PUBLISHER',
                'USER_ADMIN',
              ]}
            >
              <Layout>
                <Switch>
                  <Route path="/" exact>
                    Dashboard
                  </Route>
                  <ProtectedRoute
                    requiredRoles={['CONTENT_MANAGER']}
                    path="/content/armies"
                  >
                    Armies
                  </ProtectedRoute>
                  <ProtectedRoute
                    requiredRoles={['CONTENT_MANAGER']}
                    path="/content/entries"
                  >
                    Entries
                  </ProtectedRoute>
                  <ProtectedRoute
                    requiredRoles={['CONTENT_MANAGER']}
                    path="/content/units"
                  >
                    Units
                  </ProtectedRoute>
                  <ProtectedRoute
                    requiredRoles={['CONTENT_MANAGER']}
                    path="/content/weapons"
                  >
                    Weapons
                  </ProtectedRoute>
                  <ProtectedRoute
                    requiredRoles={['CONTENT_MANAGER']}
                    path="/content/hacking"
                  >
                    Hacking
                  </ProtectedRoute>
                  <ProtectedRoute
                    requiredRoles={['CONTENT_MANAGER']}
                    path="/files/images"
                  >
                    Images
                  </ProtectedRoute>
                  <ProtectedRoute requiredRoles={['USER_ADMIN']} path="/users">
                    Users
                  </ProtectedRoute>
                  <Route>
                    <div className="flex h-full items-center justify-center">
                      <MessageCard title="Not Found" icon={VscSearchStop}>
                        This page does not exist. Please check the address and
                        try again.
                      </MessageCard>
                    </div>
                  </Route>
                </Switch>
              </Layout>
            </ProtectedRoute>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
