import Footer from "./Component/Footer";
import Header from "./Component/Header";
import "./globals.css";
import {CartProvider} from "../app/Component/Context/CartContext";  // Ensure the import path is correct

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
