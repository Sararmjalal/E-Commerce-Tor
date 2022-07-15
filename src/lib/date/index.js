


export const getTimeDifference = (date1, date2) => 
  Math.abs(new Date(date1).getTime() - new Date(date2).getTime())
