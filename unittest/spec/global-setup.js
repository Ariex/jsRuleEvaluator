var fixtures;
var facs = [ArrayNodeFactory, DateNodeFactory, TimeNodeFactory];
var re = null;
beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'spec/fixtures';
    loadFixtures("block.html");
    fixture = $("#testFixtures");
    re = new RuleEvaluator($("#testFixtures"), facs, SilverStripeElementValueExtractor);
});
