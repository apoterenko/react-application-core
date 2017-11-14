import * as React from 'react';
import * as R from 'ramda';
import { ILogger, LoggerFactory } from 'ts-smart-logger';

import { isUndef } from '../../../util';
import { BasicTextField, IBasicTextFieldAction } from '../../../component/field';
import { Menu, IMenu } from '../../../component/menu';
import {
  AnyT,
  BasicEventT,
  ChangeEventT,
  EMPTY_ID,
  IKeyValue,
  KeyboardEventT,
} from '../../../definition.interface';
import {
  INativeMaterialSelectComponent,
  IBasicSelectInternalProps,
  IBasicSelectInternalState,
  ISelectOption,
} from './basic-select.interface';

export class BasicSelect<TComponent extends BasicSelect<TComponent, TInternalProps, TInternalState>,
                         TInternalProps extends IBasicSelectInternalProps,
                         TInternalState extends IBasicSelectInternalState>
    extends BasicTextField<TComponent,
                           TInternalProps,
                           TInternalState,
                           INativeMaterialSelectComponent> {

  private static logger: ILogger = LoggerFactory.makeLogger(BasicSelect);

  protected defaultAction: IBasicTextFieldAction = {
    type: 'arrow_drop_down',
    actionHandler: (event: BasicEventT) => {
      this.setFocus();
      this.openMenu(event);
    },
  };

  constructor(props: TInternalProps) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  public componentWillReceiveProps(nextProps: Readonly<TInternalProps>, nextContext: AnyT): void {
    super.componentWillReceiveProps(nextProps, nextContext);

    if (!R.isNil(nextProps.options)
        && !R.equals(this.props.options, nextProps.options)) {
      this.setState({ emptyOptions: false });

      if (this.isInputFocused) {
        this.showMenu(nextProps.options);

        if (this.props.onOptionsLoad) {
          this.props.onOptionsLoad(nextProps.options);
        }
      }
    }
  }

  public onChange(event: ChangeEventT): void {
    this.cleanNativeInputForSupportHTML5Validation();
    this.onChangeValue(undefined);
  }

  public onKeyEnter(event: KeyboardEventT): void {
    super.onKeyEnter(event);
    this.openMenu(event);
  }

  public onKeyEscape(event: KeyboardEventT): void {
    super.onKeyEscape(event);

    if (this.menu.opened) {
      this.stopEvent(event);
      this.hideMenu();
    }
  }

  protected onClick(event: BasicEventT): void {
    super.onClick(event);
    this.openMenu(event);
  }

  protected getComponent(): JSX.Element {
    return (
        <div className='app-textfield-input-wrapper'>
          {super.getComponent()}
          <Menu ref='menu'
                useFilter={this.props.useFilter}
                options={this.toFilteredOptions()}
                onSelect={this.onSelect}>
          </Menu>
        </div>
    );
  }

  protected toFilteredOptions(options: ISelectOption[] = this.options): ISelectOption[] {
    return options;
  }

  protected getComponentProps(): IKeyValue {
    return {
      ...super.getComponentProps(),
      value: this.toDisplayValue(),
    };
  }

  protected getEmptyValue(): AnyT {
    return EMPTY_ID;
  }

  protected get options(): ISelectOption[] {
    return this.props.options || [];
  }

  protected onSelect(option: ISelectOption): void {
    this.onChangeValue(option.value, null);

    if (this.props.onSelect) {
      this.props.onSelect(option);
    }
  }

  protected toDisplayValue(): string {
    const props = this.props;
    const value = this.value;
    const selectedItem = this.getSelectedOption(value);
    return selectedItem
        ? (selectedItem.label ? this.t(selectedItem.label) : selectedItem.value)
        : (value === EMPTY_ID ? '' : (isUndef(props.displayValue) ? value : props.displayValue));
  }

  protected get isLoaderShowed(): boolean {
    return this.state.emptyOptions;
  }

  private getSelectedOption(value: AnyT): ISelectOption {
    return R.find((option) => option.value === value, this.options);
  }

  private get menu(): IMenu {
    return this.refs.menu as IMenu;
  }

  private openMenu(event: BasicEventT): void {
    if (this.menu.opened) {
      return;
    }
    this.stopEvent(event);

    const props = this.props;
    if (R.isNil(props.options)) {
      this.setState({ emptyOptions: true });

      if (props.onEmptyOptions) {
        props.onEmptyOptions();
      }
    } else {
      this.showMenu();
    }
  }

  private showMenu(options?: ISelectOption[]): void {
    const filteredOptions = this.toFilteredOptions(options);
    if (filteredOptions.length) {
      this.menu.show();
    } else {
      BasicSelect.logger.debug(`The options are empty. The menu does not show.`);
    }
  }

  private hideMenu(): void {
    this.menu.hide();
  }
}
