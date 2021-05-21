import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
} from 'react';
import { User, UserRole, useUserQuery } from '../../__generated__';

export interface Auth {
  user?: User | null;
  hasRole: (role: UserRole) => boolean;
  requestStatus: 'idle' | 'error' | 'loading' | 'success';
}

export const AuthContext = createContext<Auth>({
  hasRole: () => false,
  requestStatus: 'idle',
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: PropsWithChildren<{}>) {
  const { data, status } = useUserQuery(
    {},
    {
      retry: (failureCount, error) => error.code !== 401 && failureCount < 3,
    },
  );

  const user = data?.user;

  const hasRole = useCallback(
    (role: UserRole) => {
      if (!user) {
        return false;
      }

      return user.roles.includes(role);
    },
    [user],
  );

  return (
    <AuthContext.Provider value={{ user, hasRole, requestStatus: status }}>
      {children}
    </AuthContext.Provider>
  );
}
