export declare class AuthService {
    private pool;
    sendOtp(phone: string): Promise<{
        message: string;
    }>;
    verifyOtp(phone: string, otp: string, referralCode?: string): Promise<{
        token: string;
        user: any;
    }>;
}
