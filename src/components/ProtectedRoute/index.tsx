import { PropsWithChildren } from 'react';
import { RiForbidLine } from 'react-icons/ri';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { UserRole } from '../../__generated__';
import { useAuth } from '../AuthProvider';
import MessageCard from '../Message/MessageCard';

interface ProtectedRouteProps {
  path?: string;
  exact?: boolean;
  requiredRoles?: UserRole[];
}

export default function ProtectedRoute({
  path,
  exact,
  requiredRoles,
  children,
}: PropsWithChildren<ProtectedRouteProps>): JSX.Element | null {
  const location = useLocation();

  const { user, requestStatus, hasRole } = useAuth();

  if (requestStatus === 'loading' || requestStatus === 'idle') {
    return null;
  }

  if (!user) {
    return <Redirect to={`/login?redirect=${location.pathname}`} />;
  }

  const hasRequiredRoles = requiredRoles?.some((role) => hasRole(role));

  if (requiredRoles && !hasRequiredRoles) {
    return (
      <div className="flex h-full items-center justify-center">
        <MessageCard title="Access Denied" icon={RiForbidLine} negative>
          You do not have permissions to access this page.
        </MessageCard>
      </div>
    );
  }

  return (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  );
}
