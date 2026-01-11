# Character Images Guide

## Current Image Mapping

The following character images are mapped in the application:

| Character | Image File |
|-----------|------------|
| Lord Krishna | `assets/Lord Krishna.jpg` |
| Patanjali | `assets/Patanjali.jpg` |
| Rishi Vyasa | `assets/Maharshi Vyasa -Sri Swami Sivananda.jpg` |
| Swami Vivekananda | `assets/Swami Vivekananda _ AI _ Oil Painting style.jpg` |
| Sadhguru Jaggi Vasudev | `assets/Sadguru.jpg` |
| Rumi | `assets/Rumi.jpg` |
| Hazrat Ali | `assets/Hazrat Imam Ali _ Desktop Wallpaper.jpg` |
| Imam Al-Ghazali | `assets/immam al ghazali.jpg` |
| Khwaja Moinuddin Chishti | `assets/Khwaja Moinuddin Chishti.jpg` |
| Jesus Christ | `assets/Jesus Christ.jpg` |
| Mother Teresa | `assets/Mother Teressa.jpg` |
| St. Francis of Assisi | `assets/são Francisco de Assis.jpg` |
| St. Teresa of Avila | `assets/Santa Teresa de Jesús (Ávila).jpg` |

## Image Features

### Character Selection Page
- **Size**: 80px × 80px circular images
- **Border**: Religion-specific colored borders
- **Effects**: Hover animations, glow effects, scaling
- **Fallback**: Emoji icons if images fail to load

### Chat Header
- **Size**: 60px × 60px circular image
- **Position**: Above the chat title
- **Animation**: Subtle glow animation
- **Responsive**: Scales down on mobile devices

## Image Requirements

### Recommended Specifications
- **Format**: JPG or PNG
- **Size**: Minimum 200px × 200px (square)
- **Aspect Ratio**: 1:1 (square images work best)
- **File Size**: Under 500KB for fast loading

### Optimization Tips
1. **Square Crop**: Images are displayed in circles, so square crops work best
2. **Face Centered**: Ensure the subject's face is centered
3. **Good Contrast**: Images should have good contrast for visibility
4. **Compress**: Optimize file size without losing quality

## Adding New Characters

To add a new character image:

1. **Add Image**: Place the image in the `assets/` folder
2. **Update Mapping**: Add the character name and image path to the `getCharacterImage()` function in `script.js`:

```javascript
function getCharacterImage(characterName) {
    const imageMap = {
        // ... existing mappings ...
        "New Character Name": "assets/new-character-image.jpg"
    };
    return imageMap[characterName] || null;
}
```

3. **Test**: Verify the image loads correctly in both selection and chat views

## Troubleshooting

### Common Issues

1. **Image Not Loading**
   - Check file path is correct
   - Verify image file exists in assets folder
   - Check for special characters in filename

2. **Image Quality Issues**
   - Use higher resolution source images
   - Ensure good lighting and contrast
   - Consider image compression

3. **Layout Problems**
   - Ensure images are square or close to square
   - Check responsive behavior on mobile
   - Verify fallback emoji displays correctly

### Browser Compatibility

- **Modern Browsers**: Full support for all features
- **Older Browsers**: Graceful fallback to emoji icons
- **Mobile**: Responsive sizing and touch-friendly interactions

## Performance Considerations

1. **Lazy Loading**: Images load as needed
2. **Error Handling**: Automatic fallback to emoji icons
3. **Caching**: Browser caches images for faster subsequent loads
4. **Optimization**: Consider WebP format for better compression (with JPG fallback)

## Accessibility

- **Alt Text**: All images include descriptive alt text
- **Fallback**: Emoji icons provide visual fallback
- **Contrast**: Borders and effects maintain good contrast ratios
- **Screen Readers**: Character names are properly labeled