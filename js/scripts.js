$(function(){
	/*去掉手机滑动默认行为*/
	$(document).on('touchmove', function (event) {
	    event.preventDefault();
	});
	//上传图片

	//获取路径
	function previewImage(obj,id){
		var Orientation = null;
		var ImageWidth = null;
		var ImageHeight = null;
		var oFile = obj.files[0];
		var oImage = document.getElementById(id);
	 	var oReader = new FileReader();
        if(oFile){
	        EXIF.getData(oFile, function() {  
	            EXIF.getAllTags(this);   
	            Orientation = EXIF.getTag(this, 'Orientation');  
	            ImageWidth = EXIF.getTag(this,'ImageWidth');
	            ImageHeight = EXIF.getTag(this,'ImageHeight');
	        });        	
        	oReader.readAsDataURL(oFile);
        }
        oReader.onload = function(e){
	        oImage.src = e.target.result;
	        oImage.setAttribute("orientation",Orientation);
			oImage.onload = function(){
	    		var ratio = getRatio(oImage);
	    		oImage.style.width = ImageWidth*ratio+'px';
	    		oImage.style.height = ImageHeight*ratio+'px';
	    		console.log(ImageWidth+","+ImageHeight+","+ratio);
	    		console.log(oImage.style.width+","+oImage.style.height);				
			}
        }
	}
	$("#upload-file").on("change",function(){
		var newImg = document.createElement("img");
		newImg.id = "preview";
		$(".img-view").append(newImg);
		previewImage(this,"preview");
	    var imgInfo = $("#preview").attr("orientation");
	    if (navigator.userAgent.match(/iphone/i)) {
            console.log('iphone');
            if(imgInfo != "" && imgInfo != 1){
				console.log(imgInfo);
		        switch(imgInfo){
		            case 6://需要顺时针（向左）90度旋转 
		                alert('需要顺时针（向左）90度旋转');
		                $("#preview").css({"-webkit-transform":"rotate(90deg)","transform":"rotate(90deg)"});
		                break;
		            case 8://需要逆时针（向右）90度旋转
		                //alert('需要顺时针（向右）90度旋转');
$("#preview").css({"-webkit-transform":"rotate(90deg)","transform":"rotate(-90deg)"});
		                break;
		            case 3://需要180度旋转 
		                //alert('需要180度旋转');
$("#preview").css({"-webkit-transform":"rotate(90deg)","transform":"rotate(180deg)"});
		                break; 
		        }
            }
       	}
		$("#preview").css({"left":0,"right":0,"margin":"auto","top":0,"height":"100%"})
		$(".img-view").css("zIndex","10");
		$(".upload-img").hide();
		//触摸手势事件处理
		var hammertime = new Hammer(document.querySelector(".container"));	
		//绑定移动事件pan
		var test_left,test_top;		
		hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });   //使垂直或所有方向的pan识别器,,（没调用的话 上下滑动不太灵）
		hammertime.on("panstart", function (e) {   //添加拖动开始事件 panstart
			test_left = parseFloat($("#preview").css('left'));
			test_top = parseFloat($("#preview").css('top'));
		})				
		hammertime.on("panmove", function (e) {	   //添加拖动移动事件 panmove
			$("#preview").css('top',(test_top + e.deltaY));		
			$("#preview").css('left',(test_left + e.deltaX));						
			console.log(e);   //控制台输出
		});		
		//绑定两手指缩放事件pinch
    	//hammertime.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([hammertime.get('pan'), hammertime.get('rotate')]);
		hammertime.add(new Hammer.Pinch());   //监听pinch
		//hammertime.get('pinch').set({ enable: true });  //同上作用			
		var initScale;
		var n_scale = 1;//缩放其实为1倍
		hammertime.on("pinchstart", function(e){
			initScale = n_scale;			
		}); 				
		hammertime.on("pinchmove", function(e){
			var imgHeight = $("#preview").height();
			$("#preview").css({"height":imgHeight*n_scale});
//			n_scale = initScale * e.scale;
//			var transcale = 'scale(' + n_scale + ')';
//			$("#preview").css('-webkit-transform',transcale);  			
             console.log(e);   //控制台输出
		});	
		hammertime.on("pinchin",function(e){
			n_scale = 0.99;
		});
		hammertime.on("pinchout",function(e){
			n_scale = 1.01;
		});
/*		//旋转
		hammertime.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(hammertime.get('pinch'));	
		var initAngle;
		var n_angle = 0;
		hammertime.on("rotatestart", function(e){
			initAngle = n_angle;			
			//alert("111");
		}); 				
		hammertime.on("rotatemove", function(e){
			n_angle = initAngle + e.rotation ;
			var tranangle = 'rotate(' + n_angle + 'deg)';
			$("#preview").css('-webkit-transform',tranangle);  			
             console.log(e);   //控制台输出
		});	*/	
	});
	$("#upload-file1").on("change",function(){
		var newImg1 = document.createElement("img");
		newImg1.id = "preview1";
		$(".img-view1").append(newImg1);
		previewImage(this,"preview1");
	    var imgInfo1 = $("#preview1").attr("orientation");
	    if (navigator.userAgent.match(/iphone/i)) {
            console.log('iphone');
            if(imgInfo1 != "" && imgInfo1 != 1){
		        switch(imgInfo1){
		            case 6://需要顺时针（向左）90度旋转 
		                alert('需要顺时针（向左）90度旋转');
		                $("#preview1").css({"-webkit-transform":"rotate(90deg)","transform":"rotate(90deg)"});
		                break;
		            case 8://需要逆时针（向右）90度旋转
		                //alert('需要顺时针（向右）90度旋转');
$("#preview1").css({"-webkit-transform":"rotate(90deg)","transform":"rotate(-90deg)"});
		                break;
		            case 3://需要180度旋转 
		                //alert('需要180度旋转');
$("#preview1").css({"-webkit-transform":"rotate(90deg)","transform":"rotate(180deg)"});
		                break; 
		        }
            }
       	}		
		$("#preview1").css({"left":0,"right":0,"margin":"auto","top":0,"height":"100%"})
		$(".img-view1").css("zIndex","10");
		$(".upload-img1").hide();
		//触摸手势事件处理
		var hammertime1 = new Hammer(document.querySelector(".container1"));	
		//绑定移动事件pan
		var test_left1,test_top1;		
		hammertime1.get('pan').set({ direction: Hammer.DIRECTION_ALL });   //使垂直或所有方向的pan识别器,,（没调用的话 上下滑动不太灵）		
		hammertime1.on("panstart", function (e) {   //添加拖动开始事件 panstart
			test_left1 = parseFloat($("#preview1").css('left'));
			test_top1 = parseFloat($("#preview1").css('top'));
		})				
		hammertime1.on("panmove", function (e) {	   //添加拖动移动事件 panmove
			$("#preview1").css('top',(test_top1 + e.deltaY));		
			$("#preview1").css('left',(test_left1 + e.deltaX));						
			console.log(e);   //控制台输出
		});
		//绑定两手指缩放事件pinch
		//hammertime1.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([hammertime1.get('pan'), hammertime1.get('rotate')]);
		hammertime1.add(new Hammer.Pinch());   //监听pinch
		//hammertime.get('pinch').set({ enable: true });  //同上作用
		var initScale1;
		var n_scale1 = 1;//缩放其实为1倍
		hammertime1.on("pinchstart", function(e){
			initScale1 = n_scale1;
		});
		hammertime1.on("pinchmove", function(e){
			var imgHeight1 = $("#preview1").height();
			$("#preview1").css({"height":imgHeight1*n_scale1});
//			n_scale1 = initScale1 * e.scale
//			var transcale1 = 'scale(' + n_scale1 + ')';
//			$("#preview1").css('-webkit-transform',transcale1);
             console.log(e);   //控制台输出
		});
		hammertime1.on("pinchin",function(e){
			n_scale1 = 0.99;
		});
		hammertime1.on("pinchout",function(e){
			n_scale1 = 1.01;
		});
/*		//旋转
		hammertime1.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(hammertime1.get('pinch'));
		var initAngle1;
		var n_angle1 = 0;
		hammertime1.on("rotatestart", function(e){
			initAngle1 = n_angle1;
			//alert("111");
		}); 				
		hammertime1.on("rotatemove", function(e){
			n_angle1 = initAngle1 + e.rotation ;
			var tranangle1 = 'rotate(' + n_angle1 + 'deg)';
			$("#preview1").css('-webkit-transform',tranangle1);
             console.log(e);   //控制台输出
		});	*/
	});
	function getRatio(img) {
		if(/png$/i.test(img.src)) {
			return 1;
		}
		var iw = img.naturalWidth, ih = img.naturalHeight;
		var canvas = document.createElement('canvas');
		canvas.width = 1;
		canvas.height = ih;
		var ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0);
		var data = ctx.getImageData(0, 0, 1, ih).data;
		var sy = 0;
		var ey = ih;
		var py = ih;
		while (py > sy) {
			var alpha = data[(py - 1) * 4 + 3];
			if (alpha === 0) {
				ey = py;
			} else {
				sy = py;
			}
			py = (ey + sy) >> 1;
		}
		var ratio = (py / ih);
		return (ratio===0)?1:ratio;
	}
	function addDate(split){
		//添加日期水印
		var dayArr = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
		var myDate = new Date();
		var year = myDate.getFullYear();
		var month = checkTime(myDate.getMonth() + 1);
		var day = checkTime(myDate.getDate());
		var weekDay = myDate.getDay();
		var hours = checkTime(myDate.getHours());
		var minutes = checkTime(myDate.getMinutes());
		var seconds = checkTime(myDate.getSeconds());	
		var time = year+split+month+split+day+" "+dayArr[weekDay]+" "+hours+":"+minutes+":"+seconds
		if(!$('body').find('span').hasClass('time-mark')){
			var span = document.createElement("span");
			span.setAttribute('class','time-mark');
			span.innerHTML = time;
			span.style.cssText = "font-size: 16px;font-family: cursive,'microsoft yahei';position: fixed;right: 10px;bottom: 10px;background: rgba(0,0,0,.2);z-index: 10000;color: #fff;padding: 0 3px;" 
			document.getElementById("wrapper").appendChild(span);
		}else{
			$('.time-mark').html(time);
			$('.time-mark').show();
		}
	}
	function checkTime(i){
		if (i<10) 
		  {i="0" + i}
		return i
	}
	function disp_confirm(){
	  var r=confirm("是否添加日期水印？")
	  if (r==true){
	    addDate("-");
	  }
	}
			
	var dataUrl = "";
	$("#share-btn").on("touchstart click", function(event){
        event.preventDefault(); 
        addDate("-");
		$(".wrapper_7 #preview").addClass("blur");
		$(".btns,.btns1").hide();
		$(this).hide();
		//alert("buttons hide!");
		$(".flow-image").css("zIndex",3);
		try{
			html2canvas(document.body, {
	            allowTaint: true,
	            taintTest: false,
	            onrendered: function(canvas) {
	                canvas.id = "mycanvas";
	                //document.body.appendChild(canvas);
	                //生成base64图片数据 
	                
	                dataUrl = canvas.toDataURL();
	                var newImage = document.createElement("img");
	                newImage.id = "view";
	                newImage.src =  dataUrl;
	                document.body.appendChild(newImage);
					$("#save-img").show().css({"zIndex":3});
					$("#cancel").show().css({"zIndex":3});
					//alert("buttons show");
	            }
			});
        }catch(e){
        	console.log(e.message);
        }
        $("span.time-mark").hide();
	});
    $("#save-img").click(function(){
		//将图片上传到服务器用作图片分享  
		$("#shclFireballs").show();
		$("#shclFireballs .tips").html("上传中，请稍候...");
		var param = {};
		param['data'] = dataUrl;
        $.ajax({  
            type : "POST",  
            //url : "{:U('/Application/home/File/uploadPicture1',array('session_id'=>session_id()))}", 
			url:"http://wy.xinhee.cn/index.php?s=/home/File/uploadPicture1/session_id/<?php echo session_id();?>",
            data : param,
            timeout : 60000,  
            success : function(data){
             	$("#shclFireballs .tips").html("上传成功！");
             	setTimeout(function(){
             		//服务器上保存图片路径，data是返回的文件名。  
					window.location.href = "http://wy.xinhee.cn/test/show.php?param=/Uploads/Picture/makepic/"+data+"&share=1";  
             	},1000)
            },
            error:function(){
            	$("#shclFireballs .tips").html("上传失败，请重试！");
            	setTimeout(function(){
					$("#shclFireballs").hide();
             	},1000)
            }
    	});
    });
    $("#cancel").click(function(){
    	$("#save-img, #cancel").hide();
    	$(".wrapper_7 #preview").removeClass("blur");
    	$("#share-btn,.btns,.btns1").show();
    	$(".flow-image").css("zIndex",1);
    	$("#view").remove();
    	$("#view").attr("src","null");
    });
})