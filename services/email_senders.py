from django.core.mail import EmailMultiAlternatives

SAMPLE_BODY = ''
SAMPLE_SUBJECT = 'From IRIS with love'

class Email(object):
    def __init__(self, body = SAMPLE_BODY, subject = SAMPLE_SUBJECT):
        self._body = body
        self._subject = subject
    
    @property
    def body(self):
        return self._body

    @body.setter
    def body(self, value = SAMPLE_BODY):
        self._body = value

    @property
    def subject(self):
        return self._subject

    @subject.setter
    def subject(self, value = SAMPLE_SUBJECT):
        self._subject = value

class EmailSender(object):
    def __init__(self, subject = SAMPLE_SUBJECT, body = SAMPLE_BODY):
        self.email = Email(subject=subject, body=body)

    def set_email(self, subject, body):
        self.email.body = body
        self.email.subject = subject

    def set_receivers(self, receivers):
        self.receivers = receivers if isinstance(receivers, list) else [receivers]

    def send(self):
        self.msg = EmailMultiAlternatives(
            subject=self.email.subject,
            body=self.email.body,
            from_email=None,
            to=self.receivers
        )

        self.msg.attach_alternative(self.email.body, "text/html")

        self.msg.send()
