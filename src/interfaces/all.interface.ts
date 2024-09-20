export interface Country {
  _id: string;
  name: string;
}

export interface OrderAddress {
  _id: string;
  address: string;
  address2: string;
  city: string;
  country: Country; 
  firstName: string;
  lastName: string;
  order: string; 
  phone: string;
  postalCode: string;
}

  
  export interface ProductImage {
    _id: string;
    url: string; 
  }
  
  export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    images: ProductImage[]; 
    
  }
  
  
  export interface OrderItem {
    _id: string;
    order: string;
    price: number;
    product: Product;
    quantity: number;
    size: string; 
  }
  
  export interface User {
    _id: string;
    address: string[]; 
    email: string;
    name: string;
    orders: string[]; 
    password: string; 
    role: string;
    __v: number; 
  }
  
  export interface Order {
    _id: string;
    subTotal: number;
    tax: number;
    total: number;
    itemsInOrder: number;
    createdAt: string; 
    isPaid: boolean;
    orderAddress: OrderAddress;
    orderItems: OrderItem[];
    updatedAt: string; 
    user: User;
    __v: number; 
  }
  
  