/*factory untuk Login*/
app.factory('Login', function ($http, $q, CekToken) {

    var cekFactory = {};

    /*function login untuk menghubungkan ke userApi*/
    cekFactory.login = function (email, password) {
        return $http.post('api/auth/login', {
            email: email,
            password: password
        })
            .success(function (data) {
                CekToken.setToken(data.token);
                return data;
            })
    };

    cekFactory.remember = function (name, values) {
        var cookie = name + '=';

        cookie += values + ';';

        var date = new Date();
        date.setDate(date.getDate() + 365);

        cookie += 'expires=' + date.toString() + ';';

        document.cookie = cookie;
    };

    cekFactory.forget = function (name) {
        var cookie = name + '=;';
        cookie += 'expires=' + (new Date()).toString() + ';';

        document.cookie = cookie;
    };

    cekFactory.getEmailCookie = function (cookiename) {
        // Get name followed by anything except a semicolon
        var cookiestring = new RegExp("" + cookiename + "[^;]+").exec(document.cookie);
        // Return everything after the equal sign
        return unescape(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
    };

    /*function signup untuk menghubungkan ke userApi*/
    cekFactory.signup = function (email, password) {
        return $http.post('api/auth/signup', {
            email: email,
            password: password
        })
            .success(function (data) {
                CekToken.setToken(data.token);
                return data;
            })
    };

    /*function Logout untuk setting token*/
    cekFactory.logout = function () {
        CekToken.setToken();
    };

    /*function mengecek ketika user telah login*/
    cekFactory.isLoggedIn = function () {
        if (CekToken.getToken())
            return true;

        return false;
    };

    /*function untuk mendapatkan akun ketika login*/
    cekFactory.getUser = function () {
        if (CekToken.getToken()) {
            return $http.get('/api/getuser/' + CekToken.getToken());
        } else {
            return $q.reject({message: "User has no token"});
        }

    };

    return cekFactory;

})
    .factory('CekToken', function ($window) {

        var cekTokenFactory = {};

        /*function untuk mengambil nilai token yang telah di simpan di localStorage*/
        cekTokenFactory.getToken = function () {
            return $window.localStorage.getItem('token');
        };

        /*function untuk setting nilai token pada localstorage*/
        cekTokenFactory.setToken = function (token) {
            if (token)
                $window.localStorage.setItem('token', token);
            else
                $window.localStorage.removeItem('token');
        };

        return cekTokenFactory;
    });




