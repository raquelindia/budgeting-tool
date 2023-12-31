
import 'angular-mocks';
import './script.js';

describe('monthlySubscriptions directive', function() {
var $compile, $rootScope, $httpBackend;

    beforeEach(module('budgetingApp'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;

        $httpBackend.whenGET('subscriptions-files/components/subscriptionComponent.html')
  .respond('<div id="monthly-budget-container" class="pt-4 pb-5">' +
            '<div id="monthly-budget-top" class="flex flex-row justify-between">' +
            '<div class="flex flex-row justify-start -ml-6 mb-4">' +
            '<div class="flex flex-row gap-2">' +
            '<div><h1 class="text-xl font-light text-purple-800">{{ service }} - {{ cost }}</h1></div>' +
            '<div class="mt-1"><h1 class="text-pink-400 font-bold">{{months[currentMonth]}}</h1></div>' +
            '<div class="text-purple-400 font-semibold mt-1"><p>{{" " + currentYear}}</p></div>' +
            '</div>' +
            '</div>' +
            '<div class="flex flex-row gap-3">' +
            '<div><p class="text-purple-500 font-extrabold">{{"$" + moneyLeft}}</p></div>' +
            '<div class="text-purple-400"><a class="border border-purple-400 pt-3 pr-1 pl-1 rounded-lg href=""><span class="material-symbols-outlined">edit</span></a></div>' +
            '</div>' +
            '</div>' +
            '<div ng-include="\'' + './budget-section-files/components/monthlyBudgetBar.html' + '\'"></div>' +
            '</div>');

    }));

    it('should display service and cost in the template', function() {
        var scope = $rootScope.$new();
        scope.service = 'Service name',
        scope.cost = '100';

        var element = $compile('<monthly-subscription service="{{ service }}" cost="{{ cost }}"></monthly-subscription>')(scope);

        scope.$digest();

        expect(element.text()).toContain('Service name - 100');

    });
})