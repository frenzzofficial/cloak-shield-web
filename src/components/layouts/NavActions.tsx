"use client";
import { ArrowRightIcon } from "@/components/ui/icons/icons";
import { useAuth } from "../providers/AuthProvider";
import { Link } from "../ui";
import ImageAvatar from "../ui/image/ImageAvatar";
import Loading from "./Loading";

const NavActions = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex items-center gap-4">
      {isAuthenticated && (
        <ImageAvatar
          src={user?.avatar_url || "/avatars/default-user.png"}
          alt={user?.fullname || "avatar"}
          size={64}
          fallbackText={user?.fullname?.[0] || "?"}
        />
      )}
      <Link
        href={isAuthenticated ? "/dashboard" : "/signin"}
        className="btn-gradient flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[14px] font-medium text-[#02121f] shadow-glow transition-transform hover:scale-[1.03]"
      >
        {isAuthenticated ? "Dashboard" : "Free Signin"}
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
};

export default NavActions;
