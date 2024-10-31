import {Disclosure, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react'
import {UserCircleIcon} from '@heroicons/react/24/outline'
import {useAuth} from '../context/AuthContext';
import {Link,} from "react-router-dom";
import {ReactNode} from "react";

const userNavigation = [
    {name: 'Portfolio', to: '/'},
    {name: 'Positions', to: '/positions'},
    {name: 'Historical', to: '/historical'},
]

interface MainLayoutProps {
    children: ReactNode;
}
export const MainLayout = ({children}: MainLayoutProps) => {

    const {isAuthenticated, userName, logout} = useAuth();

    return (

        <div className="min-h-full">
            <Disclosure as="nav" className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <img
                                    alt="Your Company"
                                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                    className="h-8 w-8"
                                />
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">

                                </div>
                            </div>
                        </div>
                        {isAuthenticated && <div className="ml-4 flex items-center md:ml-6">
                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div className="flex items-center">
                                    <p className="text-white">Hello <span className="font-bold">{userName}</span></p>
                                    <MenuButton
                                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none">
                                        <span className="absolute -inset-1.5"/>
                                        <span className="sr-only">Open user menu</span>
                                        <UserCircleIcon aria-hidden="true" className="h-6 w-6"/>
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    {userNavigation.map((item) => (
                                        <MenuItem key={item.name}>
                                            <Link to={item.to} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"><div
                                                >{item.name}</div></Link>
                                        </MenuItem>
                                    ))}
                                    <MenuItem>
                                        <div onClick={() => logout()}
                                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 cursor-pointer">Logout
                                        </div>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>}
                    </div>
                </div>
            </Disclosure>

            {children}
        </div>

    )
}
