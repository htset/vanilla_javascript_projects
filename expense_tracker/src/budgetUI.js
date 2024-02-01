import { Expense } from './expense.js';
import { Chart } from 'chart.js/auto';

export class BudgetUI {
  static ctx = document.getElementById('pieChart').getContext('2d');
  static categories = [];
  static expenses = [];
  static pieChart = new Chart(this.ctx, {
    type: 'pie',
    data: {
      labels: this.categories,
      datasets: [{
        data: this.expenses,
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)'
        ],
      }],
    },
  });

  static renderExpenseInTable(expense) {
    const tableBody = document.querySelector('#expenseTable tbody');

    const row = tableBody.insertRow();
    const nameCell = row.insertCell(0);
    const amountCell = row.insertCell(1);
    const categoryCell = row.insertCell(2);
    const dateCell = row.insertCell(3);

    nameCell.textContent = expense.name;
    amountCell.textContent = `$${expense.amount.toFixed(2)}`;
    categoryCell.textContent = expense.category;
    dateCell.textContent = expense.date.toISOString().split('T')[0];
  }

  static renderTable(budgetTracker, monthKey) {
    // Clear existing table content
    const tableBody = document.querySelector('#expenseTable tbody');
    tableBody.innerHTML = '';

    // Render expenses in the table
    const expensesForMonth = budgetTracker.getExpensesForMonth(monthKey);
    expensesForMonth.forEach((expense) => {
      BudgetUI.renderExpenseInTable(expense);
    });

    // Add a final row with the total expenses for the month
    const totalRow = tableBody.insertRow();
    totalRow.classList.add('total-row');

    const totalLabelCell = totalRow.insertCell(0);
    totalLabelCell.textContent = 'Total Expenses';

    const totalAmountCell = totalRow.insertCell(1);
    totalAmountCell.textContent = `$${budgetTracker.calculateTotalBudget(monthKey).toFixed(2)}`;
  }

  static renderPieChart(budgetTracker, monthKey) {
    this.categories = [];
    // Get expenses for the selected month
    this.expenses = budgetTracker.getExpensesForMonth(monthKey);

    // Get the categories for those expenses
    this.expenses.forEach((expense) => {
      if (!this.categories.includes(expense.category)) {
        this.categories.push(expense.category);
      }
    });

    // Calculate the total expenditure per category
    const data = this.categories
      .map(category =>
        this.expenses
          .filter(expense => expense.category === category)
          .reduce((total, exp) => total + exp.amount, 0));

    // Update pie with new data
    this.pieChart.data.datasets[0].data = data;
    this.pieChart.update();
  }

  static changeMonth(budgetTracker) {
    const monthPicker = document.getElementById('monthPicker');
    const selectedMonth = monthPicker.value;
    const expensesForMonth = budgetTracker.getExpensesForMonth(selectedMonth);

    // Render table and chart again
    this.renderTable(budgetTracker, selectedMonth);
    this.renderPieChart(budgetTracker, selectedMonth);
  }

  static handleUserInput(budgetTracker) {
    const monthPicker = document.getElementById('monthPicker');
    const expenseForm = document.getElementById('expenseForm');

    // Handle submit event
    expenseForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const expenseName = document.getElementById('expenseName').value;
      const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);
      const expenseCategory = document.getElementById('expenseCategory').value;
      const expenseDate = document.getElementById('expenseDate').value;

      if (isNaN(expenseAmount) || expenseAmount <= 0) {
        alert('Please enter a valid amount for the expense.');
        return;
      }

      const newExpense = new Expense(expenseName, expenseAmount, 
        expenseCategory, new Date(expenseDate));
      budgetTracker.addExpense(newExpense);

      // Render table and chart again
      this.renderTable(budgetTracker, monthPicker.value);
      this.renderPieChart(budgetTracker, monthPicker.value);

      // Display toast when a new expense is added
      this.showToast(`New expense added: ${newExpense.name} ($${newExpense.amount})`);

      // Reset form
      expenseForm.reset();
    });
  }

  static showToast(message, duration = 3000) {
    const toastContainer = document.getElementById('toastContainer');

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    toastContainer.appendChild(toast);

    // Show toast for a specific duration, then hide it
    setTimeout(() => {
      toast.remove();
    }, duration);
  }
}
