import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Catalog } from "./components/Catalog";
import { CustomService } from "./components/CustomService";
import { Showcase } from "./components/Showcase";
import { Blog } from "./components/Blog";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen font-body" style={{ background: "#f0f5fb" }}>
      <Header />
      <main>
        <Hero />
        <Catalog />
        <CustomService />
        <Showcase />
        <Blog />
      </main>
      <Footer />
    </div>
  );
}
