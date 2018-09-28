const nodemailer = require('nodemailer');

const {
  MAIL_HOST: host, MAIL_PORT: port, MAIL_USER: user, MAIL_PASS: pass,
} = process.env;

const transport = nodemailer.createTransport({
  host,
  port,
  auth: {
    user,
    pass,
  },
});

const makeANiceEmail = text => `
  <div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <h2>Hello There!</h2>
    <p>${text}</p>
    <p>👋🏻 Simeon Smith</p>
  </div>
`;

exports.transport = transport;
exports.makeANiceEmail = makeANiceEmail;
