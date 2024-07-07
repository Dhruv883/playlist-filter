import Navbar from "@/components/Navbar";
import { CustomLayoutProps } from "@/tsInterfaces";

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col overflow-x-hidden scrollbar-hide">
      <Navbar />
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default CustomLayout;
