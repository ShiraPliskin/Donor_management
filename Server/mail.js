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
        }
    });
}

function sendUserDetailsByEmail(email, pw) {

    let mailOptions = {
        from: '"כולל צילו של היכל" <shirap67679@gmail.com>',
        to: email,
        subject: 'נוספת לצוות "צילו של היכל"',
        html: `
              <div style="font-family: Arial, sans-serif; text-align: right; direction: rtl; color: #0066cc;">
            <p>שלום רב,</p>
            <p>מנהל התורמים של כולל "צילו של היכל", </p>
            <p> צירף אותך לצוות ניהול התורמים של הכולל.</p>
            <p>על מנת להיכנס לאתר,</p>
            <p>כתובת המייל והסיסמה שלך הם:</strong></p>
            <p>מייל: ${email}</p>
            <p>סיסמתך: ${pw}</p>
            <p>ניתן לעדכן את הפרטים באתר</p>
            <p>בברכה,</p>
            <p>צוות האתר</p>
        </div>
          `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
    });

}
export { sendOTPPasswordByEmail, sendUserDetailsByEmail }
