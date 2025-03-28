访问地址:
https://ppgms-test.github.io/



# 2025-03-27 First Init

- 从之前的项目迁移而来, 放弃使用`craco`(`webpack`的一个变体)而使用`vite`来构建项目.  
  - 之前的项目地址为: > https://github.com/PPGMS-Test/display-site-1.git  
    现在已经`Archive`
    ![alt text](./readme-pic/20250328-00.png)
  - 现在在`vite.config.js`中, 修改启动host为`127.0.0.1`而不是在`.env`文件中`HOST=127.0.0.1`
  - 所有的`.env`文件中的环境变量都需要加上`VITE_xxx`前缀
  - 静态资源的路径改了, 现在不需要添加`process.env.PUBLIC_URL`前缀了
  
- `tailwind`版本从`3.4.17`升级到现在的`4.x.x`, 导入方法和配置方法已经有所改变 (在旧仓库的最后一次提交中也有所体现了)
  - 现在所有的`button`需要显式给一个`className='standard-btn'`, 不然没有式样
  
- `vite`的打包默认文件夹名为`dist`, 不是之前的`build`了  
- 基本没有改动业务代码
  - 修改了BCDC AutoExpansion的bug
  - 增加侧边栏的显示隐藏功能
- 打包的时候, 对`tsconfig.app.json` 文件做了调整: 
    ```
    // "noUnusedLocals": true,
    // "noUnusedParameters": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    ```
- Surge的打包命令: `surge --domain gmsshanghai.surge.sh`

## 安装的依赖

```bash
pnpm add @mui/types @paypal/react-paypal-js @tailwindcss/postcss @testing-library/jest-dom @testing-library/react @testing-library/user-event @types/jest @types/node @types/react @types/react-dom @types/react-redux config prism-react-renderer prismjs rc-slider-captcha react react-dom react-draggable react-embed-gist react-simple-captcha redux-persist typescript uuid web-vitals classnames  usehooks-ts react-router-dom @reduxjs/toolkit react-redux @mui/material  @emotion/react @emotion/styled
```
`heroicons`在公司电脑里要用单独命令安装, 否则会拉不下来
```bash
pnpm add @heroicons/react
pnpm list
```

```bash
pnpm add -D tailwindcss postcss autoprefixer
```


---------------------
## 为了让@标识符生效, 除了vite.config.js还需调整的内容
`tsconfig.app.json` 内容

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
}
```

`tsconfig.node.json` 内容
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": "./src", // Important: Set to your source directory
    "paths": {
      "@/*": ["*"] // Important: Map @ to the src directory
    }
  },
  "include": ["src"]
}
```