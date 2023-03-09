class MailJob {
  // delay = 0;
  // mailSender = null;

  constructor(delay, mailSender) {
    this.delay = delay;
    this.mailSender = mailSender
  }

  start() {
    if(!this.mailSender || !this.delay) {
      console.log("jos start failed");
      return;
    }

    if (!this.mailSender.send) {
      console.log("please implement [sendMail] in service");
      return;
    }

    console.log("jos start.");
    setInterval(() => {
      this.mailSender.send();
    }, this.delay * 1000);
  }
}


module.exports = MailJob;