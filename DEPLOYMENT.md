# Deployment Guide

## Frontend Deployment

The frontend is a static web application that can be deployed to any web hosting service.

### Files Required:
- `index.html` - Main selection page
- `chat.html` - Chat interface  
- `script.js` - JavaScript functionality
- `style.css` - Styling and animations
- `characters.json` - Character data
- `assets/` - Background images (optional)

### Deployment Options:

#### 1. GitHub Pages
1. Push files to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Select source branch (usually `main`)

#### 2. Netlify
1. Drag and drop the folder to Netlify
2. Or connect your GitHub repository
3. Auto-deploys on every commit

#### 3. Vercel
1. Import your GitHub repository
2. Vercel auto-detects static site
3. Deploys automatically

#### 4. Any Web Host
Upload all files to your web hosting service's public folder.

## Backend Integration

The frontend is configured to work with your Gradio backend at:
`https://pylord-gptdharma.hf.space`

### API Endpoints Used:
- Scripture Search: `POST /api/predict` with `fn_index: 0`
- Character Chat: `POST /api/predict` with `fn_index: 1`

### Fallback Endpoints:
The frontend automatically tries multiple endpoint formats:
1. `/api/predict` (primary)
2. `/run/function_name` (fallback)
3. `/call/function_name` (legacy)

## Testing

1. Open `test-api.html` in a browser
2. Click "Test Scripture Search" and "Test Character Chat"
3. Verify both endpoints return responses
4. If tests pass, the main application should work

## Configuration

To change the backend URL, update `API_CONFIG.gradio.baseUrl` in `script.js`:

```javascript
const API_CONFIG = {
    gradio: {
        baseUrl: "https://your-space.hf.space", // Change this
        timeout: 30000
    }
};
```

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure your Gradio app allows cross-origin requests
2. **API Timeouts**: Increase timeout in `API_CONFIG`
3. **Character Loading**: Verify `characters.json` is accessible
4. **Styling Issues**: Check that `style.css` loads properly

### Debug Steps:

1. Open browser developer tools (F12)
2. Check Console tab for JavaScript errors
3. Check Network tab for failed API calls
4. Use `test-api.html` to isolate API issues

## Performance Optimization

1. **Images**: Optimize background images in `assets/` folder
2. **Caching**: Enable browser caching for static assets
3. **CDN**: Use a CDN for faster global loading
4. **Minification**: Minify CSS and JavaScript for production

## Security Considerations

1. The frontend makes direct API calls to your backend
2. No sensitive data is stored in the frontend
3. All API calls are made over HTTPS
4. Consider rate limiting on the backend if needed