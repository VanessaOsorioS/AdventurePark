# save this as app.py
from flask import Flask, request
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from twilio.rest import Client 


app = Flask(__name__)

@app.route("/")
def hello():
    return "home"

@app.route("/email", methods=['POST'])
def email():
    hash = request.form['hash_validator']
    if(hash == os.environ.get('HASH_VALIDATOR')):
        try:
            email_sender = os.environ.get('EMAIL_SENDER')
            to = request.form['destination']
            subject = request.form['subject']
            message_content = request.form['message']
            message = Mail(
            from_email=email_sender,
            to_emails=to,
            subject=subject,
            html_content=message_content)
            try:
                sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
                response = sg.send(message)
                print(response.status_code)
                print(response.body)
                print(response.headers)
                return "OK"
            except Exception as e:
                print(e.message)
                return "KO"
        except:
            return "faltan datos para el email"
    else:
        return "hash error"

@app.route("/sms", methods=['POST'])
def sms():
    hash = request.form['hash_validator']
    if(hash == "Admin@sms.sender"):
        destination = request.form['destination']
        message = request.form['message']
        
        try:
            account_sid = os.environ.get("account_sid")
            auth_token = os.environ.get("auth_token")
            client = Client(account_sid, auth_token)
            message = client.messages.create(
                messaging_service_sid=os.environ.get("messaging_service_sid"),
                body=message,
                to=destination
            )
            print(message.sid)
            return "OK"
        except:
            return "KO"
    else:
        return "hash_error"


if __name__ == '__main__':
    app.run()
