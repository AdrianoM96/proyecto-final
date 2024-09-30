export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images:any;
  subCategory?:{} 
  stocks: {
    _id: string;
    size: {
      _id: string;
      name: string;
    };
    quantity: number;
    product: string;
  }[];
  slug?: string;
  tags?: string[];
  title?:string
  type?: Type;
  gender?: Category
  sizes?:string
  category:any
  isPaused?:boolean
}

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
}


export interface ProductImage {
  id: number;
  url: string;
  productId: string;
}


type Category = 'men'|'women'|'kid'|'unisex';
export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type Type = 'shirts'|'pants'|'hoodies'|'hats';