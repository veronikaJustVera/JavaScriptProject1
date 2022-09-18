const checkTypeInputs = (inputSelector, regular, flagsRegular = '') => {
    const inputs = document.querySelectorAll(inputSelector),
            regularExpression = new RegExp(regular, flagsRegular);

    inputs.forEach(inputItem => {
        inputItem.addEventListener('input', () => {
            inputItem.value = inputItem.value.replace(regularExpression, '');
        });
    });
};

export default checkTypeInputs;