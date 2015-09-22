class RuleEvaluator {
    constructor(form, nodeFactories, elemValueExtractor) {
        this.container = form;
        this.reg = /(?:\s*([^ =>!<$~^()]+)\s*((?:==|\!=|\>=|\<=|\>|\<|\$=|\^=|\@=))\s*([^=()&|]+)\s*(&&|\|\|){0,1}){1,}?/g;
        this.optMap = {
            "==": "Equals",
            ">": "GreaterThan",
            ">=": "EqualsOrGreaterThan",
            "<": "LessThan",
            "<=": "EqualsOrLessThan",
            "!=": "Equals",
            "^=": "StartsWith",
            "$=": "EndsWith",
            "@=": "Contains"
        };
        this.nodeFacs = nodeFactories;
        this.elemValueExtractor = elemValueExtractor;
    }
    Evaluate(rule) {
        var that = this;
        var paramFuncs = [];
        var paramFuncNames = [];
        var callback = null;
        var ma = that.reg.exec(rule);
        var res = rule.slice();
        var counter = 0;
        while (ma != null) {
            var funcName = "func"+(counter++);
            var left = ma[1].split(/\./);
            var opt = ma[2];
            var right = ma[3];

            var selector = "#" + left[0];
            var elem = that.container.find(selector);
            if (elem.length < 1) {
                res = res.replace(ma[0], "false") + (ma.length == 5 ? " " + ma[4] + " " : "");
                ma = that.reg.exec(rule);
                continue;
            }
            var func = null;
            var leftV = that.elemValueExtractor.GetValue(elem);


            func = (function(leftExtFunc, operator, lv, expectedValue) {
                return function() {
                    var leftElem = RuleNode.CreateNode(lv, that.nodeFacs);
                    if (typeof leftExtFunc === "string" && typeof leftElem[leftExtFunc] === "function") {
                        leftElem = RuleNode.CreateNode(leftElem[leftExtFunc](), that.nodeFacs);
                    }
                    //switch opts, call method on leftElem
                    if (typeof leftElem[that.optMap[operator]] === "function") {
                        return operator === "!=" ? !leftElem[that.optMap[operator]](expectedValue) : leftElem[that.optMap[operator]](expectedValue);
                    }
                }
            })(left.length > 1 ? left[1] : null, opt, leftV, right.trim());
            
            res = res.replace(ma[0], funcName + "()" + (typeof ma[4] === "string" ? " " + ma[4] + " " : ""));
            paramFuncs.push(func);
            paramFuncNames.push(funcName);
            ma = that.reg.exec(rule);
        }
        var f = Function(paramFuncNames, "return " + res);
        return f.apply(that, paramFuncs);
    }
}
