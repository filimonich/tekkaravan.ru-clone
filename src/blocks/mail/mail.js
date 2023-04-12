(() => {
  $(document).ready(function () {
    $('#emailSubPagesId').css('display', 'block');
    $('#sub_city').css('display', 'none');

    $('#emailPagesId').change(function () {
      clearlist();
      $('#sub_city').css('display', 'none');
      var countryvalue = $('#emailPagesId option:selected').val();
      //if (countryvalue === '') {clearlist(); }
      if (countryvalue === '') {
        clearlist();
        $('#emailSubPagesId').css('display', 'none');
      }
      getarea();
    });
    //getarea();
    //getcity();

    function getarea() {
      var country_value = $('#emailPagesId option:selected').val();
      var area = $('#idBlockEmails');
      var getarea_value = area.val();
      if (country_value === '') {
        area.attr('disabled', true);
      } else {
        area.attr('disabled', false);
        area.load('../ajax/mailBlocks.php', { country: country_value });
        $('#emailSubPagesId').css('display', 'block');
      }

      $('#idBlockEmails').change(function () {
        getcity();
      });
    }

    function getcity() {
      // var region_value = $("#region_id").val();

      var region_value = $('#idBlockEmails option:selected').val();
      if (region_value == undefined) {
        var region_value = $('#idBlockEmails').val();
      }
      var area = $('#get_city');
      if (region_value === '') {
        area.attr('disabled', true);
        $('#sub_city').css('display', 'none');
        $('#get_city').empty();
      } else {
        area.attr('disabled', false);
        area.load('get_city.php', { region: region_value });
        $('#sub_city').css('display', 'block');
      }
    }

    function clearlist() {
      $('#idBlockEmails').empty();
    }
  });
})();
