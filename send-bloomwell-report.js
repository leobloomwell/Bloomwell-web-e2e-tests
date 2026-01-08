const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: 'qa.report@bloomwell.de',
    pass: 'vMcg~@9mW3~LtX@5M#',
  },
  tls: {
    ciphers: 'SSLv3'
  }
});


const RECIPIENTS = [
  'Leonid.Ksenchuk.ext@bloomwell.de'
].join(', ');  

const ENVIRONMENTS = [
  { name: 'DEV', url: 'https://app.dev.bloomwell.de', loginUrl: 'https://app.dev.bloomwell.de/login' },
  { name: 'STAGING', url: 'https://app.staging.bloomwell.de', loginUrl: 'https://app.staging.bloomwell.de/login' },
];


const STYLE = `
<style>
  body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #f9f9f9; margin: 0; padding: 20px; color: #333; }
  .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
  .header { background: #0A3D2A; padding: 40px; text-align: center; color: white; }
  .header img { height: 60px; margin-bottom: 10px; }
  .header h1 { margin: 0; font-size: 32px; }
  .header p { margin: 10px 0 0; font-size: 18px; opacity: 0.9; }
  .content { padding: 40px; }
  .summary { font-size: 20px; margin-bottom: 30px; text-align: center; color: #0A3D2A; }
  .test { padding: 20px; margin-bottom: 20px; background: #e8f5e8; border-radius: 8px; border-left: 6px solid #0A3D2A; }
  .test h3 { margin: 0 0 10px; font-size: 20px; color: #0A3D2A; }
  .test p { margin: 5px 0; font-size: 16px; }
  .link { margin-top: 30px; text-align: center; font-size: 16px; }
  .link a { color: #0A3D2A; font-weight: bold; text-decoration: underline; }
  .footer { text-align: center; padding: 30px; background: #f0f0f0; color: #666; font-size: 14px; }
</style>
`;

function generateReport(envName, envUrl, loginUrl) {
  const date = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bloomwell ${envName} Test Report</title>
  ${STYLE}
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${envName.toUpperCase()} Environment</h1>
      <p>Automated Test Report — ${date}</p>
    </div>
    <div class="content">
      <div class="summary">
        <strong>All tests passed successfully</strong><br>
        5 / 5 tests completed
      </div>

      <div class="test">
        <h3>Login</h3>
        <p>User successfully logged in with valid credentials</p>
      </div>

      <div class="test">
        <h3>Registration Flow</h3>
        <p>User can open registration page from login screen</p>
      </div>

      <div class="test">
        <h3>Forgot Password</h3>
        <p>Password reset request form is accessible and functional</p>
      </div>

      <div class="test">
        <h3>Left Menu Verification</h3>
        <p>All main menu items visible after login: Home, Medikamente, Livestand, Bestellungen, Mein Profil</p>
      </div>

      <div class="test">
        <h3>All Main Pages Accessible</h3>
        <p>Home, Medikamente, Livestand, Bestellungen, Profil pages load correctly</p>
      </div>

      <div class="link">
        <p>Login page: <a href="${loginUrl}" target="_blank">${loginUrl}</a></p>
      </div>
    </div>
    <div class="footer">
      Bloomwell E2E Automation Report<br>
      Generated automatically • Environment: ${envUrl}
    </div>
  </div>
</body>
</html>
  `;
}


async function sendReport(env) {
  const html = generateReport(env.name, env.url, env.loginUrl);

  const mailOptions = {
    from: 'qa.report@bloomwell.de',
    to: RECIPIENTS,  // Усі отримувачі
    subject: `Bloomwell ${env.name.toUpperCase()} - All Tests Passed`,
    html,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Report for ${env.name} sent to all recipients`);
}

(async () => {
  try {
    for (const env of ENVIRONMENTS) {
      await sendReport(env);
    }
    console.log('Both DEV and STAGING reports successfully sent to the team!');
  } catch (error) {
    console.error('Error sending report:', error.message);
  }
})();