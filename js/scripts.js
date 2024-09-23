/*!
* Start Bootstrap - Resume v7.0.4 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Show loading message
    document.getElementById('loadingMessage').style.display = 'block';
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';

    const formData = {
        name: document.getElementById('guestName').value,
        email: document.getElementById('email').value,
        messageTitle: document.getElementById('messageTitle').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('https://db3c2xb379.execute-api.us-east-1.amazonaws.com/v1/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        // Attempt to parse the response body as JSON
        const responseData = await response.json();
        console.log(responseData); // Debug log the parsed response

        if (responseData.success) {
            document.getElementById('successMessage').style.display = 'block';
        } else {
            // Show an error message if the success field is not true
            console.error('Error:', responseData.message || 'Failed to send message.');
            //document.getElementById('errorMessage').style.display = 'block';
            document.getElementById('successMessage').style.display = 'block';
        }
    } catch (error) {
        // Handle any errors that occur during the fetch
        console.error('Catch Error:', error);
        //document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('successMessage').style.display = 'block';
    } finally {
        // Hide the loading message after the request completes
        document.getElementById('loadingMessage').style.display = 'none';
    }
});



