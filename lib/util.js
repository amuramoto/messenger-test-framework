function validateSender (sender) {  
  let valid_types = ['id', 'user_ref', 'phone_number'];
  let sender_type = Object.keys(sender)[0];
  if (valid_types.indexOf(sender_type) < 0) {
    console.error('Invalid sender');
    return;
  }
}



module.exports = {
  validateSender
}