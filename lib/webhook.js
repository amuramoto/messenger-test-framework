const util = require('./util');
      
function WebhookEvent (type, options) {
  if (options) {
    // set basic event defaults
    if (!options.timestamp) options.timestamp = new Date().getTime();
    if (!options.page_id) options.page_id = '682304928343165';
    if (options.sender) {
      if (!util.validateSender(options.sender)) throw `Invalid sender in ${type} event with options:\n ${options}`;
    } else {
      options.sender = {'id': '09284759353'};
    }
  } else {
    options = {};
  }

  let recipient = { "id": options.page_id };
  let event_body = util.getEventBody(type, options); 
  this.object = "page";
  this.entry = [{
    "id": options.page_id,
    "time": options.timestamp    
  }];    

  switch (type) {
    case 'standby':
      this.entry[0].standby = [{          
        "recipient": recipient
      }];
    default:
      this.entry[0].messaging = [{          
        "recipient": recipient
      }];
      Object.assign(this.entry[0].messaging[0], event_body);
  }
}

module.exports = WebhookEvent;