import { Hub } from "./hub";
import { Product } from "./product";

export interface Vendor{ 
    id: number,
    name: string,
    description: string,
    hub: Hub['id'],
    products: Product[],
    totalProducts: number,
}