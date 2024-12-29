import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import "@/styles/globals.css";

export const metadata = {
  title: "HOA DAO Schedule",
  description: "Official website of HOA DAO Lion Dance 2025",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-hidden">
      <body className="min-h-screen flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
