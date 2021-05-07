import { PropsWithChildren } from 'react';
import { useQueryClient } from 'react-query';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { DataError } from '../../utils/fetcher';
import { UserQuery, UserRole, useUserQuery } from '../../__generated__';

interface ProtectedRouteProps {
  path?: string;
  requiredRoles?: UserRole[];
}

export default function ProtectedRoute({
  path,
  requiredRoles,
  children,
}: PropsWithChildren<ProtectedRouteProps>): JSX.Element | null {
  const location = useLocation();
  const queryClient = useQueryClient();

  const query = queryClient.getQueryState<UserQuery, DataError>(
    useUserQuery.getKey({}),
  );
  const user = query?.data?.user;

  if (query?.status === 'loading' || query?.status === 'idle') {
    return null;
  }

  if (!user) {
    return <Redirect to={`/login?redirect=${location.pathname}`} />;
  }

  const hasRequiredRoles = requiredRoles?.some((role) =>
    user.roles.includes(role),
  );

  if (requiredRoles && !hasRequiredRoles) {
    return <Redirect to={`/login?redirect=${location.pathname}`} />;
  }

  return <Route path={path}>{children}</Route>;
}
