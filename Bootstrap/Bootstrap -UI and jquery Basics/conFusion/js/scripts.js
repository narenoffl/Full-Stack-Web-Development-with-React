$(document).ready(function(){
    $('#reserveButton').click(function() {
        $('#reserveModal').modal('toggle');
      });

      $('#loginLink').click(function() {
        $('#loginModal').modal({show: true});
      });

        $("mycarousel").carousel( {interval : 3000} );
        $("#carousel-pause").click(function(){
            $("#mycarousel").carousel('pause');
        });
        $("#carousel-play").click(function(){
            $("#mycarousel").carousel('cycle');
        });
    });