(function() {
  window.addEventListener("DOMContentLoaded", function () {
    const answers = {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
    };
    const answersLength = Object.values(answers).length;

    // делаем кнопку активной
    $(".controle-test-content__slide .question-button").click(function () {
      $(this).siblings().removeClass("is-active");
      $(this).addClass("is-active");
    });

    // Custom Select
    $("body").on(
      "click",
      ".controle-test-content__slide .select__selected",
      function () {
        let thisParent = $(this).closest(".select");

        $(".select").not(thisParent).addClass("select--closed");
        thisParent.toggleClass("select--closed");
      }
    );

    // выбор из выпадающего списка
    $("body").on(
      "click",
      ".controle-test-content__slide .select__option",
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

    // закрытие выпадающего списка
    $(document).mouseup(function (e) {
      var container = $(".controle-test-content__slide .select");

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
      ".controle-test-content__slide .select__option",
      function () {
        let currentOption = $(this);
        let span = currentOption.find("span");
        let text = span.text();

        if (isEllipsisActive(span)) {
          currentOption.addClass("overflowed");
        }
      }
    );

    function hasNull(target) {
      for (let member in target) {
        if (target[member] === null) return true;
      }
      return false;
    }

    //Test
    $("body").on(
      "click",
      ".controle-test-content__slide .answer-js",
      function () {
        let question = $(this).data("question");
        let points = $(this).data("points");

        answers[question] = points;

        if (hasNull(answers) === false) {
          showNextBtn();
        }
      }
    );

    const historyPaths = ["controle-slide-1"];
    const header = document.querySelector(".controle-test-header");
    const headerTitle = header.querySelector("#controle-test-header-label");
    const headerPercent = header.querySelector("#controle-test-header-percent");
    const headerProgress = header.querySelector(".controle-test-bar__span");
    const headerButtonBack = header.querySelector(
      ".controle-test-header__back-btn"
    );

    const allSlides = [
      ...document.querySelectorAll(".controle-test-content__slide"),
    ];

    const footer = document.querySelector(".controle-test-footer");
    const nextBtn = footer.querySelector(".controle-test-footer__btn");

    const slideOneButtons = getSlide("controle-slide-1").querySelectorAll(
      ".controle-test-buttons__input"
    );

    const slideTwoButtons = getSlide("controle-slide-2").querySelectorAll(
      ".controle-test-buttons__input"
    );

    const slideThreeButtons = getSlide("controle-slide-3").querySelectorAll(
      ".controle-test-buttons__input"
    );

    let activeSlide = allSlides[0];

    nextBtn.addEventListener("click", function () {
      updatePathToBackBtn();

      removeActiveClassFromSlide();

      hideNextBtn();

      switch (activeSlide.id) {
        case "controle-slide-1": {
          showBackBtn();

          if (slideOneButtons[0].checked) {
            updateActiveSlide("controle-slide-2");
          } else {
            updateActiveSlide("slide-gerbq-test");
          }

          break;
        }
        case "controle-slide-2": {
          if (slideTwoButtons[0].checked) {
            updateActiveSlide("slide-gerbq-test");
          } else {
            updateActiveSlide("controle-slide-3");
          }

          break;
        }
        case "controle-slide-3": {
          if (slideThreeButtons[0].checked) {
            showResultSlide("result-continue-course");
          } else {
            showResultSlide("result-gerd-refractory-current");
          }

          break;
        }
        case "slide-gerbq-test": {
          let sum = 0;

          for (let i = 1; i < answersLength + 1; i++) {
            sum += parseInt(answers[i]);
          }

          const resultCancelTherapy = document.getElementById(
            "result-recommended-cancel-therapy"
          );

          const resultCorrectionTherapy = document.getElementById(
            "result-recommended-correction-therapy"
          );

          const firstAdditionalBlock = resultCancelTherapy.querySelector(
            ".controle-test-content__hernia"
          );

          const secondAdditionalBlock = resultCorrectionTherapy.querySelector(
            ".controle-test-content__hernia"
          );

          if (sum <= 3) {
            showResultSlide("result-recommended-cancel-therapy");
            if (slideOneButtons[1].checked) {
              firstAdditionalBlock.style.display = "flex";
            } else {
              firstAdditionalBlock.style.display = "none";
            }
          }

          if (sum > 3 && sum < 8) {
            showResultSlide("result-recommended-correction-therapy");
            if (slideOneButtons[1].checked) {
              secondAdditionalBlock.style.display = "flex";
            } else {
              secondAdditionalBlock.style.display = "none";
            }
          }

          if (sum >= 8) {
            updateActiveSlide("controle-slide-3");
          }
        }
      }
    });

    headerButtonBack.addEventListener("click", function () {
      if (activeSlide.id[0] === "r") {
        footer.style.display = "block";
      }
      showNextBtn();

      removeActiveClassFromSlide();

      removeCheckFromButtonsOfActiveSlide();

      activeSlide = getSlide(historyPaths.pop());

      addActiveClassToSlide();

      if (activeSlide.id === "controle-slide-1") {
        $(".controle-test").removeClass("active-page");
        $(".breeading-page").addClass("active-page");
        $(".repeated").removeClass("active-page");
        $(".section-wrap").removeClass("active-page");
      }

      updateHeaderById(activeSlide.id);
    });

    slideOneButtons.forEach(function (input) {
      input.addEventListener("change", function () {
        showNextBtn();
      });
    });

    slideTwoButtons.forEach(function (input) {
      input.addEventListener("change", function () {
        showNextBtn();
      });
    });

    slideThreeButtons.forEach(function (input) {
      input.addEventListener("change", function () {
        showNextBtn();
      });
    });

    function updateHeaderById(slideId) {
      switch (slideId) {
        case "controle-slide-1":
          updateHeader("Шаг 1: Уточняющие вопросы", "30%");
          break;
        case "controle-slide-2":
          updateHeader("Шаг 1: Уточняющие вопросы", "50%");
          break;
        case "controle-slide-3":
          updateHeader("Шаг 2: Уточняющие вопросы", "70%");
          break;
        case "result-continue-course":
          updateHeader("Шаг 3: Результаты контрольного приема", "100%");
          break;
        case "result-gerd-refractory-current":
          updateHeader("Шаг 3: Результаты контрольного приема", "100%");
          break;
        case "result-recommended-cancel-therapy":
          updateHeader("Шаг 3: Результаты контрольного приема", "100%");
          break;
        case "result-recommended-correction-therapy":
          updateHeader("Шаг 3: Результаты контрольного приема", "100%");
          break;
      }
    }

    function updateActiveSlide(slideId) {
      activeSlide = getSlide(slideId);

      addActiveClassToSlide();

      updateHeaderById(activeSlide.id);
    }

    function showResultSlide(slideId) {
      activeSlide = getSlide(slideId);

      addActiveClassToSlide();

      updateHeaderById(activeSlide.id);

      footer.style.display = "none";
    }

    function addActiveClassToSlide() {
      activeSlide.classList.add("controle-test-content__slide--active");
    }

    function removeActiveClassFromSlide() {
      activeSlide.classList.remove("controle-test-content__slide--active");
    }

    function removeCheckFromButtonsOfActiveSlide() {
      const slideId = activeSlide.id;
      const inputs = getActiveSlideInputs(slideId);
      if (inputs) {
        inputs.forEach(function (input) {
          input.checked = false;
        });
      }
    }

    function getActiveSlideInputs(slideId) {
      switch (slideId) {
        case "controle-slide-1": {
          return slideOneButtons;
        }
        case "controle-slide-2": {
          return slideTwoButtons;
        }
        case "controle-slide-3": {
          return slideThreeButtons;
        }
      }
    }

    function updatePathToBackBtn() {
      historyPaths.push(activeSlide.id);
    }

    function hideBackBtn() {
      headerButtonBack.classList.add("controle-test-header__back-btn_hidden");
    }

    function showBackBtn() {
      headerButtonBack.classList.remove(
        "controle-test-header__back-btn_hidden"
      );
    }

    function updateHeader(title, percent) {
      headerTitle.textContent = title;
      headerPercent.textContent = percent;
      headerProgress.style.width = percent;
    }

    function getSlide(id) {
      return allSlides.filter(function (slide) {
        return slide.id === id;
      })[0];
    }

    function showNextBtn() {
      footer.classList.add("controle-test-footer_active");
    }

    function hideNextBtn() {
      footer.classList.remove("controle-test-footer_active");
    }
  });

})()
