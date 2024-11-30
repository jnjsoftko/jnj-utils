import {
  Cheerio,
  Chrome,
  getProfileByEmail,
} from '../index.js';

import dotenv from 'dotenv';
dotenv.config({ path: `../../.env` });

const { GOOGLE_EMAIL, CHROME_USER_DATA_DIR, CHROME_PROFILE_NAME, TEST_DATA_DIR } = process.env;

const str = `
<html>
<div>
<div>
div1
</div>
</div>
</html>
`

const ci = new Cheerio(str);
console.log(ci.value('div > div'));

const profile = getProfileByEmail(GOOGLE_EMAIL, CHROME_USER_DATA_DIR)
console.log(profile)

const chrome = new Chrome(
  {
    headless: false,
    email: GOOGLE_EMAIL,
    // profileName: CHROME_PROFILE_NAME,
    userDataDir: CHROME_USER_DATA_DIR,
  }
);
chrome.goto("https://www.google.com")
chrome.saveScreenshot(`${TEST_DATA_DIR}/downloads/images/screenshot01.png`)

// export default Chrome;
// module.exports = Chrome;

// const profile = await getProfileByEmail('blackwhitekmc@gmail.com');
// console.log(profile);

// const ch = new Chrome({
//     headless: true,
//     email: 'blackwhitekmc@gmail.com'
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
