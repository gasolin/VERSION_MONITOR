# VERSION_MONITOR

A retro, NES-styled web dashboard to track the latest versions of your NPM packages in one place. 

![Preview](https://img.shields.io/badge/UI-NES.css-warning?style=flat-square) ![Badges](https://img.shields.io/badge/Badges-Shields.io-success?style=flat-square)

## Overview

Version Monitor reads from a `settings.json` configuration file to dynamically generate a table of NPM packages, displaying their current versions using real-time [Shields.io](https://shields.io/) badges.

The aesthetic is powered by the 8-bit [NES.css](https://nostalgic-css.github.io/NES.css/) framework, giving it a playful, classic gaming console feel.

## Features

- **Retro UI**: 8-bit pixel art style using NES.css with standard sans-serif readability for the data.
- **Dynamic Configuration**: Simply edit `settings.json` to add or remove packages—no need to touch the HTML or JS.
- **Real-time Badges**: Automatically fetches the latest NPM versions via Shields.io.
- **Responsive**: Adapts gracefully to smaller screens.

## Setup & Usage

1. Clone or download the repository.
2. Edit `settings.json` to define the packages you want to track:
   ```json
   {
     "title": "NPM Version Monitor",
     "description": "Track the latest versions of your npm packages",
     "categories": [
       {
         "name": "Category Name",
         "packages": [
           {
             "name": "Package Display Name",
             "npmPackage": "actual-npm-package-name"
           }
         ]
       }
     ]
   }
   ```
3. Serve the directory locally. For example, using `npx serve`:
   ```bash
   npx serve .
   ```
4. Open the displayed local server URL in your browser.

## Credits

- **Styling**: [NES.css](https://nostalgic-css.github.io/NES.css/)
- **Badges**: [Shields.io](https://shields.io/)
- **Fonts**: Google Fonts (Press Start 2P)
- **AI Assistance**: Built with the help of **Antigravity** 🚀

## License

MIT License
