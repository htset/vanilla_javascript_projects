class MasterComponent {
  constructor(users) {
    this.users = users;
    this.selectedId = null;
  }

  setupEventListeners() {
    const userList = document.getElementById('userList');

    userList.addEventListener('click', (event) => {
      const clickedRow = event.target.closest('tr');
      if (clickedRow) {
        this.selectedId = clickedRow.getAttribute('data-user-id');
        // Emit a custom event when form values change
        const ev = new CustomEvent('userSelected', { detail: this.selectedId });
        document.dispatchEvent(ev);
      }
    });
  }

  render() {
    return `
      <div>
        <h2>Master Component</h2>
        <table id="userList">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            ${this.users.map(user => `
              <tr data-user-id="${user.id}" 
                ${(this.selectedId == user.id)? 'class="selected-row"':''}>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    `;
  }
}

