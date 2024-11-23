function codeGenerator(quantity = 6, splitCaracther = "-", spliterPosition = 3) {
    const randomCode = (Math.random() + 1).toString(36).substring(quantity).toUpperCase();
    let formattedCode;
    if (splitCaracther == null) {
        formattedCode = "#".concat(randomCode);
    }
    else {
        formattedCode = "#" + randomCode.slice(0, spliterPosition) + splitCaracther + randomCode.slice(spliterPosition);
    }
    return formattedCode;
}
export { codeGenerator };
