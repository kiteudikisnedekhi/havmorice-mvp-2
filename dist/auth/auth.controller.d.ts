import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: {
        phone: string;
    }): Promise<{
        message: string;
    }>;
    verify(body: {
        phone: string;
        otp: string;
        referralCode?: string;
    }): Promise<{
        token: string;
        user: any;
    }>;
}
