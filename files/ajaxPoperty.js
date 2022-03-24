//
//var projectPath="/schoolConnex";
//
//var DeploymentType=0;   //   use 0 -> Production Level
//						//	 use 1 -> Inhouse Level code

$(function(){
	
	$('.nl').on('click', function(){
	    $('.navbar-collapse').collapse('hide');
	});
	
	
	
	$("#navbarSupportedContent-4 a").click(function() {
		var id =  $(this).attr('href');
		try {
			var n = id.indexOf("#");
			var href = id.substring(n);
			var div = href;
		     $('html, body').animate({         
		         scrollTop: $(div).offset().top-40
		     }, 1000);
		}
		catch(err) {
			 console.log(err.message);
		}
		
	});
	
//	this populates the description text based on the ids of btn and description of the resource
	$('.full-txt-btn').on('click', function(){
		var btn_id = this.id;
		console.log(btn_id);
		var start = btn_id.search("_");
		var id_val = btn_id.substring(parseInt(start)+1);
		console.log(id_val);
		var phet_id = '#'+'phet_'+id_val;
		console.log(phet_id);
		var txt = $(phet_id).html();
		console.log(txt);
		$('.fullText').html(txt);
	    
	});
	
	
	/******************************** DISABLE/ENABLE CLASS ******************************************************/
	
	$('.enableClass').click(function(){
		var class_value=$(this).attr('value');
		
		$('#Success').css({"display": "none"});
		$('#Failure').css({"display": "none"});
			
		if(confirm('Are you sure you want to enable it? All associated content will also get enabled.')){
			
		var urlPassed= projectPath+"enableDisableClass";
	
		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");
		
		$.ajax({
	  	type: "GET",
    	contentType: "application/json",
   		 url: urlPassed,
   		 data: "class_id="+class_value,
   		 beforeSend: function(xhr) {
             xhr.setRequestHeader(header, token);
   		 },
   		 dataType: 'json',
   		 cache: false,
    	 timeout: 600000,
   		 success: function (data){
   			 
   			if(data){
   				$('#'+class_value).addClass('fas fa-times-circle');
   				$('#'+class_value).removeClass('fas fa-check-circle');
   				$('#'+class_value).css({"color": "red"});
   				$('#Success').css({"display": "block"});
   	
   			}else{
   				$('#Failure').css({"display": "block"});
   			}
   			
   		
		},
		
		error : function(err){
			console.log("not working. ERROR: "+JSON.stringify(err));
		}
		
	})
		}
	})
	
	
	
	$('.disableClass').click(function(){
		var class_value=$(this).attr('value');
		var totalResource;
		
		$('#Success').css({"display": "none"});
		$('#Failure').css({"display": "none"});
		
		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");
		
		var urlPassedTemp= projectPath+"countResourceFromClass";
		
		$.ajax({
		  	type: "GET",
		  	async:false,
	    	contentType: "application/json",
	   		 url: urlPassedTemp,
	   		 data: "classId="+class_value,
	   		 beforeSend: function(xhr) {
	             xhr.setRequestHeader(header, token);
	   		 },
	   		 dataType: 'json',
	   		 cache: false,
	    	 timeout: 600000,
	   		 success: function (data){
	   			 if(data>-1){
	   				totalResource=data;
	   			 }else{
	   				 totalResource=0;
	   			 }
	   		
	   			 
	   		
			},
			
			error : function(err){
				console.log("not working. ERROR: "+JSON.stringify(err));
			}
			
		})
		
		
		
		if(confirm('Are you sure you want to Disable it? All associated content will also get disabled.\nTotal Number of Resource will also be disabled :'+totalResource+'')){
			
		var urlPassed= projectPath+"enableDisableClass";
	
		$.ajax({
	  	type: "GET",
    	contentType: "application/json",
   		 url: urlPassed,
   		 data: "class_id="+class_value,
   		 beforeSend: function(xhr) {
             xhr.setRequestHeader(header, token);
   		 },
   		 dataType: 'json',
   		 cache: false,
    	 timeout: 600000,
   		 success: function (data){
   			 
   			if(data){
   				
   				$('#'+class_value).addClass('fas fa-check-circle');
   				$('#'+class_value).removeClass('fas fa-times-circle');
   				$('#'+class_value).css({"color": "green"});
   				$('#Success').css({"display": "block"});
   				
   	
   			}else{
   				$('#Failure').css({"display": "block"});
   			}
   			
   		
		},
		
		error : function(err){
			console.log("not working. ERROR: "+JSON.stringify(err));
		}
		
	})
		}
		
	})
	
	/******************************** USER DETAILS UPDATE ******************************************************/
	
	$("#userDetailsUpdate").click(function(){
		var fname=$('#fname').val();
		var lname=$('#lname').val();
		
		var userData={
			"fname":fname,
			"lname":lname,
		};
		
		var urlPassed;
		
		
    		urlPassed= projectPath+"updateUserDetails";
	
    	
		
		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");
		
		$.ajax({
	  	type: "GET",
    	contentType: "application/json",
   		 url: urlPassed,
   		 data: userData,
   		 beforeSend: function(xhr) {
             xhr.setRequestHeader(header, token);
   		 },
   		 dataType: 'json',
   		 cache: false,
    	 timeout: 600000,
   		 success: function (data){
   			 
   			if(data){
   				alert("Details updated successfully");
   	
   			}else{
   				alert("Update failed");
   			}
   			
   		
		},
		
		error : function(err){
			console.log("not working. ERROR: "+JSON.stringify(err));
		}
		
	});
		



	})
	
	
	$('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
		localStorage.setItem('activeTab', $(e.target).attr('href'));
	});
	
	/**************************** Reloading Page on closing of Modal ***********************************************/
	
	 $(".contentInstruction").hide();
	 
	 $(".show_hide").on("click", function () {
	        var txt = $(".contentInstruction").is(':visible') ? 'Instructions?' : 'Read Less';
	        $(".show_hide").text(txt);
	        $(this).next('.contentInstruction').slideToggle(200);
	    });
	
	
	$('.VideoModalReloadTeacher').on('hidden.bs.modal', function () {
		location.reload();
	});
	
	$('.VideoModalReloadUploadTeacher').on('hidden.bs.modal', function () {
		location.reload();
	});
	
	$('.QuizReloadTeacher').on('hidden.bs.modal', function () {
		location.reload();
	});
	
	$('.ArticleReloadTeacher').on('hidden.bs.modal', function () {
		location.reload();
	});
	
	$('.DocumentReloadTeacher').on('hidden.bs.modal', function () {
		location.reload();
	});
	
	$('.LessonReloadTeacher').on('hidden.bs.modal', function () {
		location.reload();
		
	});
	
	$('.PhetReloadTeacher').on('hidden.bs.modal', function () {
		location.reload();
	});
	
/*	$('#TestimonialModal').on('hidden.bs.modal', function () {
		location.reload();
	});
	
	$('#EventModal').on('hidden.bs.modal', function () {
		location.reload();
	});
	
	$('#SubjectModal').on('hidden.bs.modal', function () {
		location.reload();
	});
	
	$('#TopicModal').on('hidden.bs.modal', function () {
		location.reload();
	});*/
	
	$('.ConceptReloadTeacher').on('hidden.bs.modal', function () {
		location.reload();
	});
	 
	 $('#ProfilePictureModal').on('hidden.bs.modal', function () {
			location.reload();
	});
	
	/*------------------------------Profile Picture Update ----------------------------------------------------*/
	$('#profilePicture').change(function(){
		
		readImageUrl(this);
		$("#chngProfilePic").prop('disabled', false);
	})
	
	
	$('#chngProfilePic').click(function(){
		
		event.preventDefault();
		
		updateProfilePicture();
		
	})
	
	
	/*-------------------------------------- Password Error Operation ----------------------------------------------*/
	
	$('#passwordL').change(function(){
		
		$('#passwordIncorrectL').css({"display": "none"});
		
		var password=$(this).val();
		
		if(password.length<6){
			$('#passwordIncorrectL').css({"display": "block"});
			$("#registerL").prop('disabled', true);
		}else{
			
			$("#registerL").prop('disabled', false);
		}
		
		
	})
	
	$('#password2L').change(function(){
		
		$('#ConfIncorrectL').css({"display": "none"});
	
		
		var password=$(this).val();
		
		if(password !== $('#passwordL').val()){
			$('#ConfIncorrectL').css({"display": "block"});
			$("#registerL").prop('disabled', true);
		}else{
			$("#registerL").prop('disabled', false);
		}
		
		
	})
	
	/*****************************************************/
	
		$('#passwordP').change(function(){
		
		$('#passwordIncorrectP').css({"display": "none"});
		
		var password=$(this).val();
		
		if(password.length<6){
			$('#passwordIncorrectP').css({"display": "block"});
			$("#registerP").prop('disabled', true);
		}else{
			$("#registerP").prop('disabled', false);
		}
		
		
	})
	
	$('#ConfpasswordP').change(function(){
		
		$('#ConfIncorrectP').css({"display": "none"});
	
		
		var password=$(this).val();
		
		if(password !== $('#passwordP').val()){
			$('#ConfIncorrectP').css({"display": "block"});
			$("#registerP").prop('disabled', true);
		}else{
			$("#registerP").prop('disabled', false);
		}
		
		
	})
	
	/*-------------------------------------------------*/
	
		$('#passwordT').change(function(){
		
		$('#passwordIncorrectT').css({"display": "none"});
		
		var password=$(this).val();
		
		if(password.length<6){
			$('#passwordIncorrectT').css({"display": "block"});
			$("#registerT").prop('disabled', true);
		}else{
			$("#registerT").prop('disabled', false);
		}
		
		
	})
	
	$('#ConfpasswordT').change(function(){
		
		$('#ConfIncorrectT').css({"display": "none"});
	
		
		var password=$(this).val();
		
		if(password !== $('#passwordT').val()){
			$('#ConfIncorrectT').css({"display": "block"});
			$("#registerT").prop('disabled', true);
		}else{
			$("#registerT").prop('disabled', false);
		}
		
		
	})
	
	
	/*------------------------------------------------ END ----------------------------------------------------------*/
	
	/*****************************************END *********************************************************************/
	
	$('#subject').change(function(){
		
		$("#headerSubmit").prop('disabled', false);
		
		
	})
	// REST API CALL FUNCTIONALITY FOR TUTORIAL
	
	
		$('#topicTutorial').change(function(){
			
			$("#foss").prop('disabled', true);
			$("#fossLanguage").prop('disabled', true);
			$("#fossTutorial").prop('disabled', true);
			
			
			$.ajax({
				  	 type: "GET",
				
		       		 url: "https://spoken-tutorial.org/api/get_schoolfosslist/",
		       		 dataType: 'json',
		       		 cache: false,
		        	 timeout: 600000,
		       		 success: function (data){
		       			
			       	    var html = '';
			            var len = data.length;
			           
			            html+='<option>Select Foss</option>';
			            for (var i = 0; i < len; i++) {
			             html += '<option value="' + data[i].id + '">'
			               + data[i].foss
			               + '</option>';
			            }
			            html += '</option>';
		            
		        	$("#foss").prop('disabled', false);
		        	
		            $('#foss').html(html);
		           
		            $(".upload-submit").prop('disabled', false);
		         
		            
					},
					
					error : function(err){
						console.log("not working. ERROR: "+JSON.stringify(err));
						
					}
					
					
				});
			
			
			
			
		})
		
		
		$('#foss').change(function(){
			
			var fossId=$(this).find(":selected").val();
			
			$("#fossLanguage").prop('disabled', true);
			$("#fossTutorial").prop('disabled', true);
			
			var urlLanguage="https://spoken-tutorial.org/api/get_fosslanguage/"+fossId+"/";
			
			
			$.ajax({
				  	 type: "GET",
				
		       		 url: urlLanguage,
		       		 dataType: 'json',
		       		 cache: false,
		        	 timeout: 600000,
		       		 success: function (data){
		       			
			       	    var html = '';
			            var len = data.length;
			            
			            html+='<option>Select Language</option>';
			            for (var i = 0; i < len; i++) {
			             html += '<option value="' + data[i].id + '">'
			               + data[i].name
			               + '</option>';
			            }
			            html += '</option>';
		            
		        	$("#fossLanguage").prop('disabled', false);
		        	
		            $('#fossLanguage').html(html);
		         
		            
					},
					
					error : function(err){
						console.log("not working. ERROR: "+JSON.stringify(err));
						
					}
					
					
				});
			
			
			
			
		})
		
		$('#fossLanguage').change(function(){
			
			var fossLanguageId=$(this).find(":selected").val();
			var fossId = $("#foss").val();
			
			$("#fossTutorial").prop('disabled', true);
			
			var urlFossAndLanguage="https://spoken-tutorial.org/api/get_tutorials/"+fossId+"/"+fossLanguageId+"/";
			
			
			$.ajax({
				  	 type: "GET",
				
		       		 url: urlFossAndLanguage,
		       		 dataType: 'json',
		       		 cache: false,
		        	 timeout: 600000,
		       		 success: function (data){
		       			
			       	    var html = '';
			            var len = data.length;
			    
			            for (var i = 0; i < len; i++) {
			             html += '<option value="' + data[i].id + '">'
			               + data[i].tutorial_name
			               + '</option>';
			            }
			            html += '</option>';
		            
		        	$("#fossTutorial").prop('disabled', false);
		        	
		            $('#fossTutorial').html(html);
		         
		            
					},
					
					error : function(err){
						console.log("not working. ERROR: "+JSON.stringify(err));
						
					}
					
					
				});
			
			
			
			
		})
	
	
	// JQUERY AJAX CALL TO TAKE CONTACT DATA FROM USER SIDE ----------------------------------------
	
		
		$('#name').change(function(){
			var name=$('#name').val();
			var email=$('#email').val();
			var desc=$('#message').val();
  			
  			
  			$("#contactForm").prop('disabled', true);
			
  			if(name.length>0&& email.length>0 && desc.length>0){
  				$("#contactForm").prop('disabled', false);
  			}
  			
  			
  		})
  		
  		$('#email').change(function(){
			var name=$('#name').val();
			var email=$('#email').val();
			var desc=$('#message').val();
  			
  			
  			$("#contactForm").prop('disabled', true);
			
  			if(name.length>0&& email.length>0 && desc.length>0){
  				$("#contactForm").prop('disabled', false);
  			}
  			
  			
  		})
  		
  		$('#message').change(function(){
			var name=$('#name').val();
			var email=$('#email').val();
			var desc=$('#message').val();
  			
  			
  			$("#contactForm").prop('disabled', true);
			
  			if(name.length>0&& email.length>0 && desc.length>0){
  				$("#contactForm").prop('disabled', false);
  			}
  			
  			
  		})
		
  		
	
		$('#contactForm').click(function(){
			var name=$('#name').val();
			var email=$('#email').val();
			var desc=$('#message').val();
			if(name.length>0 && (email.endsWith(".com") ||email.endsWith(".in")) && desc.length>0){
				
				var json={
						"name":name,
						"message":desc,
						"email":email,
				};
				var jsdata= JSON.stringify(json);
				var urlPassed;
				
				urlPassed= projectPath+"addContactForm";
			
				var token = $("meta[name='_csrf']").attr("content");
				var header = $("meta[name='_csrf_header']").attr("content");
				
				$.ajax({
				  	 type: "POST",
		        	 contentType: "application/json",
		       		 url: urlPassed,
		       		 data: JSON.stringify(json),
		       		 beforeSend: function(xhr) {
                         xhr.setRequestHeader(header, token);
		       		 },
		       		 dataType: 'json',
		       		 cache: false,
		        	 timeout: 600000,
		        	
		       		 success: function (data){
		       			 
		       			 
		       			$('#statusOnContactForm').css({"display": "none"}); 
						  
						 $('#statusOnContactFormAfterAjaxCallSucess').css({"display": "none"});
						 $('#statusOnContactFormAfterAjaxCallFailure').css({"display": "none"});
						
						 if(data[0]==="Success"){
							 $('#statusOnContactFormAfterAjaxCallSucess').css({"display": "block"});
							 setTimeout(function() {
						            $('#statusOnContactFormAfterAjaxCallSucess').fadeOut(1000)}, 4000);
						 }else {
							 $('#statusOnContactFormAfterAjaxCallFailure').css({"display": "block"});
							 setTimeout(function() {
						            $('#statusOnContactFormAfterAjaxCallFailure').fadeOut(1000)}, 4000);
						 }
						 
						 $("#name").prop('value', "");
						 $("#email").prop('value', "");
						 $("#message").prop('value', "");
						 
						 setTimeout(function() {
					            $('#Failure').fadeOut(1000)}, 4000);
						 
		       	    
		            
					},
					
					error : function(err){
						console.log("not working. ERROR: "+JSON.stringify(err));
					}
					
					
				});
				
				
			}else{
				$('#statusOnContactForm').css({"display": "block"});
			}
			
		});
		
		
		/*-------------------------------UPDATE TESTIMONIAL FROM VIEW TESTIMONIAL LIST ---------------------------------------------*/
		
		$(".detailTestimonial").click(function(){
				var testi_id=$(this).attr('value');
				
				var testimonialID={
					"testimonialId":testi_id
				};
				
				var urlPassed;
				
				$('#Success').css({"display": "none"}); 
				$('#Failure').css({"display": "none"});
				
				
	        		urlPassed= projectPath+"loadByTestimonialID";
			
	        	
				
				var token = $("meta[name='_csrf']").attr("content");
				var header = $("meta[name='_csrf_header']").attr("content");
				
				$.ajax({
			  	type: "POST",
	        	contentType: "application/json",
	       		 url: urlPassed,
	       		 data: JSON.stringify(testimonialID),
	       		 beforeSend: function(xhr) {
                     xhr.setRequestHeader(header, token);
	       		 },
	       		 dataType: 'json',
	       		 cache: false,
	        	 timeout: 600000,
	       		 success: function (data){
	       			 
	       			
	       			$('#testimonialDesc').val(data["description"]);
	       			$('#testimonialName').val(data["name"]);
	       			$('#testimonialOrg').val(data["organization"]);
	       		
				},
				
				error : function(err){
					console.log("not working. ERROR: "+JSON.stringify(err));
				}
				
			});
				



				$('#testiId').prop('value',testi_id);
				$('#TestimonialModal').modal('show');
			})
			
			
			/*-------------------------------UPDATE EVENT FROM VIEW EVENT LIST ---------------------------------------------*/
			
			
			
			$(".detailEvent").click(function(){
				var event_id=$(this).attr('value');
				
				var eventID={
					"eventId":event_id
				};
				
				$('#Success').css({"display": "none"}); 
				 $('#Failure').css({"display": "none"});
				
				var urlPassed;
				
	        		urlPassed= projectPath+"loadByEventID";
			
	        	
				
				var token = $("meta[name='_csrf']").attr("content");
				var header = $("meta[name='_csrf_header']").attr("content");
				
				$.ajax({
			  	type: "POST",
	        	contentType: "application/json",
	       		 url: urlPassed,
	       		 data: JSON.stringify(eventID),
	       		 beforeSend: function(xhr) {
                     xhr.setRequestHeader(header, token);
	       		 },
	       		 dataType: 'json',
	       		 cache: false,
	        	 timeout: 600000,
	       		 success: function (data){
	       			 
	       			
	       			$('#eventDesc').val(data["description"]);
	       			$('#eventHead').val(data["headline"]);
	       			$('#eventCoordName').val(data["coordName"]);
	       			$('#startDate').val(data["dateToHappenStart"]);
	       			$('#endDate').val(data["dateToHappenEnd"]);
	       			$('#regStartDate').val(data["registStart"]);
	       			$('#regEndDate').val(data["registEnd"]);
	       		
				},
				
				error : function(err){
					console.log("not working. ERROR: "+JSON.stringify(err));
				}
				
			});
				



				$('#eventId').prop('value',event_id);
				$('#EventModal').modal('show');
			})
			
			
	/*----------------------------- UPDATE OF TESTIMONIAL------------------------------------------------------------------------------*/
			
			
			$("#updateTestimonial").click(function(){
				var testi_id=$('#testiId').val();
				var name=$('#testimonialName').val();
				var org=$('#testimonialOrg').val();
				var desc=$('#testimonialDesc').val();
				
				
				var testimonialUpdateData={
					"testimonialId":testi_id,
					"name":name,
					"organization":org,
					"description":desc,
					
				};
				
				var urlPassed;
				
				
	        		urlPassed= projectPath+"updateTestimonial";
			
	        	
				
				var token = $("meta[name='_csrf']").attr("content");
				var header = $("meta[name='_csrf_header']").attr("content");
				
				$.ajax({
			  	type: "POST",
	        	contentType: "application/json",
	       		 url: urlPassed,
	       		 data: JSON.stringify(testimonialUpdateData),
	       		 beforeSend: function(xhr) {
                     xhr.setRequestHeader(header, token);
	       		 },
	       		 dataType: 'json',
	       		 cache: false,
	        	 timeout: 600000,
	       		 success: function (data){
	       			 
	       			
	       			 
	       			 $('#Success').css({"display": "none"}); 
	    			 $('#Failure').css({"display": "none"});
	    			
	    			 if(data[0]==="Success"){
	    				 $('#Success').css({"display": "block"});
	    			 }else if(data[0]==="failure"){
	    				 $('#Failure').css({"display": "block"});
	    			 }
	       			 
	       			
	       		
	       		
				},
				
				error : function(err){
					console.log("not working. ERROR: "+JSON.stringify(err));
				}
				
			});
				


			})
			
			
			/*-------------------------------UPDATE OF EVENT ---------------------------------------------*/
			
			
			$("#updateEvent").click(function(){
				
				event.preventDefault();
					

				fire_ajax_submit_Event(); 
			});
					 
				/*var event_id=$('#eventId').val();
				var desc=$('#eventDesc').val();
				var head=$('#eventHead').val();
				var date=$('#eventdate').val();
				
				var eventUpdateData={
					"eventId":event_id,
					"description":desc,
					"dateToHappen":date,
					"headline":head
					
				};
				
				var token = $("meta[name='_csrf']").attr("content");
				var header = $("meta[name='_csrf_header']").attr("content");
				
				var urlPassed;
				
				if(DeploymentType){								// Url Creation based on depolyment 
					urlPassed= "/updateEvent";
			
	        	}else{
	        		urlPassed= projectPath+"/updateEvent";
			
	        	}
				
				$.ajax({
			  	type: "POST",
	        	contentType: "application/json",
	       		 url: urlPassed,
	       		 data: JSON.stringify(eventUpdateData),
	       		 beforeSend: function(xhr) {
                     xhr.setRequestHeader(header, token);
	       		 },
	       		 dataType: 'json',
	       		 cache: false,
	        	 timeout: 600000,
	       		 success: function (data){
	       			 
	       			 $('#Success').css({"display": "none"}); 
	    			 $('#Failure').css({"display": "none"});
	    			
	    			 if(data[0]==="Success"){
	    				 $('#Success').css({"display": "block"});
	    			 }else if(data[0]==="failure"){
	    				 $('#Failure').css({"display": "block"});
	    			 }
	       			 
	       			
	       		
	       		
				},
				
				error : function(err){
					console.log("not working. ERROR: "+JSON.stringify(err));
				}
				
			});
				



				$('#eventId').prop('value',event_id);
				$('#EventModal').modal('show');*/
		
			
		
	/************************************************************************************************************************************/	
		
		
		/*************************************************END**************************************************************************/
	
	
	
	/* -----------------------------------------------END----------------------------------------------------------------------*/
	
	
	//------------------------------JQUERY AJAX FOR CHANGING OF CLASS SUBJECT AND TIPIC--------------------------------------------------------------
	
	//*******************************************CONCEPTS-MAP*************************************************************************
			
			$('#classSelectedConcept').change(function(){
			
			var classname=$(this).find(":selected").val();
			var classNameData={
					"className":classname,
			};
			
			var token = $("meta[name='_csrf']").attr("content");
			var header = $("meta[name='_csrf_header']").attr("content");
			
			var urlPassed;
			
		
        		urlPassed= projectPath+"loadByClassName";
		
        	
			
		
			$.ajax({
			  	type: "POST",
	        	contentType: "application/json",
	       		 url: urlPassed,
	       		 data: JSON.stringify(classNameData),
	       		 beforeSend: function(xhr) {
                     xhr.setRequestHeader(header, token);
	       		 },
	       		 dataType: 'json',
	       		 cache: false,
	        	 timeout: 600000,
	       		 success: function (data){
	       	    var html = '';
	            var len = data.length;
	            html += '<option value="0">Select Subject</option>';
	            for (var i = 0; i < len; i++) {
	             html += '<option value="' + data[i] + '">'
	               + data[i]
	               + '</option>';
	            }
	            html += '</option>';
	            
	            $("#subjectConcept").prop('disabled', false);
	            $('#subjectConcept').html(html);
	            
				},
				
				error : function(err){
					console.log("not working. ERROR: "+JSON.stringify(err));
				}
				
				
			});
		
			
		});
			
		
		
		$('#subjectConcept').change(function(){
			
			var subject=$(this).find(":selected").val();
			var classname = $("#classSelectedConcept").val();
			var selectedClassAndSubject={
					"subject":subject,
					"className":classname,
					
			};
			
			var token = $("meta[name='_csrf']").attr("content");
			var header = $("meta[name='_csrf_header']").attr("content");
			
			var urlPassed;
			
			
        		urlPassed= projectPath+"loadByClassnameAndSubject";
		
        	
		
			$.ajax({
			  	type: "POST",
	        	contentType: "application/json",
	       		 url: urlPassed,
	       		 data: JSON.stringify(selectedClassAndSubject),
	       		 beforeSend: function(xhr) {
                     xhr.setRequestHeader(header, token);
	       		 },
	       		 dataType: 'json',
	       		 cache: false,
	        	 timeout: 600000,
	       		 success: function (data){
	       	    var html = '';
	            var len = data.length;
	            html += '<option value="0">Select Topic</option>';
	            for (var i = 0; i < len; i++) {
	             html += '<option value="' + data[i] + '">'
	               + data[i]
	               + '</option>';
	            }
	            html += '</option>';
	            
	           
	            $('#topicConcept').html(html);
	            $("#topicConcept").prop('disabled', false);
		      
	            
				},
				
				error : function(err){
					console.log("not working. ERROR: "+JSON.stringify(err));
				}
				
				
			});
			
		 
		  
		});
		
	
		
		
		$('#topicConcept').change(function(){
			
			
		  	$("#descriptionConceptMap").prop('disabled', false);
		  
		  	
			$("#headlineConceptMap").prop('disabled', false);
			
			$("#conceptMapImage").prop('disabled', false);
			
			
		})
			
	//******************************************* PHETS ******************************************************************************/
	$('#classSelectedPhet').change(function(){
			
			var classname=$(this).find(":selected").val();
			var selectedClass={
					"className":classname,
			};
			
			var token = $("meta[name='_csrf']").attr("content");
			var header = $("meta[name='_csrf_header']").attr("content");
			

			var urlPassed;
			
        		urlPassed= projectPath+"loadByClassName";
		
        	
		
			$.ajax({
			  	type: "POST",
	        	contentType: "application/json",
	       		 url: urlPassed,
	       		 data: JSON.stringify(selectedClass),
	       		 beforeSend: function(xhr) {
                     xhr.setRequestHeader(header, token);
	       		 },
	       		 dataType: 'json',
	       		 cache: false,
	        	 timeout: 600000,
	       		 success: function (data){
	       	    var html = '';
	            var len = data.length;
	            html += '<option value="0">Select Subject</option>';
	            for (var i = 0; i < len; i++) {
	             html += '<option value="' + data[i] + '">'
	               + data[i]
	               + '</option>';
	            }
	            html += '</option>';
	            
	            $("#subjectPhet").prop('disabled', false);
	            $('#subjectPhet').html(html);
	            
				},
				
				error : function(err){
					console.log("not working. ERROR: "+JSON.stringify(err));
				}
				
				
			});
		
			
		});
			
		
		
		$('#subjectPhet').change(function(){
			
			var subject=$(this).find(":selected").val();
			var classname = $("#classSelectedPhet").val();
			var selectedClassAndSubject={
					"subject":subject,
					"className":classname,
					
			};
			
			var urlPassed;
			
			
        		urlPassed= projectPath+"loadByClassnameAndSubject";
		
        	
			
			var token = $("meta[name='_csrf']").attr("content");
			var header = $("meta[name='_csrf_header']").attr("content");
		
			$.ajax({
			  	type: "POST",
	        	contentType: "application/json",
	       		 url: urlPassed,
	       		 data: JSON.stringify(selectedClassAndSubject),
	       		 beforeSend: function(xhr) {
                     xhr.setRequestHeader(header, token);
	       		 },
	       		 dataType: 'json',
	       		 cache: false,
	        	 timeout: 600000,
	       		 success: function (data){
	       	    var html = '';
	            var len = data.length;
	            html += '<option value="0">Select Topic</option>';
	            for (var i = 0; i < len; i++) {
	             html += '<option value="' + data[i] + '">'
	               + data[i]
	               + '</option>';
	            }
	            html += '</option>';
	            
	           
	            $('#topicPhet').html(html);
	            $("#topicPhet").prop('disabled', false);
		      
	            
				},
				
				error : function(err){
					console.log("not working. ERROR: "+JSON.stringify(err));
				}
				
				
			});
			
		 
		  
		});
		
	
		
		
		$('#topicPhet').change(function(){
			
			
		  	$("#descriptionPhet").prop('disabled', false);
		  
		  	
			$("#sourcePhet").prop('disabled', false);
			
			$("#Embedphet").prop('disabled', false);
			
			
		})
		
	/*******************************************************END*****************************************************************
	 */	
		
	
		$('#classSelectedArticle').change(function(){
  					
  					var classname=$(this).find(":selected").val();
  					var selectedClass={
  							"className":classname,
  					};
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  				
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByClassName";
  				
  		        	
  					
  					$.ajax({
  					  	type: "POST",
  			        	contentType: "application/json",
  			       		 url: urlPassed,
  			       		 data: JSON.stringify(selectedClass),
  			       		 beforeSend: function(xhr) {
                         xhr.setRequestHeader(header, token);
  			       		 },
  			       		 dataType: 'json',
  			       		 cache: false,
  			        	 timeout: 600000,
  			       		 success: function (data){
  			       	    var html = '';
  			            var len = data.length;
  			            html += '<option value="0">Select Subject</option>';
  			            for (var i = 0; i < len; i++) {
  			             html += '<option value="' + data[i] + '">'
  			               + data[i]
  			               + '</option>';
  			            }
  			            html += '</option>';
  			            
  			            $("#subjectArticle").prop('disabled', false);
  			            $('#subjectArticle').html(html);
  			            
  						},
  						
  						error : function(err){
  							console.log("not working. ERROR: "+JSON.stringify(err));
  						}
  						
  						
  					});
  				
  					
  				});
  				
  			/* -----------------------------------------------------End of code ----------------- -------------------------------------*/	
  				
  		    /* ------------------------------------Start to fetch Topic name based on Class And Subject Selected -------------------------------------  */	
  				
  				
  				$('#subjectArticle').change(function(){
  					
  					var subject=$(this).find(":selected").val();
  					var classname = $("#classSelectedArticle").val();
  					var selectedClassAndSubject={
  							"subject":subject,
  							"className":classname,
  							
  					};
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  				
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByClassnameAndSubject";
  				
  		        	
  					
  					$.ajax({
  					  	type: "POST",
  			        	contentType: "application/json",
  			       		 url: urlPassed,
  			       		 data: JSON.stringify(selectedClassAndSubject),
  			       		 beforeSend: function(xhr) {
                         xhr.setRequestHeader(header, token);
  			       		 },
  			       		 dataType: 'json',
  			       		 cache: false,
  			        	 timeout: 600000,
  			       		 success: function (data){
  			       	    var html = '';
  			            var len = data.length;
  			            html += '<option value="0">Select Topic</option>';
  			            for (var i = 0; i < len; i++) {
  			             html += '<option value="' + data[i] + '">'
  			               + data[i]
  			               + '</option>';
  			            }
  			            html += '</option>';
  			            
  			           
  			            $('#topicArticle').html(html);
  			            $("#topicArticle").prop('disabled', false);
	  			      
  			            
  						},
  						
  						error : function(err){
  							console.log("not working. ERROR: "+JSON.stringify(err));
  						}
  						
  						
  					});
  					
  				 
  				  
  				});
  				
  				/*---------------------------------- End of fetching topic name based on classname and subject------------------------------ */
  				
  				
  				$('#topicArticle').change(function(){
  					
  					
  				  	$("#descriptionArticle").prop('disabled', false);
  	
  				  	$("#urlArticle").prop('disabled', false);
	  				$("#sourceArticle").prop('disabled', false);
	  		
  				});
  				
  	/******************************************************* ARTCILE END********************************************************************/			
  				
  				
  				$('#classSelectedLesson').change(function(){

  					
  					var classname=$(this).find(":selected").val();
  					var selectedClass={
  							"className":classname,
  					};
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  				
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByClassName";
  				
  		        	
  					
  					$.ajax({
  					  	type: "POST",
  			        	contentType: "application/json",
  			       		 url: urlPassed,
  			       		 data: JSON.stringify(selectedClass),
  			       		 beforeSend: function(xhr) {
                         xhr.setRequestHeader(header, token);
  			       		 },
  			       		 dataType: 'json',
  			       		 cache: false,
  			        	 timeout: 600000,
  			       		 success: function (data){
  			       	    var html = '';
  			            var len = data.length;
  			            html += '<option value="0">Select Subject</option>';
  			            for (var i = 0; i < len; i++) {
  			             html += '<option value="' + data[i] + '">'
  			               + data[i]
  			               + '</option>';
  			            }
  			            html += '</option>';
  			            
  			            $("#subjectLesson").prop('disabled', false);
  			            $('#subjectLesson').html(html);
  			            
  						},
  						
  						error : function(err){
  							console.log("not working. ERROR: "+JSON.stringify(err));
  						}
  						
  						
  					});
  				
  					
  				});
  				
  			/* -----------------------------------------------------End of code ----------------- -------------------------------------*/	
  				
  		    /* ------------------------------------Start to fetch Topic name based on Class And Subject Selected -------------------------------------  */	
  				
  				
  				$('#subjectLesson').change(function(){
  					
  					var subject=$(this).find(":selected").val();
  					var classname = $("#classSelectedLesson").val();
  					var selectedClassAndSubject={
  							"subject":subject,
  							"className":classname,
  							
  					};
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  				
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByClassnameAndSubject";
  				
  		        	
  					
  					$.ajax({
  					  	type: "POST",
  			        	contentType: "application/json",
  			       		 url: urlPassed,
  			       		 data: JSON.stringify(selectedClassAndSubject),
  			       		 beforeSend: function(xhr) {
                         xhr.setRequestHeader(header, token);
  			       		 },
  			       		 dataType: 'json',
  			       		 cache: false,
  			        	 timeout: 600000,
  			       		 success: function (data){
  			       	    var html = '';
  			            var len = data.length;
  			            html += '<option value="0">Select Topic</option>';
  			            for (var i = 0; i < len; i++) {
  			             html += '<option value="' + data[i] + '">'
  			               + data[i]
  			               + '</option>';
  			            }
  			            html += '</option>';
  			            
  			         
  			            $('#topicLesson').html(html);
  			            $("#topicLesson").prop('disabled', false);
	  			    
  			            
  						},
  						
  						error : function(err){
  							console.log("not working. ERROR: "+JSON.stringify(err));
  						}
  						
  						
  					});
  					
  				 
  				  
  				});
  				
  				/*---------------------------------- End of fetching topic name based on classname and subject------------------------------ */
  				
  				
  				$('#topicLesson').change(function(){
  					
  					

	  				$("#lesson").prop('disabled', false);
	  			
  					
  				})
  				
  				
  		/************************************* END OF LESSON PLAN************************************************************/
  				
  				
  				$('#classSelectedDocument').change(function(){
  					
  					var classname=$(this).find(":selected").val();
  					var selectedClass={
  							"className":classname,
  					};
  					
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  		
  					
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByClassName";
  				
  		        	
  				
  					$.ajax({
  					  	type: "POST",
  			        	contentType: "application/json",
  			       		 url: urlPassed,
  			       		 data: JSON.stringify(selectedClass),
  			       		 beforeSend: function(xhr) {
                         xhr.setRequestHeader(header, token);
  			       		 },
  			       		 dataType: 'json',
  			       		 cache: false,
  			        	 timeout: 600000,
  			       		 success: function (data){
  			       	    var html = '';
  			            var len = data.length;
  			            html += '<option value="0">Select Subject</option>';
  			            for (var i = 0; i < len; i++) {
  			             html += '<option value="' + data[i] + '">'
  			               + data[i]
  			               + '</option>';
  			            }
  			            html += '</option>';
  			            
  			            
  			            $("#subjectDocument").prop('disabled', false);
  			            $('#subjectDocument').html(html);
  			            
  						},
  						
  						error : function(err){
  							console.log("not working. ERROR: "+JSON.stringify(err));
  						}
  						
  						
  					});
  				
  					
  				});
  				
  			/* -----------------------------------------------------End of code ----------------- -------------------------------------*/	
  				
  		    /* ------------------------------------Start to fetch Topic name based on Class And Subject Selected -------------------------------------  */	
  				
  				
  				$('#subjectDocument').change(function(){
  					
  					var subject=$(this).find(":selected").val();
  					var classname = $("#classSelectedDocument").val();
  					var selectedClassAndSubject={
  							"subject":subject,
  							"className":classname,
  							
  					};
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  				
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByClassnameAndSubject";
  				
  		        	
  					
  					$.ajax({
  					  	type: "POST",
  			        	contentType: "application/json",
  			       		 url: urlPassed,
  			       		 data: JSON.stringify(selectedClassAndSubject),
  			       		 beforeSend: function(xhr) {
                         xhr.setRequestHeader(header, token);
  			       		 },
  			       		 dataType: 'json',
  			       		 cache: false,
  			        	 timeout: 600000,
  			       		 success: function (data){
  			       	    var html = '';
  			            var len = data.length;
  			            html += '<option value="0">Select Topic</option>';
  			            for (var i = 0; i < len; i++) {
  			             html += '<option value="' + data[i] + '">'
  			               + data[i]
  			               + '</option>';
  			            }
  			            html += '</option>';
  			            
  			           
  			            $('#topicDocument').html(html);
  			            $("#topicDocument").prop('disabled', false);
	  			   
  			            
  						},
  						
  						error : function(err){
  							console.log("not working. ERROR: "+JSON.stringify(err));
  						}
  						
  						
  					});
  					
  				 
  				  
  				});
  				
  				/*---------------------------------- End of fetching topic name based on classname and subject------------------------------ */
  				
  				
  				$('#topicDocument').change(function(){
  					
  					
  				  	$("#descriptionDocument").prop('disabled', false);
  		
  				  	$("#UrlDocument").prop('disabled', false);
	  				$("#sourceDocument").prop('disabled', false);
	  		
  					
  				})
  				
  	/************************************************ END OF DOCUMENT ***************************************************/
  				
  				
  				
  				$('#classSelectedVideo').change(function(){
  					
  					var classname=$(this).find(":selected").val();
  					var selectedClass={
  							"className":classname,
  					};
  					
  					
  					var urlPassed;
  					
  				
  		        		urlPassed= projectPath+"loadByClassName";
  				
  		        	
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  		
  				
  					$.ajax({
  					  	type: "POST",
  			        	contentType: "application/json",
  			       		 url: urlPassed,
  			       		 data: JSON.stringify(selectedClass),
  			       		 beforeSend: function(xhr) {
                         xhr.setRequestHeader(header, token);
  			       		 },
  			       		 dataType: 'json',
  			       		 cache: false,
  			        	 timeout: 600000,
  			       		 success: function (data){
  			       	    var html = '';
  			            var len = data.length;
  			            html += '<option value="0">Select Subject</option>';
  			            for (var i = 0; i < len; i++) {
  			             html += '<option value="' + data[i] + '">'
  			               + data[i]
  			               + '</option>';
  			            }
  			            html += '</option>';
  			            
  			            $("#subjectVideo").prop('disabled', false);
  			            $('#subjectVideo').html(html);
  			            
  						},
  						
  						error : function(err){
  							console.log("not working. ERROR: "+JSON.stringify(err));
  						}
  						
  						
  					});
  				
  					
  				});
  				
  			/* -----------------------------------------------------End of code ----------------- -------------------------------------*/	
  				
  		    /* ------------------------------------Start to fetch Topic name based on Class And Subject Selected -------------------------------------  */	
  				
  				
  				$('#subjectVideo').change(function(){
  					
  					var subject=$(this).find(":selected").val();
  					var classname = $("#classSelectedVideo").val();
  					var selectedClassAndSubject={
  							"subject":subject,
  							"className":classname,
  							
  					};
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  				
  					var urlPassed;
  					
  				
  		        		urlPassed= projectPath+"loadByClassnameAndSubject";
  				
  		        	
  					
  					$.ajax({
  					  	type: "POST",
  			        	contentType: "application/json",
  			       		 url: urlPassed,
  			       		 data: JSON.stringify(selectedClassAndSubject),
  			       		 beforeSend: function(xhr) {
                         xhr.setRequestHeader(header, token);
  			       		 },
  			       		 dataType: 'json',
  			       		 cache: false,
  			        	 timeout: 600000,
  			       		 success: function (data){
  			       	    var html = '';
  			            var len = data.length;
  			            html += '<option value="0">Select Topic</option>';
  			            for (var i = 0; i < len; i++) {
  			             html += '<option value="' + data[i] + '">'
  			               + data[i]
  			               + '</option>';
  			            }
  			            html += '</option>';
  			            
  			          
  			            $('#topicVideo').html(html);
  			            $("#topicVideo").prop('disabled', false);
	  			    
  			            
  						},
  						
  						error : function(err){
  							console.log("not working. ERROR: "+JSON.stringify(err));
  						}
  						
  						
  					});
  					
  				 
  				  
  				});
  				
  				/*---------------------------------- End of fetching topic name based on classname and subject------------------------------ */
  				
  				
  				$('#topicVideo').change(function(){
  					
  					
  				  	$("#descriptionVideo").prop('disabled', false);
  				  
  				  	$("#urlVideo").prop('disabled', false);
	  				$("#sourceVideo").prop('disabled', false);
	  			
  				})
  				
  	/*************************************** END OF VIDEO********************************************/
  				
  				
  				$('#classSelectedQuiz').change(function(){
  					
  					var classname=$(this).find(":selected").val();
  					var selectedClass={
  							"className":classname,
  					};
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  				
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByClassName";
  				
  		        	
  					
  					$.ajax({
  					  	type: "POST",
  			        	contentType: "application/json",
  			       		 url: urlPassed,
  			       		 data: JSON.stringify(selectedClass),
  			       		 beforeSend: function(xhr) {
                         xhr.setRequestHeader(header, token);
  			       		 },
  			       		 dataType: 'json',
  			       		 cache: false,
  			        	 timeout: 600000,
  			       		 success: function (data){
  			       	    var html = '';
  			            var len = data.length;
  			            html += '<option value="0">Select Subject</option>';
  			            for (var i = 0; i < len; i++) {
  			             html += '<option value="' + data[i] + '">'
  			               + data[i]
  			               + '</option>';
  			            }
  			            html += '</option>';
  			            
  			            $("#subjectQuiz").prop('disabled', false);
  			            $('#subjectQuiz').html(html);
  			            
  						},
  						
  						error : function(err){
  							console.log("not working. ERROR: "+JSON.stringify(err));
  						}
  						
  						
  					});
  				
  					
  				});
  				
  			/* -----------------------------------------------------End of code ----------------- -------------------------------------*/	
  				
  		    /* ------------------------------------Start to fetch Topic name based on Class And Subject Selected -------------------------------------  */	
  				
  				
  				$('#subjectQuiz').change(function(){
  					
  					var subject=$(this).find(":selected").val();
  					var classname = $("#classSelectedQuiz").val();
  					var selectedClassAndSubject={
  							"subject":subject,
  							"className":classname,
  							
  					};
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  				
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByClassnameAndSubject";
  				
  		        	
  					
  					$.ajax({
  					  	type: "POST",
  			        	contentType: "application/json",
  			       		 url: urlPassed,
  			       		 data: JSON.stringify(selectedClassAndSubject),
  			       		 beforeSend: function(xhr) {
                         xhr.setRequestHeader(header, token);
  			       		 },
  			       		 dataType: 'json',
  			       		 cache: false,
  			        	 timeout: 600000,
  			       		 success: function (data){
  			       	    var html = '';
  			            var len = data.length;
  			            html += '<option value="0">Select Topic</option>';
  			            for (var i = 0; i < len; i++) {
  			             html += '<option value="' + data[i] + '">'
  			               + data[i]
  			               + '</option>';
  			            }
  			            html += '</option>';
  			            
  			           
  			            $('#topicQuiz').html(html);
  			            $("#topicQuiz").prop('disabled', false);
	  			     
  			            
  						},
  						
  						error : function(err){
  							console.log("not working. ERROR: "+JSON.stringify(err));
  						}
  						
  						
  					});
  					
  				 
  				  
  				});
  				
  				/*---------------------------------- End of fetching topic name based on classname and subject------------------------------ */
  				
  				
  				$('#topicQuiz').change(function(){
  					
  					$(".upload-submit").prop('disabled', false);
  					$("#QuestionQuiz").prop('disabled', false);
  					$("#remarksQuiz").prop('disabled', false);
  				  
  					
	  				$("#AnswerQuiz").prop('disabled', false);
	  			
  					
  				})
	
	
	
	//----------------------------------------------------VALIDATING EMAIL AGANIST DUPLICATE ENTRY-------------------------------------
	
			$('#validateEmailL').change(function(){
				
				var emailL=[];
				emailL[0]=$(this).val();
				
				$("#registerL").prop('disabled', true);
				$('#availableL').css({"display": "none"});
				$('#notAvailableL').css({"display": "none"});
				$('#invalidEmailL').css({"display": "none"});
				
				var token = $("meta[name='_csrf']").attr("content");
				var header = $("meta[name='_csrf_header']").attr("content");
				
				var urlPassed;
				
				
	        		urlPassed= projectPath+"validateEmail";
			
	        	
				
				if(emailL[0].length>0){
				if(validateEmail(emailL)){
				
				$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(emailL),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			 
			       			 if(data[0]=="TRUE"){
			       				 
			       				$('#notAvailableL').css({"display": "block"}); 
			       				
			       			 }else{
			       				 
			       				$('#availableL').css({"display": "block"});
			       				$("#registerL").prop('disabled', false);
			       			 }
					     
			            
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
						
					});
				}else{
					
					$('#invalidEmailL').css({"display": "block"});
				}
				
			}	
				
			})
			
			
			$('#validateEmailP').change(function(){
				
				var emailP=[];
				emailP[0]=$(this).val();
				
				$("#registerP").prop('disabled', true);
				$('#availableP').css({"display": "none"});
				$('#notAvailableP').css({"display": "none"});
				$('#invalidEmailP').css({"display": "none"});
				
				var token = $("meta[name='_csrf']").attr("content");
				var header = $("meta[name='_csrf_header']").attr("content");
				
				var urlPassed;
				
				
	        		urlPassed= projectPath+"validateEmail";
			
	        	
				
				if(emailP[0].length>0){
				if(validateEmail(emailP)){
				
				$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(emailP),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			 
			       			 if(data[0]=="TRUE"){
			       				 
			       				$('#notAvailableP').css({"display": "block"}); 
			       				
			       			 }else{
			       				 
			       				$('#availableP').css({"display": "block"});
			       				$("#registerP").prop('disabled', false);
			       			 }
					     
			            
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
						
					});
				}else{
					
					$('#invalidEmailP').css({"display": "block"});
					
				}
				}	
				
				
			})
			
			$('#validateEmailT').change(function(){
				
				var emailT=[];
				emailT[0]=$(this).val();
				
				$("#registerT").prop('disabled', true);
				$('#availableT').css({"display": "none"});
				$('#notAvailableT').css({"display": "none"});
				$('#invalidEmailT').css({"display": "none"});
				
				var token = $("meta[name='_csrf']").attr("content");
				var header = $("meta[name='_csrf_header']").attr("content");
				
				var urlPassed;
				
				
	        		urlPassed= projectPath+"validateEmail";
			
	        	
				
				if(emailT[0].length>0){
				if(validateEmail(emailT)){
				
				$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(emailT),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			 
			       			 if(data[0]=="TRUE"){
			       				 
			       				$('#notAvailableT').css({"display": "block"}); 
			       				
			       			 }else{
			       				 
			       				$('#availableT').css({"display": "block"});
			       				$("#registerT").prop('disabled', false);
			       			 }
					     
			            
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
						
					});
				
				}else{
					
					$('#invalidEmailT').css({"display": "block"});
				}
				
				}	
				
			})
			
	
	
	
	
	
	
	
	
	
	
	//------------------------------------------------------------------END-----------------------------------------------------------
	//------------------------------------------ HOMEPAGE SUBJECT AND CLASS LOGIC ---------------------------------------
				
			
			$('#inputClass').change(function(){
  					
  					var classname=$(this).find(":selected").val().substring(6);
  					var subjectName=$('#subjectHome').find(":selected").val()
  					var selectedClass={
  							"className":classname,
  					};
  					
  					if($('#subjectHome').find(":selected").val() === "Select Subject" || $('#subjectHome').find(":selected").val() === "0" ){
  					
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByClassNameHome";
  				
  		        	
  		
  				
  					$.ajax({
  					  	type: "POST",
  			        	contentType: "application/json",
  			       		 url: urlPassed,
  			       		 data: JSON.stringify(selectedClass),
  			       		 beforeSend: function(xhr) {
                         xhr.setRequestHeader(header, token);
  			       		 },
  			       		 dataType: 'json',
  			       		 cache: false,
  			        	 timeout: 600000,
  			       		 success: function (data){
  			       	    var html = '';
  			            var len = data.length;
  			            html += '<option value="Select Subject">Select Subject</option>';
  			            for (var i = 0; i < len; i++) {
  			             html += '<option value="' + data[i] + '">'
  			               + data[i]
  			               + '</option>';
  			            }
  			            html += '</option>';
  			            
  			           
  			            $('#subjectHome').html(html);
  			            
  						},
  						
  						error : function(err){
  							console.log("not working. ERROR: "+JSON.stringify(err));
  						}
  						
  						
  					});
  					
  					}else{
  	  					
  	  					
  	  					var token = $("meta[name='_csrf']").attr("content");
  	  					var header = $("meta[name='_csrf_header']").attr("content");
  	  					
  	  					var selectedSubjectTemp={
  							"subName":subjectName,
  							"className":classname,
  	  					};
  	  					
  	  					var urlPassedTemp;
  	  					
  	  					
  	  		        		urlPassedTemp= projectPath+"loadByTopicName";
  	  				
  	  		        	
  	  		
  	  				
  	  					$.ajax({
  	  					  	type: "GET",
  	  			        	contentType: "application/json",
  	  			       		 url: urlPassedTemp,
  	  			       		 data: selectedSubjectTemp,
  	  			       		 beforeSend: function(xhr) {
  	                         xhr.setRequestHeader(header, token);
  	  			       		 },
  	  			       		 dataType: 'json',
  	  			       		 cache: false,
  	  			        	 timeout: 600000,
  	  			       		 success: function (data){
  	  			       	    var html = '';
  	  			            var len = data.length;
  	  			            html += '<option value="Select Topic">Select Topic</option>';
  	  			            $.each(data , function( key, value ) {
	  	  			        html += '<option value=' + key + '>'
	  			               + value
	  			               + '</option>';
	  	  			        })
  	  			            html += '</option>';
  	  			            
  	  			           
  	  			            $('#topicSelected').html(html);
  	  			           
  	  						},
  	  						
  	  						error : function(err){
  	  							console.log("not working. ERROR: "+JSON.stringify(err));
  	  						}
  	  						
  	  						
  	  					});
  	  					
  	  					}
  				
  					
  				});
  				
  				
  				$('#subjectHome').change(function(){
  					
  					var subjectName=$(this).find(":selected").val();
  					var Classname=$('#inputClass').find(":selected").val().substring(6);
  					var selectedSubject={
  							"subName":subjectName,
  					};
  					
  					if($('#inputClass').find(":selected").val() === "Select Class" || $('#inputClass').find(":selected").val() === "0" ){
  					
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadBySubjectName";
  				
  		        	
  		
  				
  					$.ajax({
  					  	type: "POST",
  			        	contentType: "application/json",
  			       		 url: urlPassed,
  			       		 data: JSON.stringify(selectedSubject),
  			       		 beforeSend: function(xhr) {
                         xhr.setRequestHeader(header, token);
  			       		 },
  			       		 dataType: 'json',
  			       		 cache: false,
  			        	 timeout: 600000,
  			       		 success: function (data){
  			       	    var html = '';
  			            var len = data.length;
  			            html += '<option value="Select Class">Select Class</option>';
  			            for (var i = 0; i < len; i++) {
  			             html += '<option value="Class ' + data[i] + '">Class '
  			               + data[i]
  			               + '</option>';
  			            }
  			            html += '</option>';
  			            
  			           
  			            $('#inputClass').html(html);
  			            
  						},
  						
  						error : function(err){
  							console.log("not working. ERROR: "+JSON.stringify(err));
  						}
  						
  						
  					});
  					
  					}else{
  	  					
  	  					
  	  					var token = $("meta[name='_csrf']").attr("content");
  	  					var header = $("meta[name='_csrf_header']").attr("content");
  	  					
  	  					var selectedSubjectTemp={
  							"subName":subjectName,
  							"className":Classname,
  	  					};
  	  					
  	  					var urlPassedTemp;
  	  					
  	  					
  	  		        		urlPassedTemp= projectPath+"loadByTopicName";
  	  				
  	  		        	
  	  		
  	  				
  	  					$.ajax({
  	  					  	type: "GET",
  	  			        	contentType: "application/json",
  	  			       		 url: urlPassedTemp,
  	  			       		 data: selectedSubjectTemp,
  	  			       		 beforeSend: function(xhr) {
  	                         xhr.setRequestHeader(header, token);
  	  			       		 },
  	  			       		 dataType: 'json',
  	  			       		 cache: false,
  	  			        	 timeout: 600000,
  	  			       		 success: function (data){
  	  			       	    var html = '';
  	  			            var len = data.length;
  	  			            html += '<option value="Select Topic">Select Topic</option>';
  	  			            
	  	  			        $.each(data , function( key, value ) {
	  	  			        html += '<option value=' + key + '>'
	  			               + value
	  			               + '</option>';
	  	  			        })
  	  			          
  	  			            html += '</option>';
  	  			            
  	  			            $('#topicSelected').html(html);
  	  			           
  	  						},
  	  						
  	  						error : function(err){
  	  							console.log("not working. ERROR: "+JSON.stringify(err));
  	  						}
  	  						
  	  						
  	  					});
  	  					
  	  					}
  					
  				
  					
  				});
  				
  				
			
			
  		// ------------------------------------------------ADDING TOPIC TO VIEW-----------------------------------------------------
  				
  				$('#classSelected').change(function(){
  					
  					var classname=$(this).find(":selected").val();
  					var selectedClass={
  							"className":classname,
  					};
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByClassName";
  				
  		        	
  		
  				
  					$.ajax({
  					  	type: "POST",
  			        	contentType: "application/json",
  			       		 url: urlPassed,
  			       		 data: JSON.stringify(selectedClass),
  			       		 beforeSend: function(xhr) {
                         xhr.setRequestHeader(header, token);
  			       		 },
  			       		 dataType: 'json',
  			       		 cache: false,
  			        	 timeout: 600000,
  			       		 success: function (data){
  			       	    var html = '';
  			            var len = data.length;
  			            html += '<option value="0">Select Subject</option>';
  			            for (var i = 0; i < len; i++) {
  			             html += '<option value="' + data[i] + '">'
  			               + data[i]
  			               + '</option>';
  			            }
  			            html += '</option>';
  			            
  			            $("#subject").prop('disabled', false);
  			            $('#subject').html(html);
  			            
  						},
  						
  						error : function(err){
  							console.log("not working. ERROR: "+JSON.stringify(err));
  						}
  						
  						
  					});
  				
  					
  				});
  				
  			/* -----------------------------------------------------End of code ----------------- -------------------------------------*/	
  				
  		    /* ------------------------------------Start to fetch Topic name based on Class And Subject Selected -------------------------------------  */	
  				
  				
  				$('#subject').change(function(){
			
  					var subject=$(this).find(":selected").val();
  					var classname = $("#classSelected").val();
  					var selectedClassAndSubject={
  							"subject":subject,
  							"className":classname,
  							
  					};
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByClassnameAndSubject";
  				
  		        	
  				
  					$.ajax({
  					  	type: "POST",
  			        	contentType: "application/json",
  			       		 url: urlPassed,
  			       		 data: JSON.stringify(selectedClassAndSubject),
  			       		 beforeSend: function(xhr) {
                         xhr.setRequestHeader(header, token);
                         },
  			       		 dataType: 'json',
  			       		 cache: false,
  			        	 timeout: 600000,
  			       		 success: function (data){
  			       	    var html = '';
  			            var len = data.length;
  			            html += '<option value="0">Select Topic</option>';
  			            for (var i = 0; i < len; i++) {
  			             html += '<option value="' + data[i] + '">'
  			               + data[i]
  			               + '</option>';
  			            }
  			            html += '</option>';
  			            
  			            $("#subject").prop('disabled', false);
  			            $('#topic').html(html);
  			            $('#topicTutorial').html(html);
  			            
  			            $("#topic").prop('disabled', false);
  			            $("#topicTutorial").prop('disabled', false);
	  			      	$("#addtopic").prop('disabled', false);
	  				  	$("#descriptionTopic").prop('disabled', false);
	  					$("#posterTopic").prop('disabled', false);
	  					$("#upload-topic").prop('disabled', false);
  			            
  						},
  						
  						error : function(err){
  							console.log("not working. ERROR: "+JSON.stringify(err));
  						}
  						
  						
  					});
  					
  				 
  				  
  				});
  				
  				/*---------------------------------- End of fetching topic name based on classname and subject------------------------------ */
  				
  				
  				$('#topic').change(function(){
  					
  					
  				  	$("#description").prop('disabled', false);
  				  	$("#poster").prop('disabled', false);
  					$("#Question").prop('disabled', false);
  				  	$("#Answer").prop('disabled', false);
  				  	$("#url").prop('disabled', false);
	  				$("#source").prop('disabled', false);
	  				$("#lesson").prop('disabled', false);
	  				$("#phet").prop('disabled', false);
	  				$("#Answer").prop('disabled', false);
	  				$("#Answer").prop('disabled', false);
	  				$('.upload-submit').prop('disabled',false)
	  				$("#descriptionConceptMap").prop('disabled', false);
	  				$("#headlineConceptMap").prop('disabled', false);
	  				$("#conceptMapImage").prop('disabled', false);
	  				
	  				
	  				
  					
  				})
  				
  				
  				
  				
  				
  				$('#classSelectedUpload').change(function(){
  					
  					var classname=$(this).find(":selected").val();
  					var selectedClass={
  							"className":classname,
  					};
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					
  					var urlPassed;
  					
  		        		urlPassed= projectPath+"loadByClassName";
  				
  		        	
  		
  				
  					$.ajax({
  					  	type: "POST",
  			        	contentType: "application/json",
  			       		 url: urlPassed,
  			       		 data: JSON.stringify(selectedClass),
  			       		 beforeSend: function(xhr) {
                         xhr.setRequestHeader(header, token);
  			       		 },
  			       		 dataType: 'json',
  			       		 cache: false,
  			        	 timeout: 600000,
  			       		 success: function (data){
  			       	    var html = '';
  			            var len = data.length;
  			            html += '<option value="0">Select Subject</option>';
  			            for (var i = 0; i < len; i++) {
  			             html += '<option value="' + data[i] + '">'
  			               + data[i]
  			               + '</option>';
  			            }
  			            html += '</option>';
  			            
  			            $("#subjectUpload").prop('disabled', false);
  			            $('#subjectUpload').html(html);
  			            
  						},
  						
  						error : function(err){
  							console.log("not working. ERROR: "+JSON.stringify(err));
  						}
  						
  						
  					});
  				
  					
  				});
  				
  			/* -----------------------------------------------------End of code ----------------- -------------------------------------*/	
  				
  		    /* ------------------------------------Start to fetch Topic name based on Class And Subject Selected -------------------------------------  */	
  				
  				
  				$('#subjectUpload').change(function(){
			
  					var subject=$(this).find(":selected").val();
  					var classname = $("#classSelectedUpload").val();
  					var selectedClassAndSubject={
  							"subject":subject,
  							"className":classname,
  							
  					};
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByClassnameAndSubject";
  				
  		        	
  				
  					$.ajax({
  					  	type: "POST",
  			        	contentType: "application/json",
  			       		 url: urlPassed,
  			       		 data: JSON.stringify(selectedClassAndSubject),
  			       		 beforeSend: function(xhr) {
                         xhr.setRequestHeader(header, token);
                         },
  			       		 dataType: 'json',
  			       		 cache: false,
  			        	 timeout: 600000,
  			       		 success: function (data){
  			       	    var html = '';
  			            var len = data.length;
  			            html += '<option value="0">Select Topic</option>';
  			            for (var i = 0; i < len; i++) {
  			             html += '<option value="' + data[i] + '">'
  			               + data[i]
  			               + '</option>';
  			            }
  			            html += '</option>';
  			            
  			            $("#subjectUpload").prop('disabled', false);
  			            $('#topicUpload').html(html);
  			            
  			            
  			            $("#topicUpload").prop('disabled', false);

  			            
  						},
  						
  						error : function(err){
  							console.log("not working. ERROR: "+JSON.stringify(err));
  						}
  						
  						
  					});
  					
  				 
  				  
  				});
  				
  				/*---------------------------------- End of fetching topic name based on classname and subject------------------------------ */
  				
  				
  				$('#topicUpload').change(function(){
  					
  					
  				  	$("#descriptionUpload").prop('disabled', false);
  				  
	  				$("#sourceUpload").prop('disabled', false);
	  				
	  				$('.upload-submitUpload').prop('disabled',false)
	  				
	  				$("#videoFileUpload").prop('disabled', false);
	  				
	  				
  					
  				})
  				
  				
  				/* -----------------------------------radio button call to enable DELETE button -----------------------------*/
  				
  				$("input[name='radioSubject']").change(function(){
  					
  					$("#enableSubject").prop('disabled', true);
  					$("#disableSubject").prop('disabled', true);
  					
  					var subject_id=$(this).val();
  					
  					var selectedSubject={
  							"id":subject_id
  					};
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  					
  		        	urlPassed= projectPath+"loadByValiditySubject";
  				
  		        	
  					
  					$.ajax({
					  	type: "GET",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: selectedSubject,
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			 if(data){
			       				$("#disableSubject").prop('disabled', false);
			       			 }else{
			       				$("#enableSubject").prop('disabled', false);
			       			 }
			       			
			       			
			       			
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  					
  						
  				})
  				
  				
  				$("input[name='radiocall']").change(function(){
  					
  					$("#enableUser").prop('disabled', true);
  					$("#disableUser").prop('disabled', true);
  					
  					var user_id=$(this).val();
  					var selectedUser={
  							"id":user_id
  					};
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByValidity";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url:urlPassed,
			       		 data: JSON.stringify(selectedUser),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			 if(data[0]==1){
			       				$("#disableUser").prop('disabled', false);
			       			 }else{
			       				$("#enableUser").prop('disabled', false);
			       			 }
			       			
			       			
			       			
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  					
  						
  				})
  				
  				
  				
  				$("input[name='radioTopic']").change(function(){
  					
  					$("#enableTopic").prop('disabled', true);
  					$("#disableTopic").prop('disabled', true);
  					
  					var topic_id=$(this).val();
  					var selectedTopic={
  							"topicId":topic_id
  					};
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByValidityTopic";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(selectedTopic),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			 if(data[0]==1){
			       				$("#disableTopic").prop('disabled', false);
			       			 }else{
			       				$("#enableTopic").prop('disabled', false);
			       			 }
			       			
			       			
			       			
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  					
  						
  				})
  				
  					$("input[name='radioPhet']").change(function(){
  					
  					$("#enablePhet").prop('disabled', true);
  					$("#disablePhet").prop('disabled', true);
  					
  					var phet_id=$(this).val();
  					var selectedPhet={
  							"phetId":phet_id
  					};
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByValidityPhet";
  				
  		        	
  					
  					
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(selectedPhet),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			 if(data[0]==1){
			       				$("#disablePhet").prop('disabled', false);
			       			 }else{
			       				$("#enablePhet").prop('disabled', false);
			       			 }
			       			
			       			
			       			
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  					
  						
  				})
  				
  					$("input[name='radioLesson']").change(function(){
  					
  					$("#enableLesson").prop('disabled', true);
  					$("#disableLesson").prop('disabled', true);
  					
  					var lesson_id=$(this).val();
  					var selectedLesson={
  							"lessonPlanId":lesson_id
  					};
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByValidityLesson";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(selectedLesson),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			 if(data[0]==1){
			       				$("#disableLesson").prop('disabled', false);
			       			 }else{
			       				$("#enableLesson").prop('disabled', false);
			       			 }
			       			
			       			
			       			
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  					
  						
  				})
  				
  					$("input[name='radioDocument']").change(function(){
  					
  					$("#enableDocument").prop('disabled', true);
  					$("#disableDocument").prop('disabled', true);
  					
  					var document_id=$(this).val();
  					var selectedDocument={
  							"documentId":document_id
  					};
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByValidityDocument";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(selectedDocument),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			 if(data[0]==1){
			       				$("#disableDocument").prop('disabled', false);
			       			 }else{
			       				$("#enableDocument").prop('disabled', false);
			       			 }
			       			
			       			
			       			
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  					
  						
  				})
  				
  					$("input[name='radioArticle']").change(function(){
  					
  					$("#enableArticle").prop('disabled', true);
  					$("#disableArticle").prop('disabled', true);
  					
  					var article_id=$(this).val();
  					var selectedArticle={
  							"articleId":article_id
  					};
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  				
  		        		urlPassed= projectPath+"loadByValidityArticle";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(selectedArticle),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			 if(data[0]==1){
			       				$("#disableArticle").prop('disabled', false);
			       			 }else{
			       				$("#enableArticle").prop('disabled', false);
			       			 }
			       			
			       			
			       			
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  					
  						
  				})
  				
  					$("input[name='radioQuiz']").change(function(){
  					
  					$("#enableQuiz").prop('disabled', true);
  					$("#disableQuiz").prop('disabled', true);
  					
  					var quiz_id=$(this).val();
  					var selectedQuiz={
  							"quizQuestionId":quiz_id
  					};
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByValidityQuiz";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(selectedQuiz),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			 if(data[0]==1){
			       				$("#disableQuiz").prop('disabled', false);
			       			 }else{
			       				$("#enableQuiz").prop('disabled', false);
			       			 }
			       			
			       			
			       			
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  					
  						
  				})
  				
  					$("input[name='radioVideo']").change(function(){
  					
  					$("#enableVideo").prop('disabled', true);
  					$("#disableVideo").prop('disabled', true);
  					
  					var video_id=$(this).val();
  					var selectedVideo={
  							"videoId":video_id
  					};
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByValidityVideo";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(selectedVideo),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			 if(data[0]==1){
			       				$("#disableVideo").prop('disabled', false);
			       			 }else{
			       				$("#enableVideo").prop('disabled', false);
			       			 }
			       			
			       			
			       			
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  					
  						
  				})
  				
  					$("input[name='radioConcept']").change(function(){
  					
  					$("#enableConcept").prop('disabled', true);
  					$("#disableConcept").prop('disabled', true);
  					
  					var concept_id=$(this).val();
  					var selectedConcept={
  							"concepMapid":concept_id
  					};
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  				
  		        		urlPassed= projectPath+"loadByValidityConcept";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url:urlPassed,
			       		 data: JSON.stringify(selectedConcept),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			 if(data[0]==1){
			       				$("#disableConcept").prop('disabled', false);
			       			 }else{
			       				$("#enableConcept").prop('disabled', false);
			       			 }
			       			
			       			
			       			
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  					
  						
  				})
  				
  				
  				$("input[name='radioTutorial']").change(function(){
  					
  					$("#disableTutorial").prop('disabled', true);
  					$("#enableTutorial").prop('disabled', true);
  					
  					var tutorial_id=$(this).val();
  					var selectedTutorial={
  							"tutorialId":tutorial_id
  					};
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByValidityTutorial";
  				
  		        	
  					
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(selectedTutorial),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			 if(data[0]==1){
			       				$("#disableTutorial").prop('disabled', false);
			       			 }else{
			       				$("#enableTutorial").prop('disabled', false);
			       			 }
			       			
			       			
			       			
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  					
  						
  				})
  				
  				/*-----------------------------------------END--------------------------------------------------------------------------*/
  				
  				/*----------------------------------------------JQUERY TO ENABLE BUTTON ON RADIO CALL--------------------------------------------*/
  					$("input[name='selectionRadio']").change(function(){
  					
  						$("#deleteSubject").prop('disabled', false);
  						$("#deletePhet").prop('disabled', false);
  						$("#deleteVideo").prop('disabled', false);
  						$("#deleteArticle").prop('disabled', false);
  						$("#deleteDocument").prop('disabled', false);
  						$("#deleteLesson").prop('disabled', false);
  						$("#deleteTopic").prop('disabled', false);
  						$("#deleteQuiz").prop('disabled', false);
  						$("#deleteConcept").prop('disabled', false);
  					})
  				
  				
  				
  				
  				/*--------------------------------------------------END-------------------------------------------------------*/
  				
  				$(".detailUser").click(function(){
  					var user_id=$(this).attr('value');
  					
  					var userData={
							"id":user_id
					};
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByUser";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(userData),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			 
			       		
			       			 
			       			$('#FirstName').attr('value',data.fname);
		  					$('#LastName').attr('value',data.lname);
		  					$('#Email').attr('value',data.email);
		  					$('#Sex').attr('value',data.sex);
		  					$('#Dob').attr('value',data.dateOfBirth);
		  					$('#SchoolN').attr('value',data.schoolName);
		  					$('#SchoolA').attr('value',data.schoolAddress);
		  					$('#Pincode').attr('value',data.pincode);
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  					

  					
  					$('#LearnerModal').modal('show');
  				})
  				
  				
  		/*-----------------------------------------------START OF ZOOMING UP THE PHOTO---------------------------------------------------------	*/	
  				
  				$(".pop").on("click", function() {
  				   $('#imagepreview').attr('src', $(this).find('img').attr('src'));
  				   $('#imagepreview').attr('src', $(this).attr('src'));// here asign the image to the modal when the user click the enlarge link
  				   $('#imagemodal').modal('show'); // imagemodal is the id attribute assigned to the bootstrap modal, then i use the show function
  				   
  				});
  				
  		/*------------------------------------------------------------END------------------------------------------------------------------------*/	
  				
  		/*****************************************************START OF ZOOMING UP THE DOCUMENT*****************************************************/		
  				
  				$(".pdfclass").on("click", function() {
   				   $('#pdfpreview').attr('src', $(this).find('img').attr('src')); // here asign the image to the modal when the user click the enlarge link
   				   $('#pdfmodal').modal('show'); // imagemodal is the id attribute assigned to the bootstrap modal, then i use the show function
   				});
  		
  		/**************************************************************END*****************************************************************************/
  				
  			//-------------------------------------  Subject Details -----------------------------------------------------*/
  				
  				$(".detailSubject").click(function(){
  					var subject_id=$(this).attr('value');
  					
  					var selectedSubject={
							"subId":subject_id
					};
  					
  					$('.SubjectName').val("");
  					$('#updateSubject').prop('disabled',false);
  					$('#Success').css({"display": "none"}); 
	    			$('#Failure').css({"display": "none"});
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByClass";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(selectedSubject),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			 var html = '';
			       			 var len = data.length;
			       			 
			       			 for(var i=0;i<len;i++){
			       				 
			       				 html += '<input class="form-check-input checkboxSubject" type="checkbox" name="SelectedClasses" id="checkboxClass" style="opacity: unset;visibility: unset;" value="';
			       				 html += data[i] +'"/>';
			       				 html += '<label class="form-check-label" for="defaultCheck1">'+data[i]+'</label><br/>' ;
			       				
			       			 }
			       			$('#modalClass').html(html);
			       		
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  					
  					
  					
  					
  					
  		        		urlPassed= projectPath+"loadBySubject";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(selectedSubject),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			 var html = '';
			       			 var len = data.length;
			       			 
			       			

			       			$('.SubjectName').val(data["subName"]);
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
							
						}
						
					});
  					
  					
  					
  		        		urlPassed= projectPath+"loadBySubjectClass";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(selectedSubject),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			 var html = '';
			       			 var len = data.length;
			       			
			       			 for(var i=0;i<len;i++){
			       				 
			       				
			       				$('#modalClass [type=checkbox]').each(function() {
			       				   if($(this).val()==data[i]){
			       					$(this).prop('disabled', true);
			       					$(this).prop('checked', true);
			       					}
			       				});
			       				
			       			 }
			       			
			       			
						  
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
							
						}
						
					});
  					
  					
  					
  				//	$('#FirstName').attr('value','Om Prakash');
  			
  				
  					$('#updateSubject').prop('value',subject_id);
  					$('#SubjectModal').modal('show');
  				})
  				
  				

  			// ---------------------------------END ------------------------------------------------------------	
  				
  			// ----------------------------------Update Subject from Modal------------------------------------	
  				
  				
  				$("#updateSubject").click(function(){
  					
  					var dataSubject=[];
  					var i=0;
  					
  					$('#updateSubject').prop('disabled',false);
  					
  					$('#modalClass [type=checkbox]').each(function() {
	       				   if($(this).is(':checked') && $(this).is(':enabled')){
	       					dataSubject[i++]=$(this).val();
	       					}
	       				});
  					
  					dataSubject[i++]=$(this).val();
  					dataSubject[i]=$('.SubjectName').val();
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"updateSubject";
  				
  		        	
  			
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(dataSubject),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data1){
			       			 
			       			 $('#Success').css({"display": "none"}); 
			    			 $('#Failure').css({"display": "none"});
			    			
			    			 if(data1[0]==="Success"){
			    				 $('#Success').css({"display": "block"});
			    				 $('#updateSubject').prop('disabled',true);
			    				 
			    			 }else if(data1[0]==="failure"){
			    				 $('#Failure').css({"display": "block"});
			    				 $('#updateSubject').prop('disabled',true);
			    				 
			    			 }
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
  					});
  					
				
  					
  					
  				})
  				
  			// ---------------------------END OF UPDATE SUBJECT CALL ----------------------------------	
  				
  				
  				
  				
  // 		------------------------------- START OF DETAILS OF TOPIC ---------------------------------------
  				
  				$(".detailTopic").click(function(){
  					var topic_id=$(this).attr('value');
  					
  					var selectedTopic={
							"topicId":topic_id
					};
  					
  					 $('#Success').css({"display": "none"}); 
  					 $('#invalid-data').css({"display": "none"}); 
  					 $('#Failure').css({"display": "none"});
  					 $("#updateTopic").prop('disabled', false);
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByTopic";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(selectedTopic),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			
			       			$('#topicName').val(data[0]);
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  					
  				
  					
  					
  		        		urlPassed= projectPath+"loadByTopicDesc";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(selectedTopic),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			
			       			$('#topicDesc').val(data[0]);
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  	
  					$('#updateTopic').prop('value',topic_id);
  					$('#TopicId').prop('value',topic_id);
  					$('#TopicModal').modal('show');
  				});
  			
  		//-----------------------------------------------------END-----------------------------------------------------------------	
  				
  		// --------------------------------- START OF UPDATE PART OF TOPIC------------------------------------------------------------
  					
  					$('#topicName').change(function(){
  						$("#updateTopic").prop('disabled', false);
  					});
  				
  					$('#topicDesc').change(function(){
					 	$("#updateTopic").prop('disabled', false);
					});

  					$('#posterQ').change(function(){
  					 	$("#updateTopic").prop('disabled', false);
  					});
  				
  					
  				
  					$('#updateTopic').click(function(){
  						
  						 event.preventDefault();
  						 

  						fire_ajax_submit_Topic(); 
  					});
  				
  			
  					
  					
  			
  		// ----------------------------------------------------END-------------------------------------------------------------------
  				
  		// ---------------------------------------------START OF CALLING MODAL FROM QUIZ MODULE-----------------------------------------------
  				
  				
  				$(".detailQuiz").click(function(){
  					var quiz_id=$(this).attr('value');
  					
  					var selectedQuiz={
							"quizQuestionId":quiz_id
					};
  					
  					 $('#SuccessQuiz').css({"display": "none"}); 
					 $('#invalid-dataQuiz').css({"display": "none"}); 
					 $('#FailureQuiz').css({"display": "none"});
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByQuizQuestionID";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(selectedQuiz),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			
			       			$('#remark').val(data[0]);
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  					
 
  	
  					$('#quizId').prop('value',quiz_id);
  					$('#QuizModal').modal('show');
  				})
  				
  			/* -------------------------------------------------END---------------------------------------------------------------------- */
  				
  			/* ---------------------------------------START OF UPDATING QUIZ DATA--------------------------------------------------*/
  				
  					$('#question').change(function(){
  						
  					
  							$("#updateQuiz").prop('disabled', false);
  						
  					 	
  					})
  				
  					
  					$('#answer').change(function(){
  						
  							$("#updateQuiz").prop('disabled', false);
  					
  					})
  				
  					$('#updateQuiz').click(function(){
  						
  						 event.preventDefault();
  						

  						 fire_ajax_submit_Quiz(); 
  					});
  				
