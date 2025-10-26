"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
let CatalogService = class CatalogService {
    constructor() {
        this.pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
    }
    async getProducts() {
        const result = await this.pool.query('SELECT * FROM products');
        return result.rows;
    }
    async getProduct(id, distance = 0, floor = 0) {
        const product = await this.pool.query('SELECT * FROM products WHERE id = $1', [id]);
        const variants = await this.pool.query('SELECT * FROM product_variants WHERE product_id = $1', [id]);
        const fee = this.calculateFee(product.rows[0].delivery_fee_base, distance, floor);
        return Object.assign(Object.assign({}, product.rows[0]), { variants, deliveryFee: fee });
    }
    calculateFee(baseFee, distance, floor) {
        const freeKm = 2;
        const extraKmCharge = 5;
        const floorCharge = 10;
        return baseFee + Math.max(0, distance - freeKm) * extraKmCharge + floor * floorCharge;
    }
};
exports.CatalogService = CatalogService;
exports.CatalogService = CatalogService = __decorate([
    (0, common_1.Injectable)()
], CatalogService);
//# sourceMappingURL=catalog.service.js.map