
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
/*
Tencent is pleased to support the open source community by making vConsole available.

Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.

Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
http://opensource.org/licenses/MIT

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * vConsole Plugin Class
 */

class VConsolePlugin {
  
  constructor(id, name = 'newPlugin') {
    this.id = id;
    this.name = name;
    this.isReady = false;
    
    this.eventList = {};
  }

  get id() {
    return this._id;
  }
  set id(value) {
    if (!value) {
      throw 'Plugin ID cannot be empty';
    }
    this._id = value.toLowerCase();
  }

  get name() {
    return this._name;
  }
  set name(value) {
    if (!value) {
      throw 'Plugin name cannot be empty';
    }
    this._name = value;
  }

  get vConsole() {
    return this._vConsole || undefined;
  }
  set vConsole(value) {
    if (!value) {
      throw 'vConsole cannot be empty';
    }
    this._vConsole = value;
  }

  /**
   * register an event
   * @public
   * @param string
   * @param function
   */
  on(eventName, callback) {
    this.eventList[eventName] = callback;
    return this;
  }

  /**
   * trigger an event
   * @public
   * @param string
   * @param mixed
   */
  trigger(eventName, data) {
    if (typeof this.eventList[eventName] === 'function') {
      // registered by `.on()` method
      this.eventList[eventName].call(this, data);
    } else {
      // registered by `.onXxx()` method
      let method = 'on' + eventName.charAt(0).toUpperCase() + eventName.slice(1);
      if (typeof this[method] === 'function') {
        this[method].call(this, data);
      }
    }
    return this;
  }

} // END class

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

/** @returns {void} */
function noop() {}

function run(fn) {
	return fn();
}

function blank_object() {
	return Object.create(null);
}

/**
 * @param {Function[]} fns
 * @returns {void}
 */
function run_all(fns) {
	fns.forEach(run);
}

/**
 * @param {any} thing
 * @returns {thing is Function}
 */
function is_function(thing) {
	return typeof thing === 'function';
}

/** @returns {boolean} */
function safe_not_equal(a, b) {
	return a != a ? b == b : a !== b || (a && typeof a === 'object') || typeof a === 'function';
}

/** @returns {boolean} */
function is_empty(obj) {
	return Object.keys(obj).length === 0;
}

/**
 * @param {Node} target
 * @param {Node} node
 * @returns {void}
 */
function append(target, node) {
	target.appendChild(node);
}

/**
 * @param {Node} target
 * @param {Node} node
 * @param {Node} [anchor]
 * @returns {void}
 */
function insert(target, node, anchor) {
	target.insertBefore(node, anchor || null);
}

/**
 * @param {Node} node
 * @returns {void}
 */
function detach(node) {
	if (node.parentNode) {
		node.parentNode.removeChild(node);
	}
}

/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} name
 * @returns {HTMLElementTagNameMap[K]}
 */
function element(name) {
	return document.createElement(name);
}

/**
 * @param {string} data
 * @returns {Text}
 */
function text(data) {
	return document.createTextNode(data);
}

/**
 * @returns {Text} */
function space() {
	return text(' ');
}

/**
 * @param {EventTarget} node
 * @param {string} event
 * @param {EventListenerOrEventListenerObject} handler
 * @param {boolean | AddEventListenerOptions | EventListenerOptions} [options]
 * @returns {() => void}
 */
function listen(node, event, handler, options) {
	node.addEventListener(event, handler, options);
	return () => node.removeEventListener(event, handler, options);
}

/**
 * @param {Element} node
 * @param {string} attribute
 * @param {string} [value]
 * @returns {void}
 */
function attr(node, attribute, value) {
	if (value == null) node.removeAttribute(attribute);
	else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}

/**
 * @param {HTMLInputElement[]} group
 * @returns {{ p(...inputs: HTMLInputElement[]): void; r(): void; }}
 */
function init_binding_group(group) {
	/**
	 * @type {HTMLInputElement[]} */
	let _inputs;
	return {
		/* push */ p(...inputs) {
			_inputs = inputs;
			_inputs.forEach((input) => group.push(input));
		},
		/* remove */ r() {
			_inputs.forEach((input) => group.splice(group.indexOf(input), 1));
		}
	};
}

