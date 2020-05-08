module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    mongoose: {
        url: process.env.MONGODB_URL + (process.env.NODE_ENV === 'development' ? '-test' : ''),
        options: { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
    },
    // jwt: {
    //   secret: envVars.JWT_SECRET,
    //   accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    //   refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    //   resetPasswordExpirationMinutes: 10,
    // },
    // email: {
    //   smtp: {
    //     host: envVars.SMTP_HOST,
    //     port: envVars.SMTP_PORT,
    //     auth: {
    //       user: envVars.SMTP_USERNAME,
    //       pass: envVars.SMTP_PASSWORD,
    //     },
    //   },
    //   from: envVars.EMAIL_FROM,
    // },
};