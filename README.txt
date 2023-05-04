CSC 515 FINAL PROJECT

Contributors: Braydon Bell, Bunyod Abdusaidov, Todd Bajzek, Jacob Albrecht
---------------------------------------------------------------------------

This project is a full-stack web application that allows users to register their
user data through a web form, submit that user data to a generated database, and receive a 
success/failure message from the database. Vanilla HTML and CSS were used for the
web page, with jQuery used for the front-end logic and PHP/MySQL used for the
back-end.

When users are entering information into the web page's inputs, their input is
constantly validated with RegEx to ensure it fulfills required input criteria.
First and last names must be alphabetic or include single quotes, mobile numbers
must be in the form xxx-xxx-xxxx, emails must begin with a character and end with a 
domain (not a period). States must be an approved capitalized two-letter state abbreviation.
Passwords must be of at least length six, alphanumeric, and contain upper/lowercase letters
and digits.

Once the input is validated on the front end, it is sent to the back-end using an AJAX POST call.
The data is once again verified on the backend. The data is then cleaned up, with a hash being
generated for the password and the mobile string being turned into an integer.

PLEASE NOTE: In order to fit the mobile number into the database, we had to change the column
type to BIGINT rather than just INT. If you do not change the mobile to a BIGINT, the mobile number
will be too large for the database to store.

The data is then put into a generated database table consisting of an auto-generated id and series of
VARCHARS and one BIGINT. An alert message is then returned to the user signifying the success
or failure of their request, and the user may then register another user.

INSTRUCTIONS: Simply navigate to the form.html, input the required values, click the registration button,
and find the input data in your phpMyAdmin database under "registration_form" database. The data will
be in the table named "user".

