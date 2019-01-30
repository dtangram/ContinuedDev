class Controller{
  constructor(){
    this.model = new Model();
    this.view = new View();
  }

  inputFunc(inputEmailVal, inputEmail2Val, inputPasswordVal, inputPassword2Val){
    const dataObj = new DataObj();
    dataObj.dataFunc(inputEmailVal, inputEmail2Val, inputPasswordVal, inputPassword2Val);
    this.model.addInputFunc(dataObj);
    this.model.modelFunc();
    this.view.displayInfo();
    this.view.consoleWrite(this.model.inputArray);
  }
}

class Model{
  constructor(){
    this.inputArray = [];
  }

  addInputFunc(inputObj){
    this.inputArray.push(inputObj);
  }

  modelFunc(){
    for(let i = 0; i < this.inputArray.length; i++){
      if(this.inputArray[0].inputEmail == this.inputArray[i].inputEmail2 && this.inputArray[i].inputEmail != null && this.inputArray[i].inputEmail2 != null && this.inputArray[0].inputPassword == this.inputArray[i].inputPassword2 && this.inputArray[i].inputPassword != null && this.inputArray[i].inputPassword2 != null){
        console.log("You are logged in!!!");
        return;
      }

      else if(this.inputArray[0].inputEmail != this.inputArray[i].inputEmail2 || this.inputArray[i].inputEmail == null || this.inputArray[i].inputEmail2 == null || this.inputArray[0].inputPassword != this.inputArray[i].inputPassword2 || this.inputArray[i].inputPassword == null || this.inputArray[i].inputPassword2 == null){
        console.log("Email or password are incorrect");
      }
    }
  }
}

class View{
  constructor(){

  }

