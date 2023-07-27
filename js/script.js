window.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".repeated-header");
  const headerTitle = header.querySelector("#repeated-header-label");
  const headerPercent = header.querySelector("#repeated-header-percent");
  const headerProgress = header.querySelector(".repeated-bar__span");
  const headerButtonBack = header.querySelector(".repeated-header__back-btn");
  const checkboxes = document.querySelectorAll(".repeated-list__checkbox");
  const allSlides = [...document.querySelectorAll(".repeated-content__slide")];

  let activeSlide = allSlides[0];
  const firstNextBtn = activeSlide.querySelector(".repeated-content__btn");

  const enabledCheckboxes = {
    ["checkbox-1"]: false,
    ["checkbox-2"]: false,
    ["checkbox-3"]: false,
    ["checkbox-4"]: false,
  };

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function (e) {
      const target = e.target;

      enabledCheckboxes[target.name] = target.checked;

      if (isEvenOneCheckboxSelected()) {
        firstNextBtn.classList.add("repeated-content__btn_active");
      } else {
        firstNextBtn.classList.remove("repeated-content__btn_active");
      }
    });
  });

  firstNextBtn.addEventListener("click", function () {
    removeActiveClassFromSlideAndUpdatePathToBackBtn();

    if (enabledCheckboxes["checkbox-1"]) {
      updateActiveSlide("slide-2");
    } else {
      updateActiveSlide("slide-6");
    }
  });

  headerButtonBack.addEventListener("click", function () {
    if (activeSlide.id === "slide-1") {
      return;
    }

    activeSlide.classList.remove("repeated-content__slide--active");

    activeSlide = getSlide(headerButtonBack.dataset.slide);

    activeSlide.classList.add("repeated-content__slide--active");

    updateHeaderById(activeSlide.id);
  });

  getSlide("slide-2")
    .querySelectorAll(".repeated-buttons__btn")
    .forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        const value = e.target.dataset.value;
        removeActiveClassFromSlideAndUpdatePathToBackBtn();
        if (value === "0") {
          updateActiveSlide("slide-6");
        } else {
          updateActiveSlide("slide-3");
        }
      });
    });

  getSlide("slide-3")
    .querySelectorAll(".repeated-buttons__btn")
    .forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        const value = e.target.dataset.value;
        removeActiveClassFromSlideAndUpdatePathToBackBtn();
        if (value === "0") {
          updateActiveSlide("slide-6");
        } else {
          updateActiveSlide("slide-3");
        }
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
    }
  }

  function updateActiveSlide(slideId) {
    activeSlide = getSlide(slideId);
    activeSlide.classList.add("repeated-content__slide--active");
    updateHeaderById(activeSlide.id);
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
});
