'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoShirtOutline, IoTicketOutline, IoBusinessOutline, IoClipboardOutline, IoReceiptOutline, IoDocumentTextOutline  } from 'react-icons/io5';
import { TbReportSearch } from "react-icons/tb";

import { useCartStore, useUIStore } from '@/store';
import { useAuth } from '@/components';



export const Sidebar = () => {

  const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
  const closeMenu = useUIStore(state => state.closeSideMenu);
  const clearCart = useCartStore(state => state.clearCart);

  const { logout, isAuthenticated, user } = useAuth()

  return (
    <div>
      {
        isSideMenuOpen && (
          <div
            className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"
          />

        )
      }

      {
        isSideMenuOpen && (
          <div
            onClick={closeMenu}
            className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
          />

        )
      }


      <nav
        className={
          clsx(
            "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
            {
              "translate-x-full": !isSideMenuOpen
            }
          )
        }>


        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeMenu()}
        />



        <div className="relative mt-14">

        </div>


        {
          isAuthenticated && (
            <>
              <Link
                href="/profile"
                onClick={() => closeMenu()}
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoPersonOutline size={30} />
                <span className="ml-3 text-xl">Perfil</span>
              </Link>

              <Link
                href="/orders"
                onClick={() => closeMenu()}
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoTicketOutline size={30} />
                <span className="ml-3 text-xl">Ordenes</span>
              </Link>

              <button
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                onClick={() => {
                  logout()
                  closeMenu(),
                    clearCart()
                  window.location.replace('/');
                }
                }

              >
                <IoLogOutOutline size={30} />
                <span className="ml-3 text-xl">Salir</span>
              </button>

            </>
          )
        }
        {!isAuthenticated && (

          <Link
            href="/auth/login"
            onClick={() => closeMenu()}
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl">Ingresar</span>
          </Link>
        )}



        <div className="w-full h-px bg-gray-200 my-10" />

        {
          user?.role === "admin" && (
            <>

              <Link
                href="/admin/products"
                onClick={() => closeMenu()}
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoShirtOutline size={30} />
                <span className="ml-3 text-xl">Productos</span>
              </Link>

              <Link
                href="/admin/orders"
                onClick={() => closeMenu()}
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoTicketOutline size={30} />
                <span className="ml-3 text-xl">Ordenes</span>
              </Link>

              <Link
                href="/admin/users"
                onClick={() => closeMenu()}
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoPeopleOutline size={30} />
                <span className="ml-3 text-xl">Usuarios</span>
              </Link>

              <Link
                href="/admin/reports"
                onClick={() => closeMenu()}
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <TbReportSearch size={30} />
                <span className="ml-3 text-xl">Reportes</span>
              </Link>
              <Link
                href="/admin/company"
                onClick={() => closeMenu()}
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoReceiptOutline     size={30} />
                <span className="ml-3 text-xl">Datos fiscales</span>
              </Link>
          
            </>
            
          )
        }

      </nav>
    </div>
  );
};