export interface ItemType {
    name: string;
    price: number;
    _id: string;
}

export interface OrderItemType extends ItemType {
    aggregatedPrice: number;
    quantity: number;
}

export interface OrderType {
    fullname: string;
    phoneNumber: number;
    items: [
        OrderItemType
    ];
    subtotal: number;
}