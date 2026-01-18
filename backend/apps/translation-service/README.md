# Translation Service

## Overview
Multi-language support and content translation management.

## Responsibilities
- Content translation
- Language detection
- Multi-language course support
- Translation memory
- Localization management
- Automated translation (Google Translate API)

## API Endpoints
```http
POST   /api/translation/translate     # Translate text
POST   /api/translation/detect         # Detect language
GET    /api/translation/languages      # Supported languages
POST   /api/translation/course/:id     # Translate course
GET    /api/translation/content/:id    # Get translated content
```

## Supported Languages
- English, Spanish, French, German
- Portuguese, Italian, Chinese
- Japanese, Korean, Arabic

## Integration
- Google Translate API
- Course Service - Course content
