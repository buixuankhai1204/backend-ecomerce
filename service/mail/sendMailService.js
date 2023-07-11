const mailler = require("nodemailer");
module.exports = class sendMailService {
    config;

    constructor() {
        this.config = mailler.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 587,
            secure: false,
            auth: {
                user: '255c52475eb0bb',
                pass: '2df1c6cdb76579'
            }
        });
    };

    async sendMail(emailTarget, subject, message) {
        const info = await this.config.sendMail({
            from: 'khaibuixuan2@gmail.com', // sender address
            to: emailTarget,
            subject: subject, // Subject line
            text: message, // plain text body
            html: `<b>${message}</b>`, // html body
        });

        return info;
    }
}