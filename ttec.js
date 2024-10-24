// copyright Mick Hynes, TTEC Digital 2024


$(document).ready(function() { 
    // Pure JavaScript
  
    // subscribe to ready event
    Genesys('subscribe', 'Messenger.ready', function () {
      // subsribe to close widget event
      console.log('READY: subscribing to open event...');
  
      Genesys("subscribe", "Messenger.opened", function(){
        console.log('Messenger.open event invoked');
      });
  
      console.log('READY: subscribing to conversationCleared event...');
      Genesys('subscribe', 'MessagingService.conversationCleared', function(){
        console.log('MessagingService.conversationCleared event invoked');
        $('#wizardContainer').fadeIn();
      });
    
      wireHandlers();

      console.log('Opening form...')
      $('#formContainer').fadeIn();
      
    });
  });

function wireHandlers(){
    $('#launchGenesys').on( "click", function(e) {
        e.preventDefault();
        launchGenesys();
    });

}

  function launchGenesys() {
    console.log('Preparing Genesys Widget...');

    var _env=$('#env').val();
    if(_env=="PROD"){
        _env="";
    }

    Genesys('command', 'Database.set', {
      messaging: {
          customAttributes: {
              memberForename:  $('#memberForename').val(),
              bgroup: $('#memberBGroup').val(),
              referenceNumber: $('#memberReferenceNumber').val(),
              platform: $('#platform').val(),
              debugMode: $('#debugMode').val(),
              env: _env
          },
      },
  })

    $('#wizardContainer').fadeOut();
    
        Genesys('command','Messenger.open',{},
        function (o) {},
        function (o) {
            Genesys('command', 'Messenger.close')
        }
        )
};
