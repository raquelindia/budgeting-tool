var app = angular.module('budgetingApp', ["ngRoute"]);
app.controller('appCtrl', function($scope){
  $scope.submittedBudgetForms = [
    {title: "Sample Budget", amount: 30, spent: 20}
  ];
  $scope.newBudgetData = {};
  

    //sample data
    $scope.accountInfo = [{firstName: "Raquel", lastName: "Cruz", budget: 500, spent: $scope.totalSubscriptionCost + $scope.totalGroceriesCost}];
    $scope.subscriptions = [
        {subscription: "Netflix", cost: 15},
        {subscription: "Github", cost: 4},
        {subscription: "Hulu", cost: 15}
    ];
    $scope.groceries = [
        {expense: 32},
        {expense: 53},
        {expense: 21}
    ];

     $scope.expenses = [
     $scope.totalSubscriptionCost,
     $scope.totalGroceriesCost
    ];
    //expenses totals
    $scope.totalGroceriesCost = 0;
    $scope.totalSubscriptionsCost = 0;
  
    $scope.barColor = 'green';
    $scope.percentageSpent = 0;
    $scope.barWidth = "";
    $scope.barWhiteSpaceWidth = "";
    $scope.barTextColor = 'white';
    $scope.leftBarBorderRadius = "12px";
  

    //date 
    $scope.months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    $scope.currentDate = new Date();
    $scope.currentMonth = $scope.currentDate.getMonth();
    $scope.currentYear = $scope.currentDate.getFullYear();

    $scope.budget = $scope.accountInfo[0].budget;
    $scope.spent = $scope.accountInfo[0].spent;
    $scope.moneyLeft = $scope.budget - $scope.spent;

    //functions
//submit forms functions 
$scope.submitNewBudgetForm = function () {
     $scope.submittedBudgetForms.push(angular.copy($scope.newBudgetData));
     $scope.newBudgetData = {};
};

//get subscriptions cost total 
$scope.getSubscriptionsTotal = function () {
    var count = 0;
    for (let i = 0; i < $scope.subscriptions.length; i++) {
        var subscriptionCost = $scope.subscriptions[i].cost;
        console.log(subscriptionCost)
        count = count + subscriptionCost;
        console.log(count);
    }
    $scope.totalSubscriptionCost = count;
    console.log($scope.totalSubscriptionCost);
    };
     $scope.getSubscriptionsTotal();
    
$scope.getGroceriesTotal = function () {
        var groceriesCount = 0;
        for(let j = 0; j < $scope.groceries.length; j++){
            var groceriesCost = $scope.groceries[j].expense;
            groceriesCount = groceriesCount  + groceriesCost;
        }
        $scope.totalGroceriesCost = groceriesCount;
     }; $scope.getGroceriesTotal();

    $scope.changeBarColor = function () {
        if($scope.spent === 0) {
            $scope.barColor = 'lightgrey';
            $scope.barTextColor = 'green';
        }
       else if ($scope.spent >= $scope.budget) {
            $scope.barColor = '#c30010';
        } else if ($scope.budget - $scope.spent < $scope.budget - $scope.budget / 2) {
            $scope.barColor = '#FA9C1B';
        } else {
            $scope.barColor = 'green';
        }
    }
    $scope.changeBarColor();

 //calculate percentage 
 $scope.getPercentage = function (spent, budget) {
    $scope.percentageSpent = (spent / budget) * 100;
    var roundDown = Math.floor($scope.percentageSpent);
    $scope.percentageSpent = roundDown;
    $scope.percentageSpent.toString();
    var num = $scope.percentageSpent;
    if (num >= 100) {
        num = 100;
        $scope.leftBarBorderRadius = "12px";
    } else {
        $scope.leftBarBorderRadius = "1px";
    }
    if (num < 28){
        num = 28;
    }
    var numToString = num.toString();
    $scope.barWidth = numToString + "%";
    var percentageNotSpent = 100 - roundDown;
    if (percentageNotSpent > 72){
       percentageNotSpent = 72;
    }
    var notSpentToString = percentageNotSpent.toString();
    $scope.barWhiteSpaceWidth = notSpentToString + "%";
    

    return $scope.percentageSpent;
 }; $scope.getPercentage($scope.spent, $scope.budget);

});
app.config(function($routeProvider){
    $routeProvider
    .when("#/!", {
        templateUrl : "budgetSection.html",
        controller: 'appCtrl'
    })
    .when("/budget", {
        templateUrl : "budgetSection.html",
        controller: 'appCtrl'
    })
    .when("/newbudget", {
        templateUrl : "newBudgetForm.html",
        controller: 'appCtrl'
    })
    .when("/overview", {
        templateUrl : "overview.html",
        controller: 'appCtrl'
    })
    .when("/subscriptions", {
        templateUrl : "subscriptions.html",
        controller: 'appCtrl'
    })
    .when("/account", {
        templateUrl : "account.html",
        controller: 'appCtrl'
    })
    .when("/addsubscription", {
        templateUrl : "newSubscriptionForm.html",
        controller: 'appCtrl'
    })
    .otherwise({
        templateUrl : "budgetSection.html",
        controller: 'appCtrl'
    })
})