  displayInfo(){
    const signupLink = $(".navbar-nav li:nth-child(2)");
    const signinLink = $(".navbar-nav li:nth-child(3)");
    const signup = $("#signup");
    const signin = $("#signin");
    const signupCloseBTN = $("#signup .close");
    const signinCloseBTN = $("#signin .close");
    const signinLinkForm = $("#signup form :last-child a");
    const signupLinkForm = $("#signin form :last-child a");
    const errorName = $(".errorName");
    const errorEmail = $(".errorEmail");
    const errorEmail2 = $(".errorEmail2");
    const errorPassword = $(".errorPassword");
    const errorPassword2 = $(".errorPassword2");

    let nameInput = $(".name");
    let emailInput = $(".email");
    let emailInput2 = $(".email2");
    let passwordInput = $(".password");
    let passwordInput2 = $(".password2");



    $(window).scroll(function(event){
      if($(window).scrollTop() > 940){
        $(".bckColor").stop().animate({"opacity": "1"}, 150);
        $("#bck").stop().animate({"opacity": "0", "display": "none"}, 500);
      }

      if($(window).scrollTop() < 920){
        $(".bckColor").stop().animate({"opacity": "0"}, 200);
        $("#bck").stop().animate({"opacity": "1", "display": "block"}, 200);
      }
  	});



    // FORM VALIDATION
    nameInput.focusout("blur", checkName, false);
    emailInput.focusout("blur", checkEmail, false);
    emailInput2.focusout("blur", checkEmail2, false);
    passwordInput.focusout("blur", checkPassword, false);
    passwordInput2.focusout("blur", checkPassword2, false);

    //NAME VALIDATION
    function checkName(){
      if(this.value.length <= 0){
        nameInput.css("border", "solid 2px #FF0000");
        errorName.html("Enter your name");
      }

      else{
        nameInput.css("border", "0");
        errorName.html("");
      }
    }

    //EMAIL VALIDATION
    function checkEmail(){
      if(this.value.length <= 0){
        emailInput.css("border", "solid 2px #FF0000");
        errorEmail.html("Enter your email address");
      }

      else if(this.value.length > 0 && this.value.length < 12){
        emailInput.css("border", "solid 2px #FF0000");
        errorEmail.html("Not a valid email address");
      }

      else{
        emailInput.css("border", "0");
        errorEmail.html("");
      }
    }

    function checkEmail2(){
      if(this.value.length <= 0){
        emailInput2.css("border", "solid 2px #FF0000");
        errorEmail2.html("Enter your email address");
      }

      else if(this.value.length > 0 && this.value.length < 12){
        emailInput2.css("border", "solid 2px #FF0000");
        errorEmail2.html("Not a valid email address");
      }

      else{
        emailInput2.css("border", "0");
        errorEmail2.html("");
      }
    }

    //PASSWORD VALIDATION
    function checkPassword(){
      if(this.value.length <= 0){
        passwordInput.css("border", "solid 2px #FF0000");
        errorPassword.html("Create a password");
      }

      else if(this.value.length < 8){
        passwordInput.css("border", "solid 2px #FF0000");
        errorPassword.html("Password must have 8 characters");
      }

      else{
        passwordInput.css("border", "0");
        errorPassword.html("");
      }
    }

    function checkPassword2(){
      if(this.value.length <= 0){
        passwordInput2.css("border", "solid 2px #FF0000");
        errorPassword2.html("Create a password");
      }

      else if(this.value.length < 8){
        passwordInput2.css("border", "solid 2px #FF0000");
        errorPassword2.html("Password must have 8 characters");
      }

      else{
        passwordInput2.css("border", "0");
        errorPassword2.html("");
      }
    }
    //

    //CLOSURE FOR SIGNUP AND SIGNIN FORMS
    let formPosition = function(signBTNVar1, signBTNVar2, signVar1, signVar2, inputFocus, signLink, closeBTN){
      let formSignObj = {};

      formSignObj.signBTNVar1 = signBTNVar1;
      formSignObj.signBTNVar2 = signBTNVar2;
      formSignObj.signVar1 = signVar1;
      formSignObj.signVar2 = signVar2;
      formSignObj.inputFocus = inputFocus;
      formSignObj.signLink = signLink;
      formSignObj.closeBTN = closeBTN;

      formSignObj.signFormFunc = function(){
        formSignObj.signBTNVar1 = function(){
          formSignObj.signVar1.css({"display": "block", "z-index": "1001", "position": "fixed"}).stop().animate({"opacity": "1", "margin-top": "0"}, 500,
          function(){
            formSignObj.signVar2.stop().animate({"opacity": "0", "margin-top": "-20"}, 500).css({"display": "none", "z-index": "-5", "position": "absolute"});
            formSignObj.inputFocus.focus();
          });
        };

        $(formSignObj.signLink).on("click", formSignObj.signBTNVar1);

        formSignObj.signBTNVar2 = function(){
          formSignObj.signVar1.stop().animate({"opacity": "0", "margin-top": "-20"}, 500,
          function(){
            formSignObj.signVar1.css({"display": "none", "z-index": "-5", "position": "absolute"});
          });
        };

        $(formSignObj.closeBTN).on("click", formSignObj.signBTNVar2);
      }

      return formSignObj;
    };

    //SIGNUP AND SIGNIN FORMS
    let signupBTN;
    let signUpClick;
    let signinBTN;
    let signInClick;

    let signUpLink = formPosition(signupBTN, signUpClick, signup, signin, nameInput, signupLink, signupCloseBTN).signFormFunc();
    let signInLink = formPosition(signinBTN, signInClick, signin, signup, emailInput2, signinLink, signinCloseBTN).signFormFunc();
    let signinFormLink = formPosition(signinBTN, signInClick, signin, signup, emailInput2, signinLinkForm, signinCloseBTN).signFormFunc();
    let signupFormLink = formPosition(signupBTN, signUpClick, signup, signin, nameInput, signupLinkForm, signupCloseBTN).signFormFunc();

    //LOCAL STORAGE
    let nameInputVal = $(".name").val();
    let emailInputVal = $(".email").val();
    let emailInput2Val = $(".email2").val();
    let passwordInputVal = $(".password").val();
    let passwordInput2Val = $(".password2").val();

    if(localStorage.getItem('nameInputVal') && localStorage.getItem('emailInputVal') && localStorage.getItem('passwordInputVal')){
      $(".name").val(localStorage.getItem('nameInputVal'));
      $(".email").val(localStorage.getItem('emailInputVal'));
      $(".password").val(localStorage.getItem('passwordInputVal'));
    }

    if(localStorage.getItem('emailInput2Val') && localStorage.getItem('passwordInput2Val')){
      $(".email2").val(localStorage.getItem('emailInput2Val'));
      $(".password2").val(localStorage.getItem('passwordInput2Val'));
    }



    //Hamburger menu
    $("header nav img:nth-child(1)").on('click', function(){
      $("header nav").css("background", "#2B2B2B");
      $("header nav").css("padding", "6px");
      $("header nav img:nth-child(1)").css("display", "none");
      $("header nav img:nth-child(2)").css("display", "block");
      $("header nav ul").css("visibility", "visible");
    });

    $("header nav img:nth-child(2)").on('click', function(){
      $("header nav").css("background", "none");
      $("header nav").css("padding", "0");
      $("header nav img:nth-child(2)").css("display", "none");
      $("header nav img:nth-child(1)").css("display", "block");
      $("header nav ul").css("visibility", "hidden");
    });



    /*AUTOMATIC COPYRIGHT YEAR CHANGE*/
    let today = new Date()
    let year = today.getFullYear()
    $("footer div:nth-child(1) p").html(year + ", Music Resurrectus. All rights reserved.");
  }