//  					$('#updateQuizOnUser').click(function(){
//						
//						 event.preventDefault();
//						
//
//						 fire_ajax_submit_QuizOnUser(); 
//					});
  				
  				
  			/*--------------------------------------------------END--------------------------------------------------------------------------------*/
  				
  				
  			// ------------------------------------------------START TO CALL MODAL FROM VIDEO MODULE ---------------------------------------			$(".detailvideo").click(function(){
  					
  					$(".detailVideo").click(function(){
  					var video_id=$(this).attr('value');
  					
  					var selectedVideo={
							"videoId":video_id
					};
  					
  					 $('#SuccessVideo').css({"display": "none"}); 
					 $('#invalid-dataVideo').css({"display": "none"}); 
					 $('#FailureVideo').css({"display": "none"});
					 $('#SuccessVideoUpload').css({"display": "none"}); 
					 $('#invalid-dataVideoUpload').css({"display": "none"}); 
					 $('#FailureVideoUpload').css({"display": "none"});
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  				
  		        		urlPassed= projectPath+"loadByVideoID";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(selectedVideo),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			
			       			if(data[1]=="Upload"){
			       				$('#videoDescUpload').val(data[0]);
			       			}else{
			       				$('#videoDesc').val(data[0]);
			       			}
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  					
  					
  	
  					
  		        		urlPassed= projectPath+"loadByVideoIDSource";
  				
  		        	
  					
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(selectedVideo),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			 
			       			if(data[1]=="Upload"){
			       				$('#videosourceUpload').val(data[0]);
			       			}else{
			       				$('#videosource').val(data[0]);
			       			}
			       			
			       			
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  					
  					
  					
  		        		urlPassed= projectPath+"loadByVideoIDUrl";
  				
  		        	
  					
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(selectedVideo),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			

				       			if(data[0].match("^Media")){
				       				
				       				$('.videoId').prop('value',video_id);
				  					$('#VideoModalUpload').modal('show');
				       				
				       			}else{
				       				
				       				$('.videoId').prop('value',video_id);
				  					$('#VideoModal').modal('show');
				       				
				       			}
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
 
  	
  					
  				})
  				
  				
  			/* -------------------------------------------------------------END-----------------------------------------------------------*/
  				
  			/* --------------------------------------------START OF UPDATING VIDEO--------------------------------------------------------*/
  				

  				
  					$('#updateVideo').click(function(){
  						
  						 event.preventDefault();
  						

  						 fire_ajax_submit_Video(); 
  					});
  					
  					$('#updateVideoUpload').click(function(){
  						
 						 event.preventDefault();
 						

 						 fire_ajax_submit_VideoUpload(); 
 					});
  					
