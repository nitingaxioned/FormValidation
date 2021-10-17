// variable decleration for inputs
var fname = document.querySelector("#fname");
var lname = document.querySelector("#lname");
var position = document.querySelector("#position");
var company = document.querySelector("#company");
var company_type = document.querySelector("#company-type");
var country = document.querySelector("#country");
var email = document.querySelector("#email");
var chekbox_yes = document.querySelector("#yes-check-box");
var chekbox_no = document.querySelector("#no-check-box");

// variable decleration for errors
var fname_err = document.querySelector(".fname-err");
var lname_err = document.querySelector(".lname-err");
var position_err = document.querySelector(".position-err");
var company_err = document.querySelector(".company-err");
var company_type_err = document.querySelector(".company-type-err");
var country_err = document.querySelector(".country-err");
var email_err = document.querySelector(".email-err");
var chekbox_err = document.querySelector(".subscription-err");

// variable decleration for form and popup
var popup = document.querySelector(".popup");
var formNode = document.querySelector("form");

// event on input
fname.addEventListener("keyup", function(){ txtValidation(fname.value, fname_err, "First name");});
lname.addEventListener("keyup", function(){ txtValidation(lname.value, lname_err, "Last name");});
position.addEventListener("keyup", function(){ txtValidation(position.value, position_err, "Position");});
company.addEventListener("keyup", function(){ txtValidation(company.value, company_err, "Company name");});
email.addEventListener("focusout", mailValidate);
chekbox_yes.addEventListener("click", chekboxValidateY);
chekbox_no.addEventListener("click", chekboxValidateN);
company_type.addEventListener("focusout", companyTypeValidate);
country.addEventListener("focusout", countryValidate);
company_type.addEventListener("click", function(){company_type_err.classList.add("hide-me");});
country.addEventListener("click", function(){country_err.classList.add("hide-me");});
formNode.addEventListener("submit", onFormSubmit)

function txtValidation(txt, txt_err, inputBox){
    if (txt.trim() != "") {
        txt_err.classList.add("hide-me");
        if (/^[A-Za-z ]+$/.test(txt)) {
            txt_err.classList.add("hide-me");
            if (txt.trim().length <= 15) {
                txt_err.classList.add("hide-me");
                return true;
            } else {
                txt_err.innerHTML = "The "+inputBox+" can be 15 character max";
                txt_err.classList.remove("hide-me");
                return false;
            }
        } else {
            txt_err.innerHTML = "The "+inputBox+" must include alphabetical character only";
            txt_err.classList.remove("hide-me");
            return false;
        }
    } else {
        if (txt == "") {
            txt_err.innerHTML = "The "+inputBox+" field is required";
            txt_err.classList.remove("hide-me");
            return false;
        } else {
            txt_err.innerHTML = "The "+inputBox+" can't be blank space";
            txt_err.classList.remove("hide-me");
            return false;
        }
    }
}

function mailValidate(){
    if (email.value.trim() != "") {
        email_err.classList.add("hide-me");
        if (/^[a-zA-Z._0-9]+@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,5}$/.test(email.value)) {
            return true;
        } else {
            email_err.innerHTML = "invalid email";
            email_err.classList.remove("hide-me");
            return false;
        }
    } else {
        if (email.value == "") {
            email_err.innerHTML = "The Email field is required";
            email_err.classList.remove("hide-me");
            return false;
        } else {
            email_err.innerHTML = "The Email can't be blank space";
            email_err.classList.remove("hide-me");
            return false;
        }
    }
}

function chekboxValidateY(){
    chekbox_err.classList.add("hide-me");
    chekbox_no.checked = false;
    if(chekbox_no.checked)
        return true;
    else
        return false;
}

function chekboxValidateN(){
    chekbox_err.classList.add("hide-me");
    chekbox_yes.checked = false;
    if(chekbox_yes.checked)
        return true;
    else
        return false;
}

function companyTypeValidate(){
    if(company_type.value != "")
        return true;
    else{
        company_type_err.innerHTML = "Please select your Company type"
        company_type_err.classList.remove("hide-me");
        return false;
    }
}

function countryValidate(){
    if(country.value != "")
        return true;
    else{
        country_err.innerHTML = "Please select your Country"
        country_err.classList.remove("hide-me");
        return false;
    }
}

function onFormSubmit(){
    var flag = 0;
    txtValidation(fname.value, fname_err, "First name") || flag++;
    txtValidation(lname.value, lname_err, "Last name") || flag++;
    txtValidation(position.value, position_err, "Position") || flag++;
    txtValidation(company.value, company_err, "Company name") || flag++;
    mailValidate() || flag++;
    (chekbox_no.checked || chekbox_yes.checked) || flag++;
    companyTypeValidate() || flag++;
    countryValidate() || flag++;
    if(!(chekbox_no.checked || chekbox_yes.checked)){
        chekbox_err.innerHTML="Please confirm that you need subscription or not"
        chekbox_err.classList.remove("hide-me");
    }
    if( flag==0 ){
    formNode.reset();
    popup.classList.remove("hide-me");
    setTimeout(function () { popup.classList.add("hide-me"); }, 2000);
    return true;
    } else
        return false;
}