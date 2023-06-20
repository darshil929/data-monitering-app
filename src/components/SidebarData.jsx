import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { AiFillDatabase } from "react-icons/ai";

// const navBarLen = () => {
// 	if(subNav.id > 3){

// 	}
// }

export const SidebarData = [
{
	title: "Database-1",
	path: "/",
	icon: <AiFillDatabase className="sidebar-icon" />,
	iconClosed: <RiIcons.RiArrowDownSFill className="sidebar-icon" />,
	iconOpened: <RiIcons.RiArrowUpSFill className="sidebar-icon" />,

	subNav: [
	{
		id: "1",
		title: "Pressure",
		path: "/",
		icon: <IoIcons.IoIosPaper className="sidebar-icon" />,
	},
	{
		id: "2",
		title: "Temperature",
		path: "/",
		icon: <IoIcons.IoIosPaper className="sidebar-icon" />,
	},
	{
		id: "3",
		title: "Voltage",
		path: "/",
		icon: <IoIcons.IoIosPaper className="sidebar-icon" />,
	},
	],
},

{
	title: "Database-2",
	path: "/Database2",
	icon: <AiFillDatabase className="sidebar-icon" />,
	iconClosed: <RiIcons.RiArrowDownSFill className="sidebar-icon" />,
	iconOpened: <RiIcons.RiArrowUpSFill className="sidebar-icon"/>,

	subNav: [
	{
		id: "1",
		title: "Pressure",
		path: "/",
		icon: <IoIcons.IoIosPaper className="sidebar-icon" />,
	},
	{
		id: "2",
		title: "Temperature",
		path: "/",
		icon: <IoIcons.IoIosPaper className="sidebar-icon" />,
	},
	{
		id: "3",
		title: "Voltage",
		path: "/",
		icon: <IoIcons.IoIosPaper className="sidebar-icon" />,
	},
	],
},

{
	title: "Database-3",
	path: "/Database3",
	icon: <AiFillDatabase className="sidebar-icon" />,
	iconClosed: <RiIcons.RiArrowDownSFill className="sidebar-icon" />,
	iconOpened: <RiIcons.RiArrowUpSFill className="sidebar-icon" />,

	subNav: [
	{
		id: "1",
		title: "Pressure",
		path: "/",
		icon: <IoIcons.IoIosPaper className="sidebar-icon" />,
	},
	{
		id: "2",
		title: "Temperature",
		path: "/",
		icon: <IoIcons.IoIosPaper className="sidebar-icon" />,
	},
	{
		id: "3",
		title: "Voltage",
		path: "/",
		icon: <IoIcons.IoIosPaper className="sidebar-icon" />,
	},
	],
},

{
	title: "Database-4",
	path: "/Database4",
	icon: <AiFillDatabase className="sidebar-icon" />,
	iconClosed: <RiIcons.RiArrowDownSFill className="sidebar-icon" />,
	iconOpened: <RiIcons.RiArrowUpSFill className="sidebar-icon" />,

	subNav: [
	{
		id: "1",
		title: "Pressure",
		path: "/",
		icon: <IoIcons.IoIosPaper className="sidebar-icon" />,
	},
	{
		id: "2",
		title: "Temperature",
		path: "/",
		icon: <IoIcons.IoIosPaper className="sidebar-icon" />,
	},
	{
		id: "3",
		title: "Voltage",
		path: "/",
		icon: <IoIcons.IoIosPaper className="sidebar-icon" />,
	},
	],
},
];

