import base64 from 'base-64'
import { SecureStorage } from '@nativescript/secure-storage'
import { Http, path } from '@nativescript/core'

export class apiRequest {
  constructor (endpoint, additionalHeader = {}, data = {}, method = 'GET') {
    this.secureStorage = new SecureStorage()
    this.url = this.secureStorage.getSync({ key: 'url' })
    this.additionalHeader = additionalHeader
    this.endpoint = endpoint
    this.method = method
    this.data = data
    this.secureStorage = new SecureStorage()
  }

  get() {
    let request = Http.request(this.getOptions());
    request.then((response) => {
      //console.log('Within request ...');
    });
    return request;
  }

  getOptions() {
    return {
      method: this.method,
      headers: this.getHeaders(),
      data: this.data,
      url: path.join(this.url, this.endpoint),
    }
  }

  getHeaders() {
    const credentials = base64.encode(this.secureStorage.getSync({ key: 'username' }) + ':' + this.secureStorage.getSync({ key: 'password' }))
    const headerDefault = {
      'OCS-APIRequest': 'true',
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + credentials
    }

    return {
      ...headerDefault,
      ...this.additionalHeader
    };
  }
}
