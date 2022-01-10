# Klondike Solitaire

### [PLAY THE GAME](https://solitaire-klondike.netlify.com/)

I built this game just for fun and to see if i actually could. I hadn't tried DnD seriously in anything before and since i initially scaffolded a CRA i chose to test React DnD as well.

## Technologies used

React, React DnD, TypeScript, Redux, Redux-undo and immer. 

## Things Learned

I should've thought out the structure and what i want to do more carefully in the beginning. At first I started the project without Redux and quickly realised that i really want to use it and the undo feature was super easy to implement with Redux-undo.

Some things I am not so sure about are the nested arrays in Tableu Piles and Foundations. I used immer so setting state in reducer was easy without accidentally mutating it  but some of the logic around swapping cards from one place to another could use a face lift for sure. 

## ToDo

* Add animations, this is next in the list for sure
* CSS is a bit of a mess. Need to clean that up and maybe use css modules or some css-in-js
* Sometimes clicking the deck there's a delay of some milliseconds, don't know why. 
* Add scores, though i only ever used the time personally
* Adding some sort of backend and db to track high scores would be sweet but protecting it from cheating seems like a hard thing to do without holding game state on the server. Would be an interesting thing to try. 

#### Assets used

[Playing cards](https://www.me.uk/cards/)  
[Card sounds](https://opengameart.org/content/54-casino-sound-effects-cards-dice-chips)


