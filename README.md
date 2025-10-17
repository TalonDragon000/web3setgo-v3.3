# Web3SetGo

[![Netlify Status](https://api.netlify.com/api/v1/badges/abb35b5c-ddb0-4085-847f-299b9caa83bc/deploy-status)](https://app.netlify.com/projects/web3setgo/deploys)

A modern, interactive educational platform designed to teach Web3 concepts in a safe, simple, and engaging way. Built with React, TypeScript, and Tailwind CSS.

<img width="1280" height="676" alt="image" src="https://github.com/user-attachments/assets/6d95a2e1-a881-4d50-ba52-181c30c5d6ed" />



## About the Project

Web3SetGo is an educational web application that helps beginners learn about Web3, blockchain, and cryptocurrency through:

- **Interactive Learning Modules**: Step-by-step guides covering Web3 fundamentals
- **Engaging Quizzes**: Test your knowledge with interactive quizzes
- **Resource Hub**: Curated articles and learning materials
- **Responsive Design**: Beautiful, accessible interface that works on all devices
- **Modern Tech Stack**: Built with cutting-edge web technologies for optimal performance

## Tech Stack

- **Frontend Framework**: React 18.3 with bolt.new
- **Language**: TypeScript 5.5
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router DOM 7.9
- **Icons**: Lucide React
- **Database**: Supabase (ready for integration)
- **Linting**: ESLint with TypeScript support

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm (v9 or higher)

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd web3setgo-v3
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (if using Supabase):
   - Copy `.env.example` to `.env` (if available)
   - Add your Supabase credentials

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production bundle
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
web3setgo-v3/
├── public/              # Static assets (images, logos)
├── src/
│   ├── components/      # Reusable React components
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── pages/          # Page-level components
│   │   ├── HomePage.tsx
│   │   ├── LearningPage.tsx
│   │   ├── QuizPage.tsx
│   │   └── ...
│   ├── assets/         # Additional assets
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles
├── package.json
├── vite.config.ts      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Deployment

### Deploying to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts to complete deployment

### Deploying to Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to Netlify via:
   - Netlify CLI: `netlify deploy --prod`
   - Netlify dashboard: Drag and drop the `dist` folder
   - Git integration: Connect your repository

### Deploying to Other Platforms

The build output is in the `dist` folder after running `npm run build`. You can deploy this folder to any static hosting service:

- **GitHub Pages**: Use `gh-pages` package
- **AWS S3**: Upload `dist` folder to S3 bucket with static hosting enabled
- **Cloudflare Pages**: Connect your repository or upload `dist` folder
- **Firebase Hosting**: Use Firebase CLI to deploy

### Environment Variables for Production

If using Supabase or other services, ensure you set up environment variables in your hosting platform:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Contributing

We welcome contributions from the community! Here's how you can help:

### How to Contribute

1. **Fork the Repository**
   - Click the "Fork" button at the top right of the repository page

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/your-username/web3setgo-v3.git
   cd web3setgo-v3
   ```

3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes**
   - Follow the existing code style and conventions
   - Write meaningful commit messages
   - Test your changes thoroughly

5. **Run Tests and Linting**
   ```bash
   npm run lint
   npm run build
   ```

6. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add: Description of your changes"
   ```

7. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Provide a clear description of your changes

### Contribution Guidelines

- **Code Style**: Follow the existing code patterns and use TypeScript
- **Components**: Keep components modular and reusable
- **Accessibility**: Ensure all UI elements are accessible (WCAG 2.1 AA)
- **Responsive Design**: Test on mobile, tablet, and desktop viewports
- **Documentation**: Update README or add comments for complex logic
- **Commits**: Use clear, descriptive commit messages

### Areas for Contribution

- New learning modules and content
- Interactive quiz questions
- UI/UX improvements
- Accessibility enhancements
- Bug fixes and performance optimizations
- Documentation improvements
- Test coverage

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other contributors

## License

This project is available for educational purposes. Please check the license file for more details.

## Support

For questions, issues, or suggestions:

- Open an issue on GitHub
- Check existing issues before creating a new one
- Provide detailed information for bug reports

## Acknowledgments

Built with modern web technologies and a focus on education, accessibility, and user experience.

Happy Learning! 🚀
