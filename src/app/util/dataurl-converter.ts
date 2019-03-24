export class DataurlConveter {

  /*this.toDataURL('https://img0.junaroad.com/uiproducts/13056020/std_300_0-1488534442.jpg', (data) => {
      console.log('Image as base64', data);
    });*/
  toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
}