//  					$('#updateVideoOnUser').click(function(){
//  						
// 						 event.preventDefault();
// 						
//
// 						 fire_ajax_submit_VideoOnUser(); 
// 					});
  			/*----------------------------------------------------------------END-------------------------------------------------------------*/
  			 /*----------------------------------------- CALLING MODAL FOR CONCEPT-MAPS -----------------------------------------*/
  					
  					$(".detailConcept").click(function(){
  	  					var concept_id=$(this).attr('value');
  	  					
  	  					var selectedConcept={
  								"concepMapid":concept_id
  						};
  	  					
  	  					$('#SuccessConcept').css({"display": "none"}); 
						 $('#invalid-dataConcept').css({"display": "none"}); 
						 $('#FailureConcept').css({"display": "none"});
  	  					
  	  					var token = $("meta[name='_csrf']").attr("content");
  	  					var header = $("meta[name='_csrf_header']").attr("content");
  	  					
  	  					var urlPassed;
  					
  	  					
  		        		urlPassed= projectPath+"loadByConceptID";
  				
  	  					
  	  					
  	  					$.ajax({
  						  	type: "POST",
  				        	contentType: "application/json",
  				       		 url: urlPassed,
  				       		 data: JSON.stringify(selectedConcept),
  				       		 beforeSend: function(xhr) {
  		                         xhr.setRequestHeader(header, token);
  				       		 },
  				       		 dataType: 'json',
  				       		 cache: false,
  				        	 timeout: 600000,
  				       		 success: function (data){
  				       			
  				       			$('#conceptDesc').val(data[0]);
  				       			$('#conceptHeadline').val(data[1]);
  				       		
  							},
  							
  							error : function(err){
  								console.log("not working. ERROR: "+JSON.stringify(err));
  							}
  							
  						});
  	  	
  	  	
  	  					$('#conceptId').prop('value',concept_id);
  	  					$('#ConceptMapModal').modal('show');
  	  				})
  	  				
  	  				
  	  			/* -------------------------------------------------------------END-----------------------------------------------------------*/
  	  				
  	  			/* --------------------------------------------START OF UPDATING CONCEPT--------------------------------------------------------*/
  	  					/*$('#conceptDesc').change(function(){
  					
  	  						$('#updateConcept').prop('disabled',false);
//  	  						$('#updateConceptOnUser').prop('disabled',false);
  	  					})
  	  				
  	  					$('#conceptImage').change(function(){
  					
  	  						$('#updateConcept').prop('disabled',false);
//  	  						$('#updateConceptOnUser').prop('disabled',false);
  	  					})*/
  	  				

  	  				
  	  					$('#updateConcept').click(function(){
  	  						
  	  						 event.preventDefault();
  	  						

  	  						 fire_ajax_submit_Concept(); 
  	  					});
  	  					
