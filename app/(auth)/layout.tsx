import { ModeToggle } from "@/components/ModeToggle";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex items-center justify-center relative">
      {children}
      <div className="absolute bottom-5 right-5">
        <ModeToggle />
      </div>
    </div>
  );
};

export default AuthLayout;