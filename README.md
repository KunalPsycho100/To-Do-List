# Work Instruction Sheets (WIS) Application

A modern, JSON-driven web application for managing and viewing work instruction sheets with PDF documents and instructional videos. Built with **Tailwind CSS** for beautiful, responsive design.

## Features

- **JSON-Driven Content**: All work instruction sheet data is managed through a simple JSON file
- **Tailwind CSS**: Modern utility-first CSS framework for rapid styling
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Navigation**: Clean list and detail views with smooth transitions
- **PDF Integration**: Direct links to view PDF documents in new tabs
- **Video Playback**: Embedded video player for instructional content
- **Modern UI**: Professional design with hover effects and animations

## File Structure

```
├── index.html          # Main HTML file with Tailwind CSS classes
├── script.js           # JavaScript functionality and navigation
├── data.json           # JSON file containing work instruction sheet data
├── README.md           # This documentation file
└── Assets/             # Directory for PDF and video files
    ├── *.pdf           # PDF documents
    └── *.mp4           # Video files
```

## Getting Started

### 1. Setup
1. Ensure all files are in the same directory
2. Place your PDF and video files in the project directory
3. Update the `data.json` file with your work instruction sheet information

### 2. Data Configuration

Edit the `data.json` file to add or modify work instruction sheets:

```json
[
  {
    "id": "unique-sheet-id",
    "sheetName": "Work Instruction Sheet Name",
    "pdfLink": "path/to/your/document.pdf",
    "videoLink": "path/to/your/video.mp4",
    "description": "Brief description of the work instruction sheet"
  }
]
```

#### JSON Fields:
- `id`: Unique identifier for the sheet (used for navigation)
- `sheetName`: Display name shown in the interface
- `pdfLink`: Path to the PDF document
- `videoLink`: Path to the instructional video
- `description`: Brief description displayed in the list view

### 3. Running the Application

Since the application fetches data from a JSON file, you need to serve it through a web server:

#### Option 1: Python (if installed)
```bash
# Navigate to the project directory
cd /path/to/your/project

# Start a local server
python -m http.server 8000

# Open browser to http://localhost:8000
```

#### Option 2: Node.js (if installed)
```bash
# Install a simple server globally
npm install -g http-server

# Navigate to project directory and start server
cd /path/to/your/project
http-server

# Open browser to the provided URL
```

#### Option 3: VS Code Live Server Extension
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Usage

### List View
- Shows all available work instruction sheets
- Each sheet displays as a card with name and description
- Click "View Sheet Details →" to access the full sheet

### Detail View
- Displays the complete work instruction sheet information
- "View PDF Document" button opens the PDF in a new tab
- Video player allows immediate playback of instructional content
- "← Back to List" button returns to the main list

### Navigation
- Use the back button to return to the list view
- Browser back/forward buttons work correctly
- URLs update to reflect current view for bookmarking

## Adding New Work Instruction Sheets

1. Add your PDF and video files to the project directory
2. Edit `data.json` to include the new sheet:

```json
{
  "id": "wis-07",
  "sheetName": "WIS 7 - New Process",
  "pdfLink": "WIS-07-NEW-PROCESS.pdf",
  "videoLink": "Video-Process-7.mp4",
  "description": "Work instruction sheet for the new process implementation"
}
```

3. Refresh the application - the new sheet will appear automatically

## Customization

### Styling with Tailwind CSS
- The application uses Tailwind CSS via CDN for all styling
- Modify the HTML classes directly to change appearance
- Common customizations:
  - Change colors: Replace `bg-blue-500` with `bg-green-500`, `bg-red-500`, etc.
  - Adjust spacing: Use `p-4`, `m-6`, `mb-8` for padding and margins
  - Modify text: Use `text-lg`, `font-bold`, `text-center` for typography
- Responsive design: Use `md:`, `lg:`, `xl:` prefixes for different screen sizes
- No external CSS file needed - all styling is utility-based

### Functionality
- Extend `script.js` to add new features like search, filtering, or sorting
- Add form validation for better error handling
- Implement offline support with service workers

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Internet Explorer 11+ (with potential minor compatibility issues)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security Considerations

- The application includes XSS protection through HTML escaping
- All user-generated content is sanitized before display
- PDF and video files should be scanned for malicious content
- Consider implementing Content Security Policy (CSP) headers for production use

## Troubleshooting

### Common Issues

1. **"Error loading data" message**
   - Ensure `data.json` file exists and is valid JSON
   - Check that you're running the application through a web server
   - Verify file paths are correct

2. **PDF won't open**
   - Check that the PDF file exists at the specified path
   - Ensure the browser has PDF viewing capabilities
   - Try using a different PDF viewer

3. **Video won't play**
   - Verify the video file format is supported (MP4 recommended)
   - Check that the video file exists at the specified path
   - Ensure the video codec is web-compatible

4. **Styling issues**
   - Clear browser cache and refresh
   - Check for CSS syntax errors
   - Verify `style.css` is loading correctly

## Future Enhancements

- Search and filter functionality
- Category-based organization
- Progress tracking for completed instructions
- Print-friendly layouts
- Offline support
- Multi-language support
- Admin interface for content management

## Support

For issues or questions, check the browser console for error messages and verify all file paths and JSON syntax are correct.