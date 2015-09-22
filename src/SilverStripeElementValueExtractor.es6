class SilverStripeElementValueExtractor {
    static GetValue($elem) {
        var leftV = null;
        if ($elem.is(".field.nullable")) {
            if ($elem.find("input[type='checkbox']").prop('checked')) {
                leftV = null;
            } else {
                $elem = $elem.clone().find("input[type='checkbox']").remove().end().addClass(
                    function() {
                        var el = jQuery(this).find("input,textarea,select");
                        if (el.is("input[type='hidden']")) {
                            return el.siblings("span").attr("class");
                        } else {
                            return el.attr("class");
                        }
                    }
                );
            }
        }

        if ($elem.is(".field.checkbox")) {
            leftV = $elem.find("input[type='checkbox']").prop("checked");
        } else if ($elem.is(".field.checkboxset")) {
            leftV = $elem.find("input[type='checkbox']:checked").map(function() {
                return $(this).val();
            }).get();
        } else if ($elem.is(".field.optionset")) {
            leftV = $elem.find("input[type='radio']:checked").val();
        } else if ($elem.is(".field.dropdown")) {
            leftV = $elem.find("select").val();
        } else if ($elem.is(".field.textarea")) {
            leftV = $elem.find("textarea").val();
        } else if ($elem.is(".field.date")) {
            leftV = $elem.find("input.date").datepicker("getDate");
        } else if ($elem.is(".field.readonly")) {
            leftV = $elem.find(".readonly").text();
        } else if ($elem.is(".field.text")) {
            leftV = $elem.find("input[type='text']").val();
        }
        return leftV;
    }
}