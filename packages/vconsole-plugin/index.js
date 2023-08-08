import {VConsoleSveltePlugin} from './src/SvelteClass'
import BizantinePlugin from './src/BizantinePlugin.svelte'

class VConsoleVueTab extends VConsoleSveltePlugin {

    constructor(id, name, initialProps) {
      // get the last param of args
      super(id, name, BizantinePlugin, initialProps);
      this.initialProps = initialProps

    }
  
    // onReady() {
    // }
  
    // onAddTopBar(callback) {
    // }
  
    // onAddTool(callback) {
    // }
  
    // onShow() {    
    // }
  
}


export const initPlugin = function(vConsole, config){
  var tab = new VConsoleVueTab('Bizantine', 'Bizantine', config);
  vConsole.addPlugin(tab);
}

export default {
initPlugin
}