//  	  					$('#updateConceptOnUser').click(function(){
//  	  						
//  	 						 event.preventDefault();
//  	 						
//
//  	 						 fire_ajax_submit_ConceptOnUser(); 
//  	 					});
  	  			/*----------------------------------------------------------------END-------------------------------------------------------------*/
  				
  				
  			// ---------------------------------------------------START TO CALL MODAL FROM ARTICLE MOPDULE----------------------------------
  	
  					$(".detailArticle").click(function(){
  					var article_id=$(this).attr('value');
  					
  					var selectedArticle={
							"articleId":article_id
					};
  					
  					 $('#SuccessArticle').css({"display": "none"}); 
					 $('#invalid-dataArticle').css({"display": "none"}); 
					 $('#FailureArticle').css({"display": "none"});
					 $('#articleurl').val("");
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  				
  		        		urlPassed= projectPath+"loadByArtcileID";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url:urlPassed,
			       		 data: JSON.stringify(selectedArticle),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			
			       			$('#articlesource').val(data[0]);
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  					
  					
  			
  					
  				
  		        		urlPassed= projectPath+"loadByArtcileIDDesc";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(selectedArticle),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			
			       			$('#articleDesc').val(data[0]);
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
 
  					
  					$('#artcileId').prop('value',article_id);
  					$('#ArticleModal').modal('show');
  				})
  				
  			/*---------------------------------------------------------------END-------------------------------------------------------------*/	
  			
  				
  			/* --------------------------------------------START OF UPDATING ARTICLE--------------------------------------------------------*/
  				
  					$('#updateArticle').click(function(){
  						
  						 event.preventDefault();
  						

  						 fire_ajax_submit_Article(); 
  					});
  					
//  					$('#updateArticleOnUser').click(function(){
//  						
// 						 event.preventDefault();
// 						
//
// 						 fire_ajax_submit_ArticleOnUser(); 
// 					});
  					
  					
  			/*----------------------------------------------------------------END-------------------------------------------------------------*/
  				
  					
  					
  			// ------------------------------------------------------STRAT TO CALL MODAL FROM DOCUMENT MODULE---------------------------------		
  	
  					$(".detailDocument").click(function(){
  					var document_id=$(this).attr('value');
  					
  					var selectedDocument={
							"documentId":document_id
					};
  					
  					$('#SuccessDocument').css({"display": "none"}); 
					 $('#invalid-dataDocument').css({"display": "none"}); 
					 $('#FailureDocument').css({"display": "none"});
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  				
  		        	urlPassed= projectPath+"loadByDocumentID";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(selectedDocument),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			
			       			$('#documentsource').val(data[0]);
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  					
  					
  				
  		        		urlPassed= projectPath+"loadByDocumentIDDesc";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(selectedDocument),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			
			       			$('#documentDesc').val(data[0]);
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
 
  	
  					$('#documentId').prop('value',document_id);
  					$('#DocumentModal').modal('show');
  				})
  						
  			/* ---------------------------------------------------------END--------------------------------------------------------------*/
  				
  				
  			/* --------------------------------------------START OF UPDATING DOCUMENT--------------------------------------------------------*/
  				/*$('#documentDesc').change(function(){
  					
  					$('#updateDocument').prop('disabled',false);
  				})
  				
  				$('#documentFile').change(function(){
  					
  					$('#updateDocument').prop('disabled',false);
  				})*/
  					
 
  				
  				
  				$('#updateDocument').click(function(){
  						
  						 event.preventDefault();
  						

  						 fire_ajax_submit_Document(); 
  					});
  					
  					
//  				$('#updateDocumentOnUser').click(function(){
//  						
// 						 event.preventDefault();
// 						
//
// 						 fire_ajax_submit_DocumentOnUser(); 
// 					});
  			/*----------------------------------------------------------------END-------------------------------------------------------------*/
  			
  			/*------------------------------------------------ START TO CALL MODAL FROM LESSON PLAN--------------------------------------------*/
  					$(".detailLesson").click(function(){
  	  					var lesson_id=$(this).attr('value');
  	  					
  	  					
  	  					$('#lessonId').prop('value',lesson_id);
  	  					$('#LessonPlanModal').modal('show');
  	  				})
  				
  				
  			/*------------------------------------------------------------END-------------------------------------------------------------------*
  				
  		    /*-----------------------------------------------START OF UPDATE LESSON PLAN FROM MODAL---------------------------------------------*/
  	  				
  	  					$('#updateLesson').click(function(){
  						
  						 event.preventDefault();
  						

  						 fire_ajax_submit_Lesson(); 
  					});
  					
//  						$('#updateLessonOnUser').click(function(){
//  						
// 						 event.preventDefault();
// 						
//
// 						 fire_ajax_submit_LessonOnUser(); 
// 					});
 	  				
  	  				
  	  				
  	  		/*----------------------------------------------------------END-----------------------------------------------------------------------*/
  					
  					
  			// --------------------------------------------------START TO CALL MODAL FROM PHETS MODULE-------------------------------------
  				
  					$(".detailPhets").click(function(){
  					var phet_id=$(this).attr('value');
  					
  					var selectedPhet={
							"phetId":phet_id
					};
  					
  					 $('#SuccessPhet').css({"display": "none"}); 
					 $('#invalid-dataPhet').css({"display": "none"}); 
					 $('#FailurePhet').css({"display": "none"});
					 $('#phetUrl').val("");
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  				
  		        		urlPassed= projectPath+"loadByphetID";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(selectedPhet),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			
			       			$('#phetsource').val(data[0]);
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  					
  					
  					
  					
  			
  		        		urlPassed= projectPath+"loadByphetIDDesc";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url:urlPassed,
			       		 data: JSON.stringify(selectedPhet),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			
			       			$('#phetDesc').val(data[0]);
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
 
  	
  					$('#phetId').prop('value',phet_id);
  					$('#PhetModal').modal('show');
  				})
  				
  		/*-----------------------------------------------END-----------------------------------------------------------------*/
  				
  		/* --------------------------------------------START OF UPDATING PHETS--------------------------------------------------------*/
  				
					$('#updatePhet').click(function(){
						
						 event.preventDefault();
						

						 fire_ajax_submit_Phet(); 
					});
  					
  					
