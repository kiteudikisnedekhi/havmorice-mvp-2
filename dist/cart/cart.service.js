"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
let CartService = class CartService {
    constructor() {
        this.pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
    }
    async addToCart(userId, variantId, quantity, type) {
        const variant = await this.pool.query('SELECT stock FROM product_variants WHERE id = $1', [variantId]);
        if (variant.rows[0].stock < quantity)
            throw new Error('Out of stock');
        let cart = await this.pool.query('SELECT id FROM carts WHERE user_id = $1 AND type = $2', [userId, type]);
        if (cart.rows.length === 0) {
            cart = await this.pool.query('INSERT INTO carts (user_id, type) VALUES ($1, $2) RETURNING id', [userId, type]);
        }
        const cartId = cart.rows[0].id;
        await this.pool.query('INSERT INTO cart_items (cart_id, variant_id, quantity) VALUES ($1, $2, $3)', [cartId, variantId, quantity]);
        return { message: 'Added to cart' };
    }
    async removeFromCart(itemId) {
        await this.pool.query('DELETE FROM cart_items WHERE id = $1', [itemId]);
        return { message: 'Removed from cart' };
    }
    async getCarts(userId) {
        const carts = await this.pool.query('SELECT * FROM carts WHERE user_id = $1', [userId]);
        for (const cart of carts.rows) {
            cart.items = await this.pool.query('SELECT * FROM cart_items WHERE cart_id = $1', [cart.id]);
        }
        return carts.rows;
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)()
], CartService);
//# sourceMappingURL=cart.service.js.map