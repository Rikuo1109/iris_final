from django.core.mail import EmailMultiAlternatives

SAMPLE_BODY = ''
SAMPLE_SUBJECT = 'From IRIS with love'


class Email(object):
    def __init__(self, body=SAMPLE_BODY, subject=SAMPLE_SUBJECT):
        self._body = body
        self._subject = subject

    @property
    def body(self):
        return self._body

    @body.setter
    def body(self, value=SAMPLE_BODY):
        self._body = value

    @property
    def subject(self):
        return self._subject

    @subject.setter
    def subject(self, value=SAMPLE_SUBJECT):
        self._subject = value


class EmailSender(object):
    def __init__(self, subject=SAMPLE_SUBJECT, body=SAMPLE_BODY):
        self.email = Email(subject=subject, body=body)

    def set_email(self, subject, body):
        self.email.body = body
        self.email.subject = subject

    def set_receivers(self, receivers):
        self.receivers = receivers if isinstance(
            receivers, list) else [receivers]

    def send(self):
        self.msg = EmailMultiAlternatives(
            subject=self.email.subject,
            body=self.email.body,
            from_email=None,
            to=self.receivers
        )

        self.msg.attach_alternative(self.email.body, "text/html")

        self.msg.send()


def register_user(domain, user):

    from rest_framework_simplejwt.tokens import RefreshToken

    from django.urls import reverse

    token = RefreshToken.for_user(user).access_token
    link = f'http://{domain}{reverse("user-active")}?token={token}'

    EMAIL_SUBJECT = 'Active account on IRIS system'
    EMAIL_CONTENT = f'Please click the link bellow to active the account {link}'

    email_sender = EmailSender()
    email_sender.set_email(EMAIL_SUBJECT, EMAIL_CONTENT.format(link))
    email_sender.set_receivers(user.email)
    email_sender.send()

def forgot_password(domain, email):
    from rest_framework_simplejwt.tokens import RefreshToken

    from django.urls import reverse

    from .user_services import services as user_services

    user = user_services._get_by_email(email=email)

    token = RefreshToken.for_user(user)
    link = f'http://{domain}{reverse("user-reset-password")}?token={token}'

    EMAIL_SUBJECT = 'Did you forgot your password on IRIS system?'
    EMAIL_CONTENT = f'Click the link bellow to get your new password {link}'

    email_sender = EmailSender()
    email_sender.set_email(EMAIL_SUBJECT, EMAIL_CONTENT.format(link))
    email_sender.set_receivers(email)
    email_sender.send()
