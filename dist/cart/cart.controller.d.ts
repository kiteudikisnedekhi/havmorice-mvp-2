import { CartService } from './cart.service';
import { Request } from 'express';
interface AuthenticatedRequest extends Request {
    user: {
        userId: number;
    };
}
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart(body: {
        variantId: number;
        quantity: number;
        type: string;
    }, req: AuthenticatedRequest): Promise<{
        message: string;
    }>;
    removeFromCart(itemId: number): Promise<{
        message: string;
    }>;
    getCarts(req: AuthenticatedRequest): Promise<any[]>;
}
export {};
