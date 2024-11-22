import { Vendor } from "./vendor"
import { Address } from "cluster"

export interface Hub{
    id: number,
    name: string,
    location: Address,
    vendors: Vendor[],
    totalVendors: number
}