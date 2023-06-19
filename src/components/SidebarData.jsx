import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { AiFillDatabase } from "react-icons/ai";

export const SidebarData = [
{
	title: "Database-1",
	path: "/",
	icon: <AiFillDatabase className="sidebar-icon" />,
	iconClosed: <RiIcons.RiArrowDownSFill className="sidebar-icon" />,
	iconOpened: <RiIcons.RiArrowUpSFill className="sidebar-icon" />,

	subNav: [
	{
		title: "Pressure",
		path: "/",
		icon: <IoIcons.IoIosPaper className="sidebar-icon" />,
	},
	{
		title: "Temperature",
		path: "/",
		icon: <IoIcons.IoIosPaper className="sidebar-icon" />,
	},
	{
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
		title: "Pressure",
		path: "/",
		icon: <IoIcons.IoIosPaper className="sidebar-icon" />,
	},
	{
		title: "Temperature",
		path: "/",
		icon: <IoIcons.IoIosPaper className="sidebar-icon" />,
	},
	{
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
		title: "Pressure",
		path: "/",
		icon: <IoIcons.IoIosPaper className="sidebar-icon" />,
	},
	{
		title: "Temperature",
		path: "/",
		icon: <IoIcons.IoIosPaper className="sidebar-icon" />,
	},
	{
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
		title: "Pressure",
		path: "/",
		icon: <IoIcons.IoIosPaper className="sidebar-icon" />,
	},
	{
		title: "Temperature",
		path: "/",
		icon: <IoIcons.IoIosPaper className="sidebar-icon" />,
	},
	{
		title: "Voltage",
		path: "/",
		icon: <IoIcons.IoIosPaper className="sidebar-icon" />,
	},
	],
},

];
