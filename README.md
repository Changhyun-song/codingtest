# Codility Practice - Local Coding Test Platform

A local web app for practicing Codility-style coding tests, focused on algorithm and AI/ML problems.

## Prerequisites

### Node.js
- Node.js 18+ required (you have it if you're reading this)

### Python (Required for code execution)
1. Download Python 3.10+ from https://www.python.org/downloads/
2. **IMPORTANT**: During installation, check **"Add Python to PATH"**
3. Verify installation:
   ```bash
   python --version
   ```

#### Optional packages (for PyTorch problems)
```bash
pip install torch numpy
```

## Quick Start

### Windows (PowerShell)
```powershell
cd c:\coding
npm install
npm run dev
# Open http://localhost:3000 in your browser
```

### WSL2 / Linux / macOS
```bash
cd /path/to/coding
npm install
npm run dev
# Open http://localhost:3000 in your browser
```

### Custom Python Path
If Python is installed in a non-standard location:
```powershell
$env:PYTHON_PATH = "C:\path\to\python.exe"
npm run dev
```

## Features

- **15 problems** across Algorithm, AI, and PyTorch categories
- **Monaco Editor** (VS Code-like editing experience)
- **Sample test execution** with instant feedback
- **Hidden test evaluation** on submit
- **Weakness analysis** when tests fail
- **Problem recommendations** based on failure patterns
- **Auto-save** code in browser localStorage
- **Dark mode** interface

## How to Use

1. **Problem List** (`/`): Browse all problems, filter by category/difficulty/status
2. **Problem Page** (`/problems/{id}`): Read the problem, write code, test and submit
3. **Run Tests**: Execute your code against sample test cases
4. **Submit**: Evaluate against hidden test cases for final verdict
5. **Review**: If failed, check weakness analysis and try recommended problems

## Adding New Problems

Create a new `.ts` file in `problems/{category}/` following the existing format.
Then import and add it to `problems/index.ts`.

Each problem requires:
- English problem statement
- Function signature
- Sample tests (visible to user)
- Hidden tests (at least 2, with failure categories)
- Similar/fallback problem IDs for recommendations
