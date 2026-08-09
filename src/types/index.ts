export interface User {
  id: number;
  name: string;
  email: string;
  role: 'contributor' | 'maintainer';
  created_at: string;
  updated_at: string;
}

export interface Reporter {
  id: number;
  name: string;
  role: 'contributor' | 'maintainer';
}

export interface Issue {
  id: number;
  title: string;
  description: string;
  type: 'bug' | 'feature_request';
  status: 'open' | 'in_progress' | 'resolved';
  reporter: Reporter;
  reporter_id?: number;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface IssuesResponse {
  success: boolean;
  data: Issue[];
}

export interface IssueResponse {
  success: boolean;
  data: Issue;
  message?: string;
}

export type IssueType = 'bug' | 'feature_request';
export type IssueStatus = 'open' | 'in_progress' | 'resolved';
export type UserRole = 'contributor' | 'maintainer';
