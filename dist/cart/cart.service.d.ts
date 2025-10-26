export declare class CartService {
    private pool;
    addToCart(userId: number, variantId: number, quantity: number, type: string): Promise<{
        message: string;
    }>;
    removeFromCart(itemId: number): Promise<{
        message: string;
    }>;
    getCarts(userId: number): Promise<any[]>;
}
