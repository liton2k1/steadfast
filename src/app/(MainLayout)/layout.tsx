import CategoriesBar from "@/components/CategoriesBar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/lib/Providers/Providers";
import { Toaster } from "sonner";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <Toaster richColors position="top-right" />
      <Navbar />
      <CategoriesBar />
      {children}
      <Footer />
    </Providers>
  );
};

export default RootLayout;
