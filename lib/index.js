const util = require('./util'),
      WebhookEvent = require('./webhook'),
      Webhook = require('messenger-node/lib/webhook');

function Scenario (webhook) {
  this.webhook = webhook;
  this.webhook_events = [];
  this.add = add.bind(this);
  this.run = run.bind(this);
}

function add (webhook_event, options) {
  const event = {
    'event': webhook_event,
    'interval': options.interval,
    'repeat': options.repeat
  }
  this.webhook_events.push(event);
}

function run () {
  const webhook_type this.webhook instanceof Webhook ? 'webhook': 'url',
        webhook_events = this.webhook_events;
  send(webhook_events[0].event, webhook_type);
  webhook_events.shift();    
  webhook_events.forEach(webhook_event => {
    send(webhook_event, webhook_type);      
  });
  } else {
    
  }
}

function send (webhook_event, webhook_type) {
  const interval = webhook_event.interval ? webhook_event.interval: 0
  for (let i = 0; i < webhook_event.repeat; i++) {
    setTimeout(() => {
      this.webhook.emit(webhook_event.event);
    }, interval);  
  }
}

module.exports = {
  WebhookEvent,
  send
};