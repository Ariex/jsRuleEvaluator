class RuleNode {
	constructor(rawValue) {
		this.RawValue = rawValue;
	}

	static CreateNode(rawValue, nodeFactories) {
		if (rawValue == null) {
			rawValue = "NULL";
		}
		if (typeof rawValue === "boolean") {
			rawValue = rawValue ? "True" : "False";
		}
		if(typeof nodeFactories == "object"){
			for(var i=0;i<nodeFactories.length;i++){
				try{
					var node = nodeFactories[i].CreateNode(rawValue);
					if(node!=null){
						return node;
					}
				}catch(e){}
			}
		}
		if (typeof rawValue === "string" || typeof rawValue === "number") {
			return new StringRuleNode(rawValue);
		}
		return null;
	}

	getNodeType() {}

	getRawValue() {
		return this.RawValue;
	}

	Equals(right) {
		throw new Exception(this.getNodeType() + ' does not support this operation - GreaterThan.');
	}

	GreaterThan(right) {
		throw new Exception(this.getNodeType() + ' does not support this operation - GreaterThan.');
	}

	EqualsOrGreaterThan(right) {
		throw new Exception(this.getNodeType() + ' does not support this operation - EqualsOrGreaterThan.');
	}

	LessThan(right) {
		throw new Exception(this.getNodeType() + ' does not support this operation - LessThan.');
	}

	EqualsOrLessThan(right) {
		throw new Exception(this.getNodeType() + ' does not support this operation - EqualsOrLessThan.');
	}

	StartsWith(right) {
		throw new Exception(this.getNodeType() + ' does not support this operation - StartsWith.');
	}

	EndsWith(right) {
		throw new Exception(this.getNodeType() + ' does not support this operation - EndsWith.');
	}

	Contains(right) {
		throw new Exception(this.getNodeType() + ' does not support this operation - GreaterThan.');
	}

	/* additional functions can be accessed after a dot */
	length() {
		throw new Exception(this.getNodeType() + ' does not support this method - length.');
	}

	lower() {
		throw new Exception(this.getNodeType() + ' does not support this method - length.');
	}

	upper() {
		throw new Exception(this.getNodeType() + ' does not support this method - length.');
	}
}







class StringRuleNode extends RuleNode {
	getNodeType() {
		return 'String';
	}

	Equals(right) {
		var strRight = "" + right;
		return this.RawValue == strRight;
	}

	GreaterThan(right) {
		var l = parseFloat(this.RawValue);
		var r = parseFloat(right);
		return l > r;
	}

	EqualsOrGreaterThan(right) {
		var l = parseFloat(this.RawValue);
		var r = parseFloat(right);
		return l >= r;
	}

	LessThan(right) {
		var l = parseFloat(this.RawValue);
		var r = parseFloat(right);
		return l < r;
	}

	EqualsOrLessThan(right) {
		var l = parseFloat(this.RawValue);
		var r = parseFloat(right);
		return l <= r;
	}

	StartsWith(right) {
		return this.RawValue.slice(0, right.length) == right;
	}

	EndsWith(right) {
		return this.RawValue.slice(-1 * right.length) == right;
	}

	Contains(right) {
		return this.RawValue.includes(right);
	}

	/* additional functions can be accessed after a dot */
	length() {
		return this.RawValue.length;
	}

	lower() {
		return this.RawValue.toLowerCase();
	}

	upper() {
		return this.RawValue.toUpperCase();
	}
}




class ArrayRuleNode extends RuleNode {
	getNodeType() {
		return 'Array';
	}

	Equals(right) {
		return this.RawValue.includes(right);
	}

	Contains(right) {
		return this.RawValue.includes(right);
	}

	/* additional functions can be accessed after a dot */
	length() {
		return this.RawValue.length;
	}
}

class ArrayNodeFactory {
	static CreateNode(rawValue) {
		if (Array.isArray(rawValue)) {
			return new ArrayRuleNode(rawValue);
		}
		return null;
	}

	static ConvertRightValue(right) {
		return right;
	}
}


class DateRuleNode extends StringRuleNode {
	getNodeType() {
		return "Date";
	}

	Equals(right) {
		if (this.RawValue == null && right == null) {
			return true;
		}
		if (this.RawValue == null || right == null) {
			return false;
		}
		return this.RawValue - DateNodeFactory.ConvertRightValue(right) == 0;
	}

	GreaterThan(right) {
		if (this.RawValue == null || right == null) {
			throw new Exception("GreaterThan does not support null compare");
		}
		return this.RawValue - DateNodeFactory.ConvertRightValue(right) > 0;
	}

