import {serverURL} from './serverURL'
import { commonAPI } from './commonAPI'
import axios from 'axios';

//register user
export const registerAPI = async(user) => {
    console.log("running")
    return await commonAPI("post",`${serverURL}/register`,user,"")
}

//verify-email
export const verifyEmailAPI = async(email) => {
    return await commonAPI("post",`${serverURL}/verify-email`,email,"")
}

//verify-otp
export const verifyOtpAPI = async(body) => {
    return await commonAPI("post",`${serverURL}/verify-otp`,body,"")
}
// Send phone OTP
export const sendPhoneOtpAPI = async (phone) => {
    return await commonAPI("post", `${serverURL}/send-phone-otp`, phone, "");
};

// Verify phone OTP
export const verifyPhoneOtpAPI = async (body) => {
    return await commonAPI("post", `${serverURL}/verify-phone-otp`, body, "");
};
                                           
//login
export const loginAPI = async(user) => {
return await commonAPI("post",`${serverURL}/login`,user,"")
}

export const verifyAadharAPI = async (reqBody) => {
    try {
        const response = await axios.post(`${serverURL}/verify-aadhaar`, reqBody);
        return response;
    } catch (error) {
        throw new Error('Failed to verify Aadhar');
    }
};

export const verifyAddressAPI = async(addr,reqBody) => {
    return await commonAPI("get",`${serverURL}/pincode/${addr}`,reqBody,"")
};

// PAN Verification API
export const verifyPanAPI = async (data) => {
    try {
        const response = await axios.post(`${serverURL}/verify-pan`, data);
        return response;

    } catch (error) {
        console.error('Error in verifyPanAPI:', error);
        throw error;
    }
};
//verify gst
export const verifyGstAPI = async(reqBody,reqHeader) => {
    console.log("Tryn to verify GST")
    return await commonAPI("post",`${serverURL}/verify-gst`,reqBody,reqHeader)
};


export const verifyAccountAPI = async (reqBody) => {
    try {
      const response = await axios.post(`${serverURL}/bank-account`, reqBody);
      return response;
    } catch (error) {
      throw new Error("Failed to verify Account");
    }
  };