//  					$('#updatePhetOnUser').click(function(){
//						
//						 event.preventDefault();
//						
//
//						 fire_ajax_submit_PhetOnUser(); 
//					});
  					
		/*----------------------------------------------------------------END-------------------------------------------------------------*/
			
  		/*****************************START OF COMMENT SECTION*******************************************************************************/
  					
  					
  					
  					
  			/************************************************VIDEO APPROVE/REJECT SECTION COMMENT SECTION***********************************************/
  					
  					
  					
  				$('.commentVideo').click(function(){
  					
  					
  					var Id=$(this).attr('value');
  					
  					var videoID={
  						"videoId":Id	
  					};
  					
  					var html='';
  					$('#videoComment').val('');
  					$('#SuccessVideoComment').css({"display": "none"}); 
	    			$('#FailureVideoComment').css({"display": "none"});
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByVideoComment";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
					  	
			        	contentType: "application/json",
			       		 url:urlPassed,
			       		 data: JSON.stringify(videoID),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			
			       			 
			       			 
			       			 var len=data.length;
			       			 for(var i=0;i<len;i++){
			       			 
					       			 html+='<div class="card"> <div class="card-body"> <div class="row"> <div class="col-md-2">';
					       			 html+='<img src="'+projectPath+'Images/def_face.jpg" class="img img-rounded img-fluid"/> ';
					       			 //html+= data[i].dateReceived;
					       			 html+= '</div> <div class="col-md-10"> <p><strong>';
					       			 html+= data[i].userName;
					       			 html+= '</strong><span class="float-right" style="color:green">';
					       			 html+=data[i].dateReceived;
					       			 html+='</span></p> <div class="clearfix"></div> <p>';
					       			 html+= data[i].comment;
					       			 html+= '</p>';
					       			 html+= '<div class="reply" id='+data[i].comId+'><a href="javascript:void(0)" onclick="reply(this)" com-id=';
					       			 html+= data[i].comId;
					       			 html+= '>Reply</a></div></div></div>';
					       	
					       			 
					       		
					       			 
					       			 var jsonReply={
					       					 "commentid":data[i].comId
					       			 };
					       			 
					       		
									
						        		urlPassed= projectPath+"loadReplyOnComment";
								
						        	
					       			 
					       			
					       			$.ajax({
					       				
									  	type: "POST",
									  	async:false,
							        	contentType: "application/json",
							       		 url: urlPassed,
							       		 data: JSON.stringify(jsonReply),
							       		 beforeSend: function(xhr) {
					                         xhr.setRequestHeader(header, token);
							       		 },
							       		 dataType: 'json',
							       		 cache: false,
							        	 timeout: 600000,
							       		 success: function (dataReply){
							       			 
							       			 var lengthReply=dataReply.length;
							       			 
							       			 for(var j=0;j<lengthReply;j++){
							       				        				 
							       				 
							       				 
							       				 
							       				 html+='<div class="card card-inner"> <div class="card-body"> <div class="row"><div class="col-md-2">';
							       				 html+='<img src="'+projectPath+'Images/def_face.jpg" class="img img-rounded img-fluid"/>';
							       				// html+= dataReply[j].dateReceived;
							       				 html+= '</p></div><div class="col-md-10"> <p><strong>';
							       				 html+= dataReply[j].userName;
							       				 html+= '</strong><span class="float-right" style="color:green">';
							       				 html+=data[i].dateReceived;
							       				 html+='</span></p> <div class="clearfix"></div> <p>';
								       			 html+= dataReply[j].comment;
								       			 html+= '</p></div></div></div></div>';
								       			 
							       				 
				
							       			 }
							       			 
							       		 },
							       		 error : function(err){
											console.log("not working. ERROR: "+JSON.stringify(err));
							       		 }
							       		 
					       			});
					       			
					       			
					       			html+='</div></div></div></div><br/>';
					       		
					       
					       		
					       			 
			       			 }
			       			 
			       		
		       			 
		       			$('#comDataVideo').html(html);
		       				
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  					
  					
  					$('#videoId').prop('value',Id);
  					$('#VideoCommentModal').modal('show');
  					
  					
  					
  					
  					
  					
  				})	
  				
  				
  				
  				$('#videoComment').change(function(){
  					
  					
  					$('.commentVideoModal').prop('disabled',false);
  					
  				})
  				
  				
  				
  				$('.commentVideoModal,.commentVideoModalReply').click(function(){
  					
  					var data;
	
  					if($(this).prop('name')=="reply"){
  						
  						if($('#videoFrom').val()=="admin"){
  						
  						 data={
  								"id":$(this).prop('id'),
  								"comment":$('#replyCommentVideo').val(),
  								"reply":true,
  								"admin":true
  						};
  						 
  						}else{
  							
  							 data={
  	  								"id":$(this).prop('id'),
  	  								"comment":$('#replyCommentVideo').val(),
  	  								"reply":true,
  	  								"admin":false
  	  						};
  							
  							
  						}
  						
  					}else{
  						
  						if($('#videoFrom').val()=="admin"){
  						
  							data={
  								"id":$('#videoId').val(),
  								"comment":$('#videoComment').val(),
  								"reply":false,
  								"admin":true
  							};
  						}else{
  							
  							data={
  	  								"id":$('#videoId').val(),
  	  								"comment":$('#videoComment').val(),
  	  								"reply":false,
  	  								"admin":false
  	  							};
  							
  							
  						}
  						
  					}
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"uploadCommentOnVideo";
  				
  		        	
  					
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(data),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data1){
			       			 
			       			 $('#SuccessVideoComment').css({"display": "none"}); 
			    			 $('#FailureVideoComment').css({"display": "none"});
			    			
			    			 if(data1[0]==="Success"){
			    				 $('#SuccessVideoComment').css({"display": "block"});
			    				 $('#videoComment').val('');
			    				 $('.commentVideoModal').prop('disabled',true);
			    				 $('.replyRowVideo').hide();
			    				 $('#replyCommentVideo').val('');
			    			 }else if(data1[0]==="failure"){
			    				 $('#FailureVideoComment').css({"display": "block"});
			    				 $('#videoComment').val('');
			    				 $('.commentVideoModal').prop('disabled',true);
			    				 $('.replyRowVideo').hide();
			    				 $('#replyCommentVideo').val('');
			    			 }
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
  					});
  					
  				
  					
  				})
  					
  					
  				
  				/************************************************ARTICLE APPROVE/REJECT SECTION COMMENT SECTION***********************************************/
  					
  					
  				
  				$('.commentArticle').click(function(){
  					
  					var  Id=$(this).attr('value');
  					
  					var articleComment={
  						"articleId":Id	
  					};
  					
  					var html='';
  					$('#articleComment').val('');
  					$('#SuccessArticleComment').css({"display": "none"}); 
	    			$('#FailureArticleComment').css({"display": "none"});
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByArticleComment";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
					  	
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(articleComment),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			
			       			 
			       			 
			       			 var len=data.length;
			       			 for(var i=0;i<len;i++){
			       			 
					       			 html+='<div class="card"> <div class="card-body"> <div class="row"> <div class="col-md-2">';
					       			 html+='<img src="'+projectPath+'Images/def_face.jpg" class="img img-rounded img-fluid"/> <p class="text-secondary text-center">';
					       			 html+= data[i].dateReceived;
					       			 html+= '</p></div> <div class="col-md-10"> <p><strong>';
					       			 html+= data[i].userName;
					       			 html+= '</strong></p> <div class="clearfix"></div> <p>';
					       			 html+= data[i].comment;
					       			 html+= '</p>';
					       			 html+= '<div class="reply" id='+data[i].comId+'><a href="javascript:void(0)" onclick="replyArticle(this)" com-id=';
					       			 html+= data[i].comId;
					       			 html+= '>Reply</a></div></div></div>';
					       	
					       			 
					       		
					       			 
					       			 var jsonReply={
					       					 "commentid":data[i].comId
					       			 };
					       			 
					       		
									
									
						        		urlPassed= projectPath+"loadReplyOnComment";
								
						        	
					       			
					       			$.ajax({
					       				
									  	type: "POST",
									  	async:false,
							        	contentType: "application/json",
							       		 url: urlPassed,
							       		 data: JSON.stringify(jsonReply),
							       		 beforeSend: function(xhr) {
					                         xhr.setRequestHeader(header, token);
							       		 },
							       		 dataType: 'json',
							       		 cache: false,
							        	 timeout: 600000,
							       		 success: function (dataReply){
							       			 
							       			 var lengthReply=dataReply.length;
							       			 
							       			 for(var j=0;j<lengthReply;j++){
							       				        				 
							       				 
							       				 
							       				 alert('here');
							       				 html+='<div class="card card-inner"> <div class="card-body"> <div class="row"><div class="col-md-2">';
							       				 html+='<img src="'+projectPath+'Images/def_face.jpg" class="img img-rounded img-fluid"/> <p class="text-secondary text-center">';
							       				 html+= dataReply[j].dateReceived;
							       				 html+= '</p></div><div class="col-md-10"> <p><strong>';
							       				 html+= dataReply[j].userName;
							       				 html+= '</strong></p> <div class="clearfix"></div> <p>';
								       			 html+= dataReply[j].comment;
								       			 html+= '</p></div></div></div></div>';
								       			 
							       				 
				
							       			 }
							       			 
							       		 },
							       		 error : function(err){
											console.log("not working. ERROR: "+JSON.stringify(err));
							       		 }
							       		 
					       			});
					       			
					       			
					       			html+='</div></div></div></div><br/>';
					       		
					       
					       		
					       			 
			       			 }
			       			 
			       		
		       			 
		       			$('#comDataArticle').html(html);
		       				
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  					
  					
  					
  					
  					$('#articleId').prop('value',Id);
  					$('#ArticleCommentModal').modal('show');
  					
  					
  					
  					
  					
  					
  				})	
  				
  				
  				
  				$('#articleComment').change(function(){
  					
  					
  					$('.commentArticleModal').prop('disabled',false);
  					
  				})
  				
  				
  				
  				$('.commentArticleModal,.commentArticleModalReply').click(function(){
  					
  					var data;
  					
  					if($(this).prop('name')=="reply"){
  						
  						if($('#articleFrom').val()=="admin"){
  						
  						 data={
  								"id":$(this).prop('id'),
  								"comment":$('#replyCommentArticle').val(),
  								"reply":true,
  								"admin":true
  						};
  						}else{
  							
  							 data={
  	  								"id":$(this).prop('id'),
  	  								"comment":$('#replyCommentArticle').val(),
  	  								"reply":true,
  	  								"admin":false
  	  						};
  							
  							
  						}
  						
  					}else{
  						
  						if($('#articleFrom').val()=="admin"){
  						
  							data={
  								"id":$('#articleId').val(),
  								"comment":$('#articleComment').val(),
  								"reply":false,
  								"admin":true
  							};
  							
  						}else{
  							
  							data={
  	  								"id":$('#articleId').val(),
  	  								"comment":$('#articleComment').val(),
  	  								"reply":false,
  	  								"admin":false
  	  							};
  							
  						}
  					}
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  				
  		        		urlPassed= projectPath+"uploadCommentOnArticle";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(data),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data1){
			       			 
			       			 $('#SuccessArticleComment').css({"display": "none"}); 
			    			 $('#FailureArticleComment').css({"display": "none"});
			    			
			    			 if(data1[0]==="Success"){
			    				 $('#SuccessArticleComment').css({"display": "block"});
			    				 $('#articleComment').val('');
			    				 $('.commentArticleModal').prop('disabled',true);
			    				 $('.replyRowArticle').hide();
			    				 $('#replyCommentArticle').val('');
			    			 }else if(data1[0]==="failure"){
			    				 $('#FailureArticleComment').css({"display": "block"});
			    				 $('#articleComment').val('');
			    				 $('.commentArticleModal').prop('disabled',true);
			    				 $('.replyRowArticle').hide();
			    				 $('#replyCommentArticle').val('');
			    			 }
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
  					});
  					
  				
  					
  				})
  					
  			
  				/************************************************DOCUMENT APPROVE/REJECT SECTION COMMENT SECTION***********************************************/
  					
  				
  				$('.commentDocument').click(function(){
  					
  					var Id=$(this).attr('value');
  					
  					var documentComment={
  						"documentId":Id	
  					};
  					
  					var html='';
  					$('#documentComment').val('');
  					$('#SuccessDocumentComment').css({"display": "none"}); 
	    			$('#FailureDocumentComment').css({"display": "none"});
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  				
  		        		urlPassed= projectPath+"loadByDocumentComment";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
					  	
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(documentComment),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			
			       			 
			       			 
			       			 var len=data.length;
			       			 for(var i=0;i<len;i++){
			       			 
					       			 html+='<div class="card"> <div class="card-body"> <div class="row"> <div class="col-md-2">';
					       			 html+='<img src="'+projectPath+'Images/def_face.jpg" class="img img-rounded img-fluid"/> <p class="text-secondary text-center">';
					       			 html+= data[i].dateReceived;
					       			 html+= '</p></div> <div class="col-md-10"> <p><strong>';
					       			 html+= data[i].userName;
					       			 html+= '</strong></p> <div class="clearfix"></div> <p>';
					       			 html+= data[i].comment;
					       			 html+= '</p>';
					       			 html+= '<div class="reply" id='+data[i].comId+'><a href="javascript:void(0)" onclick="replyDocument(this)" com-id=';
					       			 html+= data[i].comId;
					       			 html+= '>Reply</a></div></div></div>';
					       		
					       			 
					       		
					       			 
					       			 var jsonReply={
					       					 "commentid":data[i].comId
					       			 };
					       			 
					       			
									
								
						        		urlPassed= projectPath+"loadReplyOnComment";
								
						        	
					       			
					       			$.ajax({
					       				
									  	type: "POST",
									  	async:false,
							        	contentType: "application/json",
							       		 url: urlPassed,
							       		 data: JSON.stringify(jsonReply),
							       		 beforeSend: function(xhr) {
					                         xhr.setRequestHeader(header, token);
							       		 },
							       		 dataType: 'json',
							       		 cache: false,
							        	 timeout: 600000,
							       		 success: function (dataReply){
							       			 
							       			 var lengthReply=dataReply.length;
							       			 
							       			 for(var j=0;j<lengthReply;j++){
							       				        				 
							       				 
							       				 
							       				 
							       				 html+='<div class="card card-inner"> <div class="card-body"> <div class="row"><div class="col-md-2">';
							       				 html+='<img src="'+projectPath+'Images/def_face.jpg" class="img img-rounded img-fluid"/> <p class="text-secondary text-center">';
							       				 html+= dataReply[j].dateReceived;
							       				 html+= '</p></div><div class="col-md-10"> <p><strong>';
							       				 html+= dataReply[j].userName;
							       				 html+= '</strong></p> <div class="clearfix"></div> <p>';
								       			 html+= dataReply[j].comment;
								       			 html+= '</p></div></div></div></div>';
								       			 
							       				 
				
							       			 }
							       			 
							       		 },
							       		 error : function(err){
											console.log("not working. ERROR: "+JSON.stringify(err));
							       		 }
							       		 
					       			});
					       			
					       			
					       			html+='</div></div></div></div><br/>';
					       		
					       
					       		
					       			 
			       			 }
			       			 
			       		
		       			 
		       			$('#comDataDocument').html(html);
		       				
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  					
  					
  					
  					
  					
  					$('#documentId').prop('value',Id);
  					$('#DocumentCommentModal').modal('show');
  					
  					
  					
  					
  					
  					
  				})	
  				
  				
  				
  				$('#documentComment').change(function(){
  					
  					
  					$('.commentDocumentModal').prop('disabled',false);
  					
  				})
  				
  				
  				
  				$('.commentDocumentModal,.commentDocumentModalReply').click(function(){
  					
 
  					var data;
  					
  					if($(this).prop('name')=="reply"){
  						
  						if($('#documentFrom').val()=="admin"){
  						
  						 data={
  								"id":$(this).prop('id'),
  								"comment":$('#replyCommentDocument').val(),
  								"reply":true,
  								"admin":true
  						 	};
  						}else{
  							
  							 data={
  	  								"id":$(this).prop('id'),
  	  								"comment":$('#replyCommentDocument').val(),
  	  								"reply":true,
  	  								"admin":false
  	  						};
  							
  							
  						}
  						
  					}else{
  						
  						if($('#documentFrom').val()=="admin"){
  						
  							data={
  								"id":$('#documentId').val(),
  								"comment":$('#documentComment').val(),
  								"reply":false,
  								"admin":true
  							};
  						}else{
  							
  							data={
  	  								"id":$('#documentId').val(),
  	  								"comment":$('#documentComment').val(),
  	  								"reply":false,
  	  								"admin":false
  	  							};
  							
  						}
  						
  					}
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  				
  		        		urlPassed= projectPath+"uploadCommentOnDocument";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(data),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data1){
			       			 
			       			 $('#SuccessDocumentComment').css({"display": "none"}); 
			    			 $('#FailureDocumentComment').css({"display": "none"});
			    			
			    			 if(data1[0]==="Success"){
			    				 $('#SuccessDocumentComment').css({"display": "block"});
			    				 $('#documentComment').val('');
			    				 $('.commentDocumentModal').prop('disabled',true);
			    				 $('.replyRowDocument').hide();
			    				 $('#replyCommentDocument').val('');
			    			 }else if(data1[0]==="failure"){
			    				 $('#FailureDocumentComment').css({"display": "block"});
			    				 $('#documentComment').val('');
			    				 $('.commentDocumentModal').prop('disabled',true);
			    				 $('.replyRowDocument').hide();
			    				 $('#replyCommentDocument').val('');
			    			 }
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
  					});
  					
  				
  					
  				})
  				
  				/*********************************************CONCEPTS MAPS APPROVE/REJECT SECTION COMMENT SECTION ********************************/
  				
  					$('.commentConcept').click(function(){
  					
  					var Id=$(this).attr('value');
  					
  					var conceptComment={
  						"concepMapid":Id	
  					};
  					
  					var html='';
  					$('#conceptComment').val('');
  					$('#SuccessConceptComment').css({"display": "none"}); 
	    			$('#FailureConceptComment').css({"display": "none"});
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByConceptComment";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
					  	
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(conceptComment),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			
			       			 
			       			 
			       			 var len=data.length;
			       			 for(var i=0;i<len;i++){
			       			 
					       			 html+='<div class="card"> <div class="card-body"> <div class="row"> <div class="col-md-2">';
					       			 html+='<img src="'+projectPath+'Images/def_face.jpg" class="img img-rounded img-fluid"/> <p class="text-secondary text-center">';
					       			 html+= data[i].dateReceived;
					       			 html+= '</p></div> <div class="col-md-10"> <p><strong>';
					       			 html+= data[i].userName;
					       			 html+= '</strong></p> <div class="clearfix"></div> <p>';
					       			 html+= data[i].comment;
					       			 html+= '</p>';
					       			 html+= '<div class="reply" id='+data[i].comId+'><a href="javascript:void(0)" onclick="replyConcept(this)" com-id=';
					       			 html+= data[i].comId;
					       			 html+= '>Reply</a></div></div></div>';
					       		
					       			 
					       		
					       			 
					       			 var jsonReply={
					       					 "commentid":data[i].comId
					       			 };
					       			 
					       			
									
						        		urlPassed= projectPath+"loadReplyOnComment";
								
						        	
					       			
					       			$.ajax({
					       				
									  	type: "POST",
									  	async:false,
							        	contentType: "application/json",
							       		 url: urlPassed,
							       		 data: JSON.stringify(jsonReply),
							       		 beforeSend: function(xhr) {
					                         xhr.setRequestHeader(header, token);
							       		 },
							       		 dataType: 'json',
							       		 cache: false,
							        	 timeout: 600000,
							       		 success: function (dataReply){
							       			 
							       			 var lengthReply=dataReply.length;
							       			 
							       			 for(var j=0;j<lengthReply;j++){
							       				        				 
							       				 
							       				 
							       				 
							       				 html+='<div class="card card-inner"> <div class="card-body"> <div class="row"><div class="col-md-2">';
							       				 html+='<img src="'+projectPath+'Images/def_face.jpg" class="img img-rounded img-fluid"/> <p class="text-secondary text-center">';
							       				 html+= dataReply[j].dateReceived;
							       				 html+= '</p></div><div class="col-md-10"> <p><strong>';
							       				 html+= dataReply[j].userName;
							       				 html+= '</strong></p> <div class="clearfix"></div> <p>';
								       			 html+= dataReply[j].comment;
								       			 html+= '</p></div></div></div></div>';
								       			 
							       				 
				
							       			 }
							       			 
							       		 },
							       		 error : function(err){
											console.log("not working. ERROR: "+JSON.stringify(err));
							       		 }
							       		 
					       			});
					       			
					       			
					       			html+='</div></div></div></div><br/>';
					       		
					       
					       		
					       			 
			       			 }
			       			 
			       		
		       			 
		       			$('#comDataConcept').html(html);
		       				
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  					
  					
  					
  					
  					
  					$('#conceptId').prop('value',Id);
  					$('#ConceptCommentModal').modal('show');
  					
  					
  					
  					
  					
  					
  				})	
  				
  				
  				
  				$('#conceptComment').change(function(){
  					
  					
  					$('.commentConceptModal').prop('disabled',false);
  					
  				})
  				
  				
  				
  				$('.commentConceptModal,.commentConceptModalReply').click(function(){
  					
 
  					var data;
  					
  					if($(this).prop('name')=="reply"){
  						
  						if($('#conceptFrom').val()=="admin"){
  						
  						 data={
  								"id":$(this).prop('id'),
  								"comment":$('#replyCommentConcept').val(),
  								"reply":true,
  								"admin":true
  						 	};
  						}else{
  							
  							 data={
  	  								"id":$(this).prop('id'),
  	  								"comment":$('#replyCommentConcept').val(),
  	  								"reply":true,
  	  								"admin":false
  	  						};
  							
  							
  						}
  						
  					}else{
  						
  						if($('#conceptFrom').val()=="admin"){
  						
  							data={
  								"id":$('#conceptId').val(),
  								"comment":$('#conceptComment').val(),
  								"reply":false,
  								"admin":true
  							};
  						}else{
  							
  							data={
  	  								"id":$('#conceptId').val(),
  	  								"comment":$('#conceptComment').val(),
  	  								"reply":false,
  	  								"admin":false
  	  							};
  							
  						}
  						
  					}
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  				
  		        		urlPassed= projectPath+"uploadCommentOnConcept";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(data),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data1){
			       			 
			       			 $('#SuccessConceptComment').css({"display": "none"}); 
			    			 $('#FailureConceptComment').css({"display": "none"});
			    			
			    			 if(data1[0]==="Success"){
			    				 $('#SuccessConceptComment').css({"display": "block"});
			    				 $('#conceptComment').val('');
			    				 $('.commentConceptModal').prop('disabled',true);
			    				 $('.replyRowConcept').hide();
			    				 $('#replyCommentConcept').val('');
			    			 }else if(data1[0]==="failure"){
			    				 $('#FailureConceptComment').css({"display": "block"});
			    				 $('#conceptComment').val('');
			    				 $('.commentConceptModal').prop('disabled',true);
			    				 $('.replyRowConcept').hide();
			    				 $('#replyCommentConcept').val('');
			    			 }
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
  					});
  					
  				
  					
  				})
  				
  				/************************************************QUIZ APPROVE/REJECT SECTION COMMENT SECTION***********************************************/
  				
  				
  				
  				$('.commentQuiz').click(function(){
  				
  					
  					var Id=$(this).attr('value');
  					
  					var quizComment={
  						"quizQuestionId":Id	
  					};
  					
  					
  					$('#quizComment').val('');
  					$('#SuccessQuizComment').css({"display": "none"}); 
	    			$('#FailureQuizComment').css({"display": "none"});
  					var html='';
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"loadByQuizComment";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
					  	
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(quizComment),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			
			       			 
			       			 
			       			 var len=data.length;
			       			 for(var i=0;i<len;i++){
			       			 
					       			 html+='<div class="card"> <div class="card-body"> <div class="row"> <div class="col-md-2">';
					       			 html+='<img src="'+projectPath+'Images/def_face.jpg" class="img img-rounded img-fluid"/> <p class="text-secondary text-center">';
					       			 html+= data[i].dateReceived;
					       			 html+= '</p></div> <div class="col-md-10"> <p><strong>';
					       			 html+= data[i].userName;
					       			 html+= '</strong></p> <div class="clearfix"></div> <p>';
					       			 html+= data[i].comment;
					       			 html+= '</p>';
					       			 html+= '<div class="reply" id='+data[i].comId+'><a href="javascript:void(0)" onclick="replyQuiz(this)" com-id=';
					       			 html+= data[i].comId;
					       			 html+= '>Reply</a></div></div></div>';
					       		
					       			 
					       		
					       			 
					       			 var jsonReply={
					       					 "commentid":data[i].comId
					       			 };
					       			 
					       		
									
						
						        		urlPassed= projectPath+"loadReplyOnComment";
								
						        	
					       			
					       			$.ajax({
					       				
									  	type: "POST",
									  	async:false,
							        	contentType: "application/json",
							       		 url: urlPassed,
							       		 data: JSON.stringify(jsonReply),
							       		 beforeSend: function(xhr) {
					                         xhr.setRequestHeader(header, token);
							       		 },
							       		 dataType: 'json',
							       		 cache: false,
							        	 timeout: 600000,
							       		 success: function (dataReply){
							       			 
							       			 var lengthReply=dataReply.length;
							       			 
							       			 for(var j=0;j<lengthReply;j++){
							       				        				 
							       				 
							       				 
							       				 
							       				 html+='<div class="card card-inner"> <div class="card-body"> <div class="row"><div class="col-md-2">';
							       				 html+='<img src="'+projectPath+'Images/def_face.jpg" class="img img-rounded img-fluid"/> <p class="text-secondary text-center">';
							       				 html+= dataReply[j].dateReceived;
							       				 html+= '</p></div><div class="col-md-10"> <p><strong>';
							       				 html+= dataReply[j].userName;
							       				 html+= '</strong></p> <div class="clearfix"></div> <p>';
								       			 html+= dataReply[j].comment;
								       			 html+= '</p></div></div></div></div>';
								       			 
							       				 
				
							       			 }
							       			 
							       		 },
							       		 error : function(err){
											console.log("not working. ERROR: "+JSON.stringify(err));
							       		 }
							       		 
					       			});
					       			
					       			
					       			html+='</div></div></div></div><br/>';
					       		
					       
					       		
					       			 
			       			 }
			       			 
			       		
		       			 
		       			$('#comDataQuiz').html(html);
		       				
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  					

  					
  					
  					$('#quizId').prop('value',Id);
  					$('#QuizCommentModal').modal('show');
  					
  					
  					
  					
  					
  					
  				})	
  				
  				
  				
  				$('#quizComment').change(function(){
  					
  					
  					$('.commentQuizModal').prop('disabled',false);
  					
  				})
  				
  				
  				
  				$('.commentQuizModal,.commentQuizModalReply').click(function(){
  					
  					
  					var data;
  					
  					if($(this).prop('name')=="reply"){
  						
  						if($('#quizFrom').val()=="admin"){
  						
  						
  						 data={
  								"id":$(this).prop('id'),
  								"comment":$('#replyCommentQuiz').val(),
  								"reply":true,
  								"admin":true
  						};
  						 
  						}else{
  							
  							 data={
  	  								"id":$(this).prop('id'),
  	  								"comment":$('#replyCommentQuiz').val(),
  	  								"reply":true,
  	  								"admin":false
  	  						};
  							
  							
  							
  						}
  						
  					}else{
  						
  						if($('#quizFrom').val()=="admin"){
  						data={
  								"id":$('#quizId').val(),
  								"comment":$('#quizComment').val(),
  								"reply":false,
  								"admin":true
  							};
  						}else{
  							
  							data={
  	  								"id":$('#quizId').val(),
  	  								"comment":$('#quizComment').val(),
  	  								"reply":false,
  	  								"admin":false
  	  						};
  							
  						}
  						
  					}
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  					
  		        		urlPassed= projectPath+"uploadCommentOnQuiz";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(data),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data1){
			       			 
			       			 $('#SuccessQuizComment').css({"display": "none"}); 
			    			 $('#FailureQuizComment').css({"display": "none"});
			    			
			    			 if(data1[0]==="Success"){
			    				 $('#SuccessQuizComment').css({"display": "block"});
			    				 $('#quizComment').val('');
			    				 $('.commentQuizModal').prop('disabled',true);
			    				 $('.replyRowQuiz').hide();
			    				 $('#replyCommentQuiz').val('');
			    			 }else if(data1[0]==="failure"){
			    				 $('#FailureQuizComment').css({"display": "block"});
			    				 $('#quizComment').val('');
			    				 $('.commentQuizModal').prop('disabled',true);
			    				 $('.replyRowQuiz').hide();
			    				 $('#replyCommentQuiz').val('');
			    			 }
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
  					});
  					
  				
  					
  				})
  				
  				/************************************************LESSON APPROVE/REJECT SECTION COMMENT SECTION***********************************************/
  				
  				
  				$('.commentLesson').click(function(){
  					
  					var Id=$(this).attr('value');
  					
  					var lessonComment={
  						"lessonPlanId":Id	
  					};
  					
  					var html='';
  					$('#lessonComment').val('');
  					$('#SuccessLessonComment').css({"display": "none"}); 
	    			$('#FailureLessonComment').css({"display": "none"});
  					
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  				
  		        		urlPassed= projectPath+"loadByLessonComment";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(lessonComment),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			
			       			 
			       			 
			       			 var len=data.length;
			       			 for(var i=0;i<len;i++){
			       			 
					       			 html+='<div class="card"> <div class="card-body"> <div class="row"> <div class="col-md-2">';
					       			 html+='<img src="'+projectPath+'Images/def_face.jpg" class="img img-rounded img-fluid"/> <p class="text-secondary text-center">';
					       			 html+= data[i].dateReceived;
					       			 html+= '</p></div> <div class="col-md-10"> <p><strong>';
					       			 html+= data[i].userName;
					       			 html+= '</strong></p> <div class="clearfix"></div> <p>';
					       			 html+= data[i].comment;
					       			 html+= '</p>';
					       			 html+= '<div class="reply" id='+data[i].comId+'><a href="javascript:void(0)" onclick="replyLesson(this)" com-id=';
					       			 html+= data[i].comId;
					       			 html+= '>Reply</a></div></div></div>';
					   
					       			 
					       		
					       			 
					       			 var jsonReply={
					       					 "commentid":data[i].comId
					       			 };
					       			 
					       			
									
									
						        		urlPassed= projectPath+"loadReplyOnComment";
								
						        	
					       			
					       			$.ajax({
					       				
									  	type: "POST",
									  	async:false,
							        	contentType: "application/json",
							       		 url: urlPassed,
							       		 data: JSON.stringify(jsonReply),
							       		 beforeSend: function(xhr) {
					                         xhr.setRequestHeader(header, token);
							       		 },
							       		 dataType: 'json',
							       		 cache: false,
							        	 timeout: 600000,
							       		 success: function (dataReply){
							       			 
							       			 var lengthReply=dataReply.length;
							       			 
							       			 for(var j=0;j<lengthReply;j++){
							       				        				 
							       				 
							       				 
							       				 
							       				 html+='<div class="card card-inner"> <div class="card-body"> <div class="row"><div class="col-md-2">';
							       				 html+='<img src="'+projectPath+'Images/def_face.jpg" class="img img-rounded img-fluid"/> <p class="text-secondary text-center">';
							       				 html+= dataReply[j].dateReceived;
							       				 html+= '</p></div><div class="col-md-10"> <p><strong>';
							       				 html+= dataReply[j].userName;
							       				 html+= '</strong></p> <div class="clearfix"></div> <p>';
								       			 html+= dataReply[j].comment;
								       			 html+= '</p></div></div></div></div>';
								       			 
							       				 
				
							       			 }
							       			 
							       		 },
							       		 error : function(err){
											console.log("not working. ERROR: "+JSON.stringify(err));
							       		 }
							       		 
					       			});
					       			
					       			
					       			html+='</div></div></div></div><br/>';
					       		
					       
					       		
					       			 
			       			 }
			       			 
			       		
		       			 
		       			$('#comDataLesson').html(html);
		       				
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  					
  					
  					
  					$('#lessonId').prop('value',Id);
  					$('#LessonCommentModal').modal('show');
  					
  					
  					
  					
  					
  					
  				})	
  				
  				
  				
  				$('#lessonComment').change(function(){
  					
  					
  					$('.commentLessonModal').prop('disabled',false);
  					
  				})
  				
  				
  				
  				$('.commentLessonModal,.commentLessonModalReply').click(function(){
  					
  					
  					var data;
  					
  					if($(this).prop('name')=="reply"){
  						
  						if($('#lessonFrom').val()=="admin"){
  						
  						 data={
  								"id":$(this).prop('id'),
  								"comment":$('#replyCommentLesson').val(),
  								"reply":true,
  								"admin":true
  						 	};
  						}else{
  							
  							data={
  	  								"id":$(this).prop('id'),
  	  								"comment":$('#replyCommentLesson').val(),
  	  								"reply":true,
  	  								"admin":false
  	  						 	};
  							
  						}
  						
  					}else{
  						
  						if($('#lessonFrom').val()=="admin"){
  						
  						data={
  								"id":$('#lessonId').val(),
  								"comment":$('#lessonComment').val(),
  								"reply":false,
  								"admin":true
  							};
  						}else{
  							
  							data={
  	  								"id":$('#lessonId').val(),
  	  								"comment":$('#lessonComment').val(),
  	  								"reply":false,
  	  								"admin":false
  	  						};
  							
  							
  						}
  						
  					}
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  				
  		        	urlPassed= projectPath+"uploadCommentOnLesson";
  				
  		        	
  					
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(data),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data1){
			       			 
			       			 $('#SuccessLessonComment').css({"display": "none"}); 
			    			 $('#FailureLessonComment').css({"display": "none"});
			    			
			    			 if(data1[0]==="Success"){
			    				 $('#SuccessLessonComment').css({"display": "block"});
			    				 $('#lessonComment').val('');
			    				 $('.commentLessonModal').prop('disabled',true);
			    				 $('.replyRowLesson').hide();
			    				 $('#replyCommentLesson').val('');
			    			 }else if(data1[0]==="failure"){
			    				 $('#FailureLessonComment').css({"display": "block"});
			    				 $('#lessonComment').val('');
			    				 $('.commentLessonModal').prop('disabled',true);
			    				 $('.replyRowLesson').hide();
			    				 $('#replyCommentLesson').val('');
			    			 }
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
  					});
  					
  				
  					
  				})
  				
  				/************************************************PHETS APPROVE/REJECT SECTION COMMENT SECTION***********************************************/
  					
  				
  				$('.commentPhet').click(function(){
  					
  					var Id=$(this).attr('value');
  					
  					var commentPhet={
  						"phetId":Id	
  					};
  					
  					var html='';
  					$('#phetComment').val('');
  					$('#SuccessPhetComment').css({"display": "none"}); 
	    			$('#FailurePhetComment').css({"display": "none"});
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  					
  					
  		        	urlPassed= projectPath+"loadByPhetComment";
  				
  		        	
  					$.ajax({
					  	type: "POST",
					  	
			        	contentType: "application/json",
			       		 url:urlPassed,
			       		 data: JSON.stringify(commentPhet),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data){
			       			
			       			 
			       			 
			       			 var len=data.length;
			       			 for(var i=0;i<len;i++){
			       			 
					       			 html+='<div class="card"> <div class="card-body"> <div class="row"> <div class="col-md-2">';
					       			 html+='<img src="'+projectPath+'Images/def_face.jpg" class="img img-rounded img-fluid"/> <p class="text-secondary text-center">';
					       			 html+= data[i].dateReceived;
					       			 html+= '</p></div> <div class="col-md-10"> <p><strong>';
					       			 html+= data[i].userName;
					       			 html+= '</strong></p> <div class="clearfix"></div> <p>';
					       			 html+= data[i].comment;
					       			 html+= '</p>';
					       			 html+= '<div class="reply" id='+data[i].comId+'><a href="javascript:void(0)" onclick="replyPhet(this)" com-id=';
					       			 html+= data[i].comId;
					       			 html+= '>Reply</a></div></div></div>';
					       			
					       			 
					       		
					       			 
					       			 var jsonReply={
					       					 "commentid":data[i].comId
					       			 };
					       			 
					       			
					       			
									
						        		urlPassed= projectPath+"loadReplyOnComment";
								
						        	
					       			
					       			$.ajax({
					       				
									  	type: "POST",
									  	async:false,
							        	contentType: "application/json",
							       		 url: urlPassed,
							       		 data: JSON.stringify(jsonReply),
							       		 beforeSend: function(xhr) {
					                         xhr.setRequestHeader(header, token);
							       		 },
							       		 dataType: 'json',
							       		 cache: false,
							        	 timeout: 600000,
							       		 success: function (dataReply){
							       			 
							       			 var lengthReply=dataReply.length;
							       			 
							       			 for(var j=0;j<lengthReply;j++){
							       				        				 
							       				 
							       				 
							       				 
							       				 html+='<div class="card card-inner"> <div class="card-body"> <div class="row"><div class="col-md-2">';
							       				 html+='<img src="'+projectPath+'Images/def_face.jpg" class="img img-rounded img-fluid"/> <p class="text-secondary text-center">';
							       				 html+= dataReply[j].dateReceived;
							       				 html+= '</p></div><div class="col-md-10"> <p><strong>';
							       				 html+= dataReply[j].userName;
							       				 html+= '</strong></p> <div class="clearfix"></div> <p>';
								       			 html+= dataReply[j].comment;
								       			 html+= '</p></div></div></div></div>';
								       			 
							       				 
				
							       			 }
							       			 
							       		 },
							       		 error : function(err){
											console.log("not working. ERROR: "+JSON.stringify(err));
							       		 }
							       		 
					       			});
					       			
					       			
					       			html+='</div></div></div></div><br/>';
					       		
					       
					       		
					       			 
			       			 }
			       			 
			       		
		       			 
		       			$('#comDataPhet').html(html);
		       				
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
					});
  					
  					
  					
  					$('#phetId').prop('value',Id);
  					$('#PhetCommentModal').modal('show');
  					
  					
  					
  					
  					
  					
  				})	
  				
  				
  			
  				
  				
  				$('#phetComment').change(function(){
  					
  					
  					$('.commentPhetModal').prop('disabled',false);
  					
  				})
  				
  				
  				
  				$('.commentPhetModal,.commentPhetModalReply').click(function(){
  					
  				
  					var data;
  					
  					if($(this).prop('name')=="reply"){
  						
  						if($('#phetFrom').val()=="admin"){
  							
  							data={
  								"id":$(this).prop('id'),
  								"comment":$('#replyCommentPhet').val(),
  								"reply":true,
  								"admin":true
  						 	};
  						}else{
  							
  							 data={
  	  								"id":$(this).prop('id'),
  	  								"comment":$('#replyCommentPhet').val(),
  	  								"reply":true,
  	  								"admin":false
  	  						 	};
  							
  						}
  						
  					}else{
  						
  						if($('#phetFrom').val()=="admin"){
  						data={
  								"id":$('#phetId').val(),
  								"comment":$('#phetComment').val(),
  								"reply":false,
  								"admin":true
  						};
  						}else{
  							
  							data={
  	  								"id":$('#phetId').val(),
  	  								"comment":$('#phetComment').val(),
  	  								"reply":false,
  	  								"admin":false
  	  						};
  							
  							
  						}
  						
  					}
  					
  					var token = $("meta[name='_csrf']").attr("content");
  					var header = $("meta[name='_csrf_header']").attr("content");
  					
  					var urlPassed;
  				
  		        	urlPassed= projectPath+"uploadCommentOnPhet";
  				
  					$.ajax({
					  	type: "POST",
			        	contentType: "application/json",
			       		 url: urlPassed,
			       		 data: JSON.stringify(data),
			       		 beforeSend: function(xhr) {
	                         xhr.setRequestHeader(header, token);
			       		 },
			       		 dataType: 'json',
			       		 cache: false,
			        	 timeout: 600000,
			       		 success: function (data1){
			       			 
			       			 $('#SuccessPhetComment').css({"display": "none"}); 
			    			 $('#FailurePhetComment').css({"display": "none"});
			    			
			    			 if(data1[0]==="Success"){
			    				 $('#SuccessPhetComment').css({"display": "block"});
			    				 $('#phetComment').val('');
			    				 $('.commentPhetModal').prop('disabled',true);
			    				 $('.replyRowPhet').hide();
			    				 $('#replyCommentPhet').val('');
			    			 }else if(data1[0]==="failure"){
			    				 $('#FailurePhetComment').css({"display": "block"});
			    				 $('#phetComment').val('');
			    				 $('.commentPhetModal').prop('disabled',true);
			    				 $('.replyRowPhet').hide();
			    				 $('#replyCommentPhet').val('');
			    			 }
			       		
						},
						
						error : function(err){
							console.log("not working. ERROR: "+JSON.stringify(err));
						}
						
  					});
  					
  				
  					
  				})
  					
  		/*-----------------------------------------------------------------------END------------------------------------------------------------------------*/			
  					
  			
  				
  	/****************************************************USER SIDE MYACCOUNT SECTION (UPADTING PASSWORD******************************************************/
  		
  			$('#newPassTeacher').change(function(){
  				
  				$('#updatePasswordTeacher').prop('disabled',true);
  				var confpass=$('#confPassTeacher').val();
  				var pass=$(this).val();
  				if(confpass.length>0 && pass.length>0){
  					$('#updatePasswordTeacher').prop('disabled',false);
  					
  				}
  			
  			})
  			
  			$('#confPassTeacher').change(function(){
  				
  				$('#updatePasswordTeacher').prop('disabled',true);
  				var confpass=$('#newPassTeacher').val();
  				var pass=$(this).val();
  				if(confpass.length>0 && pass.length>0){
  					$('#updatePasswordTeacher').prop('disabled',false);
  					
  				}
  			
  			})
  				
  			$('#updatePasswordTeacher').click(function(){
  			
  			var currPass=$('#currentPasswordTeacher').val();	
  			var pass=$('#newPassTeacher').val();
  			var confpass=$('#confPassTeacher').val();
  			
  			var token = $("meta[name='_csrf']").attr("content");
			var header = $("meta[name='_csrf_header']").attr("content");
			
			var urlPassed;
		
        	urlPassed= projectPath+"updatePassword";
		
        
  			if(pass === confpass){
  				
  				var passwordData={
  					"password":pass,
  					"currentPassword":currPass
  					
  				};
  				
  			
  				
  				$.ajax({
  					type: "POST",
  					contentType: "application/json",
  					url: urlPassed,
  					data:JSON.stringify(passwordData),
  					 beforeSend: function(xhr) {
                         xhr.setRequestHeader(header, token);
		       		 },
  					cache:false,
  					timeout: 600000,
  					success:function(data){
  						 
  						 $('#Success').css({"display": "none"}); 
  						 $('#FailurePassMismatch').css({"display": "none"});
  						 $('#FailureCurPassWrong').css({"display": "none"});
  						 $('#lengthIncorrect').css({"display": "none"});
  						
  						 if(data[0]==="Success"){
  							 $('#Success').css({"display": "block"});
  							 $('#newPassTeacher').prop('value',"");
  							 $('#confPassTeacher').prop('value',"");
  							 $('#currentPasswordTeacher').prop('value',"");
  							 $('#updatePasswordTeacher').prop('disabled',true);
  							 
  							 setTimeout(function() {
  					            $('#Success').fadeOut(1000)}, 4000);
  						 }else if(data[0]==="failure"){
  							 $('#FailureCurPassWrong').css({"display": "block"});
  							 $('#newPassTeacher').prop('value',"");
 							 $('#confPassTeacher').prop('value',"");
 							 $('#currentPasswordTeacher').prop('value',"");
 							 $('#updatePasswordTeacher').prop('disabled',true);
 							 
 							 setTimeout(function() {
 					            $('#FailureCurPassWrong').fadeOut(1000)}, 4000);
  						 }else if(data[0]==="passwordLengthError"){
  							 
  							 $('#lengthIncorrect').css({"display": "block"});
  							 $('#newPassTeacher').prop('value',"");
 							 $('#confPassTeacher').prop('value',"");
 							 $('#currentPasswordTeacher').prop('value',"");
 							 $('#updatePasswordTeacher').prop('disabled',true);
 							 
 							 setTimeout(function() {
 					            $('#lengthIncorrect').fadeOut(1000)}, 4000);
  							 
  						 }
  						
  					
  					},
  				
  				error : function(err){
  					console.log("not working. ERROR: "+JSON.stringify(err));
  				}
  				
  				});
  				
  				
  			}else{
  				 $('#Success').css({"display": "none"}); 
  				 $('#FailurePassMismatch').css({"display": "none"});
				 $('#FailureCurPassWrong').css({"display": "none"});
				 $('#FailurePassMismatch').css({"display": "block"});
			
				 setTimeout(function() {
			            $('#FailurePassMismatch').fadeOut(1000)}, 4000);
			  
				 
				 $('#newPassTeacher').prop('value',"");
				 $('#confPassTeacher').prop('value',"");
				 $('#currentPasswordTeacher').prop('value',"");
				 
				 $('#updatePasswordTeacher').prop('disabled',true);
  				
  			}
  			
  		})
  		
  /******************************************************************************************************************************/		
  		
  		
  		$('#newPassLearnerParent').change(function(){
  				var confpass=$('#confPassLearnerParent').val();
  				var pass=$(this).val();
  				if(confpass.length>0 && pass.length>0){
  					$('#updatePasswordLearnerParent').prop('disabled',false);
  					
  				}
  			
  			})
  			
  			$('#confPassLearnerParent').change(function(){
  				var confpass=$('#newPassLearnerParent').val();
  				var pass=$(this).val();
  				if(confpass.length>0 && pass.length>0){
  					$('#updatePasswordLearnerParent').prop('disabled',false);
  					
  				}
  			
  			})
  				
  			$('#updatePasswordLearnerParent').click(function(){
  			
  			var currPass=$('#currentPasswordLearnerParent').val();
  			var userid=$('#userIdUpdateLearnerParent').val();
  			var pass=$('#newPassLearnerParent').val();
  			var confpass=$('#confPassLearnerParent').val();
  			
  			var token = $("meta[name='_csrf']").attr("content");
			var header = $("meta[name='_csrf_header']").attr("content");
			
			var urlPassed;
			urlPassed= projectPath+"updatePassword";
		
        
  			if(pass === confpass){
  				
  				var passwordData={
  					"password":pass,
  					"userId":userid,
  					"currentPassword":currPass
  					
  				};
  				
  				$.ajax({
  					type: "POST",
  					contentType: "application/json",
  					url: urlPassed,
  					data:JSON.stringify(passwordData),
  					 beforeSend: function(xhr) {
                         xhr.setRequestHeader(header, token);
		       		 },
  					cache:false,
  					timeout: 600000,
  					success:function(data){
  						 
  						 $('#Success').css({"display": "none"}); 
  						 $('#FailurePassMismatch').css({"display": "none"});
  						 $('#FailureCurPassWrong').css({"display": "none"});
  						
  						 if(data[0]==="Success"){
  							 $('#Success').css({"display": "block"});
  							 $('#newPassLearnerParent').prop('value',"");
  							 $('#confPassLearnerParent').prop('value',"");
  							 $('#currentPasswordLearnerParent').prop('value',"");
  							 $('#updatePasswordLearnerParent').prop('disabled',true);
  						 }else if(data[0]==="failure"){
  							 $('#FailureCurPassWrong').css({"display": "block"});
  							 $('#newPassLearnerParent').prop('value',"");
 							 $('#confPassLearnerParent').prop('value',"");
 							 $('#currentPasswordLearnerParent').prop('value',"");
 							 $('#updatePasswordLearnerParent').prop('disabled',true);
  						 }
  						
  					
  					},
  				
  				error : function(err){
  					console.log("not working. ERROR: "+JSON.stringify(err));
  				}
  				
  				});
  				
  				
  			}else{
  				 $('#Success').css({"display": "none"}); 
  				 $('#FailurePassMismatch').css({"display": "none"});
				 $('#FailureCurPassWrong').css({"display": "none"});
				 $('#FailurePassMismatch').css({"display": "block"});
				 
				 $('#newPassLearnerParent').prop('value',"");
				 $('#confPassLearnerParent').prop('value',"");
				 $('#currentPasswordLearnerParent').prop('value',"");
				 
				 $('#updatePasswordLearnerParent').prop('disabled',true);
  				
  			}
  			
  		})
  				
  				
  				
  	/**********************************************************************************************************************************************************/
  		
  		
  			
  		$('#newPassAdmin').change(function(){
  				var confpass=$('#confPassAdmin').val();
  				var pass=$(this).val();
  				if(confpass.length>0 && pass.length>0){
  					$('#updatePasswordAdmin').prop('disabled',false);
  					
  				}
  			
  			})
  			
  			$('#confPassAdmin').change(function(){
  				var confpass=$('#newPassAdmin').val();
  				var pass=$(this).val();
  				if(confpass.length>0 && pass.length>0){
  					$('#updatePasswordAdmin').prop('disabled',false);
  					
  				}
  			
  			})
  				
  			$('#updatePasswordAdmin').click(function(){
  			
  			var currPass=$('#currentPassword').val();
  			var userid=$('#userIdUpdateAdmin').val();
  			var pass=$('#newPassAdmin').val();
  			var confpass=$('#confPassAdmin').val();
  			
  			var token = $("meta[name='_csrf']").attr("content");
			var header = $("meta[name='_csrf_header']").attr("content");
			
			var urlPassed;
			
        	urlPassed= projectPath+"updatePassword";
		
			
  			if(pass === confpass){
  				
  				var passwordData={
  					"password":pass,
  					"userId":userid,
  					"currentPassword":currPass
  					
  				};
  				
  				$.ajax({
  					type: "POST",
  					contentType: "application/json",
  					url: urlPassed,
  					data:JSON.stringify(passwordData),
  					beforeSend: function(xhr) {
                         xhr.setRequestHeader(header, token);
		       		},
  					cache:false,
  					timeout: 600000,
  					success:function(data){
  						 
  						 $('#Success').css({"display": "none"}); 
  						 $('#FailurePassMismatch').css({"display": "none"});
  						 $('#FailureCurPassWrong').css({"display": "none"});
  						
  						 if(data[0]==="Success"){
  							 $('#Success').css({"display": "block"});
  							 
  							 $('#newPassAdmin').prop('value',"");
  							 $('#confPassAdmin').prop('value',"");
  							 $('#currentPassword').prop('value',"");
  							 $('#updatePasswordAdmin').prop('disabled',true);
  						 }else if(data[0]==="failure"){
  							 $('#FailureCurPassWrong').css({"display": "block"});
  							 $('#newPassAdmin').prop('value',"");
 							 $('#confPassAdmin').prop('value',"");
 							 $('#currentPassword').prop('value',"");
 							 $('#updatePasswordAdmin').prop('disabled',true);
  						 }
  						
  					
  					},
  				
  				error : function(err){
  					console.log("not working. ERROR: "+JSON.stringify(err));
  				}
  				
  				});
  				
  				
  			}else{
  				 $('#Success').css({"display": "none"}); 
				 $('#FailurePassMismatch').css({"display": "none"});
				 $('#FailurePassMismatch').css({"display": "block"});
				 
				 $('#newPassAdmin').prop('value',"");
				 $('#confPassAdmin').prop('value',"");
				 $('#currentPassword').prop('value',"");
				 
				 $('#updatePasswordAdmin').prop('disabled',true);
  				
  			}
  			
  		})
  		
  /**********************************************  END *********************************************************************************/		
  		
  		
  /*****************************************ADD MATERIAL FROM USER SIDE**********************************************************/
  		

  		
  		$('#addArticlefromUser').click(function(){
  			
  			event.preventDefault();
  			
  			addArticle();
  			
  			
  		})
  		
  		$('#descriptionArticle').change(function(){
  			var desc=$(this).val();
  			
  			$("#addArticlefromUser").prop('disabled', true);
			
  			if(desc.length>0 && $('#urlArticle').val().length>0 && $('#sourceArticle').val().length>0 && $("#articleUserCheck").is(":checked")){
  				$("#addArticlefromUser").prop('disabled', false);
  			}
  			
  			
  		})
  		
  			$('#urlArticle').change(function(){
  			var desc=$(this).val();
  			
  			$("#addArticlefromUser").prop('disabled', true);
			
  			if(desc.length>0 && $('#descriptionArticle').val().length>0 && $('#sourceArticle').val().length>0 && $("#articleUserCheck").is(":checked")){
  				$("#addArticlefromUser").prop('disabled', false);
  			}
  			
  		})
  		
  			$('#sourceArticle').change(function(){
  			var desc=$(this).val();
  			
  			$("#addArticlefromUser").prop('disabled', true);
			
  			if(desc.length>0 && $('#urlArticle').val().length>0 && $('#descriptionArticle').val().length>0 && $("#articleUserCheck").is(":checked")){
  				$("#addArticlefromUser").prop('disabled', false);
  			}
  			
  		})
  		
  			$('#articleUserCheck').change(function(){
  				
  				$("#addArticlefromUser").prop('disabled', true);
  				
  	  			if($('#sourceArticle').val().length>0 && $('#urlArticle').val().length>0 && $('#descriptionArticle').val().length>0 && $("#articleUserCheck").is(":checked")){
  	  				$("#addArticlefromUser").prop('disabled', false);
  	  			}
  				
  			})
  		
  		/*****************************************************************************************************************/
  		
  		$('#addDocumentfromUser').click(function(){
  			
  			event.preventDefault();
  			
  			addDocument();
  			
  			
  		})
  		
  		$('#descriptionDocument').change(function(){
  			var desc=$(this).val();
  			
  			$("#addDocumentfromUser").prop('disabled', true);
			
  			if(desc.length>0 && $('#UrlDocument').val().length>0 && $('#sourceDocument').val().length>0 && $("#documentUserCheck").is(":checked")){
  				$("#addDocumentfromUser").prop('disabled', false);
  			}
  			
  			
  		})
  		
  			$('#UrlDocument').change(function(){
  			var desc=$(this).val();
  			
  			$("#addDocumentfromUser").prop('disabled', true);
			
  			if(desc.length>0 && $('#descriptionDocument').val().length>0 && $('#sourceDocument').val().length>0 && $("#documentUserCheck").is(":checked")){
  				$("#addDocumentfromUser").prop('disabled', false);
  			}
  			
  			
  		})
  		
  			$('#sourceDocument').change(function(){
  			var desc=$(this).val();
  			
  			$("#addDocumentfromUser").prop('disabled', true);
			
  			if(desc.length>0 && $('#UrlDocument').val().length>0 && $('#descriptionDocument').val().length>0 && $("#documentUserCheck").is(":checked")){
  				$("#addDocumentfromUser").prop('disabled', false);
  			}
  			
  			
  		})
  		
  			$('#documentUserCheck').change(function(){
  			
  			
  			$("#addDocumentfromUser").prop('disabled', true);
			
  			if($('#descriptionDocument').val().length>0  && $('#UrlDocument').val().length>0 && $('#sourceDocument').val().length>0 && $("#documentUserCheck").is(":checked")){
  				$("#addDocumentfromUser").prop('disabled', false);
  			}
  			
  			
  		})
  		
  		/************************************************************************************************************************/
  		
  			$('#addConceptfromUser').click(function(){
  			
  			event.preventDefault();
  			
  			addConcept();
  			
  			
  		})
  		
  		$('#descriptionConceptMap').change(function(){
  			var desc=$(this).val();
  			
  			
  			$("#addConceptfromUser").prop('disabled', true);
			
  			if(desc.length>0 && $('#conceptMapImage').get(0).files.length >0 && $('#headlineConceptMap').val().length>0 && $("#ConceptUserCheck").is(":checked")){
  				$("#addConceptfromUser").prop('disabled', false);
  			}
  			
  			
  		})
  		
  			$('#headlineConceptMap').change(function(){
  			var desc=$(this).val();
  		
  			
  			$("#addConceptfromUser").prop('disabled', true);
			
  			if(desc.length>0 && $('#descriptionConceptMap').val().length>0 && $('#conceptMapImage').get(0).files.length >0 && $("#ConceptUserCheck").is(":checked")){
  				$("#addConceptfromUser").prop('disabled', false);
  			}
  			
  			
  		})
  		
  			$('#conceptMapImage').change(function(){
  			var desc=$(this).val();
  		
  			
  			$("#addConceptfromUser").prop('disabled', true);
			
  			if($('#conceptMapImage').get(0).files.length >0 && $('#headlineConceptMap').val().length>0 && $('#descriptionConceptMap').val().length>0 && $("#ConceptUserCheck").is(":checked")){
  				$("#addConceptfromUser").prop('disabled', false);
  			}
  			
  			
  		})
  		
  			$('#ConceptUserCheck').change(function(){
  			
  			$("#addConceptfromUser").prop('disabled', true);
			
  			if($('#descriptionConceptMap').val().length>0 && $('#conceptMapImage').get(0).files.length >0 && $('#headlineConceptMap').val().length>0 && $("#ConceptUserCheck").is(":checked")){
  				$("#addConceptfromUser").prop('disabled', false);
  			}
  			
  			
  		})
  		
  		
  		/*********************************************************************************************************************/
  		
  		$('#addQuizfromUser').click(function(){
  			
  			event.preventDefault();
  			
  			addQuiz();
  			
  			
  		})
  		
  		$('#remarksQuiz').change(function(){
  			
  			
  			$("#addQuizfromUser").prop('disabled', true);
			
  			if($('#QuestionQuiz').get(0).files.length > 0 && $('#AnswerQuiz').get(0).files.length > 0 && $('#remarksQuiz').length>0 && $("#quizUserCheck").is(":checked")){
  				$("#addQuizfromUser").prop('disabled', false);
  			}
  			
  		})
  		
  		$('#QuestionQuiz').change(function(){
  			
  			
  			$("#addQuizfromUser").prop('disabled', true);
			
  			if($('#QuestionQuiz').get(0).files.length > 0 && $('#remarksQuiz').length > 0 && $('#AnswerQuiz').get(0).files.length > 0 && $("#quizUserCheck").is(":checked")){
  				$("#addQuizfromUser").prop('disabled', false);
  			}
  			
  		})
  		
  		$('#AnswerQuiz').change(function(){
  			
  			
  			$("#addQuizfromUser").prop('disabled', true);
			
  			if($('#AnswerQuiz').get(0).files.length > 0 && $('#QuestionQuiz').get(0).files.length > 0 && $('#remarksQuiz').length > 0 && $("#quizUserCheck").is(":checked")){
  				$("#addQuizfromUser").prop('disabled', false);
  			}
  			
  		})
  		
  		$('#quizUserCheck').change(function(){
  			
  			
  			$("#addQuizfromUser").prop('disabled', true);
			
  			if($('#QuestionQuiz').get(0).files.length > 0 && $('#AnswerQuiz').get(0).files.length > 0 && $('#remarksQuiz').length > 0 && $("#quizUserCheck").is(":checked")){
  				$("#addQuizfromUser").prop('disabled', false);
  			}
  			
  		})
  		
  		
  		/********************************************************************************************************************/
  		
  		$('#addLessonfromUser').click(function(){
  			
  			event.preventDefault();
  			
  			addLesson();
  			
  			
  		})
  		
  		$('#lesson').change(function(){
  			
  			
  			$("#addLessonfromUser").prop('disabled', true);
			
  			if($('#lesson').get(0).files.length > 0 && $("#lessonUserCheck").is(":checked")){
  				$("#addLessonfromUser").prop('disabled', false);
  			}
  			
  		})
  		
  		$('#lessonUserCheck').change(function(){
  			
  			$("#addLessonfromUser").prop('disabled', true);
			
  			if($('#lesson').get(0).files.length > 0 && $("#lessonUserCheck").is(":checked")){
  				$("#addLessonfromUser").prop('disabled', false);
  			}
  			
  		})
  		
  		
  		
  		/************************************************************************************************************************/
  		
  		$('#addPhetfromUser').click(function(){
  			
  			event.preventDefault();
  			
  			addPhet();
  			
  			
  		})
  		
  		$('#descriptionPhet').change(function(){
  			var desc=$(this).val();
  			
  			$("#addPhetfromUser").prop('disabled', true);
			
  			if(desc.length>0 && $('#Embedphet').val().length>0 && $('#sourcePhet').val().length>0 && $("#phetUserCheck").is(":checked")){
  				$("#addPhetfromUser").prop('disabled', false);
  			}
  			
  		})
  		
  		$('#Embedphet').change(function(){
  			var desc=$(this).val();
  			
  			$("#addPhetfromUser").prop('disabled', true);
			
  			if(desc.length>0 && $('#descriptionPhet').val().length>0 && $('#sourcePhet').val().length>0 && $("#phetUserCheck").is(":checked")){
  				$("#addPhetfromUser").prop('disabled', false);
  			}
  			
  		})
  		
  		$('#sourcePhet').change(function(){
  			var desc=$(this).val();
  			
  			$("#addPhetfromUser").prop('disabled', true);
			
  			if(desc.length>0 && $('#Embedphet').val().length>0 && $('#descriptionPhet').val().length>0 && $("#phetUserCheck").is(":checked")){
  				$("#addPhetfromUser").prop('disabled', false);
  			}
  			
  		})
  		
  			$('#phetUserCheck').change(function(){
  			var desc=$(this).val();
  			
  			$("#addPhetfromUser").prop('disabled', true);
			
  			if($('#sourcePhet').val().length>0 && $('#Embedphet').val().length>0 && $('#descriptionPhet').val().length>0 && $("#phetUserCheck").is(":checked")){
  				$("#addPhetfromUser").prop('disabled', false);
  			}
  			
  		})
  		
  		/*************************************************************************************************************/
  		
  		$('#addVideofromUser').click(function(){
  			
  			event.preventDefault();
  			
  			addVideo();
  			
  			
  		})
  		
  		$('#descriptionVideo').change(function(){
  			var desc=$(this).val();
  			
  			$("#addVideofromUser").prop('disabled', true);
			
  			if(desc.length>0 && $('#urlVideo').val().length>0 && $('#sourceVideo').val().length>0 && $("#videoUserCheck").is(":checked")){
  				$("#addVideofromUser").prop('disabled', false);
  			}
  			
  			
  		})
  		
  			$('#urlVideo').change(function(){
  			var desc=$(this).val();
  			
  			$("#addVideofromUser").prop('disabled', true);
			
  			if(desc.length>0 && $('#descriptionVideo').val().length>0 && $('#sourceVideo').val().length>0 && $("#videoUserCheck").is(":checked")){
  				$("#addVideofromUser").prop('disabled', false);
  			}
  			
  			
  		})
  		
  			$('#sourceVideo').change(function(){
  			var desc=$(this).val();
  			
  			$("#addVideofromUser").prop('disabled', true);
			
  			if(desc.length>0 && $('#urlVideo').val().length>0 && $('#descriptionVideo').val().length>0 && $("#videoUserCheck").is(":checked")){
  				$("#addVideofromUser").prop('disabled', false);
  			}
  			
  			
  		})
  		
  			$('#videoUserCheck').change(function(){
  		
  			
  			$("#addVideofromUser").prop('disabled', true);
			
  			if($('#descriptionVideo').val().length>0 && $('#urlVideo').val().length>0 && $('#sourceVideo').val().length>0 && $("#videoUserCheck").is(":checked")){
  				$("#addVideofromUser").prop('disabled', false);
  			}
  			
  		})
  		
  		
  		
  		
  
  		
  		
  		
  /*************************************************END**********************************************************************/
  					
  					
  	});

