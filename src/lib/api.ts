const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
}

class ApiService {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('authToken');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.error || `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      return { data };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // Authentication methods
  async login(credentials: LoginData): Promise<ApiResponse<AuthResponse>> {
    const response = await this.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.data) {
      this.token = response.data.token;
      localStorage.setItem('authToken', response.data.token);
    }

    return response;
  }

  async signup(userData: SignupData): Promise<ApiResponse<AuthResponse>> {
    const response = await this.request<AuthResponse>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.data) {
      this.token = response.data.token;
      localStorage.setItem('authToken', response.data.token);
    }

    return response;
  }

  async getCurrentUser(): Promise<ApiResponse<{ user: User }>> {
    return this.request<{ user: User }>('/api/auth/me');
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  // File upload methods
  async uploadFile(file: File): Promise<ApiResponse<any>> {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.baseUrl}/api/upload/single`;
    
    const headers: HeadersInit = {};
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.error || `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      return { data };
    } catch (error) {
      console.error('File upload failed:', error);
      return {
        error: error instanceof Error ? error.message : 'Upload failed',
      };
    }
  }

  async uploadMultipleFiles(files: File[]): Promise<ApiResponse<any>> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    const url = `${this.baseUrl}/api/upload/multiple`;
    
    const headers: HeadersInit = {};
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.error || `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      return { data };
    } catch (error) {
      console.error('Multiple file upload failed:', error);
      return {
        error: error instanceof Error ? error.message : 'Upload failed',
      };
    }
  }

  // General API methods
  async getStatus(): Promise<ApiResponse<any>> {
    return this.request('/api/status');
  }

  async getProtectedData(): Promise<ApiResponse<any>> {
    return this.request('/api/protected');
  }

  async getProfile(): Promise<ApiResponse<any>> {
    return this.request('/api/profile');
  }

  async updateProfile(profileData: { name?: string; email?: string }): Promise<ApiResponse<any>> {
    return this.request('/api/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async getData(): Promise<ApiResponse<any>> {
    return this.request('/api/data');
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<any>> {
    return this.request('/health');
  }

  // Utility methods
  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }
}

export const apiService = new ApiService(API_BASE_URL);
export type { User, LoginData, SignupData, AuthResponse, ApiResponse }; 