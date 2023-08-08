import VConsolePlugin from './BaseClass';

class VConsoleSveltePlugin extends VConsolePlugin {
    constructor(id, name, CompClass, initialProps) {
        super(id, name);
        this.CompClass = CompClass;
        this.initialProps = initialProps;
    }

    onReady() {
        this.isReady = true;
    }

    onRenderTab(callback) {
        const $container = document.createElement('div');
        const compInstance = (this.compInstance = new this.CompClass({
            target: $container,
            props: this.initialProps,
        }));
        // console.log('onRenderTab', this.compInstance);
        callback($container.firstElementChild, compInstance.options);
    }

    onRemove() {
        super.onRemove && super.onRemove();
        if (this.compInstance) {
            this.compInstance.$destroy();
        }
    }
}

export  { VConsoleSveltePlugin };
