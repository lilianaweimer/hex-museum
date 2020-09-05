# Hex Museum

## Abstract
This is the final solo project from the Turing School of Software & Design's Mod 3 of Front-End Engineering. The assignment was to demonstrate mastery of React, React Router, and asynchronous JavaScript; build an application with a specific audience in mind; and use an external API for data. I chose to use the [Harvard Art Museum API](https://github.com/harvardartmuseums/api-docs) to create an app for an audience of people who are interested in art but are unsure of how to learn more. The application uses the API's spectrum and color endpoints to provide the user with color as their jumping-off point, as well as a favoriting option to create a collection of pieces they like. The favorites are stored in `localStorage` and analyzed for trends (displayed in their favorites).

Deployed at https://hex-museum.netlify.app/

## Planning document 
https://docs.google.com/document/d/1Ve25LhrlYxBDOE19E_oWNYbXL6NshcH70mV6A9lUlOw/edit?usp=sharing

## Technologies Used
- React
- React Router
- CSS
- Git
- JavaScript
- React Testing Library
- Jest
- `localStorage`

## In Action
Viewing today's gallery:

<img src='src/Images/binary-today.gif' alt='a user views todays gallery and favorites a few pieces' width='75%'>

Viewing another color's gallery:

<img src='src/Images/binary-othercolor.gif' alt='a user views todays gallery and favorites a few pieces' width='75%'>

Viewing favorites and details:

<img src='src/Images/binary-favorites.gif' alt='a user views todays gallery and favorites a few pieces' width='75%'>

## Future Iterations
- Come up with a name!
- Deploy
- Smoother loading of `Gallery` pages
- Better error handling for broken/lost images
- Better handling of duplicate pieces from API
- Figure out the `error: undefined` issue


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
