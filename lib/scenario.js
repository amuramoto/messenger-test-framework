'use strict';

const request = require('request'),
      util = require('./util');

function Scenario (webhook) {
  this.webhook = webhook;
  this.webhook_events = [];
  this.add = add.bind(this);
  this.run = run.bind(this);
  this.show = show.bind(this);
  this.insert = insert.bind(this);
}

function show () {  
  for (let i = 0; i < this.webhook_events.length; i++) {
    console.log (`${i}: JSON.stringify(webhook_event, null, 2))\n\n`);
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
  let send;
  const webhook_events = this.webhook_events;

  if (this.webhook instanceof Webhook) {
    send = util.emitEvent;
  } else if (typeof this.webhook === 'string' && this.webhook.indexOf('https') === 0) {
    send = util.postEvent;
  } else {
    throw 'Invalid webhook. Must be a URL or instance of Webhook';
  }

  // ignore any interval on first call
  if (webhook_events[0].interval) delete webhook_events[0].interval;
  for (let i = 0; i < webhook_events.length; i++) {
    dispatch(this.webhook, webhook_events[i], send);      
  };
}

function dispatch (webhook, event_options, send) {
  const interval = event_options.interval || 0;
  for (let i = 0; i < event_options.repeat; i++) {
    setTimeout(() => {
      send(webhook, event_options.event)
    }, interval);  
  }
}

module.exports = Scenario;