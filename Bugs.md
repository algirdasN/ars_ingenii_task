## #001 - Attempting to buy with insufficient money does not return change

When attempting to buy an item with insufficient money, the application does return the inserted money. The item is not purchased as expected but 0.00€ is returned. Reproducible for each item and for any value below item's cost.

### Environment:
Browser - Mozilla Firefox 115.0 (64-bit)

### Steps to reproduce:
1. Open the application.
2. Enter "1" in the **1** coin field.
3. Click **Twix** button.

### Expected result:
Item is not purchased, **1.00€** is returned.

### Actual result:
Item is not purchased, **0.00€** is returned

---
## #002 - Attempt to buy with exact amount fails

When attempting to purchase an item with exact amount, the application does not complete the transaction. The item is not purchased and "Please insert the right amount of money" is displayed. Reproducible for each item and different coin combinations.

### Environment:
Browser - Mozilla Firefox 115.0 (64-bit)

### Steps to reproduce:
1. Open the application.
2. Enter "1" in the **2** coin field.
3. Click **Twix** button.

### Expected result:
Item is purchased.

### Actual result:
Item is not purchased.

---
## #003 - Transaction cancellation does not function

When **Cancel** button is pressed, the inserted coin amounts are not reset and change is not returned.

### Environment:
Browser - Mozilla Firefox 115.0 (64-bit)

### Steps to reproduce:
1. Open the application.
2. Enter "1" in the **5** coin field.
3. Click **Cancel** button.

### Expected result:
Coin amounts are reset, change is returned.

### Actual result:
Coin amounts are not reset, change is not returned.

---
## #004 - Coin input fields accept non-integer values

Non-number and negative number values are ignored but still displayed on screen. Decimal values are parsed as "partial" coins.

### Environment:
Browser - Mozilla Firefox 115.0 (64-bit)

### Steps to reproduce:
1. Open the application.
2. Enter "0.5" in the **5** coin field.

### Expected result:
It should not be possible to enter non-intenger values.

### Actual result:
Decimal value is accepted; "Total Amount: €2.50" is displayed.

---
## #005 - Coin input fields do not have an upper limit

Because the input fields do not limit the input size, it is possible to see JS aritmetic errors and also go over the Number.MAX_VALUE.

### Environment:
Browser - Mozilla Firefox 115.0 (64-bit)

### Steps to reproduce:
1. Open the application.
2. Enter "1" followed by 308 "0" in the **5** field.
    - "100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"

### Expected result:
Input values are capped.

### Actual result:
Input values are uncapped; "Total Amount: €Infinity" is displayed.

---
## #006 - Website UI breaks on mobile devices

### Environment:
Browser - Mozilla Firefox 115.0 (64-bit)

### Steps to reproduce:
1. Open the application.
2. Select any phone in browser's responsive design mode *OR* reduce the browser window size to below 700 pixel.

### Expected result:
The UI adapts to screens of mobile devices.

### Actual result:
The UI elements are clipping through each other.

---
