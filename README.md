# 🌀 Reversi (Othello)

![Poster](https://raw.githubusercontent.com/Jorger/reversi-othello/refs/heads/main/poster.png)

[Reversi](https://en.wikipedia.org/wiki/Reversi) (also known as Othello) is a classic two-player strategy board game where the objective is to finish the match with more pieces of your color on the board than your opponent. This project is a implementation of the game built for the [Rune](https://developers.rune.ai/) multiplayer platform.

## 🎮 Game Overview

Two players battle to control the board using red and blue discs. On each turn, you place a disc of your color and flip your opponent’s discs by trapping them between two of yours.

Your objective is simple:
End the game with more discs of your color on the board than your opponent.

## 🧠 How the Game Works

* Players alternate turns, placing one disc at a time.
* A move is valid only if the placed disc captures opponent discs, meaning it creates a straight line (horizontal, vertical, or diagonal) where your discs appear at both ends.
* All captured discs along those lines instantly flip to your color.
* If you have no valid moves on your turn, you must skip, and your opponent continues.
* The match ends when neither player can make a move or the board is full.
* The winner is the player with the most discs of their color.

## 🌐 Play Now

You can play Hammer Hit directly in your browser at:

👉 https://app.rune.ai/dev-q1duadvy

Or enjoy it on the go by downloading the Rune app from the [iOS App Store](https://apps.apple.com/us/app/rune-games-and-voice-chat/id1450358364) or [Google Play Store](https://play.google.com/store/apps/details?id=ai.rune.tincan&gl=GB).
On the mobile app, you can also connect with your opponent through real-time voice chat, making each match more fun and interactive.

## 🚀 Run Locally

### `npm install`

Install dependencies

### `npm run dev`

Runs the game in Dev UI.

The page will reload when you make changes.

### `npm run upload`

Builds the game and starts upload process to Rune.

### `npm run build`

Builds the game. You can then upload it to Rune using `npx rune@latest upload`.

## 👨🏻‍💻 Autor.

**Jorge Rubiano**
* https://bio.link/jorgerub