  consoleWrite(viewArray){
    console.log(viewArray);
  }
}

class DataObj{
  constructor(){

  }

  dataFunc(dataEmail, dataEmail2, dataPassword, dataPassword2){
    this.dataEmail = dataEmail;
    this.dataEmail2 = dataEmail2;
    this.dataPassword = dataPassword;
    this.dataPassword2 = dataPassword2;
  }
}

//SINGLETON CLASS
class Angram_DPW{
  constructor(){
    console.log("Singleton Created");
  }

  static singleMethod(){
    const main = new Controller();
    main.view.displayInfo();

    if(!Angram_DPW._singleInstance){
      Angram_DPW._singleInstance = new Angram_DPW();

      return Angram_DPW._singleInstance;
    }

    else{
      throw "Angram_DPW has already been constructed/instantiated."
    }
  }
}



$(document).ready(function(){
  Angram_DPW.singleMethod();

  const main = new Controller();

  const addFunc = function(){
    let nameInputVal = $(".name").val();
    let emailInputVal = $(".email").val();
    let emailInput2Val = $(".email2").val();
    let passwordInputVal = $(".password").val();
    let passwordInput2Val = $(".password2").val();

    main.inputFunc(emailInputVal, emailInput2Val, passwordInputVal, passwordInput2Val);

    // CLEAR INPUT FIELDS
    $(".name").val("");
    $(".email").val("");
    $(".password").val("");
  };

  $("#signupForm").submit(function(event){
    event.preventDefault();

    let nameInputVal = $(".name").val();
    let emailInputVal = $(".email").val();
    let passwordInputVal = $(".password").val();

    //LOCAL STORAGE
    localStorage.setItem('nameInputVal', nameInputVal);
    localStorage.setItem('emailInputVal', emailInputVal);
    localStorage.setItem('passwordInputVal', passwordInputVal);

    addFunc();
  });

  const signinFunc = function(){
    let nameInputVal = $(".name").val();
    let emailInputVal = $(".email").val();
    let emailInput2Val = $(".email2").val();
    let passwordInputVal = $(".password").val();
    let passwordInput2Val = $(".password2").val();

    main.inputFunc(emailInputVal, emailInput2Val, passwordInputVal, passwordInput2Val);

    // CLEAR INPUT FIELDS
    $(".email2").val("");
    $(".password2").val("");
  };

  $("#signinForm").submit(function(event){
    event.preventDefault();

    let emailInput2Val = $(".email2").val();
    let passwordInput2Val = $(".password2").val();

    //LOCAL STORAGE
    localStorage.setItem('emailInput2Val', emailInput2Val);
    localStorage.setItem('passwordInput2Val', passwordInput2Val);

    signinFunc();
  });


  const logoGraphic = $("#main section:nth-child(3) .logo_graphic");

  logoGraphic.mouseover(function(){
    logoGraphic.removeClass("logo_graphic");
    logoGraphic.addClass("logo_rotate");
  });

  logoGraphic.mouseout(function(){
    logoGraphic.removeClass("logo_rotate");
    logoGraphic.addClass("logo_graphic");
  });
});
