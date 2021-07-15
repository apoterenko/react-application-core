import * as React from 'react';
import * as R from 'ramda';

import {
  CalcUtils,
  ClsUtils,
  ConditionUtils,
  FilterUtils,
  PropsUtils,
} from '../../util';
import { Button } from '../button/button.component';
import { GenericComponent } from '../base/generic.component';
import {
  IconsEnum,
  IPresetsMenuItemEntity,
  IPresetsSelectOptionEntity,
  ISaveAsNewTemplateProps,
  ISaveAsNewTemplateState,
  SaveAsNewTemplateClassesEnum,
  SaveAsNewTemplateActionsEnum,
} from '../../definition';
import { Menu } from '../menu/menu.component';
import { Dialog } from '../dialog/dialog.component';
import { UNDEF } from '../../definitions.interface';

/**
 * @component-impl
 * @stable [24.03.2021]
 */
export class SaveAsNewTemplate
  extends GenericComponent<ISaveAsNewTemplateProps, ISaveAsNewTemplateState> {

  private readonly actionsMenuAnchorRef = React.createRef<HTMLButtonElement>();
  private readonly actionsMenuRef = React.createRef<Menu>();
  private readonly newTemplateDialogRef = React.createRef<Dialog>();

  /**
   * @stable [05.03.2021]
   * @param originalProps
   */
  constructor(originalProps: ISaveAsNewTemplateProps) {
    super(originalProps);

    this.state = {};

    this.doShowMenu = this.doShowMenu.bind(this);
    this.getMenuOptions = this.getMenuOptions.bind(this);
    this.onActionSet = this.onActionSet.bind(this);
    this.onDialogAccept = this.onDialogAccept.bind(this);
    this.onDialogDeactivate = this.onDialogDeactivate.bind(this);
    this.onMenuItemSelect = this.onMenuItemSelect.bind(this);
  }

  /**
   * @stable [06.03.2021]
   */
  public render(): JSX.Element {
    const originalProps = this.originalProps;
    const {
      className,
      form,
      style,
    } = originalProps;

    const {
      SAVE,
      SAVE_AS_NEW,
    } = this.settings.messages;

    return (
      <div
        ref={this.selfRef}
        style={style}
        className={
          ClsUtils.joinClassName(
            SaveAsNewTemplateClassesEnum.SAVE_AS_NEW_TEMPLATE,
            CalcUtils.calc(className)
          )
        }>
        {this.originalChildren}
        <Button
          forwardedRef={this.actionsMenuAnchorRef}
          icon={IconsEnum.SAVE_REGULAR}
          mini={true}
          onClick={this.doShowMenu}
        />
        <Menu
          ref={this.actionsMenuRef}
          options={this.getMenuOptions}
          anchorElement={this.actionsMenuAnchorRef.current}
          onSelect={this.onMenuItemSelect}/>
        {
          this.hasSaveAsNewDialog && (
            <Dialog
              ref={this.newTemplateDialogRef}
              title={SAVE_AS_NEW}
              acceptText={SAVE}
              onAccept={this.onDialogAccept}
              onDeactivate={this.onDialogDeactivate}
            >
              {form}
            </Dialog>
          )
        }
      </div>
    );
  }

  /**
   * @stable [29.03.2021]
   */
  private getMenuOptions(): IPresetsSelectOptionEntity[] {
    const originalProps = this.originalProps;
    const {
      field,
      form,
    } = originalProps;

    const fieldInstanceValue = field?.current?.value;

    const {
      DELETE,
      OVERWRITE_WITH_NEW_SETTINGS,
      RESTORE_SETTINGS,
      SAVE_AS,
      SAVE_AS_NEW,
    } = this.settings.messages;

    return FilterUtils.notNilValuesArrayFilter<IPresetsSelectOptionEntity>(
      ConditionUtils.ifNotNilThanValue(
        form,
        (): IPresetsSelectOptionEntity => ({
          label: SAVE_AS_NEW,
          value: SaveAsNewTemplateActionsEnum.SAVE_AS_NEW,
        })
      ),
      ...ConditionUtils.ifNotNilThanValue(
        fieldInstanceValue,
        (): IPresetsSelectOptionEntity[] => ([
          {
            label: SAVE_AS,
            value: SaveAsNewTemplateActionsEnum.SAVE_AS,
          },
          {
            label: OVERWRITE_WITH_NEW_SETTINGS,
            value: SaveAsNewTemplateActionsEnum.OVERWRITE,
          },
          {
            label: RESTORE_SETTINGS,
            value: SaveAsNewTemplateActionsEnum.RESTORE,
          },
          {
            label: DELETE,
            value: SaveAsNewTemplateActionsEnum.DELETE,
          }
        ]),
        []
      ),
    );
  }

  /**
   * @stable [24.03.2021]
   */
  private onDialogAccept(): void {
    const action = this.state.action;
    this.setState({action: UNDEF}, () => this.doSelectMenuItem(action));
  }

  /**
   * @stable [24.03.2021]
   */
  private onDialogDeactivate(): void {
    this.setState({action: UNDEF});
  }

  /**
   * @stable [05.03.2021]
   * @param menuItem
   */
  private onMenuItemSelect(menuItem: IPresetsMenuItemEntity<{}, SaveAsNewTemplateActionsEnum>): void {
    switch (menuItem.value) {
      case SaveAsNewTemplateActionsEnum.SAVE_AS:
      case SaveAsNewTemplateActionsEnum.SAVE_AS_NEW:
        if (this.hasSaveAsNewDialog) {
          this.setState({action: menuItem.value}, this.onActionSet);
        } else {
          this.doSelectMenuItem(menuItem.value);
        }
        break;
      default:
        this.doSelectMenuItem(menuItem.value);
        break;
    }
  }

  /**
   * @stable [24.03.2021]
   */
  private onActionSet(): void {
    ConditionUtils.ifNotNilThanValue(
      this.originalProps.onBeforeDialogShow,
      (onBeforeDialogShow) => onBeforeDialogShow(this.state.action)
    );
    this.newTemplateDialogRef.current.activate();
  }

  /**
   * @stable [05.03.2021]
   */
  private doShowMenu(): void {
    this.actionsMenuRef.current.show();
  }

  /**
   * @stable [05.03.2021]
   * @param item
   */
  private doSelectMenuItem(item: SaveAsNewTemplateActionsEnum): void {
    ConditionUtils.ifNotNilThanValue(this.originalProps.onSelect, (onSelect) => onSelect(item));
  }

  /**
   * @stable [24.03.2021]
   */
  private get hasSaveAsNewDialog(): boolean {
    return !R.isNil(this.originalProps.form);
  }

  /**
   * @stable [01.07.2021]
   */
  protected getComponentSettingsProps(): ISaveAsNewTemplateProps {
    return PropsUtils.extendProps(
      super.getComponentSettingsProps(),
      this.componentsSettings?.saveAsNewTemplate
    );
  }
}
