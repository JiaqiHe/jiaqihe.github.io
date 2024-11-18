'use client'
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Link 
} from "@nextui-org/react";
import { useRouter } from 'next/navigation';

function MainNavbar() {
  const router = useRouter();

  return (
    <Navbar>
      <NavbarBrand>
        <p 
          className="font-bold text-inherit hover:opacity-80 transition-opacity cursor-pointer"
          onClick={() => router.push('/')}
        >
          Jiaqi He
        </p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link 
            href="#"
            className="relative after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-primary after:left-0 after:bottom-0 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link 
            href="#"
            className="relative after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-primary after:left-0 after:bottom-0 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            Projects
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link 
            href="#"
            className="relative after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-primary after:left-0 after:bottom-0 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default MainNavbar; 