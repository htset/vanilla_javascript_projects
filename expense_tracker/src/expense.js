export class Expense {
  constructor(name, amount, category, date) {
    this.name = name;
    this.amount = amount;
    this.category = category;
    this.date = date;
  }

  editExpense(newAmount, newCategory, newDate) {
    this.amount = newAmount;
    this.category = newCategory;
    this.date = newDate;
  }
}