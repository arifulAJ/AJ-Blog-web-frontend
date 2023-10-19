import NavigationBar from "./component/navbar/navigation";
import "./globals.css";

import Footer from "./component/footer/footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "AJ-Blog-App",
  description: "this is blog web site ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavigationBar />

        {children}
        <Toaster position="top-center" />
        <Footer />
      </body>
    </html>
  );
}
