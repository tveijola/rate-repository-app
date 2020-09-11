import { AsyncStorage } from 'react-native';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const accessToken = await AsyncStorage.getItem(`${this.namespace}:accessToken`);
    console.log(accessToken);
    return accessToken;
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(`${this.namespace}:accessToken`, accessToken);
  } 

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
  }
}

export default AuthStorage;