$(document).ready(function () {                             //************Admin side              *//*
	  $('#dtBasicExample').DataTable(/*{
		   'aoColumnDefs': [{
		        'bSortable': false,
		        'aTargets': ['nosort']
		    }]
		}*/);
	  $('.dataTables_length').addClass('bs-select');
});   

//********************** User Side********************//*

$(document).ready(function () {
	  $('#dtBasicExamplePhet').DataTable();
	  $('.dataTables_length').addClass('bs-select');
});

$(document).ready(function () {
	  $('#dtBasicExampleVideo').DataTable();
	  $('.dataTables_length').addClass('bs-select');
});

$(document).ready(function () {
	  $('#dtBasicExampleLesson').DataTable();
	  $('.dataTables_length').addClass('bs-select');
});

$(document).ready(function () {
	  $('#dtBasicExampleDocument').DataTable();
	  $('.dataTables_length').addClass('bs-select');
});

$(document).ready(function () {
	  $('#dtBasicExampleArticle').DataTable();
	  $('.dataTables_length').addClass('bs-select');
});

$(document).ready(function () {
	  $('#dtBasicExampleQuiz').DataTable();
	  $('.dataTables_length').addClass('bs-select');
});

$(document).ready(function () {
	  $('#dtBasicExampleConcept').DataTable();
	  $('.dataTables_length').addClass('bs-select');
});
//Quiz & Lesson Plan Table here
$(document).ready(function () {
	$('#quizTable').DataTable();
	$('#lessonTable').DataTable();
});

