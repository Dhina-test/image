const client = require('@sendgrid/mail');
const {
  SENDGRID_API_KEY,
  SENDGRID_TO_EMAIL,
  SENDGRID_FROM_EMAIL,
} = process.env;

exports.handler = async function (event, context, callback) {
  console.log('-------')
  console.log(event.body)
  JSON.parse(event.body);
  
  const { fname, company_name, email_address, phone_number, comment  } = JSON.parse(event.body);
  client.setApiKey(SENDGRID_API_KEY);

  message
  const data = {
    to: SENDGRID_TO_EMAIL,
    from: SENDGRID_FROM_EMAIL,
    subject: `New message from ${fname} (${email_address})`,
    html: `Name : ${fname} \nCompany Name: ${company_name} \nEmail: ${email_address} \nPhone no: ${phone_number} \nMessage: ${comment}`,
  };

  try {
    await client.send(data);
    return {
      statusCode: 200,
      body: 'Message sent',
    };
  } catch (err) {
    return {
      statusCode: err.code,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
