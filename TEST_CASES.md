# 📄 Test Case Documentation

## 🎯 Objective

Ensure the Booking.com hotel and flight booking experience meets expected functionality and user behavior standards through structured and exploratory testing.

## 🛠️ Techniques Used

- Equivalence Partitioning
- Boundary Value Analysis
- Negative Testing
- Positive Path Testing
- Case-insensitive and Input Validation

## 🧪 Test Case Matrix

| Test Case ID | User Story | Scenario | Description | Expected Result |
|--------------|------------|----------|-------------|-----------------|
| TC-001 | Hotel Search & Filtering | Search by City | Search for 'New York' | Hotels relevant to 'New York' are listed. |
| TC-002 | Hotel Search & Filtering | Search by City | Search for 'new york' (case-insensitive) | Hotels relevant to 'New York' are listed. |
| TC-003 | Hotel Search & Filtering | Search by City | Search for '  New York  ' (leading/trailing spaces) | Hotels relevant to 'New York' are listed. |
| TC-004 | Hotel Search & Filtering | Search by City | Search for non-existent city 'Xyzabc' | 'No results found' message is displayed. |
| TC-005 | Hotel Search & Filtering | Search by City | Search using special characters | Input is handled without error. |
| TC-006 | Hotel Search & Filtering | Search by City | Empty input | Search is disabled or validation message shown. |
| TC-007 | Hotel Search & Filtering | Search by City | City name with 255 characters | System handles input gracefully. |
| TC-008 | Hotel Search & Filtering | Search by City | Search with a single character | Appropriate response or validation shown. |
| TC-009 | Hotel Search & Filtering | Date Selection | Valid future check-in/out dates | Availability updates correctly. |
| TC-010 | Hotel Search & Filtering | Date Selection | Same-day check-in and next-day check-out | Search completes successfully. |
| TC-011 | Hotel Search & Filtering | Date Selection | Check-out before check-in | Validation error shown. |
| TC-012 | Hotel Search & Filtering | Date Selection | Select past dates | Past dates are disabled or cause error. |
| TC-013 | Hotel Search & Filtering | Date Selection | No dates selected | Validation message or block search. |
| TC-014 | Hotel Search & Filtering | Date Selection | 30+ day stay selected | Search completes successfully. |
| TC-015 | Hotel Search & Filtering | Guest Rating Filter | Apply 'Guest Rating: 8+' filter | Only hotels rated 8+ are displayed. |
| TC-016 | Hotel Search & Filtering | Guest Rating Filter | Combine with Wi-Fi filter | Hotels match both filters. |
| TC-017 | Hotel Search & Filtering | Guest Rating Filter | Apply filter with no matching hotels | 'No results' message shown. |
| TC-018 | Hotel Search & Filtering | Guest Rating Filter | Hotel with exactly 8.0 rating | Hotel is included. |
| TC-019 | Hotel Search & Filtering | Guest Rating Filter | Hotel with 7.9 rating | Hotel is excluded. |
| TC-020 | Hotel Search & Filtering | Price Sorting | Sort by 'Lowest Price' | Hotels are ordered ascending by price. |
| TC-021 | Hotel Search & Filtering | Price Sorting | Hotels with same price | Order is stable or alphabetical. |
| TC-022 | Flight Booking Process | Round Trip Selection | Select 'Round Trip' | Return date field is enabled. |
| TC-023 | Flight Booking Process | Round Trip Selection | Select 'One Way' | Return date field is disabled. |
| TC-024 | Flight Booking Process | Round Trip Selection | Return date before departure | Validation error is shown. |
| TC-025 | Hotel Details & Amenities | Navigate to Details | Click hotel card | Navigates to hotel detail page. |
| TC-026 | Hotel Details & Amenities | Photo Gallery | Open image lightbox | Full image is shown and navigation works. |

---
## 🤖 AI-Assisted Design Support

This test case suite was designed and refined with the support of **artificial intelligence (ChatGPT)**.

The AI assisted in:
- Improving clarity and consistency across test scenarios.
- Suggesting edge cases and meaningful variations.
- Enhancing coverage through structured test design methodologies.

_Thanks to AI support, the test documentation reflects a higher level of thoroughness and strategic value._
