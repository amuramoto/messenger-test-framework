'use strict';

const request = require('request'),
      util = require('./util'),
      Messenger = require('messenger-node');

function Scenario (webhook) {
  this.webhook = webhook;
  this.webhook_events = [];
  this.add = add.bind(this);
  this.run = run.bind(this);
  this.show = show.bind(this);
}

function show () {  
  for (let i = 0; i < this.webhook_events.length; i++) {
    console.log (`${i}: ${JSON.stringify(this.webhook_events[i], null, 2)}\n\n`);
  }
  
  return this.webhook_events;
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
  const webhook_events = this.webhook_events,
        send = util.getDispatcher(this.Webhook);

  

  // ignore any interval on first call
  if (webhook_events[0].interval) delete webhook_events[0].interval;
  for (let i = 0; i < webhook_events.length; i++) {
    dispatch(this.webhook, webhook_events[i], send);      
  };
}

function dispatch (webhook, event_options, send) {
  const interval = event_options.interval || 0,
        repeat = event_options.repeat || 0;
  let events = [];        
  for (let i = 0; i < repeat; i++) {
    setTimeout(() => {
      send(webhook, event_options.event)
    }, interval);  
  }
}

module.exports = Scenario;