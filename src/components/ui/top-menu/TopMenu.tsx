"use client";

import { useEffect, useState, useRef } from 'react';
import Link from "next/link";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
import { titleFont } from "@/config/fonts";
import { useCartStore, useUIStore } from "@/store";
import { useRouter } from 'next/navigation';
import { addSearchHistory, getCategories, getSearchHistory } from '@/actions';
import { useAuth } from '@/components';
import Cookies from 'js-cookie';

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  
  const [loaded, setLoaded] = useState(false);
  const router = useRouter(); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [categories, setCategories] = useState<any>([]); 
  const [showHistory, setShowHistory] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);

 
  const cookie = Cookies.get();
  const {user} = useAuth()

  const fetchSearchHistory = async () => {
    if (user?._id) {
      const response = await getSearchHistory(user._id);
      setSearchHistory(response);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
      setLoaded(true);
    };
    fetchCategories();
    fetchSearchHistory();

    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowHistory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await addSearchHistory(
        user?._id,
        searchQuery.trim(),
        cookie.token
      );
      router.push(`/search?search=${encodeURIComponent(searchQuery.trim())}`);
      
    
      await fetchSearchHistory();
    } else {
      router.push('/');
    }
    setShowHistory(false);
  };

  const handleHistoryItemClick = async (item: string) => {
    setSearchQuery(item);
    setShowHistory(false);
    router.push(`/search?search=${encodeURIComponent(item.trim())}`);
    
    
    await addSearchHistory(
      "66fad38519726c10d52d8d46",
      item.trim(),
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXIiOnsiaWQiOiI2NmZhZDM4NTE5NzI2YzEwZDUyZDhkNDYiLCJyb2xlIjoiYWRtaW4ifX0sImlhdCI6MTcyOTIwNTI2MCwiZXhwIjoxNzMxNzk3MjYwfQ.QW66uRNMd0FAhiqELUEpuMeh965H4ekoYlRApUMpc0w"
    );
    await fetchSearchHistory();
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
          Invictus
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
        <div className="relative" ref={searchContainerRef}>
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              className="border rounded-md p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowHistory(true)}
            />
            <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
              <IoSearchOutline className="w-5 h-5" />
            </button>
          </form>
          {showHistory && searchHistory.length > 0 && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-white border rounded-md shadow-lg z-10">
              <ul className="py-1">
                {searchHistory.slice(0, 5).map((item, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleHistoryItemClick(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

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

