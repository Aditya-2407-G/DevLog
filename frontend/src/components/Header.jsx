import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Input,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
    Button,
} from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon.jsx";

export default function Header() {
    const path = useLocation().pathname;
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSignIn = () => {
        setIsLoggedIn(true);
    };

    return (
        <Navbar isBordered maxWidth="full" className="px-4">
            <NavbarContent justify="start">
                <NavbarBrand className="mr-4">
                    <Link
                        to="/"
                        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
                    >
                        <span className="px-5 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white text-sm font-semibold">
                            DevLog
                        </span>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent justify="center" className="flex-grow">
                <NavbarItem className="w-full max-w-[20rem] hidden md:block">
                    <Input
                        classNames={{
                            base: "w-full h-11",
                            mainWrapper: "h-full",
                            input: "text-small",
                            inputWrapper:
                                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                        }}
                        placeholder="Type to search..."
                        size="sm"
                        startContent={<SearchIcon size={18} />}
                        type="search"
                    />
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-10" justify="center">
                <NavbarItem isActive={path === '/'}>
                    <Link to='/' color="foreground">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={path === '/about'}>
                    <Link to='/about' aria-current="page" color="secondary">
                        About
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={path === '/projects'}>
                    <Link to='/projects' color="foreground">
                        Projects
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    {isLoggedIn ? (
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    as="button"
                                    className="transition-transform"
                                    color="secondary"
                                    name="Jason Hughes"
                                    size="sm"
                                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                />
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Profile Actions"
                                variant="bordered"
                            >
                                <DropdownItem
                                    key="profile"
                                    className="h-14 gap-2"
                                >
                                    <p className="font-semibold">
                                        Signed in as
                                    </p>
                                    <p className="font-semibold">
                                        zoey@example.com
                                    </p>
                                </DropdownItem>
                                <DropdownItem key="Home" href="/">
                                    Home
                                </DropdownItem>
                                <DropdownItem key='About' href="/about">
                                    About
                                </DropdownItem>
                                <DropdownItem key="Projects" href="/projects">
                                    Projects
                                </DropdownItem>
                                <DropdownItem key="help_and_feedback">
                                    Help
                                </DropdownItem>
                                <DropdownItem key="logout" color="danger">
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    ) : (
                        <Button
                            color="primary"
                            variant="ghost"
                            onPress={handleSignIn}
                        >
                            Sign Up
                        </Button>
                    )}
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
