



import { google } from 'googleapis';
import nodemailer from 'nodemailer';


const CLIENT_ID = '18475123505-5bpjua59tajdh84fhbulcv30ansg201a.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04bWwuAOfNMa4CgYIARAAGAQSNwF-L9Irh1HErJVFxgVwJ8WVj1pkji5drLvAwF3bbwONlEnakeMspqy1clLEJ4vYo7blSB5UQE4';


const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
)

oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})


export const sendFeedback = async (req,res) =>{
    
    const {name,email,message} = req.body;
    const accessToken = await oAuth2Client.getAccessToken();
    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            type:"OAUTH2",
            user:"pinuadarsh04@gmail.com",
            clientId:CLIENT_ID,
            clientSecret:CLEINT_SECRET,
            refreshToken:REFRESH_TOKEN,
            accessToken:accessToken,
        }
    })

    let mailOptions = {
        from:email,
        to:"pinu632@gmail.com",
        subject: `Feedback from ${name}`, // Subject line
        text: message, // Plain text body
    }

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Feedback sent successfully!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send feedback' });
      }
}