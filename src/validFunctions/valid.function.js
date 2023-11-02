import url from "url"

export function validName(name){
    const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return regex.test(name)
}

export function validPhoneNumber(phonenumber){
    const isValidPhoneNumber = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    return isValidPhoneNumber.test(phonenumber)
}

export function validEmail(email){
    var validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return validEmail.test(email)
}
export function validPassword(password){
    const regexPassword = /^(?=.*\d)(?=.*[a-z]).{8,20}$/;
    return regexPassword.test(password)
}
export function validCategory(category_name){
    const regex = /^[a-zA-Z\s-]+$/;
    return regex.test(category_name)
}

export function validBookName(book_name){
    const validBookNameRegex = /^[a-zA-Z0-9\s\-]+$/;
    return validBookNameRegex.test(book_name)
}
export function validPrice(price){
    const validPriceRegex = /^\d+(\.\d{1,2})?$/;
    return validPriceRegex.test(price)
}

export function validNumber(pages){
    return Number.isInteger(pages)
}


export function validUrl(inputUrl) {
    const parsedUrl = url.parse(inputUrl);
    return !!parsedUrl.hostname && !!parsedUrl.protocol;
  }