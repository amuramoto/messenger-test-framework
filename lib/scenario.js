'use strict';

const request = require('request');

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
  let send;
  const webhook_events = this.webhook_events;

  if (this.webhook instanceof Webhook) {
    send = emitEvent;
  } else {
    send = postEvent;
  }

  // ignore any interval on first call
  if (webhook_events[0].interval) delete webhook_events[0].interval;


  dispatch(this.webhook, webhook_events[0], send);
  webhook_events.shift();
  webhook_events.forEach(event_options => {
    dispatch(this.webhook, event_options, send);      
  });
}

function dispatch (webhook, event_options, send) {
  const interval = event_options.interval || 0;
  for (let i = 0; i < event_options.repeat; i++) {
    setTimeout(() => {
      send(webhook, event_options.event)
    }, interval);  
  }
}

function emitEvent (webhook, webhook_event) {
  webhook.emit(webhook_event);
}

function postEvent (webhook, webhook_event) {
  const request_options = {
    'uri': webhook,
    'method': 'POST',
    'formData': webhook_event
  }
  request(request_options, (error, response, body) => {
    if (error) {
      console.error(error) 
    } else { 
      console.log(body);
    }      
  });
}

module.exports = Scenario;