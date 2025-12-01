export const Capitalized = (str) => {
  if (Array.isArray(str)) {
    return str.map((obj) => {
      if (typeof obj === "object" && obj.hasOwnProperty("name")) {
        return {
          ...obj,
          name: obj.name
            ?.toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
        };
      }
      return obj;
    });
  } else if (typeof str === "string") {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } else {
    return str;
  }
};
export const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }], // Headings
    ["bold", "italic", "underline"], // Text styles
    [{ list: "ordered" }, { list: "bullet" }], // Lists
    ["blockquote", "code-block"], // Block styles
    ["link", "image"], // Media
    ["clean"], // Clear formatting
  ],
};

export const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "blockquote",
  "code-block",
  "link",
  "image",
];
