import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ProductInput {
    featured: boolean;
    name: string;
    description: string;
    variants: Array<Variant>;
    stock: bigint;
    imageUrl: string;
    category: Category;
    price: bigint;
}
export interface OrderItem {
    productId: ProductId;
    quantity: bigint;
    unitPrice: bigint;
    variant: Variant;
}
export interface Variant {
    color?: string;
    size?: string;
}
export type ProductId = bigint;
export interface Order {
    status: OrderStatus;
    total: bigint;
    userId: Principal;
    orderId: bigint;
    shippingAddress: string;
    items: Array<OrderItem>;
}
export interface Product {
    id: ProductId;
    featured: boolean;
    name: string;
    description: string;
    variants: Array<Variant>;
    stock: bigint;
    imageUrl: string;
    category: Category;
    price: bigint;
}
export type Category = string;
export enum OrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    pending = "pending",
    delivered = "delivered"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(product: ProductInput): Promise<ProductId>;
    addToCart(productId: ProductId, variant: Variant, quantity: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    deleteProduct(productId: ProductId): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Array<[ProductId, Variant, bigint]>>;
    getCategories(): Promise<Array<Category>>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getMyOrders(): Promise<Array<Order>>;
    getOrder(orderId: bigint): Promise<Order>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    isCallerAdmin(): Promise<boolean>;
    placeOrder(shippingAddress: string): Promise<bigint>;
    removeFromCart(productId: ProductId, variant: Variant): Promise<void>;
    searchProducts(searchTerm: string): Promise<Array<Product>>;
    updateCartItem(productId: ProductId, variant: Variant, quantity: bigint): Promise<void>;
    updateProduct(productId: ProductId, updatedProduct: ProductInput): Promise<void>;
}
