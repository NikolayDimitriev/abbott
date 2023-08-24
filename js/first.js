(function () {
  jQuery(function ($) {
    $(".first-test .gastro-calculator-slide .question-button").click(
      function () {
        $(this).siblings().removeClass("is-active");
        $(this).addClass("is-active");
      }
    );

    $("body").on("click", ".first-test .fast-search__input input", function () {
      $(this).closest(".fast-search").addClass("is-open");
    });

    $(document).mouseup(function (e) {
      var container = $(".first-test .fast-search");

      // if the target of the click isn't the container nor a descendant of the container
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.removeClass("is-open");
      }
    });

    // Custom Select
    $("body").on(
      "click",
      ".first-test .gastro-calculator-slide .abbott-test-select__selected",
      function () {
        let thisParent = $(this).closest(".abbott-test-select");

        $(".abbott-test-select").not(thisParent).addClass("abbott-test-select--closed");
        thisParent.toggleClass("abbott-test-select--closed");
      }
    );

    $("body").on(
      "click",
      ".first-test .gastro-calculator-slide .abbott-test-select__option",
      function () {
        let currentOption = $(this);
        let currentOptionValue = currentOption.data("value");
        let thisParent = currentOption.closest(".abbott-test-select");
        let dataText = currentOption.data("text");
        let textInput;

        if (thisParent.find(".abbott-test-select__text-input")) {
          let value = dataText;
          textInput = thisParent.find(".abbott-test-select__text-input");

          if (typeof currentOptionValue !== "undefined") {
            value = currentOptionValue;
          }

          textInput.val(value).trigger("change");
        }

        if (!currentOption.hasClass("abbott-test-select__option--checkbox")) {
          currentOption
            .closest(".abbott-test-select")
            .find(".abbott-test-select__selected")
            .html("<span>" + dataText + "</span>");
          $(".abbott-test-select__option").removeClass("abbott-test-select__option--active");
        }

        currentOption.addClass("abbott-test-select__option--active");
        currentOption.closest(".abbott-test-select").addClass("abbott-test-select--active");
        currentOption.closest(".abbott-test-select").toggleClass("abbott-test-select--closed");
      }
    );

    $(document).mouseup(function (e) {
      var container = $(
        ".first-test .gastro-calculator-slide .abbott-test-select"
      );

      // if the target of the click isn't the container nor a descendant of the container
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.addClass("abbott-test-select--closed");
      }
    });

    function isEllipsisActive(e) {
      return e[0].offsetWidth < e[0].scrollWidth;
    }

    $("body").on(
      "click",
      ".first-test .gastro-calculator-slide .abbott-test-select__option",
      function () {
        let currentOption = $(this);
        let span = currentOption.find("span");
        let text = span.text();

        if (isEllipsisActive(span)) {
          currentOption.addClass("overflowed");
        }
      }
    );

    $("body").on("click", ".first-test .clear-form-filter", function () {
      let parentFilter = $(this).closest(".filter-item-js");
      let select = parentFilter.find(".abbott-test-select");
      let input = parentFilter.find("input:not(.not-clearable)");

      $(select).each(function () {
        let thisSelect = $(this);
        let defaultText = thisSelect
          .find(".abbott-test-select__selected")
          .data("default");

        $(thisSelect)
          .find(".abbott-test-select__option")
          .removeClass("abbott-test-select__option--active");
        $(thisSelect).removeClass("abbott-test-select--active");
        $(thisSelect)
          .find(".abbott-test-select__selected")
          .html("<span>" + defaultText + "</span>");
      });

      $(input).each(function () {
        let thisInput = $(this);

        thisInput.val("");
      });
    });
  });
})();
