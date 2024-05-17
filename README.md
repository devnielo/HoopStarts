# HoopStars NBA Player Selector

HoopStars is an Angular 17 application that allows you to select your 3 favorite NBA players. It includes a confetti animation when 3 players are selected and displays a popup with options to play again or close the window.

## Features

- NBA player selection.
- Player search functionality.
- Favorite players stored using NgRx.
- Confetti animation using a GIF.
- Popup with options to play again or close.

## Requirements

- Node.js (version 16 or higher)
- Angular CLI (version 17 or higher)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/devnielo/HoopStarts
    cd hoopstars
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Configure environment variables in `src/environments`

## Usage

1. Start the application:

    ```sh
    ng serve
    ```

2. Open your browser and navigate to `http://localhost:4200`.

## Project Structure

- **src/app/core**: Contains models, services, and NgRx state management.
- **src/app/features**: Contains the `PlayerListComponent` and `HeaderComponent`.
- **src/app/app.component.ts**: Main component handling the logic for confetti animation and the popup.

## Available Scripts

- `ng serve`: Starts the development server.
- `ng build`: Builds the application for production.
- `ng test`: Runs unit tests.
- `ng lint`: Runs the linter.

## NgRx Configuration

The application uses NgRx to manage the state of players and favorites. Actions, effects, reducers, and selectors are located in the `src/app/core/store` directory.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
