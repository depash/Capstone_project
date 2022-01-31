# Pizzavio - A Dominos Clone
[Pizzavio](https://pizzavio.herokuapp.com)

[Wiki](https://github.com/depash/Pizzavio/wiki)

## At A Glance
Pizzavio is a full stack web application that allows only logged users to:
 - Create a pizza
 - Edit a pizza
 - delete a pizza
 - and order all the pizzas


## Application Architecture
Pizzavio is built with a REACT frontend and a Flask backend. Redux is used to comunicate between.

## Frontend Technologies Used
Pizzavio uses REACT to generate the HTML elements, and then i used CSS to style the elements.

## Backend Technologies Used
I used a Flask server to handle the backend communication. With SQLAlchemy to manipulate the database.

## Wiki
* [MPVs](https://github.com/depash/Pizzavio/wiki/MVPs)
* [User Stories](https://github.com/depash/Pizzavio/wiki/User-Stories)
* [DB Schema](https://github.com/depash/Pizzavio/wiki/DB-Schema)
* [Wireframe](https://github.com/depash/Pizzavio/wiki/Wireframe)

![Splash Page](https://github.com/depash/Pizzavio/blob/main/Images/splashPage.png)
This is the Splash Page where you can make a account or Log in. If you dont want to make a account you can use the demo user.

***

![HomePage](https://github.com/depash/Pizzavio/blob/main/Images/HomePage.png)
This is the main home page where you can make a pizza or check your cart. you can do ether of those things by ether clicking the Make Pizza button or the Cart button.

***

![MakingPizzaPage](https://github.com/depash/Pizzavio/blob/main/Images/MakingPizzasPage.png)
You can make a Pizza with this model. If you press add/remove it will add/remove that ingredient. If you click the X on the top right of the model it will delete the pizza and close the model. If you press the Make pizza button it will save your pizza. 

***

![Cart and Checkout](https://github.com/depash/Pizzavio/blob/main/Images/Cart.png)
On cart there are a few things you can do. You can increase/decrease the amount of pizzas you want by pressing the Add or Remove buttons. If you press remove when there is 1 pizza it will delete the pizza. Edit will open the Make Pizza model but now you can edit the pizza insted. And pressing checkout will clear your cart.

***

## Future Features
- tracking orders
- order history
- premade pizzas
