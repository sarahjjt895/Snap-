# Snap

> Snap is a card game in which players deal cards and react quickly to spot pairs of cards of the same rank. Cards are either dealt into separate piles around the table, one per player, or (particularly when played with young children) into a single shared pile.
\- *[Snap (card game) Wikipedia entry](https://en.wikipedia.org/wiki/Snap_(card_game))*

This is a single player variation of the game. The rules are outlined below:

1. Begin the game by shuffling the deck.
2. Draw the first card off of the deck and place it in the middle of the playing area.
3. The player can then press the next card button to draw a new card (covering the previous card completely).
4. The player must decide if the values of the current card and the previous card match
    - If the cards match, the player must hit the 'Snap!' button before the opponent timer finishes
        - If the player presses snap before the time elapses, they score a number of points equal to the number of cards played since the last snap.
        - Otherwise, if opponent timer finishes before the player, the opponent is awarded points equal to the number of cards played since the last snap.
    - Otherwise the player may press next card when ready to proceed.
    - In the case that "Snap" is pressed when the cards do no match, the opponent is awarded points equal to the number of cards played since the last snap.
5. The game ends when all cards in the deck have been played.

## TODO list

- [x] `shuffleArray()` implemented for shuffling a deck of cards stored in an array (see `shared.js - ln7`).
- [x] Basic UI layout (HTML and CSS) for game screen.
- [x] Images for each card design (see `resources/playing-cards`).
- [x] Stylised font selected.
- [X] Placeholder functions subbed for primary events and user interactions
- [X] Animation for opponent timer
- [ ] Generate a deck of cards
    - N.B. Cards should to have the properties name, suite, rank and image.
- [ ] Implement game rules:
    - [ ] card comparisons (do the cards match?)
    - [ ] Game-state progression and events (next turn, snap match, snap no-match, win game, lose game)
        - [ ] score tracking
- [ ] UI features
    - [ ] Update current card on board
    - [ ] Show scores on the board
    - [ ] Show remaining cards
    - [ ] Show cards played in since the last snap


    REFERENCE LIST

JavaScript if else else if. (n.d.). https://www.w3schools.com/js/js_if_else.asp

Java if . . . else. (n.d.). https://www.w3schools.com/java/java_conditions.asp

Java Array Shuffle (Fisher Yates) - Dot Net Perls. (n.d.). https://www.dotnetperls.com/shuffle-java

JavaScript Array shift() Method. (n.d.). https://www.w3schools.com/jsref/jsref_shift.asp

Document: querySelector() method - Web APIs | MDN. (2023, July 22). MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector

Element: click event - Web APIs | MDN. (2023, December 14). MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event

ChatGPT Open AI (n.d) https://chat.openai.com/#

Prompt: how can i check if, when a button was clicked, it was defined within the 5 second timer? 
Prompt: How can I get an if statement to also include an && condition 

Assistance with adding the ‘if’ ‘&&’ and ‘else’ statements to create a solution for the snap button and score system. 

Assistance with simplifying ‘if’ statements