/**
 * @param {Element} element
 * @returns {ChildNode[]}
 */
function children(element) {
	return Array.from(element.childNodes);
}

/**
 * @param {Text} text
 * @param {unknown} data
 * @returns {void}
 */
function set_data(text, data) {
	data = '' + data;
	if (text.data === data) return;
	text.data = /** @type {string} */ (data);
}

/**
 * @returns {void} */
function set_input_value(input, value) {
	input.value = value == null ? '' : value;
}

/**
 * @returns {void} */
function set_style(node, key, value, important) {
	if (value == null) {
		node.style.removeProperty(key);
	} else {
		node.style.setProperty(key, value, important ? 'important' : '');
	}
}

/**
 * @typedef {Node & {
 * 	claim_order?: number;
 * 	hydrate_init?: true;
 * 	actual_end_child?: NodeEx;
 * 	childNodes: NodeListOf<NodeEx>;
 * }} NodeEx
 */

/** @typedef {ChildNode & NodeEx} ChildNodeEx */

/** @typedef {NodeEx & { claim_order: number }} NodeEx2 */

/**
 * @typedef {ChildNodeEx[] & {
 * 	claim_info?: {
 * 		last_index: number;
 * 		total_claimed: number;
 * 	};
 * }} ChildNodeArray
 */

let current_component;

/** @returns {void} */
function set_current_component(component) {
	current_component = component;
}

const dirty_components = [];
const binding_callbacks = [];

let render_callbacks = [];

const flush_callbacks = [];

const resolved_promise = /* @__PURE__ */ Promise.resolve();

let update_scheduled = false;

/** @returns {void} */
function schedule_update() {
	if (!update_scheduled) {
		update_scheduled = true;
		resolved_promise.then(flush);
	}
}

/** @returns {void} */
function add_render_callback(fn) {
	render_callbacks.push(fn);
}

// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();

let flushidx = 0; // Do *not* move this inside the flush() function

/** @returns {void} */
function flush() {
	// Do not reenter flush while dirty components are updated, as this can
	// result in an infinite loop. Instead, let the inner flush handle it.
	// Reentrancy is ok afterwards for bindings etc.
	if (flushidx !== 0) {
		return;
	}
	const saved_component = current_component;
	do {
		// first, call beforeUpdate functions
		// and update components
		try {
			while (flushidx < dirty_components.length) {
				const component = dirty_components[flushidx];
				flushidx++;
				set_current_component(component);
				update(component.$$);
			}
		} catch (e) {
			// reset dirty state to not end up in a deadlocked state and then rethrow
			dirty_components.length = 0;
			flushidx = 0;
			throw e;
		}
		set_current_component(null);
		dirty_components.length = 0;
		flushidx = 0;
		while (binding_callbacks.length) binding_callbacks.pop()();
		// then, once components are updated, call
		// afterUpdate functions. This may cause
		// subsequent updates...
		for (let i = 0; i < render_callbacks.length; i += 1) {
			const callback = render_callbacks[i];
			if (!seen_callbacks.has(callback)) {
				// ...so guard against infinite loops
				seen_callbacks.add(callback);
				callback();
			}
		}
		render_callbacks.length = 0;
	} while (dirty_components.length);
	while (flush_callbacks.length) {
		flush_callbacks.pop()();
	}
	update_scheduled = false;
	seen_callbacks.clear();
	set_current_component(saved_component);
}

/** @returns {void} */
function update($$) {
	if ($$.fragment !== null) {
		$$.update();
		run_all($$.before_update);
		const dirty = $$.dirty;
		$$.dirty = [-1];
		$$.fragment && $$.fragment.p($$.ctx, dirty);
		$$.after_update.forEach(add_render_callback);
	}
}

/**
 * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
 * @param {Function[]} fns
 * @returns {void}
 */
function flush_render_callbacks(fns) {
	const filtered = [];
	const targets = [];
	render_callbacks.forEach((c) => (fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c)));
	targets.forEach((c) => c());
	render_callbacks = filtered;
}

