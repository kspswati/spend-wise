
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { LogIn, User, Settings, LogOut } from "lucide-react";
import { fadeInAnimation, hoverElevateAnimation } from "@/lib/animation-utils";

// This is a mock user state - in a real app, this would come from auth context
export interface UserData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

const UserAuth: React.FC = () => {
  // Mock authentication state - in a real implementation, this would use a proper auth system
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserData | null>(null);

  const handleLogin = () => {
    // Mock login - in a real app, this would open a login modal or redirect
    setIsLoggedIn(true);
    setUser({
      id: "user-123",
      name: "Alex Smith",
      email: "alex@example.com",
      avatar: "" // No avatar provided initially
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  // Not logged in state
  if (!isLoggedIn) {
    return (
      <Button 
        onClick={handleLogin}
        variant="outline"
        className={`${hoverElevateAnimation} bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200 text-purple-800`}
      >
        <LogIn className="h-4 w-4 mr-2" />
        Sign In
      </Button>
    );
  }

  // Logged in state
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className={`${hoverElevateAnimation} flex items-center gap-2 px-2 rounded-full hover:bg-purple-100`}
        >
          <Avatar className="h-8 w-8 border-2 border-purple-200">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-purple-200 to-blue-200 text-purple-800">
              {user.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium hidden md:inline">{user.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-red-500" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAuth;
