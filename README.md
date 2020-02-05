# Klondike Solitaire

### [PLAY THE GAME](https://solitaire-klondike.netlify.com/)

I built this game just for fun and to see if i actually could. I hadn't tried DnD seriously in anything before and since i initially scaffolded a CRA i chose to test React DnD as well.

## Technologies used

React, React DnD, TypeScript, Redux, Redux-undo and immer. 

## Things Learned

I should've thought out the structure and what i want to do more carefully in the beginning. At first I started the project without Redux and quickly realised that i really want to use it and the undo feature was super easy to implement with Redux-undo.

Some things I am not so sure about are the nested arrays in Tableu Piles and Foundations. I used immer so setting state in reducer was easy without accidentally mutating it  but some of the logic around swapping cards from one place to another could use a face lift for sure. 

I had thought about using a middleware of sorts (Redux-Saga for example) where i would listen for lets say CARDS_MOVED action and i would do the necessary logic inside the saga and just dispatch the needed actions that would only act as state setters. At the moment I am doing quite a bit of logic inside the reducer and I am not a big fan, though it works. 

## ToDo

* Add animations, this is next in the list for sure
* CSS is a bit of a mess. Need to clean that up and maybe use css modules or some css-in-js
* Move logic from reducer to middleware
* Sometimes clicking the deck there's a delay of some milliseconds, don't know why. 
* Add scores, though i only ever used the time personally
* Adding some sort of backend and db to track high scores would be sweet but protecting it from cheating seems like a hard thing to do. Would be an interesting thing to try. 
* Using some of sort of typed action creator instead of manually typing every one of them would be ideal
* Create some tests     
  
#### Assets used

[Playing cards](https://www.me.uk/cards/)  
[Card sounds](https://opengameart.org/content/54-casino-sound-effects-cards-dice-chips)


