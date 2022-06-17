// Fetch Api
var contactForm = document.querySelector('.contact__form')
var contactEndPoint = contactForm.action
const isVisible = "d-block";


contactForm.addEventListener('submit', function (e){
        e.preventDefault()

        // Disable form button
        var formButton = document.querySelector(".contact__btn")
        formButton.disabled = true;
        formButton.textContent = 'Sending...'

        // Disable Form
        var formElements = contactForm.elements;
        for (var i = 0, len = formElements.length; i < len; ++i) {
            formElements[i].readOnly = true;
        }

        // Clears messages
        document.querySelector('.message_sent').style.display = 'none'
        const clearErrors = document.querySelectorAll('.error_message')
        for (const el of clearErrors) {
            // Clears errors
            while (el.hasChildNodes()) {
                el.removeChild(el.lastChild)
            }
        }

        // Converts Contacts form inputs to JSON
        var contactFormObject = {}
        const formData = new FormData(contactForm)

        formData.forEach(function(value, key){
            // Appends each form input into contactFormObject as object
            contactFormObject[key] = value;
        });

        var contactFormData  = JSON.stringify(contactFormObject);

        // Calling form API
        fetch(contactEndPoint, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: contactFormData
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.status === 'error'){
                    console.log('error:', data);
                    // Deletes status error object in json
                    delete data.status;
                    console.log('error:', data);
                    // Looping through json data
                    Object.entries(data).forEach((entry) => {
                        const [invalidField, invalidFieldErrors] = entry
                        // Loop through error list in invalidFieldErrors
                        Array.from(invalidFieldErrors).forEach((fieldErrorMessage) => {
                            const field  = document.getElementById(invalidField)
                            const errorMessageDiv = field.nextElementSibling
                            const small = document.createElement('small')
                            small.textContent = fieldErrorMessage
                            small.classList.add('d-block')
                            errorMessageDiv.appendChild(small)
                        });
                    });
                }
                else {
                    // Resets contact form
                    contactForm.reset()
                    document.querySelector('.message_sent').style.display = 'block'
                }
                // Enable form button
                formButton.disabled = false;
                formButton.textContent = 'Send A Message'

                // Enable Form
                var formElements = contactForm.elements;
                for (var i = 0, len = formElements.length; i < len; ++i) {
                    formElements[i].readOnly = false;
                }
            })
            .catch((error) => {
                // Enable form button
                formButton.disabled = false;
                formButton.textContent = 'Unable to connect!!! Try Again'

                // Enable Form
                var formElements = contactForm.elements;
                for (var i = 0, len = formElements.length; i < len; ++i) {
                    formElements[i].readOnly = false;
                }

                console.error('Error:', error);
            });

    }, false
)

