import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  private token: string | null;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  getProfile(): JwtPayload | null {
    if (!this.token) return null;
    return jwtDecode<JwtPayload>(this.token);
  }

  loggedIn(): boolean {
    return !!this.token;
  }

  isTokenExpired(token: string): boolean {
    const decodedToken = jwtDecode<JwtPayload>(token);
    const expirationTime = decodedToken.exp ? decodedToken.exp * 1000 : 0;
    return expirationTime < Date.now();
  }

  getToken(): string | null {
    return this.token;
  }

  login(idToken: string): void {
    localStorage.setItem('token', idToken);
    this.token = idToken;
    window.location.href = '/';
  }

  logout(): void {
    localStorage.removeItem('token');
    this.token = null;
    window.location.href = '/login';
  }
}

export default new AuthService();