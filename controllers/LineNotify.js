const axios = require('axios');

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
