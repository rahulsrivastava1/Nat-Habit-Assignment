export const dateFormat = (dateString) => {
  const dateObject = new Date(dateString);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  return formattedDate;
};
