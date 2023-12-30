var app = angular.module('budgetingApp', ["ngRoute"]);
app.controller('appCtrl', function($scope){
    //budget data
  $scope.submittedBudgetForms = [
    {title: "Sample Budget 1", amount: 100, spent: 40, barWidth: "80%", greyBarWidth: "20%", moneyLeft: 60},
    {title: "Sample Budget 2", amount: 320, spent: 70, barWidth: "21%", greyBarWidth: "79%", moneyLeft: 250}
  ];

  $scope.newBudgetData = {};

     //subscription data 

     $scope.submittedSubscriptionForms = [
        {service: "Netflix", cost: 17},
        {service: "Hulu", cost: 15},
        {service: "CrunchyRoll", cost: 12},
        {service: "Disney Plus", cost: 10}
     ];

     $scope.newSubscriptionData = {};


     //numbers of things 
    $scope.numberOfBudgets = $scope.submittedBudgetForms.length;
    $scope.numberOfSubscriptions = $scope.submittedSubscriptionForms.length;


    //sample data
    $scope.accountInfo = [{firstName: "Raquel", lastName: "Cruz", budget: 500, spent: $scope.totalSubscriptionCost + $scope.totalGroceriesCost}];
  
    $scope.groceries = [
        {expense: 32},
        {expense: 53},
        {expense: 21}
    ];

     $scope.expenses = [
     $scope.totalSubscriptionsCost,
     $scope.totalGroceriesCost
    ];
    //expenses totals
    $scope.totalMonthlySpent = 0;
    $scope.totalGroceriesCost = 12;
    $scope.totalSubscriptionsCost = 0;
    $scope.totalMonthlyBudgetSpent = 0;
    $scope.totalSubmittedBudget = 0; 
    $scope.mostExpensiveSubscriptionService = "";
    $scope.mostExpensiveSubscriptionCost = 0;
  
    $scope.barColor = 'green';
    $scope.percentageSpent = 0;
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
    $scope.moneyLeft = $scope.budget - $scope.spent;

    //to show forms on templates 
    $scope.isBudgetFormDisplayed = false;
    $scope.isSubscriptionFormDisplayed = false;

    //functions
//submit forms functions 
/* save this to a database or api or something */
$scope.toggleAddBudgetForm = function () {
    $scope.isBudgetFormDisplayed = !$scope.isBudgetFormDisplayed;
};

$scope.toggleAddSubscriptionForm = function () {
    $scope.isSubscriptionFormDisplayed = !$scope.isSubscriptionFormDisplayed;
};


$scope.getMoneyLeft = function () {
    for (let i = 0; i < $scope.submittedBudgetForms.length; i++){
        var amount = $scope.submittedBudgetForms[i].amount;
        var spent = $scope.submittedBudgetForms[i].spent;
        $scope.moneyLeft = amount - spent;
        console.log($scope.moneyLeft);
    }
}; $scope.getMoneyLeft();

//submit and send budget data to array
$scope.submitNewBudgetForm = function () {
    var spent = $scope.newBudgetData.spent
    var amount =  $scope.newBudgetData.amount;
    var getPercent = (spent / amount) * 100;

    var roundDown = Math.floor(getPercent);

    var greyBarRounded = 100 - getPercent;
    greyBarRounded = Math.floor(greyBarRounded);
    var getGreenBarWidth = roundDown.toString() + "%";
    var getGreyBarWidth = greyBarRounded.toString() + "%";
    $scope.newBudgetData.barWidth = getGreenBarWidth;
    $scope.newBudgetData.greyBarWidth = getGreyBarWidth;
    $scope.newBudgetData.moneyLeft = amount - spent;
    console.log($scope.newBudgetData.barWidth);
    console.log($scope.newBudgetData.greyBarWidth);

     $scope.submittedBudgetForms.push(angular.copy($scope.newBudgetData));
     $scope.newBudgetData = {};
};

//submit and send subscription data to array
$scope.submitNewSubscriptionForm = function () {

$scope.submittedSubscriptionForms.push(angular.copy($scope.newSubscriptionData));
$scope.newSubscriptionData = {};
};


//get subscriptions cost total 
$scope.getSubscriptionsTotal = function () {
    var count = 0;
    for (let i = 0; i < $scope.submittedSubscriptionForms.length; i++){
        count = count + $scope.submittedSubscriptionForms[i].cost;
    };
    $scope.totalSubscriptionsCost = count;
}; $scope.getSubscriptionsTotal();

//get budgets total

$scope.getBudgetsTotalSpent = function () {
    var count = 0;
    for (let i = 0; i < $scope.submittedBudgetForms.length; i++){
        count = count + $scope.submittedBudgetForms[i].spent;
    };
    $scope.totalMonthlyBudgetSpent = count;
}; $scope.getBudgetsTotalSpent();

//find most expensive subscription
$scope.getMostExpensiveSubscription = function () {
    var cost = 0;
    var subscriptionName = "";
    for (let i = 0; i < $scope.submittedSubscriptionForms.length; i++) {
        if ($scope.submittedSubscriptionForms[i].cost > cost){
            cost = $scope.submittedSubscriptionForms[i].cost;
            subscriptionName = $scope.submittedSubscriptionForms[i].service;
        }
    }
    $scope.mostExpensiveSubscriptionService = subscriptionName;
    $scope.mostExpensiveSubscriptionCost = cost;
}; $scope.getMostExpensiveSubscription();

// add all costs 
$scope.getTotalCosts = function () {
var count = 0;
count = count + $scope.totalSubscriptionsCost;
count = count + $scope.totalMonthlyBudgetSpent;
$scope.totalMonthlySpent = count;
console.log($scope.totalMonthlySpent); 
}; $scope.getTotalCosts();
    

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
    var percentageNotSpent = 100 - roundDown;
    if (percentageNotSpent > 72){
       percentageNotSpent = 72;
    }
    var notSpentToString = percentageNotSpent.toString();
    $scope.barWhiteSpaceWidth = notSpentToString + "%";
    

    return $scope.percentageSpent;
 }; $scope.getPercentage($scope.spent, $scope.budget);

});

//directives

//directive for budget components
app.directive('monthlyBudget', function(){
    return {
        restrict: 'E',
        templateUrl: 'budget-section-files/components/monthlyBudget.html',
        scope: {
            moneyLeft: '@',
            title: "@",
            amount: "@",
            spent: "@",
            barWidth: '@',
            greyBarWidth: '@'

        },
        controller: 'appCtrl'
       
    };
});


app.directive('monthlySubscriptions', function(){
    return {
        restrict: 'E',
        templateUrl: 'subscriptions-files/components/subscriptionComponent.html',
        scope: {
            service: '@',
            cost: '@'
        },
    controller: 'appCtrl'
    };
})


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