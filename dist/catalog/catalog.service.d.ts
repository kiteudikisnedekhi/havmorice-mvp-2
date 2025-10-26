export declare class CatalogService {
    private pool;
    getProducts(): Promise<any[]>;
    getProduct(id: number, distance?: number, floor?: number): Promise<any>;
    private calculateFee;
}
