
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";



export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HomePage />
      </main>
      <Footer />
    </div>
  )
}