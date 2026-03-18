export interface AuthTokenDTO {
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface DashboardStatsDTO {
  profileId: string;
  totalViews: number;
  totalClicks: number;
  clickThroughRate: number;
  clicksPerWidget: Record<string, number>;
}

export interface CheckoutResponse {
  checkoutUrl: string;
}

export interface ImageUploadResponse {
  url: string;
}

export interface LeadDTO {
  id: string;
  widgetId: string;
  widgetTitle: string;
  email: string;
  fields: Record<string, string>;
  capturedAt: string;
}
