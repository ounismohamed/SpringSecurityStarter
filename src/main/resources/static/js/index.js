var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "../views/home.html",
            controller : "homeController"
        })
        .when("/user", {
            templateUrl : "../views/user.html",
            controller : "userController"
        })
        .when("/login", {
            templateUrl: "../views/login.html",
            controller: "loginController"
        })
        .when("/admin", {
            templateUrl : "../views/admin.html",
            controller : "adminController"
        })
        .otherwise({
            templateUrl : "../views/home.html",
            controller : "homeController"
        });
});

app.controller('homeController', function($scope, $http) {
    $http.get("/api/security/home").then(function (response) {
        $scope.hello = response.data.data;
    });
});

app.controller('userController', function($scope, $http,$location) {
    $http.get("/api/security/user").then(function (response) {
        $scope.hello = response.data.data;
    });

    $scope.logout = function () {
        $http.post("/logout").success(function () {
            $location.path("/home");
        });
    };
});

app.controller('adminController', function($scope, $http,$location) {
    $http.get("/api/security/admin").then(function (response) {
        $scope.hello = response.data.data;
    });

    $scope.logout = function () {
        $http.post("/logout").success(function () {
            $location.path("/");
        });
    };
});

app.controller('loginController', function ($scope, $http, $location) {
    $scope.login = function (username, password) {

        $http.post("/views/login.html?username=" + username + "&password=" + btoa(password)).success(function () {
            $http.get("/api/security/role").success(function (response) {
                if (angular.equals(response, "ROLE_ADMIN")) {
                    $location.path("/admin");
                    $scope.error = ""
                }
                else if (angular.equals(response, "ROLE_USER")) {
                    $location.path("/user");
                    $scope.error = ""
                }
                else {
                    $scope.error = "bad credentials"
                }
            });
        })

    }
});