const outroing = new Set();

/**
 * @param {import('./private.js').Fragment} block
 * @param {0 | 1} [local]
 * @returns {void}
 */
function transition_in(block, local) {
	if (block && block.i) {
		outroing.delete(block);
		block.i(local);
	}
}

/** @typedef {1} INTRO */
/** @typedef {0} OUTRO */
/** @typedef {{ direction: 'in' | 'out' | 'both' }} TransitionOptions */
/** @typedef {(node: Element, params: any, options: TransitionOptions) => import('../transition/public.js').TransitionConfig} TransitionFn */

/**
 * @typedef {Object} Outro
 * @property {number} r
 * @property {Function[]} c
 * @property {Object} p
 */

/**
 * @typedef {Object} PendingProgram
 * @property {number} start
 * @property {INTRO|OUTRO} b
 * @property {Outro} [group]
 */

/**
 * @typedef {Object} Program
 * @property {number} a
 * @property {INTRO|OUTRO} b
 * @property {1|-1} d
 * @property {number} duration
 * @property {number} start
 * @property {number} end
 * @property {Outro} [group]
 */

/** @returns {void} */
function mount_component(component, target, anchor) {
	const { fragment, after_update } = component.$$;
	fragment && fragment.m(target, anchor);
	// onMount happens before the initial afterUpdate
	add_render_callback(() => {
		const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
		// if the component was destroyed immediately
		// it will update the `$$.on_destroy` reference to `null`.
		// the destructured on_destroy may still reference to the old array
		if (component.$$.on_destroy) {
			component.$$.on_destroy.push(...new_on_destroy);
		} else {
			// Edge case - component was destroyed immediately,
			// most likely as a result of a binding initialising
			run_all(new_on_destroy);
		}
		component.$$.on_mount = [];
	});
	after_update.forEach(add_render_callback);
}

/** @returns {void} */
function destroy_component(component, detaching) {
	const $$ = component.$$;
	if ($$.fragment !== null) {
		flush_render_callbacks($$.after_update);
		run_all($$.on_destroy);
		$$.fragment && $$.fragment.d(detaching);
		// TODO null out other refs, including component.$$ (but need to
		// preserve final state?)
		$$.on_destroy = $$.fragment = null;
		$$.ctx = [];
	}
}

/** @returns {void} */
function make_dirty(component, i) {
	if (component.$$.dirty[0] === -1) {
		dirty_components.push(component);
		schedule_update();
		component.$$.dirty.fill(0);
	}
	component.$$.dirty[(i / 31) | 0] |= 1 << i % 31;
}

/** @returns {void} */
function init(
	component,
	options,
	instance,
	create_fragment,
	not_equal,
	props,
	append_styles,
	dirty = [-1]
) {
	const parent_component = current_component;
	set_current_component(component);
	/** @type {import('./private.js').T$$} */
	const $$ = (component.$$ = {
		fragment: null,
		ctx: [],
		// state
		props,
		update: noop,
		not_equal,
		bound: blank_object(),
		// lifecycle
		on_mount: [],
		on_destroy: [],
		on_disconnect: [],
		before_update: [],
		after_update: [],
		context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
		// everything else
		callbacks: blank_object(),
		dirty,
		skip_bound: false,
		root: options.target || parent_component.$$.root
	});
	append_styles && append_styles($$.root);
	let ready = false;
	$$.ctx = instance
		? instance(component, options.props || {}, (i, ret, ...rest) => {
				const value = rest.length ? rest[0] : ret;
				if ($$.ctx && not_equal($$.ctx[i], ($$.ctx[i] = value))) {
					if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
					if (ready) make_dirty(component, i);
				}
				return ret;
		  })
		: [];
	$$.update();
	ready = true;
	run_all($$.before_update);
	// `false` as a special case of no DOM component
	$$.fragment = create_fragment ? create_fragment($$.ctx) : false;
	if (options.target) {
		if (options.hydrate) {
			const nodes = children(options.target);
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			$$.fragment && $$.fragment.l(nodes);
			nodes.forEach(detach);
		} else {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			$$.fragment && $$.fragment.c();
		}
		if (options.intro) transition_in(component.$$.fragment);
		mount_component(component, options.target, options.anchor);
		flush();
	}
	set_current_component(parent_component);
}

