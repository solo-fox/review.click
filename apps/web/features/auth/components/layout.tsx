import Footer from "@/_components/footer";

export default function AuthLayou({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="dotted-background"></div>
      {children}
      <Footer />
    </div>
  );
}
