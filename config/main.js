module.exports = {

    /*"database"  : "mongodb://localhost:27017/tech_talent",*/
    "database"	: "mongodb://tech_talent:DTC3l3b3s@ds047365.mongolab.com:47365/tech_talent",
    "port"      : process.env.PORT || 80,
    "secretKey" : "DTCSecretKey",

    // OAuth 2.0
    "LINKEDIN_SECRET": process.env.LINKEDIN_SECRET || 'Kd61E49RuRr05bTL',
    "LINKEDIN_CID": process.env.LINKEDIN_CID || '75ryg9srtbrqr1',
    "GOOGLE_SECRET": process.env.GOOGLE_SECRET || 'jwpPSyC-r3T-OtV7ohpDfUPY',
    "GOOGLE_CID": process.env.GOOGLE_CID || '573705101198-n8c90t5cueecj4pc5d893gbatqbcl5al.apps.googleusercontent.com',
    "FACEBOOK_SECRET": process.env.FACEBOOK_SECRET || '8c276916b67298e83eec9c66d2fe994e',
    "FACEBOOK_CID": process.env.FACEBOOK_CID || '1690330761186585'
};