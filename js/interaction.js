(function () {
  jQuery(function ($) {
    const data = dbAllMedicament;
    const medicine = new Set();

    $("body").on(
      "click",
      ".interaction .fast-search__input input",
      function () {
        $(this).closest(".fast-search").addClass("is-open");
      }
    );

    $(document).mouseup(function (e) {
      var container = $(".interaction .fast-search");

      // if the target of the click isn't the container nor a descendant of the container
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.removeClass("is-open");
      }
    });

    $("body").on("click", ".interaction .add-symptom", function () {
      let name = $(this).text().trim();

      addSymptom(name);
    });

    $("body").on("click", ".interaction .symptom-item__remove", function () {
      $(this).closest(".symptom-item").hide();
      removeSymptom($(this).data("name"));
    });

    $("body").on("click", ".interaction .clear-all-symptoms", function () {
      clearAllSymptoms();
    });

    const fastSearchInput = document.getElementById(
      "interaction-fast-search-input"
    );

    fastSearchInput.addEventListener("input", function (evt) {
      nameInput(this);
    });

    function debounce(f, ms) {
      let isCooldown = false;

      return function () {
        if (isCooldown) return;

        f.apply(this, arguments);

        isCooldown = true;

        setTimeout(() => (isCooldown = false), ms);
      };
    }

    function search(enteredName) {
      reg = new RegExp(enteredName, "i");

      const output = data.filter((str) => {
        if (str[0].toLowerCase() !== enteredName[0].toLowerCase()) {
          return false;
        }
        return reg.test(str);
      });

      for (let item of output) {
        $("#interaction-search-output").append(
          `<button class="search-dropdown__item btn-reset add-symptom">${item}</button>`
        );
      }

      if ($("#interaction-search-output").html() == "") {
        $("#interaction-nothing-found").show();
        $("#interaction-nothing-found").text(
          "К сожалению такого препарата нет в нашей базе"
        );
      } else {
        $("#interaction-nothing-found").hide();
      }

      if ($("#interaction-fast-search-input").val() == undefined) {
        $("#interaction-nothing-found").show();
        $("#interaction-nothing-found").text("Начните вводить...");
      }
    }

    const debounceSearch = debounce(search, 100);

    function nameInput(e) {
      document.getElementById("interaction-search-output").innerHTML = "";

      if (e.value.length > 0) debounceSearch(e.value);
    }

    function addSymptom(name) {
      if (medicine.has(name)) {
        return;
      }

      medicine.add(name);

      const symptomBlock = `<div class="symptom-item">
              <span>${name}</span>
              <div class="symptom-item__remove" data-name="${name}"></div>
          </div>`;

      $("#interaction-added-symptoms").append(symptomBlock);
      $("#interaction-go").removeClass("hide");
    }

    function removeSymptom(name) {
      medicine.delete(name);

      if (medicine.size === 0) {
        $("#interaction-go").addClass("hide");
      }
    }

    function clearAllSymptoms() {
      medicine.clear();

      $("#interaction-added-symptoms").html("");
      $("#interaction-go").addClass("hide");
    }

    $("body").on("click", ".interaction .go-to-next", function () {
      let slide = $(this).data("slide");
      let title, percent;

      switch (slide) {
        case "#interaction-slide-2":
          title = "Шаг 2: Результаты проверки межлекарственного взаимодействия";
          percent = "100%";
          searchInteraction();
          break;
      }

      goToSlide(slide, title, percent);
    });

    function goToSlide(slide, title, percent) {
      $(".gastro-calculator-slide").removeClass("is-active");
      $(slide).addClass("is-active");
      $("#interaction-header-label").text(title);
      $("#interaction-header-percent").text(percent);
      $("#interaction-progress-bar span").width(percent);
    }

    let activeBtn = $(".interaction-buttons__btn_active");

    $(".interaction-buttons__btn").click(function () {
      $(this).siblings().removeClass("interaction-buttons__btn_active");
      $(this).addClass("interaction-buttons__btn_active");
      activeBtn = $(this);
      searchInteraction();
    });

    function setListinerToMainBtn() {
      $(".interaction-main__btn").click(function () {
        $(this).parent().toggleClass("interaction-main__tactic_open");
      });
    }

    function searchInteraction() {
      document.getElementById("interaction-main").innerHTML = "";

      if (!activeBtn || !medicine || medicine.size === 0) {
        return;
      }

      const key = activeBtn.text().trim();

      const outputArray = dbInteraction[key].filter(function (item) {
        return medicine.has(item.name);
      });

      for (let med of medicine) {
        const elem = outputArray.filter(function (item) {
          return item.name === med;
        });

        if (elem.length === 0) {
          const emptyBlock = `<div class="interaction-main__item">
              <h2 class="interaction-main__title title-reset">
                ${med}
              </h2>
              <p class="interaction-main__text">
                Клинически значимых взаимодействий не описано
              </p>
          </div>`;

          $("#interaction-main").append(emptyBlock);
        } else {
          const block = `
            <div class="interaction-main__item">
              <h2 class="interaction-main__title title-reset">
                ${med}
              </h2>
              <div class="interaction-main__info">
                <div class="interaction-main__left">
                  <div class="interaction-risk">
                    <h3
                      class="interaction-main__subtitle title-reset"
                    >
                      Риск для пациента
                    </h3>
                    <div class="interaction-risk__wrapper">
                      <div
                        class="interaction-risk__circle ${
                          elem[0].risk === "Высокий" ||
                          elem[0].risk === "Очень высокий"
                            ? "interaction-risk__circle_high"
                            : elem[0].risk === "Умеренный"
                            ? "interaction-risk__circle_normal"
                            : elem[0].risk === "Незначительный"
                            ? "interaction-risk__circle_good"
                            : ""
                        }" 
                      ></div>
                      <p class="interaction-main__text">${elem[0].risk}</p>
                    </div>
                  </div>
                  <div class="interaction-main__block">
                    <div class="interaction-recommendations">
                      <h3
                        class="interaction-main__subtitle title-reset"
                      >
                        Рекомендация
                      </h3>
                      <p class="interaction-main__text">
                        ${elem[0].recommendations}
                      </p>
                    </div>
                    <div class="interaction-level">
                      <h3
                        class="interaction-main__subtitle title-reset"
                      >
                        Уровень достоверности
                      </h3>
                      <p class="interaction-main__text">
                        ${elem[0].level}
                      </p>
                    </div>
                  </div>
                </div>
                <p class="interaction-main__descr">
                  ${elem[0].description}
                </p>
              </div>
              ${
                elem[0].tactik
                  ? `
              <div class="interaction-main__tactic interaction-main__tactic_open">
                <button class="interaction-main__btn btn-reset">
                  Тактика ведения пациента
                  <div class="interaction-main__icon">
                    <img
                      src="./img/interaction_arrow.svg"
                      alt="icon"
                    />
                  </div>
                </button>
                <p class="interaction-main__text">
                  ${elem[0].tactik}
                </p>
              </div>
              `
                  : ""
              }
              
            </div>`;

          $("#interaction-main").append(block);
        }
      }

      setListinerToMainBtn();
    }

    // Переход на стр. проверки и возвращение назад
    $(".check-interaction-btn").click(function () {
      lastPageBeforeInteraction = $(".active-page").attr("id");

      $(".active-page").removeClass("active-page");

      $("#interaction-page").addClass("active-page");
      $("#controle-test-page").removeClass("active-page");
      $("#start-page").removeClass("active-page");
      $("#repeated-test-page").removeClass("active-page");
      $("#first-test-page").removeClass("active-page");
    });

    $(".back-to-page-before-interaction").click(function () {
      $("#interaction-page").removeClass("active-page");
      $(`#${lastPageBeforeInteraction}`).addClass("active-page");

      goToSlide("#interaction-slide-1", "Шаг 1: Выбор препаратов", "10%");
      clearAllSymptoms();

    });
  });
})();
