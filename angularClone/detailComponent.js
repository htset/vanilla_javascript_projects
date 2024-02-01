class DetailComponent {
  constructor() {
    this.user = new Proxy({
      id: '',
      name: '',
      email: ''
    }, {
      set: (target, prop, value) => {
        target[prop] = value;
        this.setFormData(this.user);
        return true;
      }
    });
  }

  setupEventListeners() {
    const userForm = document.getElementById('userForm');

    userForm.addEventListener('input', (event) => {
      const formData = new FormData(userForm);
      this.user.id = parseInt(formData.get('userId'));
      this.user.name = formData.get('userName');
      this.user.email = formData.get('userEmail');

      const user = {
        id: parseInt(formData.get('userId')),
        name: formData.get('userName'),
        email: formData.get('userEmail')
      };

      // Emit a custom event when form values change
      const ev = new CustomEvent('formChange', { detail: user });
      document.dispatchEvent(ev);
    });
  }

  render() {
    return `
      <div>
        <h2>Detail Component</h2>
        <form id="userForm">
          <label for="userId">ID:</label>
          <input type="text" id="userId" name="userId" 
            value="${this.user.id}" readonly>

          <label for="userName">Name:</label>
          <input type="text" id="userName" name="userName" 
            value="${this.user.name}">

          <label for="userEmail">Email:</label>
          <input type="email" id="userEmail" name="userEmail" 
            value="${this.user.email}">
        </form>
      </div>
    `;
  }

  setFormData(user) {
    const userIdField = document.getElementById('userId');
    const userNameField = document.getElementById('userName');
    const userEmailField = document.getElementById('userEmail');

    userIdField.value = user.id;
    userNameField.value = user.name;
    userEmailField.value = user.email;
  }
}
