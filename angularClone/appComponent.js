class AppComponent {
  constructor(users) {
    this.users = users;

    this.masterComponent = new MasterComponent(this.users);
    this.detailComponent = new DetailComponent();

    this.init();
  }

  init() {
    this.render();
    document.addEventListener('formChange', this.handleFormChange.bind(this));
    document.addEventListener('userSelected', this.handleUserSelected.bind(this));
  }

  handleFormChange(event) {
    const user = event.detail;
    console.log(`Form change event received for user with ID ${user.id}`);
    console.log('Form data:', user);

    const userIndex = this.users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      this.users[userIndex] = user;
    }

    this.render();
  }

  handleUserSelected(event) {
    const userId = event.detail;
    console.log(`User selected event received for user with ID ${userId}`);
    const user = this.users.find(u => u.id === parseInt(userId));

    this.render();

    if(user != null){
      this.detailComponent.user.id = user.id;
      this.detailComponent.user.name = user.name;
      this.detailComponent.user.email = user.email;  
    }
  }

  render() {
    const appElement = document.getElementById('app');
    appElement.innerHTML = this.masterComponent.render() + this.detailComponent.render();
    this.masterComponent.setupEventListeners();
    this.detailComponent.setupEventListeners();
  }
}

