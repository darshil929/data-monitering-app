import React from "react";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { AiFillDatabase } from "react-icons/ai";
import config from "../config.json";
import Database1 from "./Databases/Database1";
import Database2 from "./Databases/Database2";

const db_values = Object.values(config.databases);
// const db_keys = Object.keys(config.databases)

//Tab Names
const evenIndices_db_values = db_values.filter((_, index) => index % 2 === 0);
const tabNames = evenIndices_db_values;

const oddIndices_db_values = db_values.filter((_, index) => index % 2 !== 0);

let x;
oddIndices_db_values.map((item, index) => {
	x = item;
	return x;
})

const y = Object.values(x)

//SubTab Names
const subTab = y.filter((_, index) => index !== 0);

// const page = 

const sidebarItems = tabNames.map((dataBaseName, index) => ({
	title: dataBaseName,
	path: "/",
	icon: <AiFillDatabase className="sidebar-icon" />,
	iconClosed: <RiIcons.RiArrowDownSFill className="sidebar-icon" />,
	iconOpened: <RiIcons.RiArrowUpSFill className="sidebar-icon" />,
	subNav: subTab.map((tableName, index) => ({
		title: tableName,
		// path: `/${dataBaseName}`,
		path: `${'/'}`,
		icon: <IoIcons.IoIosPaper className="sidebar-icon" />,
		iconClosed: <RiIcons.RiArrowDownSFill className="sidebar-icon" />,
		iconOpened: <RiIcons.RiArrowUpSFill className="sidebar-icon" />,
	}))
}));

export const SidebarData = sidebarItems;
