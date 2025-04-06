# Atomas Clone

[![CI](https://github.com/jsonify/atomas/actions/workflows/ci.yml/badge.svg)](https://github.com/jsonify/atomas/actions/workflows/ci.yml)
[![Deploy](https://github.com/jsonify/atomas/actions/workflows/deploy.yml/badge.svg)](https://github.com/jsonify/atomas/actions/workflows/deploy.yml)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

A React-based clone of the mobile game Atomas, focusing on core gameplay mechanics.

## Features

- Circular interface for atom placement
- Basic atom types (values 1-10+, plus atoms, minus atoms)
- Reaction mechanics (combining identical atoms)
- Score tracking and high score saving
- Simple visual design with color-coded atoms

## Development

### Prerequisites

- Node.js 18+ 
- pnpm 8+

### Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test
```

### Project Structure

```
src/
  ├── components/     # React components
  ├── game/          # Game logic and state management
  ├── styles/        # SCSS styles
  ├── types/         # TypeScript type definitions
  ├── hooks/         # Custom React hooks
  └── utils/         # Utility functions
```

## Testing

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage
```

## Continuous Integration & Deployment

The project uses GitHub Actions for CI/CD with the following workflows:

- **CI Pipeline**: Runs on all branches and pull requests
  - TypeScript type checking
  - ESLint code quality checks
  - Unit tests
  - Build verification

- **Deployment**: Runs on the main branch
  - Automated versioning using conventional commits
  - Builds and deploys to GitHub Pages
  - Available at: https://jsonify.github.io/atomas/

### Contributing

1. Create a feature branch from `main`
2. Make your changes following conventional commits format
3. Ensure all tests pass: `pnpm test`
4. Create a pull request targeting `main`

The CI pipeline will automatically verify your changes. Successful merges to `main` will trigger automatic deployment.

### Commit Message Format

This project follows [Conventional Commits](https://www.conventionalcommits.org/). Examples:

```
feat: add new atom type
fix: resolve atom combination logic
docs: update setup instructions
style: improve atom appearance
refactor: optimize game loop
test: add reaction mechanics tests
```

## License

MIT License - see LICENSE file for details
