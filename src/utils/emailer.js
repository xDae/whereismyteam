/* global emailjs */

function invitationEmail (email) {
  return emailjs.send('mailgun', 'template_nLMjVwVc', {
    email_to: email,
    from_name: 'whereismyteam',
    to_name: 'James',
    mensaje: 'Check this out!'
  })
}

export default invitationEmail;
