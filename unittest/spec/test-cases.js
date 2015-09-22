describe('Tests for Setup ', function() {
    it("should initialize the RuleEvaluator", function() {
        expect(re != null).toBe(true);
    });

    it("should have 2 RuleNodeFactory created", function() {
        expect(facs.length === 3).toBe(true);
    });

    it("should have a default SS element value extractor should exist", function() {
        expect(typeof SilverStripeElementValueExtractor.GetValue === "function").toBe(true);
    });
});

describe('Simple Rule and Controls Test', function() {
    re = new RuleEvaluator($("#testFixtures"), facs, SilverStripeElementValueExtractor);

    it("IsMember has checked is false ", function() {
        expect(re.Evaluate("IsMember == True")).toBe(false);
    });

    it("Test checkbox list", function() {
        $("#Form_TestForm_Enews_CORP").prop("checked", true);
        expect(re.Evaluate("Enews == CORP")).toBe(true);
        $("#Form_TestForm_Enews_SAMOTOR").prop("checked", true);
        expect(re.Evaluate("Enews == SAMOTOR")).toBe(true);
        expect(re.Evaluate("Enews != TRAVEL")).toBe(true);
    });

    it("Drop down list not contains ITEM2", function() {
        $("#Form_TestForm_DDP").val("ITEM3");
        expect(re.Evaluate("DDP == ITEM2")).toBe(false);
    });

    it("Drop down list contains ITEM3", function() {
        $("#Form_TestForm_DDP").val("ITEM3");
        expect(re.Evaluate("DDP == ITEM3")).toBe(true);
    });

    it("Nullable Field Field1 is null", function() {
        $("#Field1 input[type='checkbox']").prop("checked", true);
        expect(re.Evaluate("Field1 == NULL")).toBe(true);
    });

    it("Nullable Field Field1 is asd", function() {
        $("#Field1 input[type='checkbox']").prop("checked", false).siblings("input").val("asd");
        expect(re.Evaluate("Field1 == asd")).toBe(true);
    });

    it("The number field should greater than 4", function() {
        expect(re.Evaluate("nf > 4")).toBe(true);
    });

    it("The number field should equals or greater than 3", function() {
        expect(re.Evaluate("nf >= 3")).toBe(true);
    });

    it("The number field should less than 6", function() {
        expect(re.Evaluate("nf < 6")).toBe(true);
    });

    it("The number field should equals or less than 8", function() {
        expect(re.Evaluate("nf <= 8")).toBe(true);
    });

    it("The readonly number field should equals or greater than -3", function() {
        expect(re.Evaluate("NFR1 >= -3")).toBe(true);
    });

    it("Given name is not ends with 'aaa'.", function() {
        $("#Form_TestForm_GivenName").val("something");
        expect(re.Evaluate("GivenName $= aaa")).toBe(false);
    });

    it("Lastname is ends with 'aaa'.", function() {
        $("#Form_TestForm_LastName").val("somethingaaa");
        expect(re.Evaluate("LastName $= aaa")).toBe(true);
    });
});

