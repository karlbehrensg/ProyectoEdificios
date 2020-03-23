import nodemailer from 'nodemailer'

export const mail = async (data) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'm.gutierrez06@ufromail.cl',
      pass: '28737777'
    }
  });

  let info = await transporter.sendMail({
    from: 'm.gutierrez06@ufromail.cl',
    to: "testmatiigl@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>"
  });

  console.log("Message sent: %s", info.messageId);
}
