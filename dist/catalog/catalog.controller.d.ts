import { CatalogService } from './catalog.service';
export declare class CatalogController {
    private readonly catalogService;
    constructor(catalogService: CatalogService);
    getProducts(): Promise<any[]>;
    getProduct(id: number, distance: number, floor: number): Promise<any>;
}
