export const getMonthlySpendings = (spendings) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  return spendings
    .filter((expenditure) => {
      const expenditureDate = new Date(expenditure.data.date);
      return (
        expenditureDate.getMonth() === currentMonth &&
        expenditureDate.getFullYear() === currentYear
      );
    })
    .reduce((total, expenditure) => {
      return total + parseFloat(expenditure.data.amount);
    }, 0);
};
