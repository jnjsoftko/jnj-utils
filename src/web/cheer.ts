import * as cheerio from 'cheerio';

// * settings = [{'key': '', 'selector': '', 'target': ''}]
interface CheerioSetting {
  key: string;
  selector: string;
  target?: string;
  callback?: (value: any) => any;
}


// *
const querySelectorAll = ($root: any, selector: string) => {
  return $root instanceof Function ? $root(selector) : $root.find(selector);
};

// *
const querySelector = ($root: any, selector: string) => {
  return $root instanceof Function
    ? $root(selector).eq(0)
    : $root.find(selector).eq(0);
};

// *
const _getValue = ($element: any, target: string) => {
  target ??= 'text';
  let rst;

  switch (target.toLowerCase()) {
    case 'text':
      rst = $element.text().trim();
      break;
    case 'texts':
      let contents = $element.contents();
      let texts = [];
      // console.log(`###contents.length: ${contents.length}`);
      for (let i = 0; i < contents.length; i++) {
        let _text = contents.eq(i).text().trim();
        // console.log(`###_text: |${_text}|`)
        if (_text.length > 0) {
          // console.log(`###_text: |${_text}|`)
          texts.push(_text);
        }
      }
      rst = texts;
      break;
    case 'innerhtml':
      rst = $element.html().trim();
      break;
    default:
      rst = $element.attr(target);
  }

  return rst;
};

// *
const getValue = ($root: any, selector: string, target?: string) => {
  target ??= 'text';
  let $element = querySelector($root, selector);
  return !$element ? '' : _getValue($element, target);
};

// *
const getValues = ($root: any, selector: string, target?: string) => {
  target ??= 'text';
  let $elements = querySelectorAll($root, selector);
  if (!$elements) return [];

  let values = [];
  for (let i = 0; i < $elements.length; i++) {
    let $element = $elements.eq(i);
    let value = _getValue($element, target);
    if (value) values.push(value);
  }
  return values;
};

// *
const getOuterHtml = ($: any, selector: string) =>
  $.html(querySelector($, selector));

// *
const getValueFromStr = (str: string, selector: string, target?: string) => {
  return getValue(cheerio.load(str), selector, target);
};

// *
const getValuesFromStr = (str: string, selector: string, target?: string) => {
  return getValues(cheerio.load(str), selector, target);
};

const dictFromRoot = ($root: any, settings: CheerioSetting[] = []) => {
  let dict: any = {};
  for (let setting of settings) {
    if (!setting.selector) {
      continue;
    }
    let value = getValue($root, setting.selector, setting.target);
    dict[setting.key] = setting.callback ? setting.callback(value) : value;
  }
  return dict;
};

// * settings = [{'key': '', 'selector': '', 'target': ''}, ...]
const dictsFromRoots = ($roots: any[], settings: CheerioSetting[] = [], required: string[] = []) => {
  let dicts = [];
  for (let i = 0; i < $roots.length; i++) {
    let $root = $roots[i];
    // let $root = $roots.eq(i);
    let dict = dictFromRoot($root, settings);
    if (!dict) continue;
    let notPush = false;
    for (let key of required) {
      // 필수항목 값 확인
      if (!dict[key]) {
        notPush = true;
        break;
      }
    }
    if (!notPush) dicts.push(dict);
  }
  return dicts;
};

// ** class
class Cheerio {
  private html: string;
  private $: cheerio.CheerioAPI;

  constructor(html: string) {
    this.html = html;
    this.$ = cheerio.load(html);
  }

  root() {
    return this.$;
  }

  value(selector: string, target?: string) {
    return getValue(this.$, selector, target);
  }

  values(selector: string, target?: string) {
    return getValues(this.$, selector, target);
  }

  outerHtml(selector: string) {
    return getOuterHtml(this.$, selector);
  }

  json(settings: CheerioSetting[] = []) {
    return dictFromRoot(this.$, settings);
  }

  jsons($roots: any[], settings: CheerioSetting[] = [], required: string[] = []) {
    return dictsFromRoots($roots, settings, required);
  }

}


// & EXPORT
export {
  Cheerio
};

// // & TEST
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