/**
 * Base class for Svelte components. Used when dev=false.
 *
 * @template {Record<string, any>} [Props=any]
 * @template {Record<string, any>} [Events=any]
 */
class SvelteComponent {
	/**
	 * ### PRIVATE API
	 *
	 * Do not use, may change at any time
	 *
	 * @type {any}
	 */
	$$ = undefined;
	/**
	 * ### PRIVATE API
	 *
	 * Do not use, may change at any time
	 *
	 * @type {any}
	 */
	$$set = undefined;

	/** @returns {void} */
	$destroy() {
		destroy_component(this, 1);
		this.$destroy = noop;
	}

	/**
	 * @template {Extract<keyof Events, string>} K
	 * @param {K} type
	 * @param {((e: Events[K]) => void) | null | undefined} callback
	 * @returns {() => void}
	 */
	$on(type, callback) {
		if (!is_function(callback)) {
			return noop;
		}
		const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
		callbacks.push(callback);
		return () => {
			const index = callbacks.indexOf(callback);
			if (index !== -1) callbacks.splice(index, 1);
		};
	}

	/**
	 * @param {Partial<Props>} props
	 * @returns {void}
	 */
	$set(props) {
		if (this.$$set && !is_empty(props)) {
			this.$$.skip_bound = true;
			this.$$set(props);
			this.$$.skip_bound = false;
		}
	}
}

/**
 * @typedef {Object} CustomElementPropDefinition
 * @property {string} [attribute]
 * @property {boolean} [reflect]
 * @property {'String'|'Boolean'|'Number'|'Array'|'Object'} [type]
 */

// generated during release, do not modify

const PUBLIC_VERSION = '4';

if (typeof window !== 'undefined')
	// @ts-ignore
	(window.__svelte || (window.__svelte = { v: new Set() })).v.add(PUBLIC_VERSION);

/* src/BizantinePlugin.svelte generated by Svelte v4.1.2 */

function create_if_block(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.innerHTML = `<span style="color:red">Note:</span> <span style="color:red">Cover mode will cover the coverage data to the server, and the server will cover the coverage data to the database.</span>`;
			set_style(div, "margin-top", "10px");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}
		}
	};
}

