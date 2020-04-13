type SiteInfo = {
  name: string;
  url: string;
};

interface Headers {
  "Last-Modified": string;
}

const SITES: SiteInfo[] = [
  {
    name: "",
    url: "",
  },
];

const EMAIL = "";

const getLastModified = (url: string): string => {
  const headers = UrlFetchApp.fetch(url).getHeaders() as Headers;
  if (headers.hasOwnProperty("Last-Modified")) {
    return headers["Last-Modified"];
  } else {
    return "Not found";
  }
};

const job = () => {
  let updates = [];
  const properties = PropertiesService.getScriptProperties();
  for (const site of SITES) {
    const newDate = getLastModified(site.url);
    const oldDate = properties.getProperty(site.name);
    if (newDate !== oldDate) {
      updates.push(site);
    }
    properties.setProperty(site.name, newDate);
  }
  if (updates.length === 0) return;
  const body = `There are updates on sites below:
  ${updates.map((s) => "  " + s.name + ": " + s.url).join("\n")}
  `;
  GmailApp.sendEmail(EMAIL, "Site Updates", body);
};

const init = () => {
  const properties = PropertiesService.getScriptProperties();
  properties.deleteAllProperties();
  for (const site of SITES) {
    const newDate = getLastModified(site.url);
    properties.setProperty(site.name, newDate);
  }
  ScriptApp.getProjectTriggers().forEach((tr) => ScriptApp.deleteTrigger(tr));
  ScriptApp.newTrigger("job").timeBased().everyHours(2).create();
};
