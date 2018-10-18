/*

Every actionable link should define
[ Display Template - Display Mode - Display Data ]

Modes
-------------------------------------
0. List all records
1. New empty form for edit
2. Edit form
9. Readonly Edit form (should be considered after implementation of user access rules)

Places where forms are opened are
-------------------------------------
1. mtMenu icons
	Modes available are : 
		0, 1, 2, 9
			param json needs to be built and set as input
2. message posts
	Modes available are :
		2, 9
			param json can be left null, data should have all the ncessary values

*/



function displayForm(input,data) {
  
  //parse input params to json
  var param = JSON.parse(input);
  request.request.appid = param.appid;
  request.request.templateid = param.templateid;  
  request.request.mode = param.mode;
  request.request.id = param.id;
  console.log(request)
  var temp;
  
  //Get template
  //var temp =  getTemplate(request);
  //Check if template exists in cache
  if(localStorage.getItem(param.templateid)) {
      temp = JSON.parse(localStorage.getItem(param.templateid));
      setFormData(temp,data);
  } 
  else {
      // Make ajax call, fetch object and store in localStorage in the success or done callbacks as described above
      $.ajax({
          url: 'http://buzingle.web44.net/oktavity/service/template.php',
          dataType: 'json',
          type: 'post',
          contentType: 'application/x-www-form-urlencoded',
          data:  { req:JSON.stringify(request) },
          success: function( temp, textStatus, jQxhr ) {
              localStorage.setItem(param.templateid, JSON.stringify(temp));
              console.log( temp );
              setFormData(temp,data);
          },
          error: function( jqXhr, textStatus, errorThrown ) {
              console.log( errorThrown );
          }
      });
    }
  
}

function setFormData(temp, data) {
  
  
  //Use passed data or template defaults to create transform
  if (data == null) {
    //Insert Mode
     if (request.request.id == null || request.request.id === 0 || request.request.id === undefined) { 
       data = temp.defaults;
       renderForm(temp,data)
     }
    //Retrieval from db
    else {
      $.ajax({
        url: 'http://kavach.gearhostpreview.com/trans.php',
        dataType: 'json',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data:  { req:JSON.stringify(request) },
        success: function( d, textStatus, jQxhr ){
            data = d[0].tranPage;
            renderForm(temp,data)
            console.log( d );
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
      });
    }
  }
  else {
    renderForm(temp,data);
  }
    
  
}

function renderForm(temp,data) {
  
  //Build form html from template and data
 
  $("#form").html(json2html.transform(data,temp.template));
                  
  //Wire save events
  $("#btnSave").click(function() {  

    //Call php service to save record
    //request.request.mode = 1 ; (Mode will be set req call calling agency)
    request.request.data[0].page = JSON.stringify(j2j($("#dForm").serializeArray()));
    $.ajax({
        url: 'http://kavach.gearhostpreview.com/trans.php',
        dataType: 'json',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data:  { req:JSON.stringify(request) },
        success: function( data, textStatus, jQxhr ){
            console.log( data );
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });

    //Hide form
    $("#form").css('display','none');

    //Publish the transaction to pubnub stream
    publishForm( "Diet entry", formObj.length - 1, JSON.stringify(j2j($("#dForm").serializeArray())) );

  }); 
  
  //wire close event
  $("#btnClose").click(function() {  $("#form").css('display','none');  }); 

  //Make form visible
  $("#form").css('display','block'); 
  
  //Close function bar
  $("#myDropdown").css('display','none');
     
 
}