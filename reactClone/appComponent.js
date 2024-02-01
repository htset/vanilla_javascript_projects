function AppComponent(users, selectedUser) {
  const appElement = document.getElementById('app');
  const masterComponent = MasterComponent(users, selectedUser, onSelectUser);
  const detailComponent = DetailComponent(selectedUser, onUpdateUser);

  function onSelectUser(userId) {
    let user = users.find(user => user.id === userId);
    selectedUser.id = user.id;
    selectedUser.name = user.name;
    selectedUser.email = user.email;

    render();
  }

  function onUpdateUser(updatedUser){
    let user = users.find(user => user.id === updatedUser.id);
    user.name = updatedUser.name;
    user.email = updatedUser.email;

    selectedUser.name = updatedUser.name;
    selectedUser.email = updatedUser.email;

    render();
  }

  function render() {
    appElement.innerHTML = '';
    appElement.appendChild(masterComponent.render());
    appElement.appendChild(detailComponent.render());
  }

  return { render };
}

