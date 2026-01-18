# Code Execution Service

## Overview  
Secure code playground for running student code in sandboxed environment.

## Responsibilities
- Code execution in sandbox
- Multiple language support
- Output capture and display
- Execution time limits
- Resource usage limits
- Security isolation

## API Endpoints
```http
POST   /api/code/execute              # Execute code
GET    /api/code/languages            # Supported languages
POST   /api/code/validate             # Validate syntax
GET    /api/code/templates            # Code templates
```

## Supported Languages
- Python 3
- JavaScript (Node.js)
- Java
- C++
- Ruby
- Go

## Security Features
- Sandboxed execution
- Time limits (10s)
- Memory limits (256MB)
- Network isolation
- No file system access

## Integration
- Docker containers for isolation
- Course Service - Coding exercises
