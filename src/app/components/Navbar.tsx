'use client'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";

export default function NavBar() {
  return (
    <Navbar className="bg-background/60 backdrop-blur-md">
      <NavbarBrand>
        <p 
          className="font-bold bg-gradient-to-r from-blue-600 via-pink-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] hover:bg-[center_right_1rem] transition-all duration-1000"
        >
          Jiaqi He
        </p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <Link color="foreground" href="#">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Projects
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
} 