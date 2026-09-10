export const getAcademicPeriod = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  if (month >= 9) {
    return { term: "fall", year, label: `Fall ${year}` };
  }
  if (month <= 5) {
    return { term: "spring", year, label: `Spring ${year}` };
  }
  return { term: "summer", year, label: `Summer ${year}` };
};