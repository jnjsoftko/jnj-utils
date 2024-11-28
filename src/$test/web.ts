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
