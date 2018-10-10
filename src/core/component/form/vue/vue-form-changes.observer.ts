export class VueFormChangesObserver<TForm> {
  constructor(config: {
    fields: string[],
    getFormChanges: (appState) => any,
  }) {

    config.fields.forEach((fieldName) => {
      this[fieldName] = {
        get() {
          return config.getFormChanges.call(this, this.appState)[fieldName];
        },
        set(newValue) {
          this.dispatchFormChanges(fieldName, newValue);
        },
      };
    });
  }
}
