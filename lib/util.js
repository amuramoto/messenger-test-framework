function validateSender (sender) {  
  let valid_types = ['id', 'user_ref', 'phone_number'];
  let sender_type = Object.keys(sender)[0];
  if (valid_types.indexOf(sender_type) < 0) {
    console.error('Invalid sender');
    return;
  }
}

function getEventBody (type, props) {
  let eventBody;
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

    case 'messaging_postbacks.no_referrer': 
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
            'ref': referral,
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
          'app_id': 1517776481860111,
          'metadata': metadata,
          'mid': mid
        }
      };
      break;

    case 'message_reads': 
      eventBody = {
        'sender': sender,
        'timestamp': timestamp,
        'read':{
          'watermark': watermark
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
          'authorization_code': options.authorization_code || 'AUTHORIZATION_CODE'
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
      eventBody = {
        'sender': sender,
        'timestamp': 1473204787206,
        'checkout_update': {
          'payload': 'DEVELOPER_DEFINED_PAYLOAD',
          'shipping_address': {
            'id': 10105655000959552,
            'country': 'US',
            'city': 'MENLO PARK',
            'street1': '1 Hacker Way',
            'street2': '',
            'state': 'CA',
            'postal_code': '94025'
          }
        }
      };
      break;

    case 'messaging_handovers.pass_thread_control': 
      eventBody = {
        'sender': sender,
        'timestamp': timestamp,
        'pass_thread_control':{
          'new_owner_app_id':'123456789',
          'metadata':'Additional content that the caller wants to set'
        }
      };
      break;
    
    case 'messaging_handovers.take_thread_control': 
      eventBody = {
        'sender': sender,
        'timestamp': timestamp,
        'take_thread_control':{
          'previous_owner_app_id':'123456789',
          'metadata':'additional content that the caller wants to set'
        }
      };
      break;
    
    case 'messaging_handovers.app_roles': 
      eventBody = {
        'sender': sender,
        'timestamp': timestamp,
        'app_roles':{
          '123456789':['primary_receiver']
        }
      };
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

    case 'messaging_payments.provider': 
      eventBody = {
        'sender': sender,
        'timestamp': 1473208792799,
        'payment': {
          'payload': payload,
          'requested_user_info': requested_user_info,
          'payment_credential': payment_credential,      
          'amount': amount, 
          'shipping_option_id': shipping_option_id
        }
      };
      break;

    case 'messaging_payments.tokenized': 
      eventBody = {
        'sender': sender,
        'timestamp': 1473208792799,
        'payment': {
          'payload': payload,
          'requested_user_info': requested_user_info,
          'payment_credential': payment_credential,      
          'amount': amount, 
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
          'requested_user_info': requested_user_info,
          'amount': amount
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
}

module.exports = {
  validateSender
}