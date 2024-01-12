import React,{useState , useContext} from "react";
import { UserContext } from '../context/AuthContext'
import {NavLink} from 'react-router-dom';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button , NavbarMenuToggle , NavbarMenu , NavbarMenuItem} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {user}  = useContext(UserContext)

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="flex gap-2">
        <img src="./assets/logo.png" className="w-14" alt="logo" />
          <p className="font-bold text-blue-500">املاک</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-5" justify="center">
        <NavbarItem>
          <NavLink to={"/"} className={({isActive})=>(isActive ? 'border-b-4 border-blue-500 px-3 py-1 font-bold' : 'px-3 font-bold')}>
            خانه 
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink to={'/propertyes'} className={({isActive})=>(isActive ? 'border-b-4 border-blue-500 px-3 py-1 font-bold' : 'px-3 font-bold')}>
            آگهی ها
          </NavLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
        {user ? 
              <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="bordered" 
                  className='hover:text-blue-400'
                >
                  {user}
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Action event example" 
                defaultValue={""}
              >
                <DropdownItem key="new"><NavLink to={"/add"}>ثبت اگهی</NavLink></DropdownItem>
                <DropdownItem key="my"><NavLink to={"/my"}>آگهی های من</NavLink></DropdownItem>
              </DropdownMenu>
            </Dropdown>
          :
            <NavLink className='bg-blue-500 text-lg py-1 px-3 text-white rounded flex max-sm:bg-inherit max-sm:text-blue-400' to={"/register"}>
              <div className="hidden max-sm:flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-7">
               <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
               </svg>
               </div>
               <p className="max-sm:hidden font-bold font-sans">
                ثبت نام
                </p>
              </NavLink>
          }

        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
          <NavbarMenuItem>
          <NavLink to={"/"}  className={({isActive})=>(isActive ? 'text-blue-600 font-blue text-lg font-bold ' : 'font-bold')}>
            خانه 
          </NavLink>
          </NavbarMenuItem>
          <NavbarMenuItem>
          <NavLink to={'/propertyes'}  className={({isActive})=>(isActive ? 'text-blue-600 font-blue text-lg font-bold ' : 'font-bold')}>
            آگهی ها
          </NavLink>
          </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
