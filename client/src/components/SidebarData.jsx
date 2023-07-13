import React from "react";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { AiFillDatabase } from "react-icons/ai";
import config2 from "../config2.json";

const tabNames = Object.values(config2.databases).map(database => (database.db_name));
const subTab = Object.values(config2.databases).map(database => Object.values(database.db_columns));

const sidebarItems = tabNames.map((dataBaseName, index) => ({
	title: dataBaseName,
	path:  index === 0 ? "/" : `/${dataBaseName}`,
	// path: "/",
	icon: <AiFillDatabase className="sidebar-icon" />,
	iconClosed: <RiIcons.RiArrowDownSFill className="sidebar-icon" />,
	iconOpened: <RiIcons.RiArrowUpSFill className="sidebar-icon" />,
	subNav: subTab[index].map((tableName, index) => ({
		title: tableName,
		path: `/${dataBaseName}/${tableName}`,
		icon: <IoIcons.IoIosPaper className="sidebar-icon" />,
		iconClosed: <RiIcons.RiArrowDownSFill className="sidebar-icon" />,
		iconOpened: <RiIcons.RiArrowUpSFill className="sidebar-icon" />,
	}))
}));

export const SidebarData = sidebarItems;
