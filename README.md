# QA Automation – MultiBank Web (Playwright)

This repository contains a UI automation framework for the MultiBank trading and marketing platform, built using Playwright and the Page Object Model (POM).

The framework validates:

- Top navigation and dropdown menus
- Markets / Trending assets section
- Spot trading category behaviour
- “About → Why MultiLink” marketing page
- Clean architecture with reusable Page Objects
- Clear test failure diagnostics and reporting
- Cross-browser execution

--------------------------------------------------
TECH STACK
--------------------------------------------------

- Node.js (v18+ recommended)
- TypeScript
- Playwright Test

--------------------------------------------------
PROJECT STRUCTURE
--------------------------------------------------

data/                → Test data and expected values  
pages/               → Page Objects (BasePage, HomePage, TradingPage, AboutPage)  
tests/               → All Playwright test specs  
artifacts/           → Sample screenshots and test run notes  
playwright.config.ts → Playwright configuration  
package.json         → NPM dependencies and scripts  
README.md            → Project documentation  

--------------------------------------------------
SETUP INSTRUCTIONS
--------------------------------------------------

1. Install dependencies

npm install

2. Install Playwright browsers

npx playwright install --with-deps

--------------------------------------------------
RUNNING TESTS
--------------------------------------------------

Run all tests:

npm test

Run with UI:

npm run test:ui

Run only Chromium:

npm run test:chromium

Run only Firefox:

npm run test:firefox

Run both browsers (cross-browser):

npm run test:all

Run a single test file:

npx playwright test tests/trading.spec.ts

Run in headed mode:

npx playwright test tests/trading.spec.ts --headed

--------------------------------------------------
TEST REPORTS & DIAGNOSTICS
--------------------------------------------------

After running tests:

npx playwright show-report

Artifacts generated automatically:

- playwright-report/  → HTML report
- test-results/       → Videos, traces, screenshots on failure

Additional sample evidence is stored in:

- artifacts/screenshots/
- artifacts/reports/

--------------------------------------------------
ARCHITECTURE OVERVIEW
--------------------------------------------------

The framework is built using the Page Object Model (POM).

BasePage:
- Holds shared navigation logic
- Shared header/footer helpers
- Generic click helpers and visibility checks

HomePage:
- Validates top navigation visibility
- Handles dropdown menus:
  Trade, Features, About Us, Support
- Navigation and redirection validation

TradingPage:
- Represents Markets / Trending Assets
- Handles:
  - Category controls (Trending, Gainers, Losers, etc.)
  - Table rows and headers
  - Trading data extraction
- Used to validate:
  - Category switching
  - Trading pair row structure
  - Price, percentage change, and numeric values

AboutPage:
- Models “About → Why MultiLink” page
- Validates:
  - Hero banners (3 variants)
  - Secure Portfolio block
  - Trading opportunity table
  - Main product cards
  - Our Advantages section
  - Spot Trading and RWA marketing blocks

--------------------------------------------------
ASSUMPTIONS & TRADE-OFFS
--------------------------------------------------

- Tests assume public marketing and trading platforms are accessible.
- Favorites category may sometimes show 0 rows (user-dependent).
- Data values are not asserted strictly due to live market behaviour.
- Visual layout validation is limited to content visibility.
- No API tests are included.
- Authentication flows are intentionally out of scope.

--------------------------------------------------
TEST EVIDENCE
--------------------------------------------------

- Cross-browser execution supported (Chromium + Firefox)
- HTML reports generated on every run
- Screenshots and videos are captured on failure
- Sample execution evidence is available under:

artifacts/screenshots/  
artifacts/reports/

--------------------------------------------------
CI / BUILD AUTOMATION
--------------------------------------------------

The framework supports build automation via NPM scripts.

GitHub Actions CI can be added to automatically:
- Install dependencies
- Run tests
- Upload Playwright reports and traces

--------------------------------------------------
HOW TO EXTEND THE FRAMEWORK
--------------------------------------------------

- Add new Page Objects under /pages
- Add new test scenarios under /tests
- Reuse BasePage for shared navigation logic
- Keep assertions in tests or in dedicated assert-methods
- Store expected UI text inside data/expectedContent.json
- performance analysis 

--------------------------------------------------
DELIVERABLES COVERED
--------------------------------------------------

✔ Well-organized project structure  
✔ Comprehensive README  
✔ Architecture documentation  
✔ Local & cross-browser execution  
✔ Test reports & screenshots  
✔ Build automation via NPM  
✔ Clean POM design  

--------------------------------------------------
AUTHOR
--------------------------------------------------

Nadia Ghulam Ali  
QA Automation Engineer  
Playwright | TypeScript | Web UI Automation  

--------------------------------------------------

---

## 🧩 Task 2 – String Character Frequency

This task implements a simple JavaScript function that counts the number of occurrences of each character in a string while maintaining the order of first appearance.


---

### ▶️ How to Run

Make sure Node.js is installed, then run:

```bash
node stringCharacterFrequency_Task2.js

---

### ✅ Behavior & Assumptions

- Case-sensitive (`A` and `a` are counted separately)
- Whitespace is ignored
- Special characters are included (`@`, `#`, etc.)
- Output preserves the order of first character appearance
- Handles empty and invalid input safely

---

### 🛠️ Approach (Brief Explanation)

- Loop through the input string character by character
- Store counts in a JavaScript object
- Track first appearance order using an array
- Print the result in the required output format

---

