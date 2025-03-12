import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

// ユーザータイプの定義
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// 認証コンテキストの型定義
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

// デフォルト値を持つ認証コンテキストの作成
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  register: async () => false,
});

// 認証プロバイダーコンポーネント
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 初期化時にローカルストレージからユーザー情報を取得
  useEffect(() => {
    const storedUser = localStorage.getItem('timedrop-user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        localStorage.removeItem('timedrop-user');
      }
    }
  }, []);

  // ログイン処理
  const login = async (email: string, password: string): Promise<boolean> => {
    // モックユーザーデータ
    if (email && password) {
      const mockUser: User = {
        id: '1',
        name: 'テストユーザー',
        email: email,
        avatar: 'https://i.pravatar.cc/150?u=' + email,
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('timedrop-user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  // ログアウト処理
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('timedrop-user');
  };

  // 登録処理
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    if (name && email && password) {
      const mockUser: User = {
        id: '1',
        name: name,
        email: email,
        avatar: 'https://i.pravatar.cc/150?u=' + email,
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('timedrop-user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// 認証フックの作成
export const useAuth = () => useContext(AuthContext);