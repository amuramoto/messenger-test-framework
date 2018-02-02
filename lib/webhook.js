const util = require('./util');
      
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

  if (!util.validateSender(options.sender)) throw `Invalid sender in ${type} event with options:\n ${options}`;

  Object.assign(this.entry[0].messaging[0], util.getEventBody(type, options));
}

module.exports = WebhookEvent;