/********************************************************************/

$(window).on('load',function(){
	if($('#reg').val() == 'yes'){
		
		$('#registerModal').modal('show');
	}
})


function TotalResourceFromTopic(){
	
	var topic_id=$("input[name='radioTopic']:checked").val();
	var urlPassed=projectPath+"countResourceFromTopic";
	var status=false;
	
	
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");

	$.ajax({
	  	type: "GET",
	  	async:false,
    	contentType: "application/json",
   		 url: urlPassed,
   		 data: "topicId="+topic_id,
   		 beforeSend: function(xhr) {
             xhr.setRequestHeader(header, token);
   		 },
   		 dataType: 'json',
   		 cache: false,
    	 timeout: 600000,
   		 success: function (data){
   			 
   			if(confirm('Are you sure you want to Disable it? All associated content will also get disabled.\n Total Number of Resource will also be disabled :'+data+'')){
   				status=true;
   			}
   			
   		
		},
		
		error : function(err){
			console.log("not working. ERROR: "+JSON.stringify(err));
		}
		
	})
	
	return status;
	
	
}

function TotalResourceFromSubject(){
	
	var sub_id=$("input[name='radioSubject']:checked").val();
	var urlPassed=projectPath+"countResourceFromSubject";
	var status=false;
	
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");

	$.ajax({
	  	type: "GET",
	  	async:false,
    	contentType: "application/json",
   		 url: urlPassed,
   		 data: "subId="+sub_id,
   		 beforeSend: function(xhr) {
             xhr.setRequestHeader(header, token);
   		 },
   		 dataType: 'json',
   		 cache: false,
    	 timeout: 600000,
   		 success: function (data){
   			 
   			if(confirm('Are you sure you want to Disable it? All associated content will also get disabled.\n Total Number of Resource will also be disabled :'+data+'')){
   				status= true;
   			}
   			
   		
		},
		
		error : function(err){
			console.log("not working. ERROR: "+JSON.stringify(err));
		}
		
	})
	
	return status;
	
}



// -----------------------------------------AJAX FUNCTION FOR TOPIC---------------------------------------------------------------------------

function fire_ajax_submit_Topic(){

		var form=$('#uploadTopic')[0];
		var data=new FormData(form);
		
		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");
		
		var urlPassed;
	
    	urlPassed= projectPath+"updateTopic";
	
			
	$.ajax({
		type: "POST",
		enctype: 'multipart/form-data',
		url: urlPassed,
		data:data,
		beforeSend: function(xhr) {
             xhr.setRequestHeader(header, token);
   		},
		cache:false,
		contentType:false,
		processData:false,
		timeout: 600000,
		success:function(data){
			 
			 $('#Success').css({"display": "none"}); 
			 $('#invalid-data').css({"display": "none"}); 
			 $('#Failure').css({"display": "none"});
			
			 if(data[0]==="Success"){
				 $('#Success').css({"display": "block"});
				 $("#updateTopic").prop('disabled', true);
			 }else if(data[0]==="failure"){
				 $('#Failure').css({"display": "block"});
				 $("#updateTopic").prop('disabled', true);
			 }else{
				 $('#invalid-data').css({"display": "block"}); 
				 $("#updateTopic").prop('disabled', true);
			 }
			
		
		},
	
	error : function(err){
		console.log("not working. ERROR: "+JSON.stringify(err));
	}
	
	});
}

/* -------------------------------------------------------END---------------------------------------------------------------------------------*/

/* ---------------------------------------------AJAX FUNCTION FOR QUIZ--------------------------------------------------------------------*/

	function fire_ajax_submit_Quiz(){
	
		var form=$('#uploadUpdateQuiz')[0];
		var data=new FormData(form);
		
		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");
		
		var urlPassed;
	
    	urlPassed= projectPath+"updateQuiz";
	
    	
			$.ajax({
				type: "POST",
				enctype: 'multipart/form-data',
				url: urlPassed,
				data:data,
				beforeSend: function(xhr) {
                    xhr.setRequestHeader(header, token);
	       		},
				cache:false,
				contentType:false,
				processData:false,
				timeout: 600000,
				success:function(data){
					 
					 $('#SuccessQuiz').css({"display": "none"}); 
					 $('#invalid-dataQuiz').css({"display": "none"}); 
					 $('#FailureQuiz').css({"display": "none"});
					
					 if(data[0]==="Success"){
						 $('#SuccessQuiz').css({"display": "block"});
						 $("#updateQuiz").prop('disabled', true);
						 $('#question').val('');
						 $('#answer').val('');
					 }else if(data[0]==="failure"){
						 $('#FailureQuiz').css({"display": "block"});
						 $("#updateQuiz").prop('disabled', true);
						 $('#question').val('');
						 $('#answer').val('');
					 }else{
						 $('#invalid-dataQuiz').css({"display": "block"}); 
						 $("#updateQuiz").prop('disabled', true);
						 $('#question').val('');
						 $('#answer').val('');
					 }
					
				
				},
			
			error : function(err){
				console.log("not working. ERROR: "+JSON.stringify(err));
				}
	
		});
	}
	
	

//	function fire_ajax_submit_QuizOnUser(){
//	
//		var form=$('#uploadUserQuiz')[0];
//		var data=new FormData(form);
//		
//		var token = $("meta[name='_csrf']").attr("content");
//		var header = $("meta[name='_csrf_header']").attr("content");
//	
//			$.ajax({
//				type: "POST",
//				enctype: 'multipart/form-data',
//				url: /*projectPath+*/"/updateQuiz",
//				data:data,
//				beforeSend: function(xhr) {
//                     xhr.setRequestHeader(header, token);
//	       		},
//				cache:false,
//				contentType:false,
//				processData:false,
//				timeout: 600000,
//				success:function(data){
//					 
//					 $('#SuccessQuiz').css({"display": "none"}); 
//					 $('#invalid-dataQuiz').css({"display": "none"}); 
//					 $('#FailureQuiz').css({"display": "none"});
//					
//					 if(data[0]==="Success"){
//						 $('#SuccessQuiz').css({"display": "block"});
//					 }else if(data[0]==="failure"){
//						 $('#FailureQuiz').css({"display": "block"});
//					 }else{
//						 $('#invalid-dataQuiz').css({"display": "block"}); 
//					 }
//					
//				
//				},
//			
//			error : function(err){
//				console.log("not working. ERROR: "+JSON.stringify(err));
//				}
//	
//		});
//	}
/* -------------------------------------------------------END--------------------------------------------------------------------------------------*/


/* ---------------------------------------------AJAX FUNCTION FOR VIDEO--------------------------------------------------------------------*/
	function fire_ajax_submit_Video(){
		
		var form=$('#uploadUpdateVideo')[0];
		var data=new FormData(form);
		
		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");
		
		var urlPassed;
	
    	urlPassed= projectPath+"updateVideo";
	
    
	
			$.ajax({
				type: "POST",
				enctype: 'multipart/form-data',
				url: urlPassed,
				data:data,
				beforeSend: function(xhr) {
                     xhr.setRequestHeader(header, token);
	       		},
				cache:false,
				contentType:false,
				processData:false,
				timeout: 600000,
				success:function(data){
					
					 $('#SuccessVideo').css({"display": "none"}); 
					 $('#invalid-dataVideo').css({"display": "none"}); 
					 $('#FailureVideo').css({"display": "none"});
					
					 if(data[0]==="Success"){
						 $('#SuccessVideo').css({"display": "block"});
					 }else if(data[0]==="failure"){
						 $('#FailureVideo').css({"display": "block"});
					 }else{
						 $('#invalid-dataVideo').css({"display": "block"}); 
					 }
					
				
				},
			
			error : function(err){
				console.log("not working. ERROR: "+JSON.stringify(err));
				}
	
		});
	}
	
	function fire_ajax_submit_VideoUpload(){
		
		var form=$('#uploadUpdateVideoUpload')[0];
		var data=new FormData(form);
		
		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");
		
		var urlPassed;
	
    	urlPassed= projectPath+"updateVideoUpload";
	
    	
	
			$.ajax({
				type: "POST",
				enctype: 'multipart/form-data',
				url: urlPassed,
				data:data,
				beforeSend: function(xhr) {
                     xhr.setRequestHeader(header, token);
	       		},
				cache:false,
				contentType:false,
				processData:false,
				timeout: 600000,
				success:function(data){
					
					 $('#SuccessVideoUpload').css({"display": "none"}); 
					 $('#invalid-dataVideoUpload').css({"display": "none"}); 
					 $('#FailureVideoUpload').css({"display": "none"});
					
					 if(data[0]==="Success"){
						 $('#SuccessVideoUpload').css({"display": "block"});
					 }else if(data[0]==="failure"){
						 $('#FailureVideoUpload').css({"display": "block"});
					 }else{
						 $('#invalid-dataVideoUpload').css({"display": "block"}); 
					 }
					
				
				},
			
			error : function(err){
				console.log("not working. ERROR: "+JSON.stringify(err));
				}
	
		});
	}
	
//	function fire_ajax_submit_VideoOnUser(){
//		
//		var form=$('#uploadUserVideo')[0];
//		var data=new FormData(form);
//		
//		var token = $("meta[name='_csrf']").attr("content");
//		var header = $("meta[name='_csrf_header']").attr("content");
//	
//			$.ajax({
//				type: "POST",
//				enctype: 'multipart/form-data',
//				url:/* projectPath+*/"/updateVideo",
//				data:data,
//				beforeSend: function(xhr) {
//                     xhr.setRequestHeader(header, token);
//	       		},
//				cache:false,
//				contentType:false,
//				processData:false,
//				timeout: 600000,
//				success:function(data){
//					
//					 $('#SuccessVideo').css({"display": "none"}); 
//					 $('#invalid-dataVideo').css({"display": "none"}); 
//					 $('#FailureVideo').css({"display": "none"});
//					
//					 if(data[0]==="Success"){
//						 $('#SuccessVideo').css({"display": "block"});
//					 }else if(data[0]==="failure"){
//						 $('#FailureVideo').css({"display": "block"});
//					 }else{
//						 $('#invalid-dataVideo').css({"display": "block"}); 
//					 }
//					
//				
//				},
//			
//			error : function(err){
//				console.log("not working. ERROR: "+JSON.stringify(err));
//				}
//	
//		});
//	}
/* -------------------------------------------------------END--------------------------------------------------------------------------------------*/

	
/******************************************AJAX FUNCTION FOR CONCEPT -MAPS *********************************************/
	
	

	function fire_ajax_submit_Concept(){
		
		var form=$('#uploadUpdateConcept')[0];
		var data=new FormData(form);
		
		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");
		
		var urlPassed;
		
    	urlPassed= projectPath+"updateConcept";
	
    	
			$.ajax({
				type: "POST",
				enctype: 'multipart/form-data',
				url: urlPassed,
				data:data,
				beforeSend: function(xhr) {
                     xhr.setRequestHeader(header, token);
	       		},
				cache:false,
				contentType:false,
				processData:false,
				timeout: 600000,
				success:function(data){
					
					 $('#SuccessConcept').css({"display": "none"}); 
					 $('#invalid-dataConcept').css({"display": "none"}); 
					 $('#FailureConcept').css({"display": "none"});
					
					 if(data[0]==="Success"){
						 $('#SuccessConcept').css({"display": "block"});
					//	 $('#updateConcept').prop('disabled',true);
	  					
					 }else if(data[0]==="failure"){
						 $('#FailureConcept').css({"display": "block"});
					//	 $('#updateConcept').prop('disabled',true);
	  						
						 $('#invalid-dataConcept').css({"display": "block"}); 
					//	 $('#updateConcept').prop('disabled',true);
	  			
					 }
					
				
				},
			
			error : function(err){
				console.log("not working. ERROR: "+JSON.stringify(err));
				}
	
		});
	}
	
//	function fire_ajax_submit_ConceptOnUser(){
//		
//		var form=$('#uploadUserConcept')[0];
//		var data=new FormData(form);
//		
//		var token = $("meta[name='_csrf']").attr("content");
//		var header = $("meta[name='_csrf_header']").attr("content");
//	
//			$.ajax({
//				type: "POST",
//				enctype: 'multipart/form-data',
//				url: projectPath+"/updateConcept",
//				data:data,
//				beforeSend: function(xhr) {
//                     xhr.setRequestHeader(header, token);
//	       		},
//				cache:false,
//				contentType:false,
//				processData:false,
//				timeout: 600000,
//				success:function(data){
//					
//					 $('#SuccessConcept').css({"display": "none"}); 
//					 $('#invalid-dataConcept').css({"display": "none"}); 
//					 $('#FailureConcept').css({"display": "none"});
//					
//					 if(data[0]==="Success"){
//						 $('#SuccessConcept').css({"display": "block"});
//					 }else if(data[0]==="failure"){
//						 $('#FailureConcept').css({"display": "block"});
//					 }else{
//						 $('#invalid-dataConcept').css({"display": "block"}); 
//					 }
//					
//				
//				},
//			
//			error : function(err){
//				console.log("not working. ERROR: "+JSON.stringify(err));
//				}
//	
//		});
//	}
	
	
	
/*--------------------------------------------------END---------------------------------------------------------------*

/* ---------------------------------------------AJAX FUNCTION FOR ARTICLE--------------------------------------------------------------------*/
//	function fire_ajax_submit_Article(){
//		
//		var form=$('#uploadArticle')[0];
//		var data=new FormData(form);
//		
//		var token = $("meta[name='_csrf']").attr("content");
//		var header = $("meta[name='_csrf_header']").attr("content");
//	
//			$.ajax({
//				type: "POST",
//				enctype: 'multipart/form-data',
//				url: /*projectPath+*/"/updateArticle",
//				data:data,
//				beforeSend: function(xhr) {
//                     xhr.setRequestHeader(header, token);
//	       		},
//				cache:false,
//				contentType:false,
//				processData:false,
//				timeout: 600000,
//				success:function(data){
//					 
//					 $('#Success').css({"display": "none"}); 
//					 $('#invalid-data').css({"display": "none"}); 
//					 $('#Failure').css({"display": "none"});
//					
//					 if(data[0]==="Success"){
//						 $('#Success').css({"display": "block"});
//					 }else if(data[0]==="failure"){
//						 $('#Failure').css({"display": "block"});
//					 }else{
//						 $('#invalid-data').css({"display": "block"}); 
//					 }
//					
//				
//				},
//			
//			error : function(err){
//				console.log("not working. ERROR: "+JSON.stringify(err));
//				}
//	
//		});
//	}
	
	
function fire_ajax_submit_Article(){
		
		var form=$('#uploadUpdateArticle')[0];
		var data=new FormData(form);
		
		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");
		
		var urlPassed;
	
    	urlPassed= projectPath+"updateArticle";
	
    	
			$.ajax({
				type: "POST",
				enctype: 'multipart/form-data',
				url: urlPassed,
				data:data,
				beforeSend: function(xhr) {
                     xhr.setRequestHeader(header, token);
	       		},
				cache:false,
				contentType:false,
				processData:false,
				timeout: 600000,
				success:function(data){
					 
					 $('#SuccessArticle').css({"display": "none"}); 
					 $('#invalid-dataArticle').css({"display": "none"}); 
					 $('#FailureArticle').css({"display": "none"});
					
					 if(data[0]==="Success"){
						 $('#SuccessArticle').css({"display": "block"});
					 }else if(data[0]==="failure"){
						 $('#FailureArticle').css({"display": "block"});
					 }else{
						 $('#invalid-dataArticle').css({"display": "block"}); 
					 }
					
				
				},
			
			error : function(err){
				console.log("not working. ERROR: "+JSON.stringify(err));
				}
	
		});
	}
