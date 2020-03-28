import nodemailer from 'nodemailer'

export const mail = async (data) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'm.gutierrez06@ufromail.cl',
      pass: '28737777'
    }
  });

  for (let index = 0; index < data.length; index++) {
    let info = await transporter.sendMail({
      from: 'm.gutierrez06@ufromail.cl',
      to: data[index].person.email,//testmatiigl@gmail.com
      subject: "Encomienda",
      text: "Recepcion de Encomienda",
      html: "<b>En la recepcion se encuentra una encomienda a su nombre</b>"
    });
  
    console.log("Message sent: %s", info.messageId);
  }
}
