import * as nodemial from "nodemailer";

// Configurar el transporte
const transporter = nodemial.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default transporter;