/* -------------------------------------------------------END--------------------------------------------------------------------------------------*/

/* ---------------------------------------------AJAX FUNCTION FOR DOCUMENT--------------------------------------------------------------------*/
	function fire_ajax_submit_Document(){
		
		var form=$('#uploadUpdateDocument')[0];
		var data=new FormData(form);
		
		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");
		
		var urlPassed;
		
    	urlPassed= projectPath+"updateDocument";
	
    	
			$.ajax({
				type: "POST",
				enctype: 'multipart/form-data',
				url: urlPassed,
				data:data,
				beforeSend: function(xhr) {
                     xhr.setRequestHeader(header, token);
	       		},
				cache:false,
				contentType:false,
				processData:false,
				timeout: 600000,
				success:function(data){
					 
					 $('#SuccessDocument').css({"display": "none"}); 
					 $('#invalid-dataDocument').css({"display": "none"}); 
					 $('#FailureDocument').css({"display": "none"});
					
					 if(data[0]==="Success"){
						 $('#SuccessDocument').css({"display": "block"});
						// $('#updateDocument').prop('disabled',true);
					 }else if(data[0]==="failure"){
						// $('#FailureDocument').css({"display": "block"});
					 }else{
						 $('#invalid-dataDocument').css({"display": "block"}); 
						// $('#updateDocument').prop('disabled',true);
					 }
					
				
				},
			
			error : function(err){
				console.log("not working. ERROR: "+JSON.stringify(err));
				}
	
		});
	}
	
//function fire_ajax_submit_DocumentOnUser(){
//		
//		var form=$('#uploadUserDocument')[0];
//		var data=new FormData(form);
//		
//		var token = $("meta[name='_csrf']").attr("content");
//		var header = $("meta[name='_csrf_header']").attr("content");
//	
//			$.ajax({
//				type: "POST",
//				enctype: 'multipart/form-data',
//				url:/* projectPath+*/"/updateDocument",
//				data:data,
//				beforeSend: function(xhr) {
//                     xhr.setRequestHeader(header, token);
//	       		},
//				cache:false,
//				contentType:false,
//				processData:false,
//				timeout: 600000,
//				success:function(data){
//					 
//					 $('#SuccessDocument').css({"display": "none"}); 
//					 $('#invalid-dataDocument').css({"display": "none"}); 
//					 $('#FailureDocument').css({"display": "none"});
//					
//					 if(data[0]==="Success"){
//						 $('#SuccessDocument').css({"display": "block"});
//					 }else if(data[0]==="failure"){
//						 $('#FailureDocument').css({"display": "block"});
//					 }else{
//						 $('#invalid-dataDocument').css({"display": "block"}); 
//					 }
//					
//				
//				},
//			
//			error : function(err){
//				console.log("not working. ERROR: "+JSON.stringify(err));
//				}
//	
//		});
//	}
/* -------------------------------------------------------END--------------------------------------------------------------------------------------*/

/* ---------------------------------------------AJAX FUNCTION FOR PHETS--------------------------------------------------------------------*/
//	function fire_ajax_submit_Phet(){
//		
//		var form=$('#uploadPhet')[0];
//		var data=new FormData(form);
//		
//		var token = $("meta[name='_csrf']").attr("content");
//		var header = $("meta[name='_csrf_header']").attr("content");
//	
//			$.ajax({
//				type: "POST",
//				enctype: 'multipart/form-data',
//				url:/* projectPath+*/"/updatePhet",
//				data:data,
//				beforeSend: function(xhr) {
//                     xhr.setRequestHeader(header, token);
//	       		},
//				cache:false,
//				contentType:false,
//				processData:false,
//				timeout: 600000,
//				success:function(data){
//					 
//					 $('#Success').css({"display": "none"}); 
//					 $('#invalid-data').css({"display": "none"}); 
//					 $('#Failure').css({"display": "none"});
//					
//					 if(data[0]==="Success"){
//						 $('#Success').css({"display": "block"});
//					 }else if(data[0]==="failure"){
//						 $('#Failure').css({"display": "block"});
//					 }else{
//						 $('#invalid-data').css({"display": "block"}); 
//					 }
//					
//				
//				},
//			
//			error : function(err){
//				console.log("not working. ERROR: "+JSON.stringify(err));
//				}
//	
//		});
//	}
	
	function fire_ajax_submit_Phet(){
		
		var form=$('#uploadUpdatePhet')[0];
		var data=new FormData(form);
		
		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");
		
		var urlPassed;
	
    	urlPassed= projectPath+"updatePhet";
	
			$.ajax({
				type: "POST",
				enctype: 'multipart/form-data',
				url: urlPassed,
				data:data,
				beforeSend: function(xhr) {
                     xhr.setRequestHeader(header, token);
	       		},
				cache:false,
				contentType:false,
				processData:false,
				timeout: 600000,
				success:function(data){
					 
					 $('#SuccessPhet').css({"display": "none"}); 
					 $('#invalid-dataPhet').css({"display": "none"}); 
					 $('#FailurePhet').css({"display": "none"});
					
					 if(data[0]==="Success"){
						 $('#SuccessPhet').css({"display": "block"});
					 }else if(data[0]==="failure"){
						 $('#FailurePhet').css({"display": "block"});
					 }else{
						 $('#invalid-dataPhet').css({"display": "block"}); 
					 }
					
				
				},
			
			error : function(err){
				console.log("not working. ERROR: "+JSON.stringify(err));
				}
	
		});
	}
/* -------------------------------------------------------END--------------------------------------------------------------------------------------*/

/*-----------------------------------------------AJAX FUNCTION FOR LESSON PLAN-----------------------------------------------------------------------*/
function fire_ajax_submit_Lesson(){
		
		var form=$('#uploadUpdateLesson')[0];
		var data=new FormData(form);
		
		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");
		
		var urlPassed;
		
    	urlPassed= projectPath+"updateLesson";
	
    
			$.ajax({
				type: "POST",
				enctype: 'multipart/form-data',
				url: urlPassed,
				data:data,
				beforeSend: function(xhr) {
                     xhr.setRequestHeader(header, token);
	       		},
				cache:false,
				contentType:false,
				processData:false,
				timeout: 600000,
				success:function(data){
					 
					 $('#SuccessLesson').css({"display": "none"}); 
					 $('#invalid-dataLesson').css({"display": "none"}); 
					 $('#FailureLesson').css({"display": "none"});
					
					 if(data[0]==="Success"){
						 $('#SuccessLesson').css({"display": "block"});
					 }else if(data[0]==="failure"){
						 $('#FailureLesson').css({"display": "block"});
					 }else{
						 $('#invalid-dataLesson').css({"display": "block"}); 
					 }
					
				
				},
			
			error : function(err){
				console.log("not working. ERROR: "+JSON.stringify(err));
				}
	
		});
	}

//	function fire_ajax_submit_LessonOnUser(){
//	
//	var form=$('#uploadUserLesson')[0];
//	var data=new FormData(form);
//	
//	var token = $("meta[name='_csrf']").attr("content");
//	var header = $("meta[name='_csrf_header']").attr("content");
//
//		$.ajax({
//			type: "POST",
//			enctype: 'multipart/form-data',
//			url: /*projectPath+*/"/updateLesson",
//			data:data,
//			beforeSend: function(xhr) {
//                 xhr.setRequestHeader(header, token);
//       		},
//			cache:false,
//			contentType:false,
//			processData:false,
//			timeout: 600000,
//			success:function(data){
//				 
//				 $('#SuccessLesson').css({"display": "none"}); 
//				 $('#invalid-dataLesson').css({"display": "none"}); 
//				 $('#FailureLesson').css({"display": "none"});
//				
//				 if(data[0]==="Success"){
//					 $('#SuccessLesson').css({"display": "block"});
//				 }else if(data[0]==="failure"){
//					 $('#FailureLesson').css({"display": "block"});
//				 }else{
//					 $('#invalid-dataLesson').css({"display": "block"}); 
//				 }
//				
//			
//			},
//		
//		error : function(err){
//			console.log("not working. ERROR: "+JSON.stringify(err));
//			}
//
//	});
//}
	
/**************************************************************START OF ADDING MATERIAL TO DATABASE********************************************/
	
/*----------------------------------------------------- ARTICLE --------------------------------------------------------------------------*/
	function addArticle(){
		
		var form=$('#uploadArticle')[0];
		var data=new FormData(form);
		
		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");
		
		var urlPassed;
	
    	urlPassed= projectPath+"addArticleFromUser";
	
    	
			$.ajax({
				type: "POST",
				enctype: 'multipart/form-data',
				url: urlPassed,
				data:data,
				beforeSend: function(xhr) {
                     xhr.setRequestHeader(header, token);
	       		},
				cache:false,
				contentType:false,
				processData:false,
				timeout: 600000,
				success:function(data){
					 
					 $('#SuccessArticleReturnStatusArticle').css({"display": "none"}); 
					  
					 $('#FailureArticleReturnStatusArticle').css({"display": "none"});
					
					 if(data[0]==="Success"){
						 $('#SuccessArticleReturnStatusArticle').css({"display": "block"});
						 $('#addArticlefromUser').prop('disabled',true);
					 }else {
						 $('#FailureArticleReturnStatusArticle').css({"display": "block"});
						 $('#addArticlefromUser').prop('disabled',true);
					 }
					 
					 $('#subjectArticle').prop('disabled',true);
					 
					 $('#topicArticle').prop('disabled',true);
					 $('#descriptionArticle').prop('disabled',true);
					 $('#descriptionArticle').prop('value',"");
					 $('#urlArticle').prop('disabled',true);
					 $('#urlArticle').prop('value',"");
					 $('#sourceArticle').prop('disabled',true);
					 $('#sourceArticle').prop('value',"");
					 
					 
					 
					
				
				},
			
			error : function(err){
				console.log("not working. ERROR: "+JSON.stringify(err));
				}
	
		});
	}
	
	
	function addQuiz(){
		
		var form=$('#uploadQuiz')[0];
		var data=new FormData(form);
		
		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");
		
		var urlPassed;
	
    	urlPassed= projectPath+"addQuizFromUser";
	
			$.ajax({
				type: "POST",
				enctype: 'multipart/form-data',
				url:urlPassed,
				data:data,
				beforeSend: function(xhr) {
                     xhr.setRequestHeader(header, token);
	       		},
				cache:false,
				contentType:false,
				processData:false,
				timeout: 600000,
				success:function(data){
					 
					$('#SuccessArticleReturnStatusQuiz').css({"display": "none"}); 
					  
					 $('#FailureArticleReturnStatusQuiz').css({"display": "none"});
					
					 if(data[0]==="Success"){
						 $('#SuccessArticleReturnStatusQuiz').css({"display": "block"});
					 }else {
						 $('#FailureArticleReturnStatusQuiz').css({"display": "block"});
					 }
					 
					 $('#addQuizfromUser').prop('disabled',true);
					 
					 $('#subjectQuiz').prop('disabled',true);
					 
					 $('#topicQuiz').prop('disabled',true);
					 
					 $('#remarksQuiz').prop('disabled',true);
					 $('#remarksQuiz').prop('value',"");
					 
					 $('#QuestionQuiz').prop('disabled',true);
					 $('#QuestionQuiz').prop('value',"");
					 
					 $('#AnswerQuiz').prop('disabled',true);
					 $('#AnswerQuiz').prop('value',"");
					
				
				},
			
			error : function(err){
				console.log("not working. ERROR: "+JSON.stringify(err));
				}
	
		});
	}
	
	
function addLesson(){
		
		var form=$('#uploadLesson')[0];
		var data=new FormData(form);
		
		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");
		
		var urlPassed;
	
    	urlPassed= projectPath+"addLessonFromUser";
	
    	
			$.ajax({
				type: "POST",
				enctype: 'multipart/form-data',
				url: urlPassed,
				data:data,
				beforeSend: function(xhr) {
                     xhr.setRequestHeader(header, token);
	       		},
				cache:false,
				contentType:false,
				processData:false,
				timeout: 600000,
				success:function(data){
					 
					$('#SuccessArticleReturnStatusLesson').css({"display": "none"}); 
					  
					 $('#FailureArticleReturnStatusLesson').css({"display": "none"});
					
					 if(data[0]==="Success"){
						 $('#SuccessArticleReturnStatusLesson').css({"display": "block"});
					 }else {
						 $('#FailureArticleReturnStatusLesson').css({"display": "block"});
					 }
					 
					 $('#addLessonfromUser').prop('disabled',true);
					 $('#subjectLesson').prop('disabled',true);
					 
					 $('#topicLesson').prop('disabled',true);
					 
					 $('#lesson').prop('disabled',true);
					 $('#lesson').prop('value',"");
					 
				
					
				
				},
			
			error : function(err){
				console.log("not working. ERROR: "+JSON.stringify(err));
				}
	
		});
	}

function addPhet(){
	
	var form=$('#uploadPhet')[0];
	var data=new FormData(form);
	
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	
	var urlPassed;
	
	urlPassed= projectPath+"addPhetFromUser";

	
		$.ajax({
			type: "POST",
			enctype: 'multipart/form-data',
			url:urlPassed,
			data:data,
			beforeSend: function(xhr) {
                 xhr.setRequestHeader(header, token);
       		},
			cache:false,
			contentType:false,
			processData:false,
			timeout: 600000,
			success:function(data){
				 
				$('#SuccessArticleReturnStatusPhet').css({"display": "none"}); 
				  
				 $('#FailureArticleReturnStatusPhet').css({"display": "none"});
				
				 if(data[0]==="Success"){
					 $('#SuccessArticleReturnStatusPhet').css({"display": "block"});
				 }else {
					 $('#FailureArticleReturnStatusPhet').css({"display": "block"});
				 }
				 
				 $('#addPhetfromUser').prop('disabled',true);
				 $('#subjectPhet').prop('disabled',true);
				 
				 $('#topicPhet').prop('disabled',true);
				 
				 $('#descriptionPhet').prop('disabled',true);
				 $('#descriptionPhet').prop('value',"");
				 
				 $('#Embedphet').prop('disabled',true);
				 $('#Embedphet').prop('value',"");
				 
				 $('#sourcePhet').prop('disabled',true);
				 $('#sourcePhet').prop('value',"");
				
			
			},
		
		error : function(err){
			console.log("not working. ERROR: "+JSON.stringify(err));
			}

	});
}


function addDocument(){
	
	var form=$('#uploadDocument')[0];
	var data=new FormData(form);
	
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	
	var urlPassed;

	urlPassed= projectPath+"addDocumentFromUser";

	
		$.ajax({
			type: "POST",
			enctype: 'multipart/form-data',
			url: urlPassed,
			data:data,
			beforeSend: function(xhr) {
                 xhr.setRequestHeader(header, token);
       		},
			cache:false,
			contentType:false,
			processData:false,
			timeout: 600000,
			success:function(data){
				 
				$('#SuccessArticleReturnStatusDocument').css({"display": "none"}); 
				  
				 $('#FailureArticleReturnStatusDocument').css({"display": "none"});
				
				 if(data[0]==="Success"){
					 $('#SuccessArticleReturnStatusDocument').css({"display": "block"});
				 }else {
					 $('#FailureArticleReturnStatusDocument').css({"display": "block"});
				 }
				 
				 $('#addDocumentfromUser').prop('disabled',true);
				 
				 $('#subjectDocument').prop('disabled',true);
				 
				 $('#topicDocument').prop('disabled',true);
				 
				 $('#descriptionDocument').prop('disabled',true);
				 $('#descriptionDocument').prop('value',"");
				 
				 $('#UrlDocument').prop('disabled',true);
				 $('#UrlDocument').prop('value',"");
				 
				 $('#sourceDocument').prop('disabled',true);
				 $('#sourceDocument').prop('value',"");
				
			
			},
		
		error : function(err){
			console.log("not working. ERROR: "+JSON.stringify(err));
			}

	});
}

function addConcept(){
	
	var form=$('#uploadConcept')[0];
	var data=new FormData(form);
	
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	
	var urlPassed;
	
	urlPassed= projectPath+"addConceptFromUser";

	
		$.ajax({
			type: "POST",
			enctype: 'multipart/form-data',
			url:urlPassed,
			data:data,
			beforeSend: function(xhr) {
                 xhr.setRequestHeader(header, token);
       		},
			cache:false,
			contentType:false,
			processData:false,
			timeout: 600000,
			success:function(data){
				 
				$('#SuccessArticleReturnStatusConcept').css({"display": "none"}); 
				  
				 $('#FailureArticleReturnStatusConcept').css({"display": "none"});
				
				 if(data[0]==="Success"){
					 $('#SuccessArticleReturnStatusConcept').css({"display": "block"});
				 }else {
					 $('#FailureArticleReturnStatusConcept').css({"display": "block"});
				 }
				 
				 $('#addConceptfromUser').prop('disabled',true);
				 $('#subjectConcept').prop('disabled',true);
				 
				 $('#topicConcept').prop('disabled',true);
				 
				 $('#descriptionConceptMap').prop('disabled',true);
				 $('#descriptionConceptMap').prop('value',"");
				 
				 $('#headlineConceptMap').prop('disabled',true);
				 $('#headlineConceptMap').prop('value',"");
				 
				 $('#conceptMapImage').prop('disabled',true);
				 $('#conceptMapImage').prop('value',"");
				
			
			},
		
		error : function(err){
			console.log("not working. ERROR: "+JSON.stringify(err));
			}

	});
}

function addVideo(){
	
	var form=$('#uploadVideo')[0];
	var data=new FormData(form);
	
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	
	var urlPassed;
	urlPassed= projectPath+"addVideoFromUser";

		$.ajax({
			type: "POST",
			enctype: 'multipart/form-data',
			url: urlPassed,
			data:data,
			beforeSend: function(xhr) {
                 xhr.setRequestHeader(header, token);
       		},
			cache:false,
			contentType:false,
			processData:false,
			timeout: 600000,
			success:function(data){
				
				$('#SuccessArticleReturnStatusVideo').css({"display": "none"}); 
				  
				 $('#FailureArticleReturnStatusVideo').css({"display": "none"});
				
				 if(data[0]==="Success"){
					 $('#SuccessArticleReturnStatusVideo').css({"display": "block"});
				 }else {
					 $('#FailureArticleReturnStatusVideo').css({"display": "block"});
				 }
				 
				 $('#addVideofromUser').prop('disabled',true);
				 
				 $('#subjectVideo').prop('disabled',true);
				 
				 $('#topicVideo').prop('disabled',true);
				 
				 $('#descriptionVideo').prop('disabled',true);
				 $('#descriptionVideo').prop('value',"");
				 
				 $('#urlVideo').prop('disabled',true);
				 $('#urlVideo').prop('value',"");
				 
				 $('#sourceVideo').prop('disabled',true);
				 $('#sourceVideo').prop('value',"");
				
			
			},
		
		error : function(err){
			console.log("not working. ERROR: "+JSON.stringify(err));
			}

	});
}

/*---------------------------------------Profile picture update Ajax call-------------------------------*/

function updateProfilePicture(){
	
	var form=$('#uploadProfilePic')[0];
	var data=new FormData(form);
	
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	
	var urlPassed;
	
	urlPassed= projectPath+"updateProfilePic";


		$.ajax({
			type: "POST",
			enctype: 'multipart/form-data',
			url: urlPassed,
			data:data,
			beforeSend: function(xhr) {
                 xhr.setRequestHeader(header, token);
       		},
			cache:false,
			contentType:false,
			processData:false,
			timeout: 600000,
			success:function(data){
				
				 $('#chngProfilePic').prop('disabled',true);
				 $('#profileText').css({"display": "block"});
				
			
			},
		
		error : function(err){
			console.log("not working. ERROR: "+JSON.stringify(err));
			}

	});
	
	
}


function readImageUrl(input) {
	  if (input.files && input.files[0]) {
	    var reader = new FileReader();
	    
	    reader.onload = function(e) {
	      $('#pictureShow').attr('src', e.target.result);
	    }
	    
	    reader.readAsDataURL(input.files[0]); // convert to base64 string
	  }
	}


/****************************** UPDATING EVENT DATA *****************************************************/
function fire_ajax_submit_Event(){
	
	var form=$('#uploadUpdateEvent')[0];
	var data=new FormData(form);
	
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	
	var urlPassed;
	
	urlPassed= projectPath+"updateEvent";
	
	$.ajax({
		type: "POST",
		enctype: 'multipart/form-data',
		url: urlPassed,
		data:data,
		beforeSend: function(xhr) {
             xhr.setRequestHeader(header, token);
   		},
		cache:false,
		contentType:false,
		processData:false,
		timeout: 600000,
		 success: function (data){
			 
			 $('#Success').css({"display": "none"}); 
			 $('#Failure').css({"display": "none"});
		
			 if(data[0]==="Success"){
				 $('#Success').css({"display": "block"});
			 }else if(data[0]==="failure"){
				 $('#Failure').css({"display": "block"});
			 }
		
		},
		
		error : function(err){
			console.log("not working. ERROR: "+JSON.stringify(err));
		}
		
	});
}


/*****************************END******************************************************************/


/**************************   comment Reply visibility for all Content  *********************************************/

function reply(caller){
	
	var commentid=$(caller).attr('com-id');
	$('.commentVideoModalReply').attr('id', commentid);
//	alert("1:"+commentid);
//	alert("2:"+$('.commentVideoModalReply').attr('id'));
	

	$('.replyRowVideo').insertAfter($(caller));
	$('.replyRowVideo').show();
}

function replyDocument(caller){
	
	var commentid=$(caller).attr('com-id');
	$('.commentDocumentModalReply').attr('id', commentid);
//	alert("1:"+commentid);
//	alert("2:"+$('.commentDocumentModalReply').attr('id'));
	

	$('.replyRowDocument').insertAfter($(caller));
	$('.replyRowDocument').show();
}

function replyArticle(caller){
	
	var commentid=$(caller).attr('com-id');
	$('.commentArticleModalReply').attr('id', commentid);
//	alert("1:"+commentid);
//	alert("2:"+$('.commentArticleModalReply').attr('id'));
	

	$('.replyRowArticle').insertAfter($(caller));
	$('.replyRowArticle').show();
}

function replyPhet(caller){
	
	var commentid=$(caller).attr('com-id');
	$('.commentPhetModalReply').attr('id', commentid);
//	alert("1:"+commentid);
//	alert("2:"+$('.commentPhetModalReply').attr('id'));
	

	$('.replyRowPhet').insertAfter($(caller));
	$('.replyRowPhet').show();
}

function replyQuiz(caller){
	
	var commentid=$(caller).attr('com-id');
	$('.commentQuizModalReply').attr('id', commentid);
//	alert("1:"+commentid);
//	alert("2:"+$('.commentQuizModalReply').attr('id'));
	replyConcept

	$('.replyRowQuiz').insertAfter($(caller));
	$('.replyRowQuiz').show();
}

function replyLesson(caller){
	
	var commentid=$(caller).attr('com-id');
	$('.commentLessonModalReply').attr('id', commentid);
//	alert("1:"+commentid);
//	alert("2:"+$('.commentLessonModalReply').attr('id'));
	

	$('.replyRowLesson').insertAfter($(caller));
	$('.replyRowLesson').show();
}

function replyConcept(caller){
	
	var commentid=$(caller).attr('com-id');
	$('.commentConceptModalReply').attr('id', commentid);
//	alert("1:"+commentid);
//	alert("2:"+$('.commentLessonModalReply').attr('id'));
	

	$('.replyRowConcept').insertAfter($(caller));
	$('.replyRowConcept').show();
}


function validateEmail($email) {
	  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	  return emailReg.test( $email );
}
	
/*-----------------------------------------------------END-----------------------------------------------------------------------------------------*/