# gas-update-notifier
Notify site updates via e-mail (working on Google Apps Script)

## Usage
### 1. Clone this repository
```
git clone https://github.com/ryoshid/gas-update-notifier
```

### 2. Edit settings (`code.ts`)
```
const SITES: SiteInfo[] = [
  {
    name: "example",
    url: "http://example.com/",
  },
];

const EMAIL = "your.address@example.com";
```
Note this app can notify an update only on the site that has `Last-Modified` header.

You can check whether the site has the header by a bookmarklet `javascript:alert(document.lastModified);`.

### 3. Push and Initialize
Create a project and push the app using `clasp` command.
```
clasp create --type standalone
clasp push
```
Then open the app (`clasp open`) and run `init()` function.

This app will fetch sites every 2 hours. If there are updates, it will e-mail you.
