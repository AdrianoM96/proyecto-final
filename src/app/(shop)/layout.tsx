import { Footer, Sidebar, TopMenu } from '@/components';

export default function ShopLayout( { children }: {
  children: React.ReactNode;
} ) {
  return (
    <main className="flex flex-col min-h-screen">
    <TopMenu />
    <Sidebar />

    <div className="flex-1 px-0 sm:px-10">
      {children}
    </div>

    <Footer />
  </main>
  );
}
