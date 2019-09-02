export const getDay = day => {
  switch (day) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
    default:
      return "Inv";
  }
};

export const getMax = ({ sets }, qty) => {
  return Math.max(...sets.map(s => s[qty]));
};
export const getAvg = ({ sets }, qty) => {
  return sets.reduce((acc, set) => acc + set[qty], 0) / sets.length;
};
