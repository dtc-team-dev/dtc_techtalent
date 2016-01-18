/**
 * Created by hanse on 1/18/2016.
 */
module.exports = function(app, express){
    var router = express.Router();

    router.get('/', function(req,res){
        res.render('index', { title: 'DTC' });
    });

    return router;
};