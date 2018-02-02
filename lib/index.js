const util = require('./util');

//TODO: Random watermark and seq
function WebhookEvent (type, options) {
  options = options || {};
  options.timestamp = options.timestamp || new Date().getTime(),
  options.page_id = options.page_id || '682304928343165',
  options.sender = options.sender || {'id': '09284759353'}
  this.object = "page";
  this.entry = [{
    "id": options.page_id,
    "time": options.timestamp,
    "messaging":[{          
      "recipient":{ "id": options.page_id }
    }]
  }];    

  util.validateSender(options.sender);

  Object.assign(this.entry[0].messaging[0], util.getEventBody(type, options));
}

function send (type, options) {

}

module.exports = WebhookEvent;