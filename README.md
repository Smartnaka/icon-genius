# IconGenius

IconGenius is an AI-powered web application that creates professional app icon sets using natural language prompts. By leveraging Google's Gemini API (specifically the Imagen generation models), it transforms simple text descriptions into complete, ready-to-deploy asset packages for mobile and web applications.

## Features

- **Complete Asset Generation**: From a single prompt, the application generates:
  - **Standard Icons**: 4 unique variations suitable for App Store/Play Store listings.
  - **Favicon**: A simplified version optimized for web browser tabs.
  - **Adaptive Icons**: Separated foreground and background layers (Android standard).
  - **Splash Screen**: A vertical (9:16) launch screen layout.
- **Style Customization**: Support for multiple design aesthetics including:
  - Flat, 3D, Minimalist, Gradient, Neumorphic, Line Art, Abstract, Cartoon, and Watercolor.
- **Smart Previews**: Visualize how your adaptive icons and splash screens will look in context before exporting.
- **History Management**: Automatically saves your generation history to local storage.
- **One-Click Export**: Download individual assets or bundle the entire set into a ZIP file.

## Tech Stack

- **Frontend**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google GenAI SDK (`@google/genai`)
- **Model**: `imagen-4.0-generate-001`
- **Utilities**: JSZip for client-side file bundling

## Usage

1. **Enter a Prompt**: Describe your app idea (e.g., "A futuristic rocket ship for a productivity app").
2. **Select a Style**: Choose a visual style that fits your brand from the dropdown menu.
3. **Generate**: Click the **Generate** button. The AI will create a favicon, standard icons, adaptive layers, and a splash screen in parallel.
4. **Review**: Use the preview sections to inspect the generated assets.
5. **Download**: Click the download icon on any image to save it, or use the **Download All (.zip)** button to get the complete package.

## Requirements

This application requires a valid Google Gemini API Key with access to Imagen models. The key must be provided via the `process.env.API_KEY` environment variable.
