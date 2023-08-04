window.addEventListener("DOMContentLoaded", function () {
  const historyPaths = ["slide-1"];
  const header = document.querySelector(".repeated-header");
  const headerTitle = header.querySelector("#repeated-header-label");
  const headerPercent = header.querySelector("#repeated-header-percent");
  const headerProgress = header.querySelector(".repeated-bar__span");
  const headerButtonBack = header.querySelector(".repeated-header__back-btn");

  const allSlides = [...document.querySelectorAll(".repeated-content__slide")];

  const checkboxes = getSlide("slide-1").querySelectorAll(
    ".repeated-list__checkbox_slide-1"
  );

  const slideTwentyCheckboxes = getSlide("slide-12").querySelectorAll(
    ".repeated-list__checkbox_slide-12"
  );

  const tabSlideFour = getSlide("slide-4");
  const tabButton = tabSlideFour.querySelector(".repeated-tab__header");
  const tabInputs = tabSlideFour.querySelectorAll(".repeated-tab__input");

  const symptomsButtonSlideFive = getSlide("slide-5").querySelectorAll(
    ".repeated-symptoms__btn"
  );
  const plotsButtonSlideTwenty = getSlide("slide-12").querySelectorAll(
    ".repeated-plots__btn"
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

  const slideSixButtons = getSlide("slide-6").querySelectorAll(
    ".repeated-buttons__input"
  );

  const slideSevenButtons = getSlide("slide-7").querySelectorAll(
    ".repeated-buttons__input"
  );

  const slideEightButtons = getSlide("slide-8").querySelectorAll(
    ".repeated-buttons__input"
  );

  const slideNineButtons = getSlide("slide-9").querySelectorAll(
    ".repeated-buttons__input"
  );

  const slideTenButtons = getSlide("slide-10").querySelectorAll(
    ".repeated-buttons__input"
  );

  const slideElevenButtons = getSlide("slide-11").querySelectorAll(
    ".repeated-buttons__input"
  );

  const dangerousBlocks = getSlide("slide-11").querySelectorAll(
    ".repeated-content__dangerous"
  );

  let activeSlide = allSlides[0];

  const enabledCheckboxes = {
    ["checkbox-1"]: false,
    ["checkbox-2"]: false,
    ["checkbox-3"]: false,
    ["checkbox-4"]: false,
  };

  const enabledSlideTwentyCheckboxes = {
    ["slide-12-checkbox-1"]: false,
    ["slide-12-checkbox-2"]: false,
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

  slideTwentyCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function (e) {
      const target = e.target;

      enabledSlideTwentyCheckboxes[target.name] = target.checked;
    });
  });

  nextBtn.addEventListener("click", function () {
    updatePathToBackBtn();

    removeActiveClassFromSlide();

    hideNextBtn();

    switch (activeSlide.id) {
      case "slide-1": {
        showBackBtn();

        if (enabledCheckboxes["checkbox-1"]) {
          updateActiveSlide("slide-2");
        } else {
          updateActiveSlide("slide-10");
        }

        break;
      }
      case "slide-2": {
        if (slideTwoButtons[0].checked) {
          updateActiveSlide("slide-11"); // структуры пищевода
        } else if (enabledCheckboxes["checkbox-2"]) {
          updateActiveSlide("slide-3");
        } else {
          updateActiveSlide(
            "result-nerd-func-heartburn-hypersensitive-esophagus"
          );
        }
        break;
      }
      case "slide-3": {
        if (slideThreeButtons[0].checked) {
          updateActiveSlide("slide-4");
        } else if (slideThreeButtons[1].checked) {
          updateActiveSlide("slide-6");
        } else if (slideThreeButtons[2].checked) {
          if (enabledCheckboxes["checkbox-1"]) {
            showResultSlide("result-gerd-confirmed");
          } else {
            showResultSlide("result-gerd-needs-egds");
          }
        }
        break;
      }
      case "slide-4": {
        const arr = Object.values(symptomIndexInputValues);

        // ! расчет
        if (isEachSymptomInputValuesChanged(arr)) {
          const percent = calculateIndexFromEachSymptom(arr);

          if (percent > 50) {
            showResultSlide("result-hypersensitive-esophagus");
          }

          if (percent <= 50) {
            if (enabledCheckboxes["checkbox-3"]) {
              updateActiveSlide("slide-7");
            } else if (enabledCheckboxes["checkbox-4"]) {
              updateActiveSlide("slide-5");
            } else if (enabledCheckboxes["checkbox-1"]) {
              showResultSlide(
                "result-esophageal-botility-disorders-or-functional-heartburn"
              );
            } else {
              showResultSlide(
                "result-esophageal-botility-disorders-or-functional-heartburn-2"
              );
            }
          }

          break;
        }

        // ! выбор по кнопке
        if (slideFourButtons[0].checked) {
          showResultSlide("result-hypersensitive-esophagus");
        }

        if (slideFourButtons[1].checked) {
          if (enabledCheckboxes["checkbox-3"]) {
            updateActiveSlide("slide-7");
          } else if (enabledCheckboxes["checkbox-4"]) {
            updateActiveSlide("slide-5");
          } else if (enabledCheckboxes["checkbox-1"]) {
            showResultSlide(
              "result-esophageal-botility-disorders-or-functional-heartburn"
            );
          } else {
            showResultSlide(
              "result-esophageal-botility-disorders-or-functional-heartburn-2"
            );
          }
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
      case "slide-6": {
        if (slideSixButtons[0].checked) {
          showResultSlide("result-study-ambiguous-conduct-egds");
        }

        if (slideSixButtons[1].checked) {
          if (enabledCheckboxes["checkbox-1"]) {
            showResultSlide("result-reflux-esophagitis");
          } else {
            showResultSlide("result-gerd-needs-egds");
          }
        }

        break;
      }
      case "slide-7": {
        if (slideSevenButtons[0].checked) {
          updateActiveSlide("slide-8");
        } else {
          updateActiveSlide("slide-9");
        }

        break;
      }
      case "slide-8": {
        if (slideEightButtons[0].checked) {
          showResultSlide("result-achalasia-esophagus-2");
        } else {
          showResultSlide(
            "result-violation-patency-esophageal-gastric-junction"
          );
        }

        break;
      }
      case "slide-9": {
        if (slideNineButtons[0].checked) {
          showResultSlide(
            "result-violation-motor-fucntion-thoracic-esophagus-lack-peristalsis"
          );
        } else if (slideNineButtons[1].checked) {
          showResultSlide("result-distal-esophagospasm");
        } else if (slideNineButtons[2].checked) {
          showResultSlide("result-hypercontractile-esophagus");
        } else if (slideNineButtons[3].checked) {
          showResultSlide("result-ineffective-peristalsis");
        } else if (slideNineButtons[4].checked) {
          showResultSlide("result-ineffective-peristalsis");
        } else {
          showResultSlide("result-functional-heartburn");
        }

        break;
      }
      case "slide-10": {
        // Clicked "No"
        if (slideTenButtons[1].checked) {
          showResultSlide("result-required-egds");
        }

        // Clicked "Yes"
        if (slideTenButtons[0].checked) {
          if (enabledCheckboxes["checkbox-2"]) {
            updateActiveSlide("slide-3");
          } else if (enabledCheckboxes["checkbox-3"]) {
            updateActiveSlide("slide-7");
          } else if (enabledCheckboxes["checkbox-4"]) {
            updateActiveSlide("slide-5");
          } else {
            showResultSlide(
              "result-violation-patency-esophageal-gastric-junction"
            );
          }
        }

        break;
      }
      case "slide-11": {
        if (slideElevenButtons[4].checked) {
          showResultSlide("result-complicated-gerd-barrett-esophagus");
        }

        if (slideElevenButtons[5].checked) {
          updateActiveSlide("slide-12");
        }
        break;
      }
      case "slide-12": {
        const selectedBtnIndex = [...plotsButtonSlideTwenty].findIndex(
          function (elem) {
            return elem.classList.contains("repeated-plots__btn_active");
          }
        );

        if (selectedBtnIndex === 0) {
          addBlocksDependingCheckbox("result-gerd-grade-a-esophagitis");
          showResultSlide("result-gerd-grade-a-esophagitis");
        } else if (selectedBtnIndex === 1) {
          addBlocksDependingCheckbox("result-gerd-grade-b-esophagitis");
          showResultSlide("result-gerd-grade-b-esophagitis");
        } else if (selectedBtnIndex === 2) {
          addBlocksDependingCheckbox("result-gerd-grade-c-esophagitis");
          showResultSlide("result-gerd-grade-c-esophagitis");
        } else {
          addBlocksDependingCheckbox("result-gerd-grade-d-esophagitis");
          showResultSlide("result-gerd-grade-d-esophagitis");
        }

        break;
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

    if (activeSlide.id === "slide-1") {
      hideBackBtn();
    }

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

  slideSixButtons.forEach(function (input) {
    input.addEventListener("change", function () {
      showNextBtn();
    });
  });

  slideSevenButtons.forEach(function (input) {
    input.addEventListener("change", function () {
      showNextBtn();
    });
  });

  slideEightButtons.forEach(function (input) {
    input.addEventListener("change", function () {
      showNextBtn();
    });
  });

  slideNineButtons.forEach(function (input) {
    input.addEventListener("change", function () {
      showNextBtn();
    });
  });

  slideTenButtons.forEach(function (input) {
    input.addEventListener("change", function () {
      showNextBtn();
    });
  });

  slideElevenButtons.forEach(function (input) {
    input.addEventListener("change", function () {
      if (slideElevenButtons[0].checked) {
        dangerousBlocks[0].classList.add("repeated-content__dangerous_active");
      }
      if (slideElevenButtons[1].checked) {
        dangerousBlocks[0].classList.remove(
          "repeated-content__dangerous_active"
        );
      }
      if (slideElevenButtons[2].checked) {
        dangerousBlocks[1].classList.add("repeated-content__dangerous_active");
      }
      if (slideElevenButtons[3].checked) {
        dangerousBlocks[1].classList.remove(
          "repeated-content__dangerous_active"
        );
      }
      if (slideElevenButtons[4].checked || slideElevenButtons[5].checked) {
        if (
          (slideElevenButtons[0].checked || slideElevenButtons[1].checked) &&
          (slideElevenButtons[2].checked || slideElevenButtons[3].checked)
        )
          showNextBtn();
      }
    });
  });

  plotsButtonSlideTwenty.forEach(function (btn) {
    btn.addEventListener("click", function () {
      plotsButtonSlideTwenty.forEach(function (button) {
        if (button !== btn) {
          button.classList.remove("repeated-plots__btn_active");
        }
      });
      btn.classList.add("repeated-plots__btn_active");
      showNextBtn();
    });
  });

  function updateHeaderById(slideId) {
    switch (slideId) {
      case "slide-1":
        updateHeader("Шаг 1: Уточняющие вопросы", "30%");
        break;
      case "slide-2":
        updateHeader("Шаг 1: Уточняющие вопросы", "50%");
        break;
      case "slide-3":
        updateHeader("Шаг 1: Уточняющие вопросы", "70%");
        break;
      case "slide-4":
        updateHeader("Шаг 1: Уточняющие вопросы", "70%");
        break;
      case "slide-5":
        updateHeader("Шаг 1: Уточняющие вопросы", "90%");
        break;
      case "slide-6":
        updateHeader("Шаг 1: Уточняющие вопросы", "70%");
        break;
      case "slide-7":
        updateHeader("Шаг 1: Уточняющие вопросы", "50%");
        break;
      case "slide-8":
        updateHeader("Шаг 1: Уточняющие вопросы", "70%");
        break;
      case "slide-9":
        updateHeader("Шаг 1: Уточняющие вопросы", "70%");
        break;
      case "slide-10":
        updateHeader("Шаг 1: Уточняющие вопросы", "50%");
        break;
      case "slide-11":
        updateHeader("Шаг 1: Уточняющие вопросы", "70%");
        break;
      case "slide-12":
        updateHeader("Шаг 1: Уточняющие вопросы", "70%");
        break;
      case "result-hypersensitive-esophagus":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%"
        );
        break;
      case "result-complicated-gerd-barrett-esophagus":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%"
        );
        break;
      case "result-esophageal-botility-disorders-or-functional-heartburn":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%"
        );
        break;
      case "result-esophageal-botility-disorders-or-functional-heartburn-2":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%"
        );
        break;
      case "result-achalasia-esophagus":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%"
        );
        break;
      case "result-achalasia-esophagus-2":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%"
        );
        break;
      case "result-diffuse-esophageal-spasm":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%"
        );
        break;
      case "result-hernia-esophageal-orifice-diaphragm":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%"
        );
        break;
      case "result-study-ambiguous-conduct-egds":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%"
        );
        break;
      case "result-reflux-esophagitis":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%"
        );
        break;
      case "result-gerd-confirmed":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%"
        );
        break;
      case "result-violation-patency-esophageal-gastric-junction":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%"
        );
        break;
      case "result-nerd-func-heartburn-hypersensitive-esophagus":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%"
        );
        break;
      case "result-violation-motor-fucntion-thoracic-esophagus-lack-peristalsis":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%"
        );
        break;
      case "result-distal-esophagospasm":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%"
        );
        break;
      case "result-hypercontractile-esophagus":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%"
        );
        break;
      case "result-ineffective-peristalsis":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%"
        );
        break;
      case "result-functional-heartburn":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%"
        );
        break;
      case "result-required-egds":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%"
        );
        break;
      case "result-gerd-grade-a-esophagitis":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%"
        );
        break;
      case "result-gerd-grade-b-esophagitis":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%"
        );
        break;
      case "result-gerd-grade-c-esophagitis":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%"
        );
        break;
      case "result-gerd-grade-d-esophagitis":
        updateHeader(
          "Шаг 2: Определение диагноза и составление плана терапии",
          "100%"
        );
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

  function addBlocksDependingCheckbox(slideId) {
    const grade = document.getElementById(slideId);
    const nightSyptomText = grade.querySelector(
      ".repeated-recommendations__text_night"
    );
    const advantage = grade.querySelector(
      ".repeated-recommendations__elem_strong"
    );
    const notNightSyptomText = grade.querySelector(
      ".repeated-recommendations__text_not-night"
    );
    const hernia = grade.querySelector(".repeated-content__hernia");

    if (
      enabledSlideTwentyCheckboxes["slide-12-checkbox-1"] &&
      enabledSlideTwentyCheckboxes["slide-12-checkbox-2"]
    ) {
      nightSyptomText.style.display = "block";
      advantage.style.display = "list-item";
      notNightSyptomText.style.display = "none";
      hernia.style.display = "flex";
    } else if (enabledSlideTwentyCheckboxes["slide-12-checkbox-1"]) {
      notNightSyptomText.style.display = "block";
      nightSyptomText.style.display = "none";
      advantage.style.display = "none";
      hernia.style.display = "flex";
    } else if (enabledSlideTwentyCheckboxes["slide-12-checkbox-2"]) {
      nightSyptomText.style.display = "block";
      advantage.style.display = "list-item";
      notNightSyptomText.style.display = "none";
      hernia.style.display = "none";
    } else {
      hernia.style.display = "none";
      advantage.style.display = "none";
      notNightSyptomText.style.display = "block";
      nightSyptomText.style.display = "none";
    }
  }

  function addActiveClassToSlide() {
    activeSlide.classList.add("repeated-content__slide--active");
  }

  function removeActiveClassFromSlide() {
    activeSlide.classList.remove("repeated-content__slide--active");
  }

  function removeCheckFromButtonsOfActiveSlide() {
    const slideId = activeSlide.id;
    const inputs = getActiveSlideInputs(slideId);
    if (inputs) {
      inputs.forEach(function (input) {
        input.checked = false;
      });
    }

    const btns = getActiveSlideButtons(slideId);
    if (btns) {
      btns.forEach(function (btn) {
        if (btn.classList.contains("repeated-symptoms__btn_active")) {
          btn.classList.remove("repeated-symptoms__btn_active");
        }

        if (btn.classList.contains("repeated-plots__btn_active")) {
          btn.classList.remove("repeated-plots__btn_active");
        }
      });
    }

    if (slideId === "slide-11") {
      dangerousBlocks[0].classList.remove("repeated-content__dangerous_active");
      dangerousBlocks[1].classList.remove("repeated-content__dangerous_active");
    }
  }

  function getActiveSlideInputs(slideId) {
    switch (slideId) {
      case "slide-2": {
        return slideTwoButtons;
      }
      case "slide-3": {
        return slideThreeButtons;
      }
      case "slide-4": {
        return slideFourButtons;
      }
      case "slide-6": {
        return slideSixButtons;
      }
      case "slide-7": {
        return slideSevenButtons;
      }
      case "slide-8": {
        return slideEightButtons;
      }
      case "slide-9": {
        return slideNineButtons;
      }
      case "slide-10": {
        return slideTenButtons;
      }
      case "slide-11": {
        return slideElevenButtons;
      }
    }
  }

  function getActiveSlideButtons(slideId) {
    switch (slideId) {
      case "slide-5": {
        return symptomsButtonSlideFive;
      }
      case "slide-12": {
        return plotsButtonSlideTwenty;
      }
    }
  }

  function updatePathToBackBtn() {
    historyPaths.push(activeSlide.id);
  }

  function hideBackBtn() {
    headerButtonBack.classList.add("repeated-header__back-btn_hidden");
  }

  function showBackBtn() {
    headerButtonBack.classList.remove("repeated-header__back-btn_hidden");
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
      if (arr[i] === null || arr[i] <= 0) {
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
