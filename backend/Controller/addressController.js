const https = require('https');
const users = require('../Models/userSchema');

// exports.getPincodeDetails = async (req, res) => {
//     const { pincode } = req.params; // Extract pincode from request params
//     // const email = req.body;
//     const { email } = req.body;
//     console.log(email);

//     try {

//         const options = {
//             method: 'GET',
//             hostname: 'india-pincode-with-latitude-and-longitude.p.rapidapi.com',
//             port: null,
//             path: '/api/v1/pincode/600001',
//             headers: {
//                 'x-rapidapi-key': 'a7a80d44c3mshdc48b830e3c55b5p12beefjsnd1f271d6c801',
//                 'x-rapidapi-host': 'india-pincode-with-latitude-and-longitude.p.rapidapi.com'
//             }
//         };

//             const apiReq = https.request(options, function (apiRes) {
//                 let body = '';

//                 // Collect response data
//                 apiRes.on('data', (chunk) => {
//                     body += chunk;
//                 });

//                 apiRes.on('end', async function () {
//                     try {
//                         // Check content type
//                         if (apiRes.headers['content-type'] && apiRes.headers['content-type'].includes('application/json')) {
//                             if (body) {
//                                 // Attempt to parse the response body
//                                 const response = JSON.parse(body);

//                                 if (Array.isArray(response) && response.length === 0) {
//                                     // No data found for the given pincode
//                                     res.status(404).json({ message: 'Pincode not found' });
//                                 } else {
//                                     // Save the pincode in the database
//                                     console.log(email);
//                                     await users.updateOne({ email: email }, { $set: { address: pincode , address_verify: true} });
//                                     res.json({ message: 'Pincode verified and updated successfully', response });
//                                     console.log(address);
//                                     console.log(address_verify);
//                                 }
//                             } else {
//                                 // Empty response body
//                                 res.status(204).json({ message: 'No content returned from API' });
//                             }
//                         } else {
//                             // Unexpected content type
//                             res.status(500).json({ message: 'Unexpected response format', response: body });
//                         }
//                     } catch (parseError) {
//                         console.error(`Error parsing response: ${parseError.message}`);
//                         res.status(500).json({ message: 'Error parsing API response', error: parseError.message });
//                     }
//                 });
//             });

//             apiReq.on('error', (e) => {
//                 console.error(`Problem with request: ${e.message}`);
//                 res.status(500).json({ message: 'Internal server error', error: e.message });
//             });

//             apiReq.on('timeout', () => {
//                 console.error('Request timed out');
//                 apiReq.abort(); // Abort the request
//                 res.status(504).json({ message: 'Request timed out' });
//             });

//             apiReq.end();
        
//     } catch (error) {
//         console.error(`Unexpected error: ${error.message}`);
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };

exports.getPincodeDetails = async (req, res) => {
    const { pincode } = req.params; // Extract pincode from request params
    const { email } = req.body;

    try {
        const options = {
            method: 'GET',
            hostname: 'india-pincode-with-latitude-and-longitude.p.rapidapi.com',
            port: null,
            path: `/api/v1/pincode/${pincode}`, // Dynamically add pincode to the path
            headers: {
                'x-rapidapi-key': 'your-rapidapi-key',
                'x-rapidapi-host': 'india-pincode-with-latitude-and-longitude.p.rapidapi.com'
            }
        };

        const apiReq = https.request(options, function (apiRes) {
            let body = '';

            apiRes.on('data', (chunk) => {
                body += chunk;
            });

            apiRes.on('end', async function () {
                if (apiRes.headers['content-type'] && apiRes.headers['content-type'].includes('application/json')) {
                    if (body) {
                        const response = JSON.parse(body);

                        if (Array.isArray(response) && response.length === 0) {
                            return res.status(404).json({ message: 'Pincode not found' });
                        } else {
                            
                            console.log(email)
                            
                            await users.findOneAndUpdate({ email: 'arianevc6001@gmail.com' }, { $set: { address: pincode , address_verify: true } });
                            return res.json({ message: 'Pincode verified and updated successfully', response });
                        }
                    } else {
                        return res.status(204).json({ message: 'No content returned from API' });
                    }
                } else {
                    return res.status(500).json({ message: 'Unexpected response format', response: body });
                }
            });
        });

        apiReq.on('error', (e) => {
            console.error(`Problem with request: ${e.message}`);
            if (!res.headersSent) {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        });

        apiReq.on('timeout', () => {
            console.error('Request timed out');
            apiReq.abort(); // Abort the request
            if (!res.headersSent) {
                res.status(504).json({ message: 'Request timed out' });
            }
        });

        apiReq.end();
        
    } catch (error) {
        console.error(`Unexpected error: ${error.message}`);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
};
