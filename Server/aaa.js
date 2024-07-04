import {sendOTPPasswordByEmail} from './mail.js';
import otpGenerator from 'otp-generator';

function test() {
    const otp = otpGenerator.generate(6, {});
    sendOTPPasswordByEmail("bailas3916@gmail.com",otp);

}
test();