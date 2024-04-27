const axios = require('axios');

//เปลี่ยน Token ด้วยน่ะครับ เช่น const token = 'waRRbLw3mIM7hEcyKaiUfNadR1O9zcMNloxAORZVTYx' ตรงไฟล์ payment.js บรรทัดที่ 4 ครับ

exports.Linenotifys = async (token, message) => {
    try {
        const response = await axios.post('https://notify-api.line.me/api/notify', 
        {
            message: message
        }, 
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
