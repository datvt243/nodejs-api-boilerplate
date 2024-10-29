# Source code Nodejs - Boilerplate

- Express
- Typescript
- [Pugjs](https://pugjs.org/api/getting-started.html) (Template engine)
- Tailwindcss
- Prettier & Eslint

## scripts

```
npm start             :: chạy app env production
npm run build         :: build code src/*.ts -> dist/*.js
npm run dev           :: chạy code env development
npm run prettier      :: check lỗi prettier
npm run prettier:fix  :: fix lỗi prettier
npm run lint          :: check lỗi eslint
npm run lint:fix      :: fix lỗi eslint
npm run tail:build    :: build file css
npm run pug:format    :: format file pug
```

- Trước khi chạy `npm start` cần chạy build (ra folder `dist`) trước.

# Cấu trúc thư mục

- dist: folder build
- src: source
  - assets: folder chứa các file css, js ...
  - constants: chứa các files khai báo hằng số (const)
  - database: file kết nối CSDL
  - enviroments: file môi trường từ .env
  - libs: folder chứa các file từ thư viện khác
  - middlewares: các file xử lý middlewares
  - public: chứa các file image, pdf ...
  - routers: chứa các file khai náo router
  - types: khai báo Typescript (type, interface ...)
  - utils: khai báo các file chứa các hàm tiện ích
  - views: chứa các file template (dùng Pugjs)
- server.js:

# Cài đặt Typescript - devDependencies

- `typescript`
- `@types/node`

# Cài đặt ESLint

`npm init @eslint/config@latest`

## Cài đặt các package config cần thiết còn lại

- `prettier`: Code formatter chính
- `eslint-config-prettier`: Cấu hình ESLint để không bị xung đột với Prettier
- `eslint-plugin-prettier`: Dùng thêm một số rule prettier cho eslint
- `tsx`: Dùng để chạy TypeScript code trực tiếp mà không cần build
- `tsc-alias`: Xử lý alias khi build
- `rimraf`: Dùng để xóa folder dist khi trước khi build
- `nodemon`: Dùng để tự động restart server khi có sự thay đổi trong code

# Cấu hình

## Cấu hình file tsconfig.json

Tạo file `tsconfig.json` tại thư mục root
Copy nội dung bên dưới vào file `tsconfig`

```
{
  "compilerOptions": {
    "module": "NodeNext", // Quy định output module được sử dụng
    "moduleResolution": "NodeNext",
    "target": "ES2023", // Target output cho code
    "outDir": "dist", // Đường dẫn output cho thư mục build
    "esModuleInterop": true,
    "strict": true /* Enable all strict type-checking options. */,
    "skipLibCheck": true /* Skip type checking all .d.ts files. */,
    "baseUrl": ".", // Đường dẫn base cho các import
    "paths": {
      "~/*": ["src/*"] // Đường dẫn tương đối cho các import (alias)
    }
  },
  "files": ["src/type.d.ts"], // Các file dùng để defined global type cho dự án
  "include": ["src/**/*"] // Đường dẫn include cho các file cần build
}
```

## Cấu hình file config cho Eslint

Mở file `eslint.config.mjs` lên và thêm nội dung dưới đây
nhớ cài extension ESLint cho VS Code để nó hiểu được file này

```
import eslintPluginPrettier from 'eslint-plugin-prettier'
```

```
{
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always',
          semi: false,
          trailingComma: 'none',
          tabWidth: 2,
          endOfLine: 'auto',
          useTabs: false,
          singleQuote: true,
          printWidth: 120,
          jsxSingleQuote: true
        }
      ]
    },
    ignores: ['**/node_modules/', '**/dist/']
}
```

## Cấu hình file config cho Prettier

Tạo file `.prettierrc` trong thư trong thư mục root với nội dung dưới đây

```
{
    "arrowParens": "always",
    "semi": false,
    "trailingComma": "none",
    "tabWidth": 2,
    "endOfLine": "auto",
    "useTabs": false,
    "singleQuote": true,
    "printWidth": 120,
    "jsxSingleQuote": true,
    "jsxBracketSameLine": false,
    "bracketSameLine": false,
    "bracketSpacing": true,
    "embeddedLanguageFormatting": "auto",
    "htmlWhitespaceSensitivity": "css",
    "insertPragma": false,
    "proseWrap": "preserve",
    "quoteProps": "as-needed",
    "requirePragma": false,
    "vueIndentScriptAndStyle": false,
    "singleAttributePerLine": false,
    "plugins": ["@prettier/plugin-pug"]
}
```

Tiếp theo Tạo file `.prettierignore` ở thư mục root, mục đích là bỏ qua các file không cần thiết

```
node_modules/
dist/
```

## Config editor để chuẩn hóa cấu hình editor

Tạo file `.editorconfig` ở thư mục root
Mục đích là cấu hình các config đồng bộ các editor với nhau nếu dự án có nhiều người tham gia.

```
[*]
indent_size = 2
indent_style = space
```

## Cấu hình file nodemon.json

Tạo file `nodemon.json` ở thư mục root
Mục đích là cấu hình nodemon để tự động restart server khi có sự thay đổi trong codeblockock

```
{
  "watch": ["src", ".env"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "tsx ./src/index.ts"
}
```

## Cấu hình file package.json

```
"scripts": {
  "dev": "NODE_ENV=development npx nodemon",
  "build": "rimraf ./dist && tsc && tsc-alias && npm run copy",
  "start": "NODE_ENV=production node ./dist/server.js",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "prettier": "prettier --check .",
  "prettier:fix": "prettier --write .",
  "tail:build": "npx tailwindcss -i ./src/assets/tailwindcss.css -o ./src/public/css/tailwindcss.css --watch",
  "pug:format": "npx prettier --write \"src/views/**/*.pug\" --plugin=\"@prettier/plugin-pug\"",
  "copy": "cp -R ./src/views ./src/assets ./src/public ./dist/"
}
```

# Tạo file type.d.ts

Tạo file `type.d.ts` trong thư mục `src`, tạm thời bây giờ để trống. Mục đích là để defined các global type cho dự án.
Mở file `tsconfig.json` lên sẽ thấy dòng được add file này vào để cho typescript nó nhận diện

# Cài đặt template engine (Pugjs)

template engine sử dụng [Pugjs](https://pugjs.org/api/getting-started.html) (Template engine)

```
pug pug-cli
```

- `"@prettier/plugin-pug"`: plugin dành cho Prettier, công cụ định dạng mã tự động, giúp bạn định dạng các file Pug (trước đây được gọi là Jade), một ngôn ngữ template dùng để tạo HTML.

Khi build chỉ build các file `ts, js`. Folder `views`,`assets`, `public` không được build sang dist. Cần sao chép thủ công
`cp -R ./src/views ./src/assets ./src/public ./dist/`

# Cài đặt tailwindcss

Cài đặt tailwindcss và các package
`npm install -D tailwindcss postcss autoprefixer`

Tạo file cầu hình `npx tailwindcss init -p`

- `tailwind.config.js`

```
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./src/**/*.{html,js,ts,tsx}', './src/views/**/*.pug'],
  theme: {
    extend: {}
  },
  plugins: []
}
```

Tạo file css `./src/assets/tailwindcss.css` với nội dung sau

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Chạy lệnh biên dịch
`"tail:build": "npx tailwindcss -i ./src/assets/tailwindcss.css -o ./src/public/css/tailwindcss.css --watch",
`
