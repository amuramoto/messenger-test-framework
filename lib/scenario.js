'use strict';

const request = require('request'),
      async = require('async'),
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
        dispatcher = new util.Dispatcher(this.webhook);
  let events_arr = [];
  webhook_events.forEach(event => {
    const interval = event.interval || 0,
          repeat = event.repeat || 0;

    for (let i = 0; i < repeat; i++) {
      events_arr.push(callback => {
        setTimeout(() => {
          dispatcher.send(event.event);
          callback();
        }, interval);
      });
    }        
    
  });
  async.series(events_arr);
}


module.exports = Scenario;