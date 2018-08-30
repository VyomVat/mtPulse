(function() {

    var output = PUBNUB.$('output'), 
        input = PUBNUB.$('input'), 
        button = PUBNUB.$('button'),
        avatar = PUBNUB.$('avatar'),
        presence = PUBNUB.$('presence');

    var channel = 'mchat';
    
    // Assign a random avatar in random color
    //avatar.className = 'face-' + ((Math.random() * 13 + 1) >>> 0) + ' color-' + ((Math.random() * 10 + 1) >>> 0);

    var p = PUBNUB.init({
        //subscribe_key: 'sub-c-f762fb78-2724-11e4-a4df-02ee2ddab7fe',
        //publish_key:   'pub-c-156a6d5f-22bd-4a13-848d-b5b4d4b36695'
        //publish_key: 'pub-c-18917a5c-e61c-4df2-ade0-1040e52b52b8',
        //subscribe_key: 'sub-c-68bc8e34-316e-11e5-89d5-0619f8945a4f'
        publish_key: 'pub-c-79354e6f-cd7e-4b0d-a585-58844ae7aabf',
        subscribe_key: 'sub-c-3deca76c-a898-11e8-ab44-96e83d2b591d'      
    });

    p.subscribe({
        channel  : channel,
        callback : function(m) {
            output.innerHTML = '<p><i class="' + m.avatar + '"></i><span>' +  m.text.replace( /[<>]/ig, '' ) + '</span></p>' + output.innerHTML; 
        },
        presence: function(m){
            presence.textContent = m.occupancy + ' user(s)';
        }
    });

    p.bind('keyup', input, function(e) {
        (e.keyCode || e.charCode) === 13 && publish()
    });

    p.bind('click', button, publish);

    function publish() {
        p.publish({
            channel : channel, 
            message : {avatar: avatar.className, text: input.value}, 
            x : (input.value='')
        });
    }
  

})();