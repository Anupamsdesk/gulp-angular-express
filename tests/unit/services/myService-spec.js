//myServicespec.js
describe('Unit: myService', function(){
	
	beforeEach(module('app'));
	
	it('should be defined', inject(['myService', function(myService){
		expect(myService).toBeDefined();
	}]));

	describe('getGreetings', function(){
		var aService, getGreetings;
		beforeEach(inject(['myService', function(myService){
			aService = myService;
			getGreetings = aService.getGreetings;
		}]));
		it('should be defined', function(){
			expect(getGreetings).toBeDefined();
		});
		it('should return Hello, World!', function(){
			expect(getGreetings()).toEqual('Hello, World');
		});
	});

	describe('getLengths', function(){
		var aService, getLengths;
		beforeEach(inject(['myService', function(myService){
			aService = myService;
			getLengths = aService.getLengths;
		}]));
		it('should be defined', function(){
			expect(getLengths).toBeDefined();
		});
		it('should return Hello, World!', function(){
			expect(getLengths()).toEqual([5, 5]);
		});
	});
});