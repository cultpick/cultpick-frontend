import SearchBar from "@/components/SearchBar/SearchBar";
import TopNav from "@/components/TopNav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div
        style={{
          marginTop: "17.2rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <SearchBar />
      </div>
      {children}
    </>
  );
}
