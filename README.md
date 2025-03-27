# 🧪 Playwright Automation Framework for Booking.com  
> Robust, scalable and intelligently designed UI test automation project for hotel & flight booking flows.

---

## 🚀 Introduction

This project showcases a **professional-grade test automation framework** built with [Playwright](https://playwright.dev/), demonstrating not just how to test, but how to build **robust**, **resilient**, and **intelligent** test infrastructure from the ground up.

It was crafted to automate scenarios on [Booking.com](https://www.booking.com) including hotel searches, filtering, sorting, and detail validations — with extensibility to flights and more.

---

## 🛠️ Installation

```bash
git clone <repo-url>
cd booking-automation
npm install
```

Make sure you have **Node.js v18+** installed.

---

## 📦 Project Structure

- `/tests`: Test specs using Playwright Test.
- `/pages`: Page Object Models (POM) for encapsulating UI interactions.
- `/utils`: Smart locator, error handling, date and sort utilities.
- `/fixtures`: Shared fixtures for injecting dependencies like logger, page objects, and validators.

---

## ▶️ Running Tests

### ✅ Headless Mode

```bash
npm run test
```

### 🧑‍💻 UI Mode (Debugging)

```bash
npm run test:ui
```

Use this for debugging and observing real-time interactions.

### 🧪 Run a Specific Test

```bash
npx playwright test tests/HotelBooking.spec.ts
```

---

## 📊 Viewing Reports

After running tests:

```bash
npx playwright show-report
```

This will open a full HTML report with screenshots, traces, logs, and execution time.

---

## 💥 Real-world Challenges Faced

> Because automation in real-world apps is never smooth...

- 🔒 **Popup Interruptions**: Booking.com displays promotional popups randomly (e.g., *"Sign in to save money"*), interfering with test flow. We built logic to detect and dismiss them.
- ⏱️ **Unstable Locators**: Dynamic class names, late-loading elements, and animations required robust locator strategies.
- 🔁 **Smart Waits**: Explicit waits, and `waitForLoadState('networkidle')` used to stabilize test executions.
- 🔧 **Calendar Component**: Dates are rendered dynamically and needed precise selection logic using data attributes.
- ❌ **Helanium not used**: While Helanium offers self-healing, we opted for **custom SmartLocator logic** for greater control, understanding, and stability.

---

## 🧠 Why SmartLocator?

We introduced a powerful `smartLocator()` utility that attempts multiple strategies in order:

1. Placeholder-based location (language agnostic)
2. Stable attributes (like `data-testid`)
3. Fallbacks using `name`, `role`, or semantic labels

This ensures **maximum resiliency** across UI changes, translations, and A/B tests.

---

## 📂 Fixtures & Dependency Injection

Fixtures in Playwright allowed us to:

- Inject shared objects like Logger, Page Models, Validators.
- Configure `baseTest` with modular setup logic.
- Keep test code clean and focused on **behavior**, not setup.

Example:

```ts
test('search hotels', async ({ homePage }) => {
  await homePage.searchHotel('New York');
});
```

---

## 📈 Design Philosophy

We invested heavily in:

- 📐 **Clean architecture** (POM + fixtures + utils)
- ♻️ **Separation of concerns** (e.g. error handling decoupled from page logic)
- 🔍 **Logging & tracing** to improve debuggability
- 🧪 **Data-Driven Testing** for validating edge cases
- 🧰 **Utility classes** for sorting, date generation, and validations
- 🔒 **Resilience-first approach** to withstand UI flakiness

---

## 🧠 AI-Assisted Engineering

This project benefited enormously from **Artificial Intelligence (ChatGPT)** in:

- Refactoring and applying clean code principles
- Designing SmartLocator and Error Handling architecture
- Generating robust test data and assertions
- Guiding naming conventions and project structure
- Providing best practices, even under time pressure 💪

---

## ⚠️ Why Not All Test Cases Were Completed?

While the original test case matrix defined 26 cases, **the focus shifted strategically** toward:

- Designing a **robust and reusable framework**
- Implementing foundational elements like error handling, smart locators, fixtures, logger, validators, and test utilities
- Ensuring test reliability over quantity
- Addressing dynamic challenges in the UI (popups, async loading, flaky elements)

We prioritized **quality and maintainability**, leaving a solid base for completing or scaling the test suite easily.

---

## ✅ Conclusion

This project isn't just a set of tests — it's a **solid foundation for professional test automation**.

> Designed with precision, refactored with AI, and battle-tested against real-world UI inconsistencies.

**We’re not just testing. We’re building test engineering solutions.**

---

