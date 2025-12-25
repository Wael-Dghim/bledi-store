export interface ProductImage {
    sm: string;
    md: string;
    lg: string;
}

export interface Upsell {
    _id: string;
    html: string;
    offer: string | null;
    priority: number;
}

export interface Product {
    _id: string;
    name: string;
    slug: string;
    reference: number;
    description: string;
    images: ProductImage[];
    price: number;
    comparePrice: number;
    deliveryPrice: number;
    discounts: any[];
    variants: any[];
    clientCombinations: Record<string, any>;
    defaultCombination: any[];
    fakeStock: number;
    fakeViews: number;
    fakePeriod: number;
    reviews: any[];
    relatedProducts: any[];
    categories: string[];
    extraFields: any | null;
    status: 'shown' | 'hidden';
    applicableCoupons: any | null;
    templateValues: Record<string, any>;
    integrationValues: any | null;
    upsell: Upsell;
    upsells: any[];
}

export interface ApiResponse {
    data: Product[];
    count: number;
    success: boolean;
}
