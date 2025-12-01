export const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const secondsToHours = (seconds) => {
  return parseFloat((seconds / 3600).toFixed(2));
};

export const hoursToSeconds = (hours) => {
  return Math.round(hours * 3600); // Rounded to avoid decimals in seconds
};



// (property) Bonus_Points: {
//     listening_Hours_Bonus: {
//         bonusPoints: string;
//         listeningTimeRequired: string;
//     };
//     likes_Bonus: {
//         bonusPoints: string;
//         likeCountRequired: string;
//     };
// }