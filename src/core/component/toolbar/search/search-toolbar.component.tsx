import * as React from 'react';

import {
  calc,
  isFn,
  isFull,
  joinClassName,
} from '../../../util';
import { GenericComponent } from '../../base/generic.component';
import {
  IconsEnum,
  IFieldActionEntity,
  ISearchToolbarProps,
  ToolbarClassesEnum,
} from '../../../definition';
import { Button } from '../../button';
import {
  DelayedChangesFieldPlugin,
  TextField,
} from '../../field';

export class SearchToolbar extends GenericComponent<ISearchToolbarProps> {

  public static readonly defaultProps: ISearchToolbarProps = {
    icon: IconsEnum.SEARCH,
  };

  /**
   * @stable [06.05.2020]
   * @param {ISearchToolbarProps} props
   */
  constructor(props: ISearchToolbarProps) {
    super(props);

    this.onActivate = this.onActivate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDeactivate = this.onDeactivate.bind(this);
    this.onDelay = this.onDelay.bind(this);
  }

  /**
   * @stable [06.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
      <div
        className={
          joinClassName(
            ToolbarClassesEnum.SEARCH_TOOLBAR,
            isFull(props) && ToolbarClassesEnum.FULL_TOOLBAR,
            calc<string>(props.className)
          )
        }>
        {
          !this.isActive && (
            <Button
              icon={props.icon}
              onClick={this.onActivate}
              disabled={props.disabled}
            />
          )
        }
        {this.isActive && (
          <TextField
            value={this.query}
            actions={this.actions}
            autoFocus={true}
            errorMessageRendered={false}
            placeholder={this.settings.messages.SEARCH}
            plugins={DelayedChangesFieldPlugin}
            onChange={this.onChange}
            onDelay={this.onDelay}
            {...this.props.fieldConfiguration}
          />)}
      </div>
    );
  }

  /**
   * @stable [06.05.2020]
   */
  private onActivate(): void {
    const props = this.props;

    if (isFn(props.onActivate)) {
      props.onActivate();
    }
  }

  /**
   * @stable [06.05.2020]
   */
  private onDeactivate(): void {
    const props = this.props;

    if (isFn(props.onDeactivate)) {
      props.onDeactivate();
    }
  }

  /**
   * @stable [06.05.2020]
   * @param {string} query
   */
  private onChange(query: string): void {
    const props = this.props;

    if (isFn(props.onChange)) {
      props.onChange(query);
    }
  }

  /**
   * @stable [06.05.2020]
   */
  private onDelay(): void {
    const props = this.props;

    if (props.onApply) {
      props.onApply();
    }
  }

  /**
   * @stable [06.05.2020]
   * @returns {IFieldActionEntity[]}
   */
  private get actions(): IFieldActionEntity[] {
    const props = this.props;
    return [
      {
        disabled: props.disabled,
        type: IconsEnum.TIMES,
        onClick: this.onDeactivate,
      }
    ];
  }

  /**
   * @stable [06.05.2020]
   * @returns {string}
   */
  private get isActive(): boolean {
    return this.props.active;
  }

  /**
   * @stable [06.05.2020]
   * @returns {string}
   */
  private get query(): string {
    return this.props.query;
  }
}
