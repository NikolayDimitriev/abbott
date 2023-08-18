(function () {
  jQuery(function ($) {
    const answers = {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
    };
    const answersLength = Object.values(answers).length;

    localStorage.removeItem("answers");
    localStorage.setItem("answers", JSON.stringify(answers, null, 2));

    const addedSymptoms = {
      1: [],
      2: [],
    };
    const data = dataBase;
    const dataLength = Object.values(data).length;

    localStorage.removeItem("addedSymptoms");
    localStorage.setItem(
      "addedSymptoms",
      JSON.stringify(addedSymptoms, null, 2)
    );

    for (let i = 1; i < dataLength + 1; i++) {
      if (data[i]["showOnFront"] === true) {
        $("#horizontal-symptoms").append(
          `<button class="searched-item btn-reset add-symptom" data-id="${data[i]["id"]}">${data[i]["title"]}</button>`
        );
      }
    }

    function addSymptom(name, id) {
      let addedSymptoms = JSON.parse(localStorage.getItem("addedSymptoms"));
      let type = data[id]["typeId"];

      if (!addedSymptoms[type].includes(id)) {
        addedSymptoms[type].push(id);
        localStorage.removeItem("addedSymptoms");
        localStorage.setItem(
          "addedSymptoms",
          JSON.stringify(addedSymptoms, null, 2)
        );

        const symptomBlock = `<div class="symptom-item">
                  <span>${name}</span>
                  <div class="symptom-item__remove" data-id="${id}" data-type="${type}"></div>
              </div>`;
        $("#added-symptoms").append(symptomBlock);
        $("#go-to-test").removeClass("hide");
      }
    }

    function removeSymptom(id, type) {
      let addedSymptoms = JSON.parse(localStorage.getItem("addedSymptoms"));
      let index = addedSymptoms[type].indexOf(id);

      if (index > -1) {
        addedSymptoms[type].splice(index, 1);
      }

      if (addedSymptoms["1"].length == 0 && addedSymptoms["2"].length == 0) {
        $("#go-to-test").addClass("hide");
      }

      localStorage.removeItem("addedSymptoms");
      localStorage.setItem(
        "addedSymptoms",
        JSON.stringify(addedSymptoms, null, 2)
      );
    }

    function clearAllSymptoms() {
      $("#added-symptoms").html("");
      $("#go-to-test").addClass("hide");
      localStorage.removeItem("addedSymptoms");
      localStorage.setItem(
        "addedSymptoms",
        JSON.stringify(addedSymptoms, null, 2)
      );
    }

    function goToSlide(slide, title, percent, probability) {
      $(".gastro-calculator-slide").removeClass("is-active");
      $(slide).addClass("is-active");
      $("#header-label").text(title);
      $("#header-percent").text(percent);
      $("#progress-bar span").width(percent);

      switch (slide) {
        case "#extraesophageal":
          getExtraesophagealSymptoms();
          break;
        case "#less-than-3":
          getResultsLess3();
          break;
        case "#more-than-8":
          getResultsMore8(probability);
          break;
        case "#first-slide-3":
          getSlide3(probability);
          break;
        case "#first-slide-4":
          getSlide4(probability);
          break;
      }
    }

    function getExtraesophagealSymptoms() {
      let addedSymptoms = JSON.parse(localStorage.getItem("addedSymptoms"));
      let groupedSymptoms = {};

      for (let i = 0; i < addedSymptoms["2"].length; i++) {
        let symptomId = addedSymptoms["2"][i];
        let groupId = data[symptomId]["groupId"];
        let title = data[symptomId]["title"];
        let doctors = data[symptomId]["doctors"];

        if (groupedSymptoms[groupId] === undefined) {
          groupedSymptoms[groupId] = {
            group: groupId,
            symptoms: [],
            doctors: [],
          };
        }

        if (!groupedSymptoms[groupId]["doctors"].includes(doctors)) {
          groupedSymptoms[groupId]["doctors"].push(doctors);
        }

        groupedSymptoms[groupId]["symptoms"].push(title);
      }

      Object.entries(groupedSymptoms).forEach(([key, value]) => {
        let symptomsString = value["symptoms"].toString();
        let doctorsString = value["doctors"].toString();

        $("#extraesophageal-results").append(
          `<div class="result-item">Учитывая наличие у пациента <span>${symptomsString}</span> с целью исключения сопутствующей патологии рекомендуется направить пациента на консультацию к следующему (-им) специалисту (-ам): <span>${doctorsString}</span></div>`
        );
      });
    }

    function getResultsLess3() {
      let addedSymptoms = JSON.parse(localStorage.getItem("addedSymptoms"));
      let groupedSymptoms = {};

      for (let i = 0; i < addedSymptoms["2"].length; i++) {
        let symptomId = addedSymptoms["2"][i];
        let groupId = data[symptomId]["groupId"];
        let title = data[symptomId]["title"];
        let doctors = data[symptomId]["doctors"];

        if (groupedSymptoms[groupId] === undefined) {
          groupedSymptoms[groupId] = {
            group: groupId,
            symptoms: [],
            doctors: [],
          };
        }

        if (!groupedSymptoms[groupId]["doctors"].includes(doctors)) {
          groupedSymptoms[groupId]["doctors"].push(doctors);
        }

        groupedSymptoms[groupId]["symptoms"].push(title);
      }

      Object.entries(groupedSymptoms).forEach(([key, value]) => {
        let symptomsString = value["symptoms"].toString();
        let doctorsString = value["doctors"].toString();

        $("#less-than-3-results").append(
          `<div class="result-item">Учитывая наличие у пациента <span>${symptomsString}</span> с целью исключения сопутствующей патологии рекомендуется направить пациента на консультацию к следующему (-им) специалисту (-ам): <span>${doctorsString}</span></div>`
        );
      });
    }

    function getResultsMore8(probability) {
      $("#more-than-8-probability").text(probability);

      let addedSymptoms = JSON.parse(localStorage.getItem("addedSymptoms"));
      let groupedSymptoms = {};

      for (let i = 0; i < addedSymptoms["2"].length; i++) {
        let symptomId = addedSymptoms["2"][i];
        let groupId = data[symptomId]["groupId"];
        let title = data[symptomId]["title"];
        let doctors = data[symptomId]["doctors"];

        if (groupedSymptoms[groupId] === undefined) {
          groupedSymptoms[groupId] = {
            group: groupId,
            symptoms: [],
            doctors: [],
          };
        }

        if (!groupedSymptoms[groupId]["doctors"].includes(doctors)) {
          groupedSymptoms[groupId]["doctors"].push(doctors);
        }

        groupedSymptoms[groupId]["symptoms"].push(title);
      }

      Object.entries(groupedSymptoms).forEach(([key, value]) => {
        let symptomsString = value["symptoms"].toString();
        let doctorsString = value["doctors"].toString();

        $("#more-than-8-additional").append(
          `<div class="icon-card">
            <div class="icon-card__content">
                <div class="icon-card__title">Учитывая наличие у пациента
                    <span>${symptomsString}</span> с целью исключения сопутствующей патологии
                    рекомендуется направить пациента на консультацию к следующему (-им)
                    специалисту (-ам): <span>${doctorsString}</span>
                </div>
            </div>
            <div class="icon-card__icon">
                <img src="img/icon-card-5.png" alt="">
            </div>
        </div>`
        );
      });
    }

    function getSlide3(probability) {
      $("#first-slide-3-probability").text(probability);

      let addedSymptoms = JSON.parse(localStorage.getItem("addedSymptoms"));
      let groupedSymptoms = {};

      for (let i = 0; i < addedSymptoms["2"].length; i++) {
        let symptomId = addedSymptoms["2"][i];
        let groupId = data[symptomId]["groupId"];
        let title = data[symptomId]["title"];
        let doctors = data[symptomId]["doctors"];

        if (groupedSymptoms[groupId] === undefined) {
          groupedSymptoms[groupId] = {
            group: groupId,
            symptoms: [],
            doctors: [],
          };
        }

        if (!groupedSymptoms[groupId]["doctors"].includes(doctors)) {
          groupedSymptoms[groupId]["doctors"].push(doctors);
        }

        groupedSymptoms[groupId]["symptoms"].push(title);
      }

      Object.entries(groupedSymptoms).forEach(([key, value]) => {
        let symptomsString = value["symptoms"].toString();
        let doctorsString = value["doctors"].toString();

        $("#first-slide-3-additional").append(
          `<div class="icon-card">
            <div class="icon-card__content">
                <div class="icon-card__title">Учитывая наличие у пациента
                    <span>${symptomsString}</span> с целью исключения сопутствующей патологии
                    рекомендуется направить пациента на консультацию к следующему (-им)
                    специалисту (-ам): <span>${doctorsString}</span>
                </div>
            </div>
            <div class="icon-card__icon">
                <img src="img/icon-card-5.png" alt="">
            </div>
        </div>`
        );
      });
    }

    function getSlide4(probability) {
      $("#first-slide-4-probability").text(probability);

      let addedSymptoms = JSON.parse(localStorage.getItem("addedSymptoms"));
      let groupedSymptoms = {};

      for (let i = 0; i < addedSymptoms["2"].length; i++) {
        let symptomId = addedSymptoms["2"][i];
        let groupId = data[symptomId]["groupId"];
        let title = data[symptomId]["title"];
        let doctors = data[symptomId]["doctors"];

        if (groupedSymptoms[groupId] === undefined) {
          groupedSymptoms[groupId] = {
            group: groupId,
            symptoms: [],
            doctors: [],
          };
        }

        if (!groupedSymptoms[groupId]["doctors"].includes(doctors)) {
          groupedSymptoms[groupId]["doctors"].push(doctors);
        }

        groupedSymptoms[groupId]["symptoms"].push(title);
      }

      Object.entries(groupedSymptoms).forEach(([key, value]) => {
        let symptomsString = value["symptoms"].toString();
        let doctorsString = value["doctors"].toString();

        $("#first-slide-4-additional").append(
          `<div class="icon-card">
            <div class="icon-card__content">
                <div class="icon-card__title">Учитывая наличие у пациента
                    <span>${symptomsString}</span> с целью исключения сопутствующей патологии
                    рекомендуется направить пациента на консультацию к следующему (-им)
                    специалисту (-ам): <span>${doctorsString}</span>
                </div>
            </div>
            <div class="icon-card__icon">
                <img src="img/icon-card-5.png" alt="">
            </div>
        </div>`
        );
      });
    }

    $("body").on("click", ".add-symptom", function () {
      let name = $(this).text();
      let id = $(this).data("id");
      addSymptom(name, id);
    });

    $("body").on("click", ".symptom-item__remove", function () {
      let id = $(this).data("id");
      let type = $(this).data("type");
      $(this).closest(".symptom-item").hide();
      removeSymptom(id, type);
    });

    $("body").on("click", ".clear-all-symptoms", function () {
      clearAllSymptoms();
    });

    $("body").on("click", ".go-to-back", function () {
      let addedSymptoms = JSON.parse(localStorage.getItem("addedSymptoms"));
      let slide = $(this).data("slide");
      let title, percent;

      if (slide === "#start-page") {
        $(".section-wrap").removeClass("active-page");
        $(".breeading-page").addClass("active-page");
        $(".repeated").removeClass("active-page");
        $(".controle-test").removeClass("active-page");
      } else {
        switch (slide) {
          case "#first-slide-1":
            title = "Шаг 1: Сбор симптомов";
            percent = "33%";
            break;
          case "#first-slide-2":
            title = "Шаг 2: Уточняющие вопросы";
            percent = "66%";
            break;
          case "#extraesophageal":
            title = "Шаг 3: Результаты первичного приема";
            percent = "100%";
            break;
        }

        goToSlide(slide, title, percent);
      }
    });

    $("body").on("click", ".go-to-next", function () {
      let addedSymptoms = JSON.parse(localStorage.getItem("addedSymptoms"));
      let slide = $(this).data("slide");
      let title, percent;

      if (addedSymptoms["1"].length === 0) {
        slide = "#extraesophageal";
      }

      switch (slide) {
        case "#extraesophageal":
          title = "Шаг 3: Результаты первичного приема";
          percent = "100%";
          break;
        case "#first-slide-2":
          title = "Шаг 2: Уточняющие вопросы";
          percent = "66%";
          break;
      }

      goToSlide(slide, title, percent);
    });

    $("body").on("click", ".go-to-result", function () {
      let answers = JSON.parse(localStorage.getItem("answers"));
      let sum = 0;
      let fifth = answers[5];
      let title = "Шаг 3: Результаты первичного приема";
      let percent = "100%";
      let slide, probability;

      for (let i = 1; i < answersLength + 1; i++) {
        sum += parseInt(answers[i]);
      }

      if (sum <= 3) {
        slide = "#less-than-3";
      } else if (sum >= 8 && sum <= 10) {
        slide = "#more-than-8";
        probability = "79%";
      } else if (sum >= 11) {
        slide = "#more-than-8";
        probability = "89%";
      } else if (sum > 3 && sum < 8 && fifth >= 2) {
        slide = "#first-slide-3";
        probability = "50%";
      } else if (sum > 3 && sum < 8 && fifth < 2) {
        slide = "#first-slide-4";
        probability = "50%";
      }

      goToSlide(slide, title, percent, probability);
    });

    function hasNull(target) {
      for (var member in target) {
        if (target[member] == null) return true;
      }
      return false;
    }

    //Test
    $("body").on("click", ".gastro-calculator-slide .answer-js", function () {
      let answers = JSON.parse(localStorage.getItem("answers"));
      let question = $(this).data("question");
      let points = $(this).data("points");

      answers[question] = points;

      if (hasNull(answers) === false) {
        $("#go-to-result").removeClass("hide");
      }

      localStorage.removeItem("answers");
      localStorage.setItem("answers", JSON.stringify(answers, null, 2));
    });

    //Fast Search
    let returnLimit = 120; // Maximum number of results to return
    let intervalItr = null; // A handle used for iterating through the array with an interval timer

    const fastSearchInput = document.getElementById("fast-search-input");
    fastSearchInput.addEventListener("input", function (evt) {
      nameInput(this);
    });

    function nameInput(e) {
      document.getElementById("search-output").innerHTML = "";
      if (intervalItr) clearInterval(intervalItr); // If we were iterating through a previous search, stop it.
      if (e.value.length > 0) search(e.value);
    }

    let reg, idx;

    function search(enteredName) {
      reg = new RegExp(enteredName, "i");
      idx = 0;

      // Kick off the search by creating an interval that'll call searchNext() with a 0ms delay.
      // This will prevent the search function from locking the main thread while it's working,
      // allowing the DOM to be updated as you type
      intervalItr = setInterval(searchNext, 0);
    }

    function searchNext() {
      if (idx >= dataLength || idx > returnLimit) {
        clearInterval(intervalItr);
        return;
      }

      let title = dataBase[idx + 1]["title"];

      if (reg.test(title)) {
        $("#search-output").append(
          `<button class="search-dropdown__item btn-reset add-symptom" data-id="${
            idx + 1
          }">${title}</button>`
        );
      }

      if ($("#search-output").html() == "") {
        $("#nothing-found").show();
        $("#nothing-found").text(
          "К сожалению такого симптома нет в нашей базе"
        );
      } else {
        $("#nothing-found").hide();
      }

      console.log($("#fast-search-input").val());

      if ($("#fast-search-input").val() == undefined) {
        console.log("dfdf");
        $("#nothing-found").show();
        $("#nothing-found").text("Начните вводить...");
      }

      idx++;
    }

    //reload-page
    $(".reload-page").click(function () {
      location.reload();
    });
  });
})();
