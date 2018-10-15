
/*
PUBNUB stream management module 
-----------------------------------------------------

Declare chanel
Init PUBNUB
Suscribe to chanel
Publish functionality

-----------------------------------------------------

*/
    var channel = 'mtPulse';
        
    var p = PUBNUB.init({
        publish_key: 'pub-c-79354e6f-cd7e-4b0d-a585-58844ae7aabf',
        subscribe_key: 'sub-c-3deca76c-a898-11e8-ab44-96e83d2b591d'      
    });
    
    p.subscribe({
        channel  : channel,
        callback : displayMsg,
        presence: function(m){
            presence.textContent = m.occupancy + ' user(s)';
        }
    });

    p.bind('keyup', input, function(e) {
        (e.keyCode || e.charCode) === 13 && publish()
    });

    p.bind('click', button, publish);
    
    //Publish text message 
    function publish() {
        p.publish({
            channel : channel, 
            message : {avatar: avatar.className, text: input.value}, 
            x : (input.value='')
        });
    }

    //Publish form
    function publishForm(formName, j, k) {
      p.publish({
            channel : channel, 
            message : {avatar: avatar.className, text: formName + ".", type:1, j:j, k: k }, 
            x : (input.value='')
        });
    }

    function displayStatus(m) {
        output.innerHTML = '<p><i class="' + '' + '"></i><span>' +  
            m.replace( /[<>]/ig, '' ) + '</span></p>' + output.innerHTML;  
    }
  
    function displayMsg(m) {
        //alert(m.text)
        console.log(m);
        if (m.type === 1) {
           output.innerHTML = '<p><i class="' + m.avatar + '"></i><span style="cursor:pointer" onClick="openForm('+m.j+ ',this)" '+
             ' j="'+m.j+'"' +
             ' data-k="'+m.k.replace(/\"/g,'&quot;') +'"' +
             ' ><u>' +  
            m.text.replace( /[<>]/ig, '' ) + '</u></span></p>' + output.innerHTML; 
        }
        else {
          output.innerHTML = '<p><i class="' + m.avatar + '"></i><span>' +  
            m.text.replace( /[<>]/ig, '' ) + '</span></p>' + output.innerHTML; 
        }
 
    }

  
