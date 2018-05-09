class Store {
  // Takes localStorage or sessionStorage and uses that to store values
  constructor(storageApi) {
    this.api = storageApi;
  }
  get() {
    return this.api.getItem(this.key);
  }
  set(value) {
    this.api.setItem(this.key, value);
  }
}
// Extands Store and sets a reference of sessionStorage
// to set and get data in Store
export class UserStore extends Store {
  constructor(key) {
    super(sessionStorage);
    this.key = key;
  }
}
