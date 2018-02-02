function validateSender (sender) {  
  let valid_types = ['id', 'user_ref', 'phone_number'];
  let sender_type = Object.keys(sender)[0];
  if (valid_types.indexOf(sender_type) < 0) {
    console.error('Invalid sender');
    return;
  }
}

function getEventBody (type, options) {
  let eventBody;

  const 
    timestamp = options.timestamp,
    page_id = options.page_id,
    sender = options.sender,        
    mid = options.mid || "mid.1457764197618 =41d102a3e1ae206a38",
    title = options.title || "TITLE",
    payload = options.payload || "PAYLOAD",
    referral_param = options.referral_param || "REFERRAL_PARAM",
    watermark = options.watermark || 1458668856253,
    text = options.text || "TEXT",
    ad_id = options.ad_id || "AD_ID",
    metadata = options.metadata || "METADATA",
    seq = options.seq || 37,
    user_ref = options.user_ref || "USER_REF",
    street_1 = options.street_1 || '1 Hacker Way',
    street_2 = options.street_2 || 'Building 15',
    city = options.city || 'MENLO PARK',
    state = options.state || 'CA',
    country = options.country || 'US',
    postal_code = options.postal_code ||'94025',
    contact_name = options.contact_name || 'Peter Chang',
    contact_email = options.contact_email || 'peter@anemailprovider.com',
    contact_phone = options.contact_phone || '+15105551234'    
    provider_type = options.provider_type || 'stripe',
    charge_id = options.charge_id || 'ch_18tmdBEoNIH3FPJHa60ep123',
    fb_payment_id = options.fb_payment_id || '123456789',        
    shipping_option_id = options.shipping_option_id || '123',
    app_id = options.app_id || '235408346',
    authorization_code = options.authorization_code || 'AUTHORIZATION_CODE',
    amount = {
      "currency": options.currency || 'USD',
      "amount": options.amount || '10.99'
    },
    shipping_address = {
      "street_1": street_1,
      "street_2": street_2,
      "city": city,
      "state": state,
      "country": country,
      "postal_code": postal_code
    },
    requested_user_info = {
      "shipping_address": shipping_address,
      "contact_name": contact_name,
      "contact_email": contact_email,
      "contact_phone": contact_phone
    };

  switch (type) {
    case 'messages': 
      eventBody = {
        'sender': sender,
        'timestamp': timestamp,
        'message':{
          'mid': mid,
          'text': text
        }
      };
      break;

    case 'messaging_postbacks': 
      eventBody = {
        'sender': sender,
        'timestamp': timestamp,
        'postback':{
          'title': title,
          'payload': payload,
        }
      };
      break;

    case 'messaging_postbacks.m_me': 
      eventBody = {
        'sender': sender,
        'timestamp': timestamp,
        'postback':{
          'title': title,
          'payload': payload,
          'referral': {
            'ref': referral_param,
            'source': 'SHORTLINK',
            'type': 'OPEN_THREAD',
          }
        }
      };
      break;

    case 'messaging_postbacks.ad_referral': 
      eventBody = {
        'sender': sender,
        'timestamp': timestamp,
        'postback':{
          'title': title,
          'payload': payload,
          'referral': {
             'source': 'ADS',
             'type': 'OPEN_THREAD',
             'ad_id': ad_id,
             'ref': referral_param
          }
        }
      };
      break;

    case 'messaging_postbacks.messenger_code': 
      eventBody = {
        'sender': sender,
        'timestamp': timestamp,
        'postback':{
          'title': title,
          'payload': payload,
          'referral': {
            'ref': referral_param,
            'source': 'MESSENGER_CODE',
            'type': 'OPEN_THREAD',
          }
        }
      };
      break;
    
    case 'messaging_postbacks.discover_tab': 
      eventBody = {
        'sender': sender,
        'timestamp': timestamp,
        'postback':{
          'title': title,
          'payload': payload,
          'referral': {
            'source': 'DISCOVER_TAB',
            'type': 'OPEN_THREAD',
          }
        }
      };
      break;
  

    case 'message_deliveries': 
      eventBody = {
        'sender': sender,
        'delivery':{
          'mids':[mid],
          'watermark': watermark,
          'seq': seq
        }
      };  
      break;

    case 'message_echoes': 
      eventBody = {
        'sender': sender,
        'timestamp': timestamp,
        'message':{
          'is_echo': true,
          'app_id': app_id,
          'metadata': metadata,
          'mid': mid
        }
      };
      break;

    case 'message_reads': 
      eventBody = {
        'sender': sender,
        'timestamp': timestamp,
        'read': {
          'watermark': watermark,
          'seq': options.seq || 38
        }
      };
      break;

    case 'messaging_account_linking.linked': 
      eventBody = {
        'sender': sender,
        'timestamp': timestamp,
        'account_linking':{
          'status': 'linked',
          'authorization_code': authorization_code
        }
      };
      break;

    case 'messaging_account_linking.unlinked': 
      eventBody = {
        'sender': sender,
        'timestamp': timestamp,
        'account_linking': {
          'status': 'unlinked'
        }    
      };
      break;
    
    case 'messaging_checkout_updates': 
    //TODO: Does shipping address have an id prop?
      eventBody = {
        'sender': sender,
        'timestamp': timestamp,
        'checkout_update': {
          'payload': payload,
          'shipping_address': shipping_address
        }
      };
      break;

    case 'messaging_handovers.pass_thread_control': 
      eventBody = {
        'sender': sender,
        'timestamp': timestamp,
        'pass_thread_control': {
          'new_owner_app_id': app_id,
          'metadata': metadata
        }
      };
      break;
    
    case 'messaging_handovers.take_thread_control': 
      eventBody = {
        'sender': sender,
        'timestamp': timestamp,
        'take_thread_control':{
          'previous_owner_app_id': app_id,
          'metadata': metadata
        }
      };
      break;

    case 'messaging_handovers.request_thread_control': 
      eventBody = {
        'sender': sender,
        'timestamp': timestamp,
        'take_thread_control':{
          'previous_owner_app_id': app_id,
          'metadata': metadata
        }
      };
      break;
    
    case 'messaging_handovers.app_roles': 
      eventBody = {
        'sender': sender,
        'timestamp': timestamp,
        'app_roles': {}
      };
      eventBody.app_roles[app_id] = ['primary_receiver'];
      break;    

    case 'messaging_optins': 
      eventBody  = {
        'sender': sender,
        'timestamp': timestamp,
        'optin': {
          'ref': referral_param,
          'user_ref': user_ref
        }
      };
      break;

    case 'messaging_payments': 
      eventBody = {
        'sender': sender,
        'timestamp': 1473208792799,
        'payment': {
          'payload': payload,
          "requested_user_info": requested_user_info,
          "payment_credential": {
            "provider_type": provider_type,  
            "charge_id": charge_id,
            "fb_payment_id": fb_payment_id,
          },
          "amount": amount,
          'shipping_option_id': shipping_option_id
        }
      };
      break;

    case 'messaging_policy_enforcement':
      eventBody = {
        'timestamp': timestamp,
        'policy-enforcement':{
          'action':'block',
          'reason':'The bot violated our Platform Policies (https://developers.facebook.com/policy/#messengerplatform). Common violations include sending out excessive spammy messages or being non-functional.'
        }
      };
      break;

    case 'messaging_pre_checkouts': 
      eventBody = {
        'sender': sender,
        'pre_checkout':{
          'payload':'xyz',
          "requested_user_info": requested_user_info,      
          "amount": amount
        }  
      };
      break;

    case 'messaging_referrals.m_me': 
      eventBody = {
        'sender': sender,
        'timestamp': timestamp,
        'referral': {
          'ref': referral_param,
          'source': 'SHORTLINK',
          'type': 'OPEN_THREAD',
        }  
      };
      break;
    
    case 'messaging_referrals.ad_referral':
      eventBody = {
        'sender': sender,
        'timestamp': timestamp,
        'referral': {
          'ref': referral_param,
          'ad_id': ad_id,
          'source': 'ADS',
          'type': 'OPEN_THREAD',
        }
      };
      break;

    case 'messaging_referrals.messenger_code':
      eventBody = {
        'sender': sender,
        'timestamp': timestamp,
        'referral': {
          'ref': referral_param,
          'source': 'MESSENGER_CODE',
          'type': 'OPEN_THREAD',
        }
      };
      break;

    case 'messaging_referrals.discover_tab':
      eventBody = {
        'sender': sender,
        'timestamp': timestamp,
        'referral': {
          'source': 'DISCOVER_TAB',
          'type': 'OPEN_THREAD',
        }
      }
      break;
  }

  return eventBody;
}

module.exports = {
  validateSender,
  getEventBody
}