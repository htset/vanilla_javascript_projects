function DetailComponent(selectedUser, onUpdateUser) {
  const detailComponent = document.createElement('div');

  function render() {
    detailComponent.innerHTML = selectedUser
      ? `
        <form id="userForm">
          <label for="userName">ID:</label>
          <input type="text" id="userId" name="id" 
            value="${selectedUser.id}" readonly/>

          <label for="userName">Name:</label>
          <input type="text" id="userName" name="name" 
            value="${selectedUser.name}" />

          <label for="userEmail">Email:</label>
          <input type="email" id="userEmail" name="email" 
            value="${selectedUser.email}" />
        </form>
      `
      : '<div>No user selected</div>';

    return detailComponent; 
  }

  detailComponent.addEventListener('input', (event) => {
    const userForm = document.getElementById('userForm');
    const formData = new FormData(userForm);
    const newUser = {
      id: parseInt(formData.get('id')),
      name: formData.get('name'),
      email: formData.get('email')
    };

    onUpdateUser(newUser);
  });

  return { render };
}
