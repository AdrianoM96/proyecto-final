'use client'

import { Title, useAuth } from "@/components";
import { AddressForm } from "./ui/AddressForm";

import { getCountries, getUserAddress } from "@/actions";
import { useEffect, useState } from "react";


export default function AddressPage() {

  const { user } = useAuth();

  const [countries, setCountries] = useState([]);
  const [userAddress, setUserAddress] = useState(undefined);

  useEffect(() => {
    const getData = async () => {


      setCountries(await getCountries())
      setUserAddress(await getUserAddress(user?._id ?? ""))


    }
    getData();
  }, [user?._id])

  if (!user) {
    return (
      <h3 className="text-5xl">500 -  No hay sesión de usuario</h3>
    )
  }

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <AddressForm countries={countries} userStoredAddress={userAddress} />
      </div>
    </div>
  );
}
