(function () {
  jQuery(function ($) {
    $("body").on("click", ".consult-info__reception__item__link", function () {
      const page = $(this).data("page");

      $(".breeading-page").removeClass("active-page");
      $(".section-wrap").removeClass("active-page");
      $(".repeated").removeClass("active-page");
      $(".controle-test").removeClass("active-page");

      if (page == 1) {
        $(".section-wrap").addClass("active-page");
      }
      if (page == 2) {
        $(".repeated").addClass("active-page");
      }
      if (page == 3) {
        $(".controle-test").addClass("active-page");
      }
    });
  });
})();