	EqualsOrGreaterThan(right) {
		if (this.RawValue == null || right == null) {
			throw new Exception("EqualsOrGreaterThan does not support null compare");
		}
		return this.RawValue - DateNodeFactory.ConvertRightValue(right) >= 0;
	}

	LessThan(right) {
		if (this.RawValue == null || right == null) {
			throw new Exception("LessThan does not support null compare");
		}
		return this.RawValue - DateNodeFactory.ConvertRightValue(right) < 0;
	}

	EqualsOrLessThan(right) {
		if (this.RawValue == null || right == null) {
			throw new Exception("EqualsOrLessThan does not support null compare");
		}
		return this.RawValue - DateNodeFactory.ConvertRightValue(right) <= 0;
	}
}

class DateNodeFactory {
	static CreateNode(rawValue) {
		if (typeof rawValue === "string" && /^\d{4}\-\d{2}\-\d{2}$/g.test(rawValue)) {
			return new DateRuleNode(new Date(rawValue));
		}else if(rawValue instanceof Date){
			return new DateRuleNode(rawValue);
		}
		return null;
	}

	static ConvertRightValue(right) {
		var res = right;
		if (typeof right === "string" && /^\d{4}\-\d{2}\-\d{2}$/g.test(right)) {
			res = new Date(right+" 00:00:00");
		}
		if (!(res instanceof Date)) {
			throw new Exception("Value is not a valid Date object or datetime string (e.g. 2015-02-21).");
		}
		return res;
	}
}




class TimeRuleNode extends StringRuleNode {
	getNodeType() {
		return "Time";
	}

	Equals(right) {
		if (this.RawValue == null && right == null) {
			return true;
		}
		if (this.RawValue == null || right == null) {
			return false;
		}
		return this.RawValue - TimeNodeFactory.ConvertRightValue(right) == 0;
	}

	GreaterThan(right) {
		if (this.RawValue == null || right == null) {
			throw new Exception("GreaterThan does not support null compare");
		}
		return this.RawValue - TimeNodeFactory.ConvertRightValue(right) > 0;
	}

	EqualsOrGreaterThan(right) {
		if (this.RawValue == null || right == null) {
			throw new Exception("EqualsOrGreaterThan does not support null compare");
		}
		return this.RawValue - TimeNodeFactory.ConvertRightValue(right) >= 0;
	}

	LessThan(right) {
		if (this.RawValue == null || right == null) {
			throw new Exception("LessThan does not support null compare");
		}
		return this.RawValue - TimeNodeFactory.ConvertRightValue(right) < 0;
	}

	EqualsOrLessThan(right) {
		if (this.RawValue == null || right == null) {
			throw new Exception("EqualsOrLessThan does not support null compare");
		}
		return this.RawValue - TimeNodeFactory.ConvertRightValue(right) <= 0;
	}
}

class TimeNodeFactory {
	static CreateNode(rawValue) {
		if(rawValue.slice(-2).toLowerCase() == "am" || rawValue.slice(-2).toLowerCase() == "pm"){
			var parts = rawValue.slice(0,-2).split(/:/g);
			var ampm = rawValue.slice(-2).toLowerCase();
			parts[0] = parseInt(parts[0] % 12) + (ampm == "am" ? 0 : 12);
			parts[0] = parts[0]<10 ? ("0"+parts[0]):parts[0];
			rawValue = parts.join(":").trim();
		}
		if (typeof rawValue === "string" && /^\d{2}\:\d{2}\:\d{2}$/g.test(rawValue)) {
			return new TimeRuleNode(new Date("2015/09/17 " + rawValue));
		}
		return null;
	}

	static ConvertRightValue(right) {
		var res = null;
		right = right.trim();

		if(right.slice(-2).toLowerCase() == "am" || right.slice(-2).toLowerCase() == "pm"){
			var parts = right.slice(0,-2).split(/:/g);
			var ampm = right.slice(-2).toLowerCase();
			parts[0] = parseInt(parts[0] % 12) + (ampm == "am" ? 0 : 12);
			parts[0] = parts[0]<10 ? ("0"+parts[0]):parts[0];
			right = parts.join(":").trim();
		}

		if (typeof right === "string" && /^\d{2}\:\d{2}\:\d{2}$/g.test(right)) {
			res = new Date("2015/09/17 " + right);
			if (!(res instanceof Date)) {
				throw new Exception(right + " is not a valid datetime string (15:34:23).");
			}
		}
		return res;
	}
}
