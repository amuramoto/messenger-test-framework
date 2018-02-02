const test = require('./lib');
let options = {
  timestamp: new Date().getTime(),
  page_id: '44444444',
  sender: {'id': '33333333'},        
  mid: "mid.$cAAJsujCd2ORnUSd1SFhH-IsSityC",
  title: "TITLE",
  payload: "PAYLOAD",
  referral_param: "REFERRAL_PARAM",
  watermark: 1458668856253,
  text: "TEXT",
  ad_id: "AD_ID",
  metadata: "METADATA",
  seq: 37,
  user_ref: "USER_REF",
  street_1: '1 Hacker Way',
  street_2: 'Building 15',
  city: 'MENLO PARK',
  state: 'CA',
  country: 'US',
  postal_code: '94025',
  contact_name: 'Peter Chang',
  contact_email: 'peter@anemailprovider.com',
  contact_phone: '+15105551234',    
  provider_type: 'stripe',
  charge_id: 'ch_18tmdBEoNIH3FPJHa60ep123',
  fb_payment_id: '123456789',        
  shipping_option_id: '123',
  app_id: '235408346',
  authorization_code: 'AUTHORIZATION_CODE',
}

// console.log(JSON.stringify(new test.WebhookEvent('messages.text', options), null, 2))
// console.log(JSON.stringify(new test.WebhookEvent('messaging_postbacks', options), null, 2))
// console.log(JSON.stringify(new test.WebhookEvent('messaging_postbacks.m_me', options), null, 2))
// console.log(JSON.stringify(new test.WebhookEvent('messaging_postbacks.ad_referrals', options), null, 2))
// console.log(JSON.stringify(new test.WebhookEvent('messaging_postbacks.messenger_code', options), null, 2))
// console.log(JSON.stringify(new test.WebhookEvent('messaging_postbacks.discover_tab', options), null, 2))
// console.log(JSON.stringify(new test.WebhookEvent('messaging_referrals.m_me', options), null, 2))
// console.log(JSON.stringify(new test.WebhookEvent('messaging_referrals.ad_referrals', options), null, 2))
// console.log(JSON.stringify(new test.WebhookEvent('messaging_referrals.messenger_code', options), null, 2))
// console.log(JSON.stringify(new test.WebhookEvent('messaging_referrals.discover_tab', options), null, 2))
// console.log(JSON.stringify(new test.WebhookEvent('message_echoes', options), null, 2))
// console.log(JSON.stringify(new test.WebhookEvent('message_deliveries', options), null, 2))
// console.log(JSON.stringify(new test.WebhookEvent('message_reads', options), null, 2))
// console.log(JSON.stringify(new test.WebhookEvent('messaging_checkout_updates', options), null, 2))
// console.log(JSON.stringify(new test.WebhookEvent('messaging_pre_checkouts', options), null, 2))
// console.log(JSON.stringify(new test.WebhookEvent('messaging_handovers.pass_thread_control', options), null, 2))
// console.log(JSON.stringify(new test.WebhookEvent('messaging_handovers.take_thread_control', options), null, 2))
// console.log(JSON.stringify(new test.WebhookEvent('messaging_handovers.request_thread_control', options), null, 2))
// console.log(JSON.stringify(new test.WebhookEvent('messaging_handovers.app_roles', options), null, 2))
// console.log(JSON.stringify(new test.WebhookEvent('messaging_payments', options), null, 2))
// console.log(JSON.stringify(new test.WebhookEvent('messaging_policy_enforcement', options), null, 2))
// console.log(JSON.stringify(new test.WebhookEvent('messaging_optins', options), null, 2))
// console.log(JSON.stringify(new test.WebhookEvent('messaging_account_linking.linked', options), null, 2))
// console.log(JSON.stringify(new test.WebhookEvent('messaging_account_linking.unlinked', options), null, 2))
// 
test.send('ok')