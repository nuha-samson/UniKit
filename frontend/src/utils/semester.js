export const getAcademicPeriod = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  if (month >= 9) {
    return {
      term: "Fall",
      year,
      label: `Fall ${year}`,
    };
  }

  if (month >= 1 && month <= 5) {
    return {
      term: "Spring",
      year,
      label: `Spring ${year}`,
    };
  }

  return {
    term: "Summer",
    year,
    label: `Summer ${year}`,
  };
};