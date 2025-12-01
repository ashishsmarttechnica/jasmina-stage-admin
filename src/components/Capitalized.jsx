// export const Capitalized = (str) => {


//   return str
//     ?.toLowerCase()
//     .split(' ')
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ');
// };


export const Capitalized = (str) => {
    if (Array.isArray(str)) {
      return str.map((obj) => {
        if (typeof obj === 'object' && obj.hasOwnProperty('name')) {
          return {
            ...obj,
            name: obj.name
              ?.toLowerCase()
              .split(' ')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' '),
          };
        }
        return obj;
      });
    } else if (typeof str === 'string') {
      return str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    } else {
      return str;
    }
  };