describe('Test Date and Time', function() {
    beforeEach(function() {
        $("#Form_TestForm_datefield").datepicker({
            dateFormat: "M d, yy"
        });
        $("#Form_TestForm_datefield").datepicker("setDate", new Date(2015, 8, 24));
    });

    it("date should equals to 2015/09/24", function() {
        expect(re.Evaluate('datefield == 2015-09-24')).toBe(true);
    });

    it("Should be earlier or equals than 2015-09-25", function() {
        expect(re.Evaluate("datefield <= 2015-09-25")).toBe(true);
    });

    it("Should be leter or equals then 2015-01-01", function() {
        expect(re.Evaluate("datefield >= 2015-01-01")).toBe(true);
    });

    it("Time should equals to 00:00:00", function() {
        expect(re.Evaluate("timeField == 00:00:00")).toBe(true);
    });

    it("Time should not equals to 13:00:02", function() {
        expect(re.Evaluate("timeField != 13:00:02")).toBe(true);
    });

    it("Time should equals to 13:00:02 after modify", function() {
        $("#Form_TestForm_timeField").val("01:00:02 PM");
        expect(re.Evaluate("timeField == 13:00:02")).toBe(true);
    });

    it("Should be correct to say the time is later than 12:59:59", function() {
        $("#Form_TestForm_timeField").val("01:00:02 PM");
        expect(re.Evaluate("timeField > 12:59:59")).toBe(true);
    });

    it("Should be correct to say the time is earlier than 13:00:03", function() {
        $("#Form_TestForm_timeField").val("01:00:02 PM");
        expect(re.Evaluate("timeField < 13:00:03")).toBe(true);
    });

    it("Should be correct to say the time is earlier than '01:00:03 PM'", function() {
        $("#Form_TestForm_timeField").val("01:00:02 PM");
        expect(re.Evaluate("timeField < 01:00:03 PM")).toBe(true);
    });

    it("Should be correct to say the time is later than '12:00:03 AM'", function() {
        $("#Form_TestForm_timeField").val("11:00:02 PM");
        expect(re.Evaluate("timeField > 12:00:03 AM")).toBe(true);
    });

    it("Should be correct to say the time is ealier than '12:00:03 PM'", function() {
        $("#Form_TestForm_timeField").val("11:00:02 PM");
        expect(re.Evaluate("timeField > 12:00:03 PM")).toBe(true);
    });
});

describe("Test Extension Methods for string", function() {
    it("Given name should have length of 3", function() {
        $("#Form_TestForm_GivenName").val("Tim");
        expect(re.Evaluate("GivenName.length == 3")).toBe(true);
    });

    it("Given name length should less or equals than 5", function() {
        $("#Form_TestForm_GivenName").val("Timer");
        expect(re.Evaluate("GivenName.length <= 5")).toBe(true);
    });

    it("Given name is not 'tiMer'", function() {
        $("#Form_TestForm_GivenName").val("Timer");
        expect(re.Evaluate('GivenName == tiMer')).toBe(false);
    });

    it("Given name UPPER case should be 'TIMER'", function() {
        $("#Form_TestForm_GivenName").val("Timer");
        expect(re.Evaluate("GivenName.upper == TIMER")).toBe(true);
    });

    it("Given name LOWER case should be 'timer'", function() {
        $("#Form_TestForm_GivenName").val("Timer");
        expect(re.Evaluate("GivenName.lower == timer")).toBe(true);
    });
});

describe('Test Complex Rules', function() {
    it("Complex rule 1", function() {
        $("#Form_TestForm_OP1_1").prop("checked", true);
        expect(re.Evaluate("OP1 == 3 || OP1 == 1")).toBe(true);
        expect(re.Evaluate("OP1 == 3 && OP1 == 1")).toBe(false);
        expect(re.Evaluate('(OP1 == 3 && OP1 == 2) || OP1 == 1')).toBe(true);
        expect(re.Evaluate('(OP1 == 3 || OP1 == 2) && OP1 == 1')).toBe(false);
    });

    it("Complex rule 2", function() {
        $("#Form_TestForm_Enews_CORP").prop("checked", true);
        $("#Form_TestForm_Enews_SHOP").prop("checked", true);
        $("#Field1_IsNull").prop("checked", true);
        $("#Form_TestForm_LastName").val("LastName");

        expect(re.Evaluate("Enews == CORP || Enews == TRAVEL")).toBe(true);
        expect(re.Evaluate("Enews == CORP && Enews == SHOP")).toBe(true);
        expect(re.Evaluate("Enews == Travel && Enews == SHOP")).toBe(false);
        expect(re.Evaluate("(Enews == CORP && LastName ^= Last) || (Enews == TRAVEL && LastName ^= First)")).toBe(true);
        expect(re.Evaluate("Enews == CORP && (LastName ^= Last || (Enews == TRAVEL && LastName ^= First))")).toBe(true);
        expect(re.Evaluate("Enews == CORP && Field1 == NULL && LastName @= stNa")).toBe(true);
    });
});
//@ sourceURL=inpage.js
