import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { AiFillDatabase } from "react-icons/ai";
import config from "../testing/config.json";

const a = Object.values(config.databases);
const b = Object.keys(config.databases)

const evenIndices_a = a.filter((_, index) => index % 2 === 0);
const oddIndices_a = a.filter((_, index) => index % 2 !== 0);
console.log(oddIndices_a,'oddindices_a')

const oddIndices_b = b.filter((_, index) => index % 2 !== 0);
console.log(oddIndices_b,'oddindices_b')

// const subNav;

const sidebarItems = evenIndices_a.map((dataBaseName, index) => ({
  title: dataBaseName,
  path: "/",
  icon: <AiFillDatabase className="sidebar-icon" />,
  iconClosed: <RiIcons.RiArrowDownSFill className="sidebar-icon" />,
  iconOpened: <RiIcons.RiArrowUpSFill className="sidebar-icon" />,
	subNav: oddIndices_b.map((tableName,index) => ({
      title: tableName,
      path: "/",
      icon: <IoIcons.IoIosPaper className="sidebar-icon" />,
	  iconClosed: <RiIcons.RiArrowDownSFill className="sidebar-icon" />,
  iconOpened: <RiIcons.RiArrowUpSFill className="sidebar-icon" />,
    }))
}));

export const SidebarData = sidebarItems;