function create_fragment(ctx) {
	let div4;
	let div0;
	let t0;
	let t1;
	let t2;
	let t3;
	let t4;
	let div1;
	let input0;
	let t5;
	let div2;
	let span0;
	let t7;
	let input1;
	let t8;
	let span1;
	let t10;
	let input2;
	let t11;
	let div3;
	let button;
	let t13;
	let binding_group;
	let mounted;
	let dispose;
	let if_block = /*cover*/ ctx[3] === 1 && create_if_block();
	binding_group = init_binding_group(/*$$binding_groups*/ ctx[7][0]);

	return {
		c() {
			div4 = element("div");
			div0 = element("div");
			t0 = text("Report to project: ");
			t1 = text(/*projectName*/ ctx[1]);
			t2 = text(", Server: ");
			t3 = text(/*server*/ ctx[0]);
			t4 = space();
			div1 = element("div");
			input0 = element("input");
			t5 = space();
			div2 = element("div");
			span0 = element("span");
			span0.textContent = "Merge";
			t7 = space();
			input1 = element("input");
			t8 = space();
			span1 = element("span");
			span1.textContent = "Cover";
			t10 = space();
			input2 = element("input");
			t11 = space();
			div3 = element("div");
			button = element("button");
			button.textContent = "Report";
			t13 = space();
			if (if_block) if_block.c();
			attr(input0, "placeholder", "Input your Feature ID");
			set_style(div1, "margin-top", "10px");
			attr(div1, "class", "line");
			attr(input1, "type", "radio");
			input1.__value = 0;
			set_input_value(input1, input1.__value);
			attr(input2, "type", "radio");
			input2.__value = 1;
			set_input_value(input2, input2.__value);
			set_style(div2, "margin-top", "10px");
			set_style(button, "padding", "5px 10px");
			set_style(button, "margin-top", "10px");
			attr(div4, "class", "vc-table");
			set_style(div4, "padding", "10px");
			set_style(div4, "font-size", "20px");
			set_style(div4, "line-height", "28px");
			binding_group.p(input1, input2);
		},
		m(target, anchor) {
			insert(target, div4, anchor);
			append(div4, div0);
			append(div0, t0);
			append(div0, t1);
			append(div0, t2);
			append(div0, t3);
			append(div4, t4);
			append(div4, div1);
			append(div1, input0);
			set_input_value(input0, /*featureId*/ ctx[2]);
			append(div4, t5);
			append(div4, div2);
			append(div2, span0);
			append(div2, t7);
			append(div2, input1);
			input1.checked = input1.__value === /*cover*/ ctx[3];
			append(div2, t8);
			append(div2, span1);
			append(div2, t10);
			append(div2, input2);
			input2.checked = input2.__value === /*cover*/ ctx[3];
			append(div4, t11);
			append(div4, div3);
			append(div3, button);
			append(div4, t13);
			if (if_block) if_block.m(div4, null);

			if (!mounted) {
				dispose = [
					listen(input0, "input", /*input0_input_handler*/ ctx[5]),
					listen(input1, "change", /*input1_change_handler*/ ctx[6]),
					listen(input2, "change", /*input2_change_handler*/ ctx[8]),
					listen(button, "click", /*handleReport*/ ctx[4])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*projectName*/ 2) set_data(t1, /*projectName*/ ctx[1]);
			if (dirty & /*server*/ 1) set_data(t3, /*server*/ ctx[0]);

			if (dirty & /*featureId*/ 4 && input0.value !== /*featureId*/ ctx[2]) {
				set_input_value(input0, /*featureId*/ ctx[2]);
			}

			if (dirty & /*cover*/ 8) {
				input1.checked = input1.__value === /*cover*/ ctx[3];
			}

			if (dirty & /*cover*/ 8) {
				input2.checked = input2.__value === /*cover*/ ctx[3];
			}

			if (/*cover*/ ctx[3] === 1) {
				if (if_block) ; else {
					if_block = create_if_block();
					if_block.c();
					if_block.m(div4, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) {
				detach(div4);
			}

			if (if_block) if_block.d();
			binding_group.r();
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { server } = $$props;
	let { projectName } = $$props;
	let featureId = "";
	let cover = 0;

	async function handleReport(event) {
		// alert(featureId);
		// console.log(window.__coverage__)
		const url = `${server}/report-cov`;

		const data = {
			featureId,
			projectName,
			data: window.__coverage__
		};

		const response = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();
		console.log(result);
	}

	const $$binding_groups = [[]];

	function input0_input_handler() {
		featureId = this.value;
		$$invalidate(2, featureId);
	}

	function input1_change_handler() {
		cover = this.__value;
		$$invalidate(3, cover);
	}

	function input2_change_handler() {
		cover = this.__value;
		$$invalidate(3, cover);
	}

	$$self.$$set = $$props => {
		if ('server' in $$props) $$invalidate(0, server = $$props.server);
		if ('projectName' in $$props) $$invalidate(1, projectName = $$props.projectName);
	};

	return [
		server,
		projectName,
		featureId,
		cover,
		handleReport,
		input0_input_handler,
		input1_change_handler,
		$$binding_groups,
		input2_change_handler
	];
}

class BizantinePlugin extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { server: 0, projectName: 1 });
	}
}

class VConsoleVueTab extends VConsoleSveltePlugin {

    constructor(id, name, initialProps) {
      // get the last param of args
      super(id, name, BizantinePlugin, initialProps);
      this.initialProps = initialProps;

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


const initPlugin = function(vConsole, config){
  var tab = new VConsoleVueTab('Bizantine', 'Bizantine', config);
  vConsole.addPlugin(tab);
};

var index = {
initPlugin
};

export { index as default, initPlugin };
