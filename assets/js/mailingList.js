// get submit button
const btn = document.getElementById('submit-button');

// add event listener to the submit button
btn.addEventListener("click", (e) => {
    // stop submit from refreshing page
    e.preventDefault();

    // get form contents
    const emailForm = document.getElementById('email-form');

    // set email address to first element in form array
    const emailAddress = emailForm.elements[0].value;

    // set regex for validating email address
    // see: https://stackoverflow.com/questions/940577/javascript-regular-expression-email-validation
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/;

    // check if valid email address has been entered
    if(emailAddress.match(pattern)) {
        // loop radio elements in form array 
        for(i = 1; i < emailForm.elements.length; i++) {
            // if element is checked 
            if(emailForm.elements[i].checked){
                // write out to console for debugging
                console.log(emailForm.elements[i].value);
                // break out of loop retaining value of i
                break;
            }
        }

        // intialise text var 
        let choiceText = '';

        // check which option was selected to generate correct output text
        switch (emailForm.elements[i].value) {
            case 'bjj_instructional':
                choiceText = 'BJJ Instructional';
                break;
            case 'gracie_diet':
                choiceText = 'Gracie Diet';
                break;
            case 'both':
                choiceText = 'Gracie Diet & Instructional Info';
                break;
        }


        // display alert with email details
        alert(`Hi, you have chosen to receive the ${choiceText}. I will send the information to you at ${emailAddress}, in due course.\n\nThank you`)

        // reset form
        emailForm.elements[0].value = '';
    } else { // else show alert requesting valid email
        alert('Please enter a valid email address, before submitting the form.')
    }
    
});

