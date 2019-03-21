import { Component, Prop } from 'vue-property-decorator';

import { calc, toClassName } from '../../util';
import { ComponentName } from '../connector/vue-index';
import { VueBaseComponent } from '../base/vue-index';
import { IVueIconProps } from './vue-icon.interface';

@ComponentName('vue-icon')
@Component({
  // tslint:disable:max-line-length
  template: `
    <vue-flex-layout :className="getClassName()"
                     :justifyContentCenter="true">
        <svg v-if="icon === 'zoom-out'"
             width="24"
             height="24"
             viewBox="0 0 24 24"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M16.1721 14.5056H15.2888L14.9832 14.2C16.0721 12.9389 16.7276 11.3 16.7276 9.50556C16.7276 5.51667 13.4943 2.28334 9.50542 2.28334C5.51654 2.28334 2.2832 5.51667 2.2832 9.50556C2.2832 13.4945 5.51654 16.7278 9.50542 16.7278C11.2999 16.7278 12.9388 16.0722 14.1999 14.9889L14.5054 15.2945V16.1722L20.061 21.7167L21.7165 20.0611L16.1721 14.5056ZM9.50542 14.5056C6.74431 14.5056 4.50543 12.2667 4.50543 9.50556C4.50543 6.74445 6.74431 4.50556 9.50542 4.50556C12.2665 4.50556 14.5054 6.74445 14.5054 9.50556C14.5054 12.2667 12.2665 14.5056 9.50542 14.5056Z"
                  fill='currentColor'/>
            <rect x="6" y="10.5" width="2" height="7" transform="rotate(-90 6 10.5)" fill='currentColor'/>
        </svg>
        <svg v-if="icon === 'zoom-in'"
             width="24"
             height="24"
             viewBox="0 0 24 24"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M16.1721 14.5056H15.2888L14.9832 14.2C16.0721 12.9389 16.7276 11.3 16.7276 9.50556C16.7276 5.51667 13.4943 2.28334 9.50542 2.28334C5.51654 2.28334 2.2832 5.51667 2.2832 9.50556C2.2832 13.4945 5.51654 16.7278 9.50542 16.7278C11.2999 16.7278 12.9388 16.0722 14.1999 14.9889L14.5054 15.2945V16.1722L20.061 21.7167L21.7165 20.0611L16.1721 14.5056ZM9.50542 14.5056C6.74431 14.5056 4.50543 12.2667 4.50543 9.50556C4.50543 6.74445 6.74431 4.50556 9.50542 4.50556C12.2665 4.50556 14.5054 6.74445 14.5054 9.50556C14.5054 12.2667 12.2665 14.5056 9.50542 14.5056Z" fill='currentColor'/>
            <rect x="8.5" y="6" width="2" height="7" fill='currentColor'/>
            <rect x="6" y="10.5" width="2" height="7" transform="rotate(-90 6 10.5)" fill='currentColor'/>
        </svg>
        <svg v-if="icon === 'check'"
             width="16"
             height="13"
             viewBox="0 0 16 13"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M0 7.22L5.33333 12.5533L16 1.88667L14.1133 0L5.33333 8.78L1.88667 5.33333L0 7.22Z" fill='currentColor'/>
        </svg>
        <svg v-if="icon === 'trash'"
             width="16"
             height="18"
             viewBox="0 0 16 18"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
        >
             <path d="M15.47 2.95535H0.547287C0.237158 2.95535 0 3.21075 0 3.50264V4.61545C0 4.92558 0.255401 5.16274 0.547287 5.16274H1.51416L2.84589 15.8713C2.95535 16.6922 3.64858 17.3307 4.48775 17.3307H11.5113C12.3504 17.3307 13.0619 16.7105 13.1531 15.8713L14.4849 5.16274H15.4517C15.7619 5.16274 15.999 4.90734 15.999 4.61545V3.50264C16.0173 3.21075 15.7801 2.95535 15.47 2.95535ZM6.74987 13.9376C6.74987 14.3024 6.45798 14.5943 6.09313 14.5943C5.72827 14.5943 5.43638 14.3024 5.43638 13.9376V7.55256C5.43638 7.1877 5.72827 6.89581 6.09313 6.89581C6.45798 6.89581 6.74987 7.1877 6.74987 7.55256V13.9376ZM10.5991 13.9376C10.5991 14.3024 10.3072 14.5943 9.94238 14.5943C9.57752 14.5943 9.28563 14.3024 9.28563 13.9376V7.55256C9.28563 7.1877 9.57752 6.89581 9.94238 6.89581C10.3072 6.89581 10.5991 7.1877 10.5991 7.55256V13.9376Z" fill='currentColor'/>
             <path d="M10.4904 0.547287C10.4904 0.237158 10.235 0 9.94309 0H6.07561C5.76548 0 5.52832 0.255401 5.52832 0.547287V1.84253H10.5086V0.547287H10.4904Z" fill='currentColor'/>
        </svg>
        <svg v-if="icon === 'flip-horizontal'"
             width="24"
             height="24"
             viewBox="0 0 24 24"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
        >
             <path d="M12 2V22" stroke="currentColor" stroke-width="2"/>
             <path fill-rule="evenodd" clip-rule="evenodd" d="M9 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H9V18H5V6H9V4ZM15 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4H15V20Z" fill='currentColor'/>
        </svg>
        <svg v-if="icon === 'flip-vertical'"
             width="24"
             height="24"
             viewBox="0 0 24 24"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
        >
             <path d="M22 12L2 12" stroke='currentColor' stroke-width="2"/>
             <path fill-rule="evenodd" clip-rule="evenodd" d="M20 9V5C20 3.89543 19.1046 3 18 3L6 3C4.89543 3 4 3.89543 4 5V9H6V5L18 5V9H20ZM4 15V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V15L4 15Z" fill='currentColor'/>
        </svg>
        <svg v-if="icon === 'rotate-left'"
             width="24"
             height="24"
             viewBox="0 0 24 24"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
        >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.05884 7.04764L7.95303 2.47467L8.85135 4.6434C9.81767 4.22929 10.882 4 11.9999 4C16.4182 4 19.9999 7.58172 19.9999 12C19.9999 16.4183 16.4182 20 11.9999 20C8.66634 20 5.80901 17.9611 4.60693 15.0623L6.45518 14.2967C7.35674 16.4708 9.49974 18 11.9999 18C15.3136 18 17.9999 15.3137 17.9999 12C17.9999 8.68629 15.3136 6 11.9999 6C11.1532 6 10.3474 6.17539 9.61699 6.49182L10.6318 8.94183L6.05884 7.04764Z" fill="currentColor"/>
        </svg>
        <svg v-if="icon === 'rotate-right'"
             width="24"
             height="24"
             viewBox="0 0 24 24"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
        >
             <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9412 7.04764L16.047 2.47467L15.1487 4.6434C14.1823 4.22929 13.118 4 12.0001 4C7.58182 4 4.0001 7.58172 4.0001 12C4.0001 16.4183 7.58182 20 12.0001 20C15.3337 20 18.191 17.9611 19.3931 15.0623L17.5448 14.2967C16.6433 16.4708 14.5003 18 12.0001 18C8.68638 18 6.00009 15.3137 6.00009 12C6.00009 8.68629 8.68638 6 12.0001 6C12.8468 6 13.6526 6.17539 14.383 6.49182L13.3682 8.94183L17.9412 7.04764Z" fill="currentColor"/>
        </svg>
        <svg v-if="icon === 'expand-down'"
             width="14"
             height="10"
             viewBox="0 0 14 10"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M2.03292 0.983551L7 5.95063L11.9671 0.983551L13.5 2.51647L7 9.01647L0.5 2.51647L2.03292 0.983551Z" fill="currentColor"/>
        </svg>
        <svg v-if="icon === 'close'"
             width="16"
             height="16"
             viewBox="0 0 16 16"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M16 1.61714L14.3829 0L8 6.38286L1.61714 0L0 1.61714L6.38286 8L0 14.3829L1.61714 16L8 9.61714L14.3829 16L16 14.3829L9.61714 8L16 1.61714Z" fill="currentColor"/>
        </svg>
    </vue-flex-layout>
  `,
  // tslint:enable:max-line-length
})
class VueIcon extends VueBaseComponent implements IVueIconProps {
  @Prop() public readonly icon: string;

  /**
   * @stable [21.03.2019]
   * @returns {string}
   */
  private getClassName(): string {
    return toClassName(
      'vue-icon',
      `vue-icon-${this.icon}`,
      calc(this.className)
    );
  }
}
