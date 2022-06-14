if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "./.env.development" });
}
const env = process.env;
module.exports = {
	saltOrRounds: 11,
	adminEmailAddress: env.ADMIN_SENDER_EMAIL,
	JWT_SECRET: env.JWT_SECRET
}