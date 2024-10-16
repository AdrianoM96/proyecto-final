"use client";

import { useEffect, useState } from 'react';
import Link from "next/link";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
import { titleFont } from "@/config/fonts";
import { useCartStore, useUIStore } from "@/store";
import { useRouter } from 'next/navigation';
import { getCategories } from '@/actions';

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  
  const [loaded, setLoaded] = useState(false);
  const router = useRouter(); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [categories, setCategories] = useState<any>([]); 

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
      setLoaded(true);
    };
    fetchCategories();
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?search=${searchQuery.trim()}`);
    } else {
      router.push('/');
    }
  };

  const renderArrow = (hasSubcategories: boolean) => {
    if (hasSubcategories) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 inline-block ml-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 9l7 7 7-7" />
        </svg>
      );
    }
    return null;
  };
  

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            Proyecto final
          </span>
          <span> </span>
        </Link>
      </div>

      <div className="hidden sm:flex space-x-4">
       
        <div className="relative group">
          <Link
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
            href="/gender/men"
          >
            Hombres {renderArrow(categories.some((category:any) => category.products.some((product:any) => product.gender === 'men')))}
          </Link>

          <div className="absolute left-0 bg-white shadow-lg rounded-md mt-1 invisible group-hover:visible group-hover:opacity-100 opacity-0 transition-opacity duration-300">
            {categories
              .filter((category: any) =>
                category.products.some((product: any) => product.gender === 'men')
              )
              .map((category: any) => (
                <Link
                  key={category._id}
                  href={`/gender/men/${category.name.toLowerCase()}`}
                  className="block px-4 py-2 text-sm hover:bg-gray-200"
                >
                  {category.name}
                </Link>
              ))}
          </div>
        </div>

        <div className="relative group">
          <Link
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
            href="/gender/women"
          >
            Mujeres {renderArrow(categories.some((category:any) => category.products.some((product:any) => product.gender === 'women')))}
          </Link>

          <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-1">
            {categories
              .filter((category: any) =>
                category.products.some((product: any) => product.gender === 'women')
              )
              .map((category: any) => (
                <Link
                  key={category._id}
                  href={`/gender/women/${category.name.toLowerCase()}`}
                  className="block px-4 py-2 text-sm hover:bg-gray-200"
                >
                  {category.name}
                </Link>
              ))}
          </div>
        </div>

      
        <div className="relative group">
          <Link
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
            href="/gender/kid"
          >
            Niños {renderArrow(categories.some((category:any) => category.products.some((product:any) => product.gender === 'kid')))}
          </Link>

          <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-1">
            {categories
              .filter((category: any) =>
                category.products.some((product: any) => product.gender === 'kid')
              )
              .map((category: any) => (
                <Link
                  key={category._id}
                  href={`/gender/kid/${category.name.toLowerCase()}`}
                  className="block px-4 py-2 text-sm hover:bg-gray-200"
                >
                  {category.name}
                </Link>
              ))}
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            className="border rounded-md p-1"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="ml-2">
            <IoSearchOutline className="w-5 h-5" />
          </button>
        </form>

        <Link href={totalItemsInCart === 0 ? '/empty' : "/cart"} className="mx-2">
          <div className="relative">
            {loaded && totalItemsInCart > 0 && (
              <span className="fade-in absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                {totalItemsInCart}
              </span>
            )}
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button
          onClick={openSideMenu}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menú
        </button>
      </div>
    </nav>
  );
};
