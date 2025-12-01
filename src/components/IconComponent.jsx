import React from "react";
import * as MdIcons from "react-icons/md"; // Material Icons
import * as IoIcons from "react-icons/io5"; // Ionicons
import * as FaIcons from "react-icons/fa"; // FontAwesome
import * as AiIcons from "react-icons/ai"; // Ant Design Icons
import * as BsIcons from "react-icons/bs"; // Bootstrap Icons

const IconComponent = ({ name, className = "w-5 h-5" }) => {
  if (!name) return null; // Ensure icon name is provided

  // All icons combined in a single object
  const icons = {
    ...MdIcons,
    ...IoIcons,
    ...FaIcons,
    ...AiIcons,
    ...BsIcons,
  };

  // Find the icon, default to MdDashboard if not found
  const SelectedIcon = icons[name] || MdIcons.MdDashboard;

  return <SelectedIcon className={className} />;
};

export default IconComponent;
