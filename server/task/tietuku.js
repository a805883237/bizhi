var fs = require('fs');
const config = require('../config')
var request = require('request');

 function formatBody(file_url) {
   console.log(
     "url",file_url
   );
    var form = {
        'Token': config.qiniu.token,
        'aid': config.qiniu.aid,
        'fileurl': file_url
    };
    request.post({
        url: "http://up.imgapi.com/",
        formData:form,
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }
    }, function(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body , "\nurl:",file_url);
        return body;
    })
}
module.exports = formatBody;

// formatBody("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531212480050&di=26b702bb09fa9e5b5a49f3e4f43f6426&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Flvpics%2Fw%3D1000%2Fsign%3Dd116599978cb0a4685228f395b53f724%2F96dda144ad3459826f525ef10ff431adcaef84fd.jpg");
