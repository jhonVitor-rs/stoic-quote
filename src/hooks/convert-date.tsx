export function convertDate(date: Date | string) {
  const newDate = new Date(date);

  return newDate.toLocaleDateString("pt-br");
}
