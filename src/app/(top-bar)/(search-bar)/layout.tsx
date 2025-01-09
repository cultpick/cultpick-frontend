import SearchBar from "@/components/SearchBar";
import TopNav from "@/components/TopNav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div style={{ marginTop: "15rem" }}>
        <SearchBar />
      </div>
      {children}
    </>
  );
}
