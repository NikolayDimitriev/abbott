(function () {
  jQuery(function ($) {
    $(".gastro-calculator-slide .question-button").click(function () {
      $(this).siblings().removeClass("is-active");
      $(this).addClass("is-active");
    });

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
      ".gastro-calculator-slide .select__selected",
      function () {
        let thisParent = $(this).closest(".select");

        $(".select").not(thisParent).addClass("select--closed");
        thisParent.toggleClass("select--closed");
      }
    );

    $("body").on(
      "click",
      ".gastro-calculator-slide .select__option",
      function () {
        let currentOption = $(this);
        let currentOptionValue = currentOption.data("value");
        let thisParent = currentOption.closest(".select");
        let dataText = currentOption.data("text");
        let textInput;

        if (thisParent.find(".select__text-input")) {
          let value = dataText;
          textInput = thisParent.find(".select__text-input");

          if (typeof currentOptionValue !== "undefined") {
            value = currentOptionValue;
          }

          textInput.val(value).trigger("change");
        }

        if (!currentOption.hasClass("select__option--checkbox")) {
          currentOption
            .closest(".select")
            .find(".select__selected")
            .html("<span>" + dataText + "</span>");
          $(".select__option").removeClass("select__option--active");
        }

        currentOption.addClass("select__option--active");
        currentOption.closest(".select").addClass("select--active");
        currentOption.closest(".select").toggleClass("select--closed");
      }
    );

    $(document).mouseup(function (e) {
      var container = $(".gastro-calculator-slide .select");

      // if the target of the click isn't the container nor a descendant of the container
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.addClass("select--closed");
      }
    });

    function isEllipsisActive(e) {
      return e[0].offsetWidth < e[0].scrollWidth;
    }

    $("body").on(
      "click",
      ".gastro-calculator-slide .select__option",
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
      let select = parentFilter.find(".select");
      let input = parentFilter.find("input:not(.not-clearable)");

      $(select).each(function () {
        let thisSelect = $(this);
        let defaultText = thisSelect.find(".select__selected").data("default");

        $(thisSelect)
          .find(".select__option")
          .removeClass("select__option--active");
        $(thisSelect).removeClass("select--active");
        $(thisSelect)
          .find(".select__selected")
          .html("<span>" + defaultText + "</span>");
      });

      $(input).each(function () {
        let thisInput = $(this);

        thisInput.val("");
      });
    });
  });
})();
