import checkTypeInputs from './checkTypeInputs';

const forms = (state) => {
    const formElements = document.querySelectorAll('form'),
        inputElements = document.querySelectorAll('input'),
        message = {
            'loading': 'assets/img/loading.gif',
            'success': 'assets/img/success.gif',
            'fail'   : 'assets/img/success.gif',
        };

    checkTypeInputs('input[name="user_phone"]', '[^\\d\\s]+', 'gi');
    const postData = async (url, data) => {
        document.querySelector('.status').src = message.loading;
        let result = await fetch(url, {
            'method': "POST",
            'body' : data
        });
        return await result.text();
    };

    const clearInputs = () => {
        inputElements.forEach(inputElement => {
            inputElement.value = '';
        });
    };

    formElements.forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.classList.add('status');
            form.appendChild(statusMessage);
    
            const formData = new FormData(form);
            if(form.getAttribute('data-calc') === 'end') {
                for(let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
            .then(result => {
                statusMessage.src = message.success;
                if(form.dataset.closeModal) {
                    const formModal = document.querySelector('.' + form.dataset.closeModal);
                    if(formModal) {
                        setTimeout(() => {
                            formModal.style.display = "none";                            
                        }, 3000);
                    }
                }
            })
            .catch((e) => {
                statusMessage.src = message.fail;
            })
            .finally(() => {
                clearInputs();
                setTimeout(() => {
                    statusMessage.remove();
                }, 3000);
            });
        });
    });
};
export default forms;