/* tslint:disable */
interface Window {
  $;
  dataLayer;
  ga;
  google,
  jQuery;
}
/* tslint:enable */

declare module '*.svg' {
  export default class extends React.Component<React.SVGProps<SVGSVGElement>> {
  }
}
