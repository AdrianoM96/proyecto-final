import { getCategories, getProductAdm } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";
import Link from "next/link";

interface Props {
  params: {
    name: string
  }
}

export default async function ProductPage({ params }: Props) {
  const { name } = params;

  const [product, categories] = await Promise.all([
    name === 'new' ? null : getProductAdm(name),
    getCategories()
  ]);



  if (!product && name !== 'new') {
    redirect('/');
  }

  const title = name === 'new' ? 'Nuevo producto' : 'Editar producto';

  return (
    <>
      <Title title={title} />
      <Link href="/admin/products" className="underline mb-5">
        <h2>Volver atrás</h2>
      </Link>
      <ProductForm product={product} categories={categories} />
    </>
  );
}
