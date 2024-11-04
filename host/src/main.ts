import { createApp, defineComponent, h, onMounted, onBeforeUnmount, ref } from 'vue';
import { createWebHistory, createRouter } from "vue-router";
import React from "react";
import { createRoot } from "react-dom/client";

import './style.css'
import App from './App.vue'
const RemoteReactUI = await import('ui/HelloWorld');
const RemoteVueUI = await import('mpm/HelloWorld');


export const createReactWrapper = (ReactComponent: any) => {
    return defineComponent({
        name: 'ReactWrapper',
        inheritAttrs: false,
        props: {
            // You can define specific props if you want
            ...ReactComponent.propTypes, // If using PropTypes
            // Or if using TypeScript
            // ...ReactComponent.defaultProps, // You can use for default values
        },
        setup(props, { attrs }) {
            const containerRef = ref(null);
            let root: any = null;

            onMounted(() => {
                if (containerRef.value) {
                    // Create a new div for the React component
                    root = createRoot(containerRef.value);
                    // Render the React component with props and attributes
                    root.render(React.createElement(ReactComponent, { ...props, ...attrs }));
                }
            });

            onBeforeUnmount(() => {
                if (root) {
                    root.unmount();
                    root = null;
                }
            });

            return () => h('div', { ref: containerRef, class: 'react-wrapper' });
        }
    });
};

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: "home",
            path: "/",
            component: () => import("./components/HelloWorld.vue"),
        },
        {
            name: "mpm",
            path: "/mpm",
            component: RemoteVueUI.default,
        },
        {
            name: "ui",
            path: "/ui",
            component: createReactWrapper(RemoteReactUI.default),
        }
    ]
});

createApp(App).use(router).mount('#app')
