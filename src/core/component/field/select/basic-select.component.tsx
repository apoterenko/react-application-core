import * as React from 'react';
import * as R from 'ramda';
import { LoggerFactory, ILogger } from 'ts-smart-logger';

import { cancelEvent, toClassName, isDef, getWidth } from '../../../util';
import { BasicTextField } from '../../field/textfield';
import { Menu, IMenu } from '../../menu';
import {
  AnyT,
  IBasicEvent,
  EntityIdT,
  IKeyboardEvent,
} from '../../../definitions.interface';
import { ISelectOptionEntity } from '../../../entities-definitions.interface';
import { IBasicSelectProps, IBasicSelectState } from './basic-select.interface';
import { IFieldActionConfiguration } from '../../../configurations-definitions.interface';

export class BasicSelect<TComponent extends BasicSelect<TComponent, TProps, TState>,
                         TProps extends IBasicSelectProps,
                         TState extends IBasicSelectState>
    extends BasicTextField<TComponent, TProps, TState> {

  protected static logger = LoggerFactory.makeLogger('BasicSelect');

  /**
   * @stable [15.09.2018]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.openMenu = this.openMenu.bind(this);

    if (props.expandActionRendered !== false) {
      this.defaultActions = R.insert<IFieldActionConfiguration>(
        0,
        {type: 'expand_more', onClick: this.openMenu},
        this.defaultActions
      );
    }
  }

  /**
   * @stable [20.08.2018]
   * @param {Readonly<TProps extends IBasicSelectProps>} prevProps
   * @param {Readonly<TState extends IBasicSelectState>} prevState
   */
  public componentDidUpdate(prevProps: Readonly<TProps>, prevState: Readonly<TState>): void {
    super.componentDidUpdate(prevProps, prevState);

    const props = this.props;
    if (this.state.needToOpenMenu && !R.isNil(props.options)) {
      this.showMenu();
      this.setState({needToOpenMenu: false});

      if (props.onLoadDictionary) {
        props.onLoadDictionary(this.toFilteredOptions());
      }
    }
  }

  public onKeyDown(event: IKeyboardEvent): void {
    super.onKeyDown(event);
    cancelEvent(event);
  }

  public onKeyBackspace(event: IKeyboardEvent): void {
    super.onKeyBackspace(event);
    this.clearValue();
  }

  public onKeyEnter(event: IKeyboardEvent): void {
    super.onKeyEnter(event);
    this.openMenu(event);
  }

  public onKeyEscape(event: IKeyboardEvent): void {
    super.onKeyEscape(event);

    if (this.menu.isOpen()) {
      this.hideMenu();
    }
  }

  /**
   * @stable [18.06.2018]
   * @returns {boolean}
   */
  protected inProgress(): boolean {
    return super.inProgress() || !!this.state.needToOpenMenu;
  }

  protected onClick(event: IBasicEvent): void {
    super.onClick(event);

    this.openMenu(event);
  }

  /**
   * @stable [01.06.2018]
   * @returns {JSX.Element}
   */
  protected getInputAttachmentElement(): JSX.Element {
    const props = this.props;
    return (
      <Menu ref='menu'
            width={() => getWidth(this.self)}
            options={this.toFilteredOptions()}
            onSelect={this.onSelect}
            {...props.menuConfiguration}/>
    );
  }

  protected getInputElementWrapperClassName(): string {
    return toClassName(
      super.getInputElementWrapperClassName(),
      'rac-flex-column'  // inner popup menu - width 100%
    );
  }

  /**
   * @stable [20.08.2018]
   * @returns {ISelectOptionEntity[]}
   */
  protected toFilteredOptions(): ISelectOptionEntity[] {
    return this.options;
  }

  /**
   * @stable [29.06.2018]
   * @returns {AnyT}
   */
  protected getEmptyValue(): AnyT {
    const props = this.props;
    return isDef(props.emptyValue) ? props.emptyValue : this.settings.entityEmptyId;
  }

  /**
   * @stable [20.08.2018]
   * @param {ISelectOptionEntity} option
   */
  protected onSelect(option: ISelectOptionEntity): void {
    this.onChangeManually(option.value);

    if (this.props.onSelect) {
      this.props.onSelect(option);
    }
  }

  protected toDisplayValue(value: AnyT): EntityIdT {
    const selectedItem = R.find<ISelectOptionEntity>((option) => option.value === value, this.options);
    return selectedItem
      ? (selectedItem.label ? this.t(selectedItem.label) : selectedItem.value)
      : super.toDisplayValue(value);
  }

  /**
   * @stable [20.08.2018]
   * @returns {ISelectOptionEntity[]}
   */
  protected get options(): ISelectOptionEntity[] {
    return this.props.options || [];
  }

  /**
   * @stable [20.08.2018]
   * @returns {IMenu}
   */
  private get menu(): IMenu {
    return this.refs.menu as IMenu;
  }

  /**
   * @stable [20.08.2018]
   * @param {IBasicEvent} event
   */
  private openMenu(event: IBasicEvent): void {
    if (this.menu.isOpen()) {
      return;
    }
    cancelEvent(event);

    const props = this.props;
    const areOptionsEmpty = R.isNil(props.options);

    if (props.forceReload || areOptionsEmpty) {
      if (props.onEmptyDictionary) {
        this.setState({needToOpenMenu: true});
        props.onEmptyDictionary();
      } else if (!areOptionsEmpty) {
        this.showMenu();
      }
    } else {
      this.showMenu();
    }
  }

  /**
   * @stable [20.08.2018]
   */
  private showMenu(): void {
    const filteredOptions = this.toFilteredOptions();
    if (filteredOptions.length) {
      this.menu.show();
    } else {
      BasicSelect.logger.debug('[$BasicSelect][showMenu] The options are empty. The menu does not show.');
    }
  }

  /**
   * @stable [20.08.2018]
   */
  private hideMenu(): void {
    this.menu.hide();
  }
}
