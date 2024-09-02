export interface IUserSliceState {
    userInfo: AuthResponseUser | null,
    status: 'idle' | 'loading' | 'succeeded' | 'failed' | string,
    error: null | string;
}
export interface LoginCredits {
    email: string;
    password: string;
}
export interface AuthResponse {
    payload: {
        success: boolean;
        data?: AuthResponseUser| null;
        message: string;
    }
}
export interface AuthResponseUser {
    _id?: string;
    email?: string;
    username?: string;
    dates?: any[],
    avatar?: string;
    isSuperAdmin?: boolean;
    country?: string;
    accessToken?: string | null;
    recoveryToken?: string | null;
    emailVerified?: boolean;
    fullname?: string;
    lastGeneratedEmailConfirmation?: string;
}

export interface RegisterCredits {
    username: string;
    email: string;
    password: string;
}

export interface AccessTokenCredits {
    accessToken: string | null;
}