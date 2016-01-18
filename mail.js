/**
 * Created by hanse on 1/18/2016.
 */
/*module.exports = function(app,express){

};*/

var nodemailer = require('nodemailer');

// Menggunakan SMTP untuk mengirim email
var smtpTransport = nodemailer.createTransport("SMTP",{
    service : 'Gmail',
    auth : {
        user : 'hansenmakangiras@gmail.com',
        pass : 'BlackID85'
    }
});

var mail = {
    from : 'Docotel Teknologi',
    to : 'hansen@docotel.co.id',
    subject : 'Test Send Email menggunakan node js',
    text : 'Node.js new world for me',
    html : '<b> Node.js new world for me </b>'
};

smtpTransport.sendMail(mail,function(err,res){
    if(err){
        res.end('Email failed to send');
    }else{
        res.end("Pesan terkirim : " + res.message);
    }
    /*smtpTransport.close();*/
});
//return smtpTransport;