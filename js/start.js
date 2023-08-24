(function () {
  jQuery(function ($) {
    $("body").on("click", ".consult-info__reception__item__link", function () {
      const page = $(this).data("page");

      $("#start-page").removeClass("active-page");
      $("#interaction-page").removeClass("active-page");
      $("#first-test-page").removeClass("active-page");
      $("#repeated-test-page").removeClass("active-page");
      $("#controle-test-page").removeClass("active-page");

      if (page == 1) {
        $("#first-test-page").addClass("active-page");
      }
      if (page == 2) {
        $("#repeated-test-page").addClass("active-page");
      }
      if (page == 3) {
        $("#controle-test-page").addClass("active-page");
      }

      $(window).scrollTop(0);
    });

    $("body").on("click", ".abbott-more-sources__button", function () {
      $(this).parent().toggleClass("abbott-more-sources_open");
    });
  });
})();
