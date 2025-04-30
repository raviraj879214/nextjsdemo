import Footer from "./Component/Footer";
import Header from "./Component/Header";
import "./globals.css";





export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
