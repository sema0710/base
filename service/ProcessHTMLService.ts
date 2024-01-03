import { JSDOM } from "jsdom";
import { isNil } from "lodash";

export default class ProcessHTMLService {
  html: string;
  dom: JSDOM;
  query: string;

  constructor(html: string) {
    this.html = html;
    this.dom = new JSDOM(html);
    this.query = "body";
  }

  static of(html: string) {
    return new ProcessHTMLService(html);
  }

  private removeScriptTags(dom: Element) {
    dom.querySelectorAll("script").forEach((script) => {
      script.replaceWith("");
    });

    return dom;
  }

  private removeStyleTags(dom: Element) {
    dom.querySelectorAll("style").forEach((style) => {
      style.replaceWith("");
    });

    return dom;
  }

  private getTarget() {
    return this.dom.window.document.querySelector(this.query);
  }

  private removeHTMLTags(html: string, replaceTo: string = "") {
    return html.replaceAll(/(<([^>]+)>)/gi, replaceTo);
  }

  private removeMultipleLineBreak(html: string) {
    return html.replaceAll(/\n{2,}/g, "\n");
  }

  process() {
    const target = this.getTarget();
    if (isNil(target)) {
      return this.html;
    }
    const styleRemovedBody = this.removeStyleTags(target);
    const scriptRemovedBody = this.removeScriptTags(styleRemovedBody).innerHTML;
    const htmlRemovedBody = this.removeHTMLTags(scriptRemovedBody, "\n");
    return this.removeMultipleLineBreak(htmlRemovedBody);
  }

  setTargetQuery(query: string) {
    this.query = query;
  }
}
