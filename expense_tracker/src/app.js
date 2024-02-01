import { BudgetUI } from './budgetUI.js';
import { BudgetTracker } from './budgetTracker.js';
import Pikaday from 'pikaday';
import moment from 'moment';

document.addEventListener('DOMContentLoaded', function () {
  const expenseDateInput = document.getElementById('expenseDate');
  const pikaday = new Pikaday({
    field: expenseDateInput,
    format: 'YYYY-MM-DD',
    defaultDate: moment().toDate(), //current date
    setDefaultDate: true,
  });

  const monthPickerInput = document.getElementById('monthPicker');
  const pikadayMonthPicker = new Pikaday({
    field: monthPickerInput,
    format: 'YYYY-MM',
    defaultDate: moment().toDate(), //current date
    setDefaultDate: true,
    yearRange: [2024, new Date().getFullYear()],
    showYearDropdown: true,
    onSelect: function () {
      BudgetUI.changeMonth(budgetTracker);
    },
  });
});

const budgetTracker = new BudgetTracker();
BudgetUI.handleUserInput(budgetTracker);
BudgetUI.changeMonth(budgetTracker);
