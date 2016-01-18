module.exports = {

    /*"database"  : "mongodb://localhost:27017/tech_talent",*/
    "database"	: "mongodb://tech_talent:DTC3l3b3s@ds047365.mongolab.com:47365/tech_talent",
    "port"      : process.env.PORT || 80,
    "secretKey" : "DTCSecretKey",

        // OAuth 2.0
    "LINKEDIN_SECRET": process.env.LINKEDIN_SECRET || 'Kd61E49RuRr05bTL',
    "LINKEDIN_CID": process.env.LINKEDIN_CID || '75ryg9srtbrqr1'

}