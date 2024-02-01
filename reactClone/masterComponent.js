function MasterComponent(users, selectedUser, onSelectUser) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  thead.innerHTML = '<tr><th>ID</th><th>Name</th><th>Email</th></tr>';
  table.appendChild(thead);
  table.appendChild(tbody);

  function render() {
    // Clear the tbody before updating
    tbody.innerHTML = '';

    users.forEach(user => {
      const row = document.createElement('tr');
      row.setAttribute('data-user-id', user.id);

      const idCell = document.createElement('td');
      idCell.textContent = user.id;

      const nameCell = document.createElement('td');
      nameCell.textContent = user.name;

      const emailCell = document.createElement('td');
      emailCell.textContent = user.email;

      row.appendChild(idCell);
      row.appendChild(nameCell);
      row.appendChild(emailCell);

      if (selectedUser != null && user.id == selectedUser.id) {
        row.classList.add('selected-row');
      }

      tbody.appendChild(row);
    });

    return table;
  }

  table.addEventListener('click', (event) => {
    const targetRow = event.target.closest('tr[data-user-id]');
    if (targetRow) {
      selectedUserId = parseInt(targetRow.getAttribute('data-user-id'), 10);
      onSelectUser(selectedUserId);
    }
  });

  return { render };
}
