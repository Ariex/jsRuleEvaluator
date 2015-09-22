# jsRuleEvaluator
A simple rule evaluate based on js, targeting web programming.

## Usage
see: https://github.com/Ariex/silverstripe-zenvalidator/blob/master/javascript/parsley/parsley.conditions.js
or https://github.com/Ariex/jsRuleEvaluator/blob/master/unittest/spec/test-cases.js


Please use 'npm install' to install necessary packages fore rebuild/unit test.
Please use 'bower install' to install babel-polyfill.
Please use 'gulp rebuild' to re-compile, publish, update unit test files.
Please use 'gulp publish' to re-compile and publish to 'dist' folder.

Compilation result will be available at 'dist' folder, this project utilized some methods from babel-polyfill, which is also included in this folder.
This project is made originally for SilverStripe, so if you are not using SilverStripe, please modify SilverStripeElementValueExtractor class in SilverStripeElementValueExtractor.es6, or create your own element value extractor then passing to RuleEvaluator.
To run the unit test, a simple web server is required.

## Example
Example for SilverStripe can be found in https://github.com/Ariex/silverstripe-zenvalidator, which is using this lib for client side validation.


## ToDo
Add example for non-SilverStripe.