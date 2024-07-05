import nodemailer from 'nodemailer';
// פונקציה שמקבלת דואל של משתמש ושולחת לו אימייל

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shirap67679@gmail.com',
        pass: 'luzh fnnc ctnn lkwm'
    },
    tls: {
        rejectUnauthorized: false
    }
});

function sendOTPPasswordByEmail(userEmail, otp) {

    let mailOptions = {
        from: 'shirap67679@gmail.com',
        to: userEmail,
        subject: 'קוד לשיחזור סיסמה',
        html: `
              <div style="font-family: Arial, sans-serif; text-align: right; direction: rtl; color: #0066cc;">
            <p>שלום רב,</p>
            <p>בהתאם לבקשתך לאיפוס סיסמא,</p>
            <p> נשלחה עבורך סיסמא חד פעמית. </p>
            <p>יש לשנות את הסיסמא החד פעמית לסיסמא מותאמת אישית</p>
            <p>סיסמתך החד פעמית היא: <strong>${otp}</strong></p>
            <p>הזן את הקוד בדף שחזור הסיסמה באתר כדי להמשיך בתהליך.</p>
            <p>בברכה,</p>
            <p>צוות האתר</p>
        </div>
          `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}
export{ sendOTPPasswordByEmail }


