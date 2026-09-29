import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="hidden md:block w-87.5">
          <Sidebar />
        </div>
        <div className="p-5 w-full md:max-w-285">{children}</div>
      </div>
    </>
  );
};

export default MainLayout;
