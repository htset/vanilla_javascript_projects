export class BudgetTracker {
  constructor() {
    this.expensesByMonth = {};
  }

  addExpense(expense) {
    // monthKey form: '2024-01', etc.
    const monthKey = this.getFormattedMonthKey(expense.date);
    if (!this.expensesByMonth[monthKey]) {
      this.expensesByMonth[monthKey] = [];
    }
    this.expensesByMonth[monthKey].push(expense);
  }

  removeExpense(expense) {
    const monthKey = this.getFormattedMonthKey(expense.date);
    if (this.expensesByMonth[monthKey]) {
      const index = this.expensesByMonth[monthKey].indexOf(expense);
      if (index !== -1) {
        this.expensesByMonth[monthKey].splice(index, 1);
      }
    }
  }

  getFormattedMonthKey(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is zero-based
    return `${year}-${month.toString().padStart(2, '0')}`;
  }

  getExpensesForMonth(monthKey) {
    return this.expensesByMonth[monthKey] || [];
  }

  calculateTotalBudget(monthKey) {
    const expenses = this.expensesByMonth[monthKey] || [];
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }
}
