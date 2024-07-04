import {sendOTPPasswordByEmail} from './mail.js';
import otpGenerator from 'otp-generator';

function test() {
    const otp = otpGenerator.generate(6, {});
    sendOTPPasswordByEmail("m0504172631@gmail.com",otp);

}
test();