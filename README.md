# Eternal Ledger - Flameborn Lexicon

A Single Page Application (SPA) that serves as a comprehensive dictionary and reference guide for Flameborn terminology, creatures, spells, artifacts, locations, and concepts.

## Features

- 🔥 **Comprehensive Database**: 20+ entries covering creatures, spells, artifacts, locations, and concepts
- 🔍 **Real-time Search**: Instantly filter entries as you type
- 📑 **Category Filtering**: Filter by creature, spell, artifact, location, or concept
- 🎨 **Beautiful UI**: Fire-themed design with smooth animations
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Pure Vanilla JavaScript**: No frameworks required - lightweight and fast

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: Node.js and npm (for running a local server)

### Running the Application

#### Option 1: Direct Browser Access
Simply open `index.html` in your web browser.

#### Option 2: Local Server (Recommended)
```bash
# Using npm
npm start

# Or using Python 3
python3 -m http.server 8080
```

Then navigate to `http://localhost:8080` in your browser.

## Usage

1. **Search**: Type in the search box to find specific terms across all entries
2. **Filter**: Use the category dropdown to view only specific types of entries
3. **Browse**: Scroll through the lexicon to explore all available entries

## Project Structure

```
eternal-ledger/
├── index.html          # Main HTML structure
├── styles.css          # Styling and theme
├── app.js             # Application logic
├── lexicon-data.js    # Lexicon database
├── package.json       # Project metadata
└── README.md          # Documentation
```

## Lexicon Categories

- **Creatures**: Dragons, spirits, and fire-based beings
- **Spells**: Fire magic and enchantments
- **Artifacts**: Magical items and weapons
- **Locations**: Important places in the Flameborn world
- **Concepts**: Philosophies, traditions, and lore

## Contributing

To add new entries, edit `lexicon-data.js` and add objects following this structure:

```javascript
{
    id: <unique_number>,
    term: "Entry Name",
    category: "creature|spell|artifact|location|concept",
    description: "Main description of the entry",
    details: "Additional information"
}
```

## License

MIT License - Feel free to use and modify as needed.