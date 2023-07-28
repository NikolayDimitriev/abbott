window.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".repeated-header");
  const headerTitle = header.querySelector("#repeated-header-label");
  const headerPercent = header.querySelector("#repeated-header-percent");
  const headerProgress = header.querySelector(".repeated-bar__span");
  const headerButtonBack = header.querySelector(".repeated-header__back-btn");

  const allSlides = [...document.querySelectorAll(".repeated-content__slide")];

  const checkboxes = document.querySelectorAll(".repeated-list__checkbox");

  const tabSlideFour = getSlide("slide-4");
  const tabButton = tabSlideFour.querySelector(".repeated-tab__header");
  const tabInputs = tabSlideFour.querySelectorAll(".repeated-tab__input");

  const symptomsButtonSlideFive = getSlide("slide-5").querySelectorAll(
    ".repeated-symptoms__btn"
  );

  const footer = document.querySelector(".repeated-footer");
  const nextBtn = footer.querySelector(".repeated-footer__btn");

  const slideTwoButtons = getSlide("slide-2").querySelectorAll(
    ".repeated-buttons__input"
  );

  const slideThreeButtons = getSlide("slide-3").querySelectorAll(
    ".repeated-buttons__input"
  );

  const slideFourButtons = getSlide("slide-4").querySelectorAll(
    ".repeated-buttons__input"
  );

  let activeSlide = allSlides[0];

  const enabledCheckboxes = {
    ["checkbox-1"]: false,
    ["checkbox-2"]: false,
    ["checkbox-3"]: false,
    ["checkbox-4"]: false,
  };

  const symptomIndexInputValues = {
    ["symptom-index-x"]: null,
    ["symptom-index-y"]: null,
  };

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function (e) {
      const target = e.target;

      enabledCheckboxes[target.name] = target.checked;

      if (isEvenOneCheckboxSelected()) {
        showNextBtn();
      } else {
        hideNextBtn();
      }
    });
  });

  nextBtn.addEventListener("click", function () {
    removeActiveClassFromSlideAndUpdatePathToBackBtn();

    hideNextBtn();

    switch (activeSlide.id) {
      case "slide-1": {
        if (enabledCheckboxes["checkbox-1"]) {
          updateActiveSlide("slide-2");
        } else {
          updateActiveSlide("slide-in-work");
        }

        break;
      }
      case "slide-2": {
        if (slideTwoButtons[0].checked) {
          updateActiveSlide("slide-in-work");
        } else if (enabledCheckboxes["checkbox-2"]) {
          updateActiveSlide("slide-3");
        } else {
          updateActiveSlide("slide-in-work"); // результат если не проводили
        }
        break;
      }
      case "slide-3": {
        if (slideThreeButtons[0].checked) {
          updateActiveSlide("slide-4");
        } else if (slideThreeButtons[1].checked) {
          updateActiveSlide("slide-in-work");
        } else {
          updateActiveSlide("slide-in-work");
        }
        break;
      }
      case "slide-4": {
        const arr = Object.values(symptomIndexInputValues);
        if (isEachSymptomInputValuesChanged(arr)) {
          const percent = calculateIndexFromEachSymptom(arr);

          if (percent > 50) {
            showResultSlide("result-hypersensitive-esophagus");
          } else if (enabledCheckboxes["checkbox-3"]) {
            updateActiveSlide("slide-in-work");
          } else if (enabledCheckboxes["checkbox-4"]) {
            updateActiveSlide("slide-5");
          } else {
            showResultSlide("result-functional-heartburn");
          }
        } else if (slideFourButtons[0].checked) {
          showResultSlide("result-hypersensitive-esophagus");
        } else if (enabledCheckboxes["checkbox-3"]) {
          updateActiveSlide("slide-in-work");
        } else if (enabledCheckboxes["checkbox-4"]) {
          updateActiveSlide("slide-5");
        } else {
          showResultSlide("result-functional-heartburn");
        }
        break;
      }
      case "slide-5": {
        const selectedBtnIndex = [...symptomsButtonSlideFive].findIndex(
          function (elem) {
            return elem.classList.contains("repeated-symptoms__btn_active");
          }
        );

        if (selectedBtnIndex === 0) {
          showResultSlide("result-achalasia-esophagus");
        } else if (selectedBtnIndex === 1) {
          showResultSlide("result-diffuse-esophageal-spasm");
        } else {
          showResultSlide("result-hernia-esophageal-orifice-diaphragm");
        }

        break;
      }
    }
  });

  headerButtonBack.addEventListener("click", function () {
    if (activeSlide.id === "slide-1") {
      return;
    }

    if (activeSlide.id[0] === "r") {
      footer.style.display = "block";
    }

    activeSlide.classList.remove("repeated-content__slide--active");

    activeSlide = getSlide(headerButtonBack.dataset.slide);

    activeSlide.classList.add("repeated-content__slide--active");

    updateHeaderById(activeSlide.id);
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

  slideFourButtons.forEach(function (input) {
    input.addEventListener("change", function () {
      showNextBtn();
    });
  });

  tabInputs.forEach(function (input) {
    input.addEventListener("change", function (e) {
      symptomIndexInputValues[e.target.name] = e.target.value;

      if (isEachSymptomInputValuesChanged()) {
        showNextBtn();
      } else {
        hideNextBtn();
      }
    });
  });

  tabButton.addEventListener("click", function () {
    tabButton.classList.toggle("repeated-tab__header_open");
  });

  symptomsButtonSlideFive.forEach(function (btn) {
    btn.addEventListener("click", function () {
      symptomsButtonSlideFive.forEach(function (button) {
        if (button !== btn) {
          button.classList.remove("repeated-symptoms__btn_active");
        }
      });
      btn.classList.add("repeated-symptoms__btn_active");
      showNextBtn();
    });
  });

  function updateHeaderById(slideId) {
    switch (slideId) {
      case "slide-1":
        updateHeader("Шаг 1: Уточняющие вопросы", "30%", "30%");
        break;
      case "slide-2":
        updateHeader("Шаг 1: Уточняющие вопросы", "50%", "50%");
        break;
      case "slide-3":
        updateHeader("Шаг 1: Уточняющие вопросы", "70%", "70%");
        break;
      case "slide-4":
        updateHeader("Шаг 1: Уточняющие вопросы", "70%", "70%");
        break;
      case "slide-5":
        updateHeader("Шаг 1: Уточняющие вопросы", "90%", "90%");
        break;
      case "result-hypersensitive-esophagus":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%",
          "100%"
        );
        break;
      case "result-functional-heartburn":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%",
          "100%"
        );
        break;
      case "result-achalasia-esophagus":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%",
          "100%"
        );
        break;
      case "result-diffuse-esophageal-spasm":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%",
          "100%"
        );
        break;
      case "result-hernia-esophageal-orifice-diaphragm":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%",
          "100%"
        );
        break;
    }
  }

  function updateActiveSlide(slideId) {
    activeSlide = getSlide(slideId);
    activeSlide.classList.add("repeated-content__slide--active");
    updateHeaderById(activeSlide.id);
  }

  function showResultSlide(slideId) {
    activeSlide = getSlide(slideId);

    activeSlide.classList.add("repeated-content__slide--active");

    updateHeaderById(activeSlide.id);

    footer.style.display = "none";
  }

  function removeActiveClassFromSlideAndUpdatePathToBackBtn() {
    activeSlide.classList.remove("repeated-content__slide--active");
    headerButtonBack.dataset.slide = activeSlide.id;
  }

  function updateHeader(title, percent, progress) {
    headerTitle.textContent = title;
    headerPercent.textContent = percent;
    headerProgress.style.width = progress;
  }

  function getSlide(id) {
    return allSlides.filter(function (slide) {
      return slide.id === id;
    })[0];
  }

  function isEvenOneCheckboxSelected() {
    const arr = Object.values(enabledCheckboxes);

    for (let i = 0; i < arr.length; i++) {
      if (arr[i]) {
        return true;
      }
    }

    return false;
  }

  function isEachSymptomInputValuesChanged(
    arr = Object.values(symptomIndexInputValues)
  ) {
    for (let i = 0; i < arr.length; i++) {
      if (!arr[i]) {
        return false;
      }
    }

    return true;
  }

  function calculateIndexFromEachSymptom(
    arr = Object.values(symptomIndexInputValues)
  ) {
    return (arr[0] / arr[1]) * 100;
  }

  function showNextBtn() {
    footer.classList.add("repeated-footer_active");
  }

  function hideNextBtn() {
    footer.classList.remove("repeated-footer_active");
  }
});
