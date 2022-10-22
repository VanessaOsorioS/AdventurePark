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
    hash=os.environ.get("hash_validator")
    if(hash == 'Admin@notificacion.sender'):
        try:
            email_sender=os.environ.get('EMAIL_SENDER')
            to=request.form['destination']
            subject=request.form['subject']
            message_content=request.form['message']
            message=Mail(
                from_email=email_sender,
                to_emails=to,
                subject=subject,
                html_content=message_content
            )
            try:
                sg=SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
                response=sg.send(message)
                # print(response.status_code)
                # print(response.body)
                # print(response.headers)
                return "OK"
            except Exception as e:
                print(e.message)
                return "KO"
        except:
            return "faltan datos para el email"
    else:
        return "hash error"

"""@app.route("/sms", methods=['POST'])
def sms():
    hash = request.form['hash_validator']
    if(hash == 'Admin@notificacion.sender'):
        try:
            destination = request.form['destination']
            message = request.form['message']
            account_sid = os.environ.get("account_sid")
            auth_token = os.environ.get("auth_token")
            client = Client(account_sid, auth_token)
            message = client.messages.create(
                from_="+12058329750",
                messaging_service_sid = os.environ.get("messaging_service_sid"),
                to=destination,
                body=message
            )
            print(message.sid)
            return "OK"
        except:
            return "KO"
    else:
        return "hash_error"
    
"""    

@app.route("/sms", methods=["POST"])
def sms():
    try:
        account_sid = os.environ.get("account_sid")
        auth_token = os.environ.get("auth_token")
        hash_validator = os.environ.get("hash_validator")
        NUMBER = os.environ.get("number_active")
    except Exception as error:
        return f"|[ Datos incompletos para el envío movil: {error} ]|"

    hash = request.form["hash_validator"]
    print(f"01", hash)

    if hash == hash_validator:
        destination = request.form["destination"]
        message = request.form["message"]
        print(f"02", message)
        ## destination = request.form["destination"]

        # Para uso con Twilio.
        try:
            print(f"03", account_sid, auth_token)
            client = Client(account_sid, auth_token)

            message = client.messages.create(
                from_=NUMBER,
                # messaging_service_sid = TWILIO_SID,
                to=destination,
                body=message
            )
            print(f"04", message)
            print(message.sid)
            return 'OK'
        except:
            return 'KO'
    else:
        print(f"TS | {hash_validator} != {hash}")
        return f"|[ hash_error: {hash} ]|"


if __name__ == '__main__':
    hash_validator = os.environ.get("hash_validator")
    print("hash_validator = ", hash_validator)
    app.run()
