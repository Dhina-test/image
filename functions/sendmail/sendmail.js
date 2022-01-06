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
  
  const { Name, Company_Name, Email, Phone_Number, comment  } = JSON.parse(event.body);
  client.setApiKey(SENDGRID_API_KEY);

  const data = {
    to: SENDGRID_TO_EMAIL,
    from: SENDGRID_FROM_EMAIL,
    subject: `New message from ${Name} (${Email})`,
    html: `Name : ${Name} \nCompany Name: ${Company_Name} \nEmail: ${Email} \nPhone no: ${Phone_Number} \nMessage: ${comment}`,
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
