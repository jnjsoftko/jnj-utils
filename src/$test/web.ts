import {
  sleepAsync,
  Cheerio,
  Chrome,
  getProfileByEmail,
} from '../index.js';
import { By, until } from 'selenium-webdriver';

import dotenv from 'dotenv';
dotenv.config({ path: `../../.env` });

const { GOOGLE_EMAIL, CHROME_USER_DATA_DIR, CHROME_PROFILE_NAME, TEST_DATA_DIR } = process.env;

console.log(GOOGLE_EMAIL, CHROME_USER_DATA_DIR);

// const str = `
// <html>
// <div>
// <div>
// div1
// </div>
// </div>
// </html>
// `

// const ci = new Cheerio(str);
// console.log(ci.value('div > div'));

// const profile = getProfileByEmail(GOOGLE_EMAIL, CHROME_USER_DATA_DIR)
// console.log(profile)

// const chrome = new Chrome(
//   {
//     headless: false,
//     email: GOOGLE_EMAIL,
//     // profileName: CHROME_PROFILE_NAME,
//     userDataDir: CHROME_USER_DATA_DIR,
//   }
// );
// chrome.goto("https://www.google.com")
// chrome.saveScreenshot(`${TEST_DATA_DIR}/downloads/images/screenshot01.png`)

// export default Chrome;
// module.exports = Chrome;

// const profile = await getProfileByEmail(GOOGLE_EMAIL);
// console.log(profile);

// const ch = new Chrome({
//     headless: true,
//     email: GOOGLE_EMAIL
// });

// await ch.goto('https://www.scrapingcourse.com/infinite-scrolling');
// const image = await ch.getFullScreenshot();
// fs.writeFileSync('./screenshot.png', image, 'base64');

// * selenium get source, find element

// driver.page_source

// element_Source = driver.find_element("id","entry_213259").get_attribute("outerHTML")
// print(element_Source)

// selenium click, get text, get attribute, get screenshot, save screenshot
// await submitButton.click();

// let inputField = await driver.findElement(By.name('no_type'));
// let value = await inputField.getAttribute('value');
// console.log(value);

const url = 'https://class101.net/ko/my-classes';

const chrome = new Chrome({
  headless: false,
  email: GOOGLE_EMAIL,
  userDataDir: CHROME_USER_DATA_DIR,
});

await chrome.goto(url);
await chrome.getFullSize();
await sleepAsync(2000);
await chrome.driver.wait(until.elementLocated(By.css('ul[data-testid="grid-list"] > li')), 3000);
const elements = await chrome.findElements('ul[data-testid="grid-list"] > li');
const count = elements.length;
console.log(count);

