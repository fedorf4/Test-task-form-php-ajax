function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
}

function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
}

document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById("form");

    if (form)
        form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);
        if (error === 0) {
            let response = await fetch('formSend.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let json = await response.json();
                if (json.message == "OK") {
                    form.reset();
                    document.getElementById("form").classList.add("_hide");
                    document.getElementById("successSignUp").classList.remove("_hide");
                }
                else {
                    document.getElementById("errorResponse").classList.remove("_hide");
                    document.getElementById("errorResponse").textContent = json.message
                }
            } else {
                alert("Ошибка HTTP: " + response.status);
            }
        }
    }

    function formValidate(form) {
        let error = 0;
        let inputs = document.querySelectorAll('input');

        var el = document.querySelectorAll('.error-message');
        el.forEach(element => {
            element.remove();
        });

        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            formRemoveError(input);
            let invalidity = '';
            if (input.classList.contains('_req')) {
                if (input.value.length == 0) {
                    formAddError(input)
                    invalidity = 'Данное поле обязательно для заполнения.';
                    error++;
                }
            }
            if (error != 0) {
                input.setCustomValidity(invalidity);
                input.insertAdjacentHTML('afterend', '<p class="error-message">' + invalidity + '</p>')
                input.setCustomValidity('');
            }
        }
        return error;
    }
});