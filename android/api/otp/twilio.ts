// Twilio API endpoint
const TWILIO_API_URL = `https://api.twilio.com/2010-04-01/Accounts/${process.env.EXPO_TWILIO_ACCOUNT_SID}/Messages.json`;

export const sendSMS = async (to: string, message: string) => {
  try {
    console.log('Sending SMS to:', to);
    console.log('Message:', message);
    console.log('Using Account SID:', process.env.EXPO_TWILIO_ACCOUNT_SID);
    console.log('Using Phone Number:', process.env.EXPO_TWILIO_PHONE_NUMBER);

    const authString = btoa(`${process.env.EXPO_TWILIO_ACCOUNT_SID}:${process.env.EXPO_TWILIO_AUTH_TOKEN}`);
    console.log('Auth String (first 10 chars):', authString.substring(0, 10) + '...');

    const response = await fetch(TWILIO_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + authString,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        To: to,
        From: process.env.EXPO_TWILIO_PHONE_NUMBER || '',
        Body: message,
      }).toString(),
    });

    const responseText = await response.text();
    console.log('Response status:', response.status);
    console.log('Response text:', responseText);

    if (!response.ok) {
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch (e) {
        errorData = { message: responseText };
      }
      console.error('SMS API Error:', errorData);
      throw new Error(errorData.message || 'Failed to send SMS');
    }

    const result = JSON.parse(responseText);
    console.log('SMS sent successfully:', result.sid);
    return result;
  } catch (error: any) {
    console.error('Error sending SMS:', error);
    throw new Error('Failed to send SMS: ' + (error.message || 'Unknown error'));
  }
}; 