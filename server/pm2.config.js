import { exec } from "child_process";

export default {
    apps : [
        {
        name: 'code-editor',
        script: './index.js',
        instances :'max',
        exec_mode : 'cluster',
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
    }]
}