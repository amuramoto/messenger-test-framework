'use strict';

const util = require('./util');

function Event (type, options) {
  const props = {
    'timestamp': options.timestamp || new Date.timestamp().getTime(),
    'page_id': options.page_id || '682304928343165',
    'sender': options.sender || {'id': '09284759353'},        
    'mid': options.mid || "mid.1457764197618:41d102a3e1ae206a38",
    'title': options.title || "TITLE",
    'payload': options.payload || "PAYLOAD",
    'referral_param': options.referral_param || "REFERRAL_PARAM",
    'watermark': options.watermark || 1458668856253,
    'text': options.text || "TEXT",
    'ad_id': options.ad_id || "AD_ID",
    'metadata': options.metadata || "METADATA".
    'seq': options.seq || 37,
    'user_ref': options.user_ref || "USER_REF",
    'requested_user_info': options.requested_user_info || {
      'shipping_address': {
        'street_1': '1 Hacker Way',
        'street_2': '',
        'city': 'MENLO PARK',
        'state': 'CA',
        'country': 'US',
        'postal_code': '94025'
      },
      'contact_name': 'Peter Chang',
      'contact_email': 'peter@anemailprovider.com',
      'contact_phone': '+15105551234'
    },
    'payment_credential': options.payment_credential || {
      'provider_type': 'stripe',
      'charge_id': 'ch_18tmdBEoNIH3FPJHa60ep123',
      'fb_payment_id': '123456789',
    },
    'amount': options.amount || {
      'currency': 'USD',
      'amount': '29.62'
    },
    'shipping_option_id': options.shipping_option_id || '123'
  }
        

  const event = {
    "object":"page",
    "entry":[
      {
        "id": page_id,
        "time": timestamp,
        "messaging":[
          {          
            "recipient":{
              "id": page_id
            }
          }
        ]
      }
    ]
  };

  Object.assign(event.entry[0].messaging[0]), ;

  if (options.sender) util.validateSender(options.sender);

  return